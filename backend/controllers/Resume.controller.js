import mongoose from "mongoose";

// Models
import Resume from "../Models/resume.js";
import AtsScans from "../Models/atsScan.js";

// AI Service
import { generateResumeAI } from "../ai/aiService.js";

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
  saveFileMetadata, // for future use
  deleteFile,
  getFile,
} from "../service/FileStorage.service.js";

/* =====================================================
   SAVE NORMAL RESUME (Manual Save)
   Saves a resume document to MongoDB
===================================================== */
export const saveResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();

    res.json({
      success: true,
      message: "Resume saved to database",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   GENERATE AI RESUME + OPTIONAL SAVE TO DB
   Uses AI to generate a resume summary and optionally saves it
===================================================== */
export const generateAIResume = async (req, res) => {
  try {
    console.log("📥 AI Resume request received");

    // Generate AI summary
    const aiText = await generateResumeAI(req.body);
    console.log("✅ AI Summary generated");

    // Save AI-generated resume to DB (optional)
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

    // Send response
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
   UPLOAD & ANALYZE RESUME (ATS Scan)
   Uploads a resume, parses it, analyzes ATS compatibility,
   saves results to MongoDB
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

    // Parse resume text
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
const {  jobTitle, templateId, resumeprofileId } = req.body;
    const jobDescription =
  typeof req.body.jobDescription === "string"
    ? req.body.jobDescription.trim()
    : "";

    const analysis = analyzeATSCompatibility(
      resumeText, extractedData , 
       jobDescription ,
        file.originalname.split(".").pop()); 
    const passes = passesATSThreshold(analysis.overallScore);
    const recommendations = generateRecommendations(analysis);

    
    // Validate required fields from frontend
    
    if (!jobTitle  || !templateId || !resumeprofileId) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Save ATS scan
    const atsScan = new AtsScans({
      userId,
      filename: file.filename,
      originalName: file.originalname,
     filePath: `/uploads/resumes/${file.filename}`,
      fileSize: file.size,
      fileType: file.mimetype,
      overallScore: analysis.overallScore,
      sectionScores: analysis.sectionScores,
      metrics: analysis.metrics,
      matchedKeywords: analysis.matchedKeywords,
      missingKeywords: analysis.missingKeywords,
      suggestions: analysis.suggestions,
      extractedText: resumeText,
      extractedData,
      passThreshold: passes,
      templateId: new mongoose.Types.ObjectId(templateId),
      resumeprofileId: new mongoose.Types.ObjectId(resumeprofileId),
      jobTitle,
      jobDescription: jobDescription || "",
    });
    console.log("✅ ATS RESPONSE DATA:", {
  overallScore: analysis.overallScore,
  sectionScores: analysis.sectionScores.length,
});

    await atsScan.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      data: {
        scanId: atsScan._id,
        filename: file.filename,
        originalName: file.originalname,
        filePath: atsScan.filePath,
        overallScore: analysis.overallScore,
        sectionScores: analysis.sectionScores,
        metrics: analysis.metrics,
        matchedKeywords: analysis.matchedKeywords,
        missingKeywords: analysis.missingKeywords,
        suggestions: analysis.suggestions,
        recommendations,
        passThreshold: passes,
        extractedData,
        metrics: analysis.metrics,
        jobDescription: atsScan.jobDescription,
     
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
   Fetches all ATS scans for a specific user
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
      // count: scans.length,
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
   Fetches one ATS scan by its ID
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
   Deletes an ATS scan and its uploaded file
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

    // Delete file from storage
    deleteFile(scan.filePath);

    // Delete database record
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
   Sends the resume file for download
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
   Aggregates user scan stats like average score, pass rate
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

// Get the latest scan uploaded by the user
export const getLatestScan = async (req, res) => {
  try {
    const latestScan = await AtsScans.findOne({ userId: req.userId })
      .sort({ createdAt: -1 });

    if (!latestScan) {
      return res.status(404).json({
        success: false,
        message: "No scans found for this user",
      });
    }

    // Generate full file URL
    const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

    const responseData = {
      filename: latestScan.filename,
      originalName: latestScan.originalName,
      fileUrl: `${process.env.SERVER_URL || 'http://localhost:5000'}${latestScan.filePath}`,
      overallScore: latestScan.overallScore,
      sectionScores: latestScan.sectionScores,
      matchedKeywords: latestScan.matchedKeywords,
      missingKeywords: latestScan.missingKeywords,
      suggestions: latestScan.suggestions,
      passThreshold: latestScan.passThreshold,
      createdAt: latestScan.createdAt,
    };

    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("❌ Failed to fetch latest scan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest scan",
      error: error.message,
    });
  }
};

