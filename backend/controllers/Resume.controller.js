import puppeteer from "puppeteer";
import Resume from "../Models/resume.js";
import {
  generateResumeAI,
  refineExperienceDescription,
  refineProjectDescription
} from "../ai/aiService.js";

// ===============================
// SAVE NORMAL RESUME (Manual Save)
// ===============================
export const saveResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
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
        summary: aiText
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