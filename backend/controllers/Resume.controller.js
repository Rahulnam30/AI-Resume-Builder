import mongoose from "mongoose";
import AtsScans from "../Models/atsScan.js";
import Resume from "../Models/resume.js";

// ✅ CORRECT: service (singular)
import {
  parseResume,
  extractResumeData,
} from "../service/ResumeParser.service.js";

import {
  analyzeATSCompatibility,
  generateRecommendations,
  passesATSThreshold,
} from "../service/AtsAnalyzer.service.js";

import {
  saveFileMetadata,
  deleteFile,
  getFile,
} from "../service/FileStorage.service.js";

/* ================= UPLOAD & ANALYZE RESUME ================= */
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

    // Parse resume - pass file object directly
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

    // Save scan
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
    console.error("Error uploading resume:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload and analyze resume",
      error: error.message,
    });
  }
};

/* ================= GET ALL USER SCANS ================= */
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

/* ================= GET SCAN BY ID ================= */
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

/* ================= DELETE SCAN ================= */
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

/* ================= DOWNLOAD RESUME ================= */
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

/* ================= SCAN STATISTICS ================= */
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