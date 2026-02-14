import mongoose from "mongoose";

// Models
import Resume from "../Models/resume.js";
import AtsScans from "../Models/atsScan.js";

// AI Service
import generateResumeAI from "../ai/aiService.js";

// Resume Parsing Services
import {
  parseResume,
  extractResumeData,
} from "../service/ResumeParser.service.js";

// ATS Analyzer Services
import {
  analyzeATSCompatibility,
  generateRecommendations,
  passesATSThreshold,
} from "../service/AtsAnalyzer.service.js";

// File Storage Services
import {
  saveFileMetadata, // (kept for future use)
  deleteFile,
  getFile,
} from "../service/FileStorage.service.js";

/* =====================================================
   SAVE NORMAL RESUME (Manual Save)
===================================================== */
/* =====================================================
   SAVE NORMAL RESUME (Manual Save)
===================================================== */
export const saveResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeData = req.body;
    const resumeId = resumeData._id; // Check if we are updating an existing resume

    // Remove immutable fields
    delete resumeData.user;
    delete resumeData.userId;
    delete resumeData._id;

    let resume;

    if (resumeId) {
      // Setup: Update existing resume
      resume = await Resume.findOneAndUpdate(
        { _id: resumeId, user: userId },
        { $set: { ...resumeData, user: userId } },
        { new: true } // Return updated document
      );
    } else {
      // Setup: Create NEW resume
      resume = new Resume({
        ...resumeData,
        user: userId,
      });
      await resume.save();
    }

    res.json({
      success: true,
      message: "Resume saved successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Save Resume Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   GET USER RESUME (LATEST)
===================================================== */
export const getUserResume = async (req, res) => {
  try {
    const userId = req.userId;
    // Get the most recently updated resume
    const resume = await Resume.findOne({ user: userId }).sort({ updatedAt: -1 });

    if (!resume) {
      return res.status(200).json({
        success: true,
        message: "No resume found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error("Get Resume Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   GET ALL USER RESUMES
===================================================== */
export const getAllUserResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    console.error("Get All Resumes Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   GET RESUME BY ID
===================================================== */
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeId = req.params.id;

    const resume = await Resume.findOne({ _id: resumeId, user: userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error("Get Resume By ID Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   GENERATE AI RESUME + OPTIONAL SAVE TO DB
===================================================== */
export const generateAIResume = async (req, res) => {
  try {
    console.log("📥 AI Resume request received");

    // 1. Generate AI summary
    const aiText = await generateResumeAI(req.body);

    console.log("✅ AI Summary generated");

    // 2. Save to MongoDB (optional)
    try {
      const resume = new Resume({
        ...req.body,
        summary: aiText,
      });
      await resume.save();
      console.log("💾 AI Resume saved to DB");
    } catch (dbError) {
      console.log("⚠️ DB save skipped (MongoDB not connected)");
    }

    // 3. Send response
    res.json({
      success: true,
      message: "AI Resume generated successfully",
      aiResume: aiText,
    });
  } catch (error) {
    console.error("❌ AI ERROR:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed: " + error.message,
    });
  }
};

/* =====================================================
   UPLOAD & ANALYZE RESUME (ATS SCAN)
===================================================== */
export const uploadAndAnalyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userId = req.userId;
    const file = req.file;

    // Parse resume
    const parseResult = await parseResume(file);

    if (!parseResult?.success || !parseResult?.text) {
      deleteFile(file.path);
      return res.status(400).json({
        success: false,
        message: "Failed to parse resume",
      });
    }

    const resumeText = parseResult.text;

    // Extract structured data
    const extractedData = extractResumeData(resumeText);

    // ATS analysis
    const analysis = analyzeATSCompatibility(resumeText, extractedData);
    const passes = passesATSThreshold(analysis.overallScore);
    const recommendations = generateRecommendations(analysis);

    // Save ATS scan
    const atsScan = new AtsScans({
      userId,
      filename: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      fileType: file.mimetype,
      overallScore: analysis.overallScore,
      sectionScores: analysis.sectionScores,
      matchedKeywords: analysis.matchedKeywords,
      missingKeywords: analysis.missingKeywords,
      suggestions: analysis.suggestions,
      extractedText: resumeText,
      extractedData,
      passThreshold: passes,
    });

    await atsScan.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      data: {
        scanId: atsScan._id,
        overallScore: analysis.overallScore,
        sectionScores: analysis.sectionScores,
        matchedKeywords: analysis.matchedKeywords,
        missingKeywords: analysis.missingKeywords,
        suggestions: analysis.suggestions,
        recommendations,
        passThreshold: passes,
        extractedData,
        metrics: analysis.metrics,
      },
    });
  } catch (error) {
    console.error("❌ Resume upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload and analyze resume",
      error: error.message,
    });
  }
};

/* =====================================================
   GET ALL USER SCANS
===================================================== */
export const getUserScans = async (req, res) => {
  try {
    const scans = await AtsScans.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select(
        "filename originalName overallScore passThreshold createdAt sectionScores"
      );

    res.status(200).json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch scans",
      error: error.message,
    });
  }
};

/* =====================================================
   GET SCAN BY ID
===================================================== */
export const getScanById = async (req, res) => {
  try {
    const scan = await AtsScans.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    res.status(200).json({
      success: true,
      data: scan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch scan",
      error: error.message,
    });
  }
};

/* =====================================================
   DELETE SCAN
===================================================== */
export const deleteScan = async (req, res) => {
  try {
    const scan = await AtsScans.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    deleteFile(scan.filePath);
    await AtsScans.findByIdAndDelete(scan._id);

    res.status(200).json({
      success: true,
      message: "Scan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete scan",
      error: error.message,
    });
  }
};

/* =====================================================
   DOWNLOAD RESUME FILE
===================================================== */
export const downloadResume = async (req, res) => {
  try {
    const scan = await AtsScans.findOne({
      filename: req.params.filename,
      userId: req.userId,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const fileResult = getFile(scan.filePath);

    if (!fileResult?.buffer) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${scan.originalName}"`
    );
    res.setHeader("Content-Type", scan.fileType);
    res.send(fileResult.buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to download resume",
      error: error.message,
    });
  }
};

/* =====================================================
   SCAN STATISTICS
===================================================== */
export const getScanStatistics = async (req, res) => {
  try {
    const userId = req.userId;

    const totalScans = await AtsScans.countDocuments({ userId });

    const avgScore = await AtsScans.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, avgScore: { $avg: "$overallScore" } } },
    ]);

    const passedScans = await AtsScans.countDocuments({
      userId,
      passThreshold: true,
    });

    const recentScans = await AtsScans.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("filename overallScore createdAt");

    res.status(200).json({
      success: true,
      data: {
        totalScans,
        averageScore: avgScore[0]?.avgScore?.toFixed(1) || 0,
        passedScans,
        passRate:
          totalScans > 0
            ? ((passedScans / totalScans) * 100).toFixed(1)
            : 0,
        recentScans,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};
