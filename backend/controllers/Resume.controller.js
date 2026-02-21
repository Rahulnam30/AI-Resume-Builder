import mongoose from "mongoose";
import puppeteer from "puppeteer";
import AtsScans from "../Models/atsScan.js";
import Resume from "../Models/resume.js";
import Notification from "../Models/notification.js";

// services
import {
  generateResumeAI,
  refineExperienceDescription,
  refineProjectDescription,
  parseResume,
  extractResumeData,
  generateCoverLetterAI
} from "../ai/aiService.js";

// ATS Analyzer Services
import {
  analyzeATSCompatibility,
  generateRecommendations,
  passesATSThreshold,
} from "../service/AtsAnalyzer.service.js";

// File Storage Services
import {
  saveFileMetadata,
  deleteFile,
  getFile,
} from "../service/FileStorage.service.js";

// ===============================
// SAVE NORMAL RESUME (Manual Save)
// ===============================
export const saveResume = async (req, res) => {
  try {
    const resume = new Resume({
      ...req.body,
      user: req.userId,
    });
    await resume.save();

    res.json({
      message: "Resume saved to database"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// =======================================
//      GENERATE RESUME PDF
// =======================================

export const generateResume = async (req, res) => {
  const { html } = req.body;

  const browser = await puppeteer.launch({
    headless: "new"
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0"
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=resume.pdf",
    "Content-Length": pdfBuffer.length
  });

  res.end(pdfBuffer);
}

// =======================================
// GENERATE AI RESUME + SAVE TO MONGODB
// =======================================
export const generateAIResume = async (req, res) => {
  try {
    console.log("Received AI generation request:", req.body);
    // 1. Generate AI professional summary
    const aiText = await generateResumeAI(req.body);
    console.log("AI Summary generated successfully");
    // 2. Try to save to MongoDB (optional - won't fail if DB is down)
    try {
      const resume = new Resume({
        ...req.body,
        summary: aiText,
        user: req.userId,
      });
      await resume.save();
      console.log("Saved to database");
    } catch (dbError) {
      console.log("Database save skipped (MongoDB not connected)");
    }

    // 3. Send AI summary back to frontend
    res.json({
      message: "AI Resume generated successfully",
      aiResume: aiText
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      error: "AI generation failed: " + error.message
    });
  }
};

/* =====================================================
   GENERATE AI COVER LETTER SECTION
===================================================== */
export const generateAICoverLetter = async (req, res) => {
  try {
    const { sectionType, jobDetails } = req.body;

    if (!sectionType || !jobDetails) {
      return res.status(400).json({
        success: false,
        error: "Missing sectionType or jobDetails"
      });
    }

    console.log(`📥 Generating Cover Letter AI for: ${sectionType}`);
    console.log("📊 Request Body:", req.body);

    const content = await generateCoverLetterAI(jobDetails, sectionType);

    console.log("✅ AI Content Generated Length:", content?.length);

    res.json({
      success: true,
      result: content
    });

  } catch (error) {
    console.error("❌ COVER LETTER AI ERROR:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed: " + error.message
    });
  }
};


// ==========================================
// ENHANCE WORK EXPERIENCE + SAVE TO MONGODB
// ==========================================
export const enhanceWorkExperience = async (req, res) => {
  try {
    console.log("Received AI generation request:", req.body);
    // 1. Generate AI professional summary
    const aiResponse = await refineExperienceDescription(req.body);
    console.log(aiResponse);

    console.log("AI Summary generated successfully");
    const aiText = JSON.parse(aiResponse);
    // 2. Try to save to MongoDB (optional - won't fail if DB is down)
    if (aiText.status === "success") {
      try {
        await Resume.findOneAndUpdate(
          {
            "experience.id": req.body.id,
          },
          {
            $set: {
              "experience.$.description": aiText,
            },
          },
          { new: true }
        );
        console.log("Experience description updated in database");

      } catch (dbError) {
        console.log("Database save skipped (MongoDB not connected)", dbError);
      }

      // 3. Send AI summary back to frontend
      return res.json({
        message: "Experience description enhanced successfully",
        aiResume: aiText.text
      });
    }
    throw new Error(aiText.text || "AI generation failed without specific error message");
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      error: "AI generation failed: " + error.message
    });
  }
};

// ==============================================
// ENHANCE PROJECT DESCRIPTION + SAVE TO MONGODB
// ==============================================
export const enhanceProjectDescription = async (req, res) => {
  try {
    console.log("Received AI generation request:", req.body);
    // 1. Generate AI professional summary
    const aiResponse = await refineProjectDescription(req.body);
    console.log(aiResponse);

    console.log("AI Summary generated successfully");
    const projectDescription = JSON.parse(aiResponse);
    // 2. Try to save to MongoDB (optional - won't fail if DB is down)
    if (projectDescription.status === "success") {
      try {
        await Resume.findOneAndUpdate(
          {
            "project.id": req.body.id,
          },
          {
            $set: {
              "project.$.description": projectDescription,
            },
          },
          { new: true }
        );
        console.log("Project description updated in database");

      } catch (dbError) {
        console.log("Database save skipped (MongoDB not connected)", dbError);
      }

      // 3. Send AI summary back to frontend
      return res.json({
        message: "Project Description enhanced successfully",
        projectDescription: projectDescription.text
      });
    }
    throw new Error(projectDescription.text || "AI generation failed without specific error message");
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({
      error: "AI generation failed: " + error.message
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

    const parseResult = await parseResume(file);

    if (!parseResult?.success || !parseResult?.text) {
      deleteFile(file.path);
      return res.status(400).json({
        success: false,
        message: "Failed to parse resume",
      });
    }

    const resumeText = parseResult.text;
    const extractedData = extractResumeData(resumeText);

    const analysis = analyzeATSCompatibility(resumeText, extractedData);
    const passes = passesATSThreshold(analysis.overallScore);
    const recommendations = generateRecommendations(analysis);

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

    // 🔔 USER NOTIFICATION
    await Notification.create({
      actor: "system",
      type: "ATS_SCAN",
      message: `You uploaded a resume. Your ATS score is ${analysis.overallScore}`,
      userId,
    });

    // 🔔 ADMIN NOTIFICATION
    await Notification.create({
      actor: "user",
      type: "ATS_SCAN",
      message: `User uploaded a resume (ATS Score: ${analysis.overallScore})`,
      userId,
    });

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
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload and analyze resume",
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

    // USER
    await Notification.create({
      actor: "system",
      type: "ATS_DELETED",
      message: "You deleted an ATS scan",
      userId: req.userId,
    });

    // ADMIN
    await Notification.create({
      actor: "user",
      type: "ATS_DELETED",
      message: "User deleted an ATS scan",
      userId: req.userId,
    });

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

    // USER
    await Notification.create({
      actor: "system",
      type: "RESUME_DOWNLOADED",
      message: "You downloaded your resume",
      userId: req.userId,
    });

    // ADMIN
    await Notification.create({
      actor: "user",
      type: "RESUME_DOWNLOADED",
      message: "User downloaded a resume",
      userId: req.userId,
    });

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
