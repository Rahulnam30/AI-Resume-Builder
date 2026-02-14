import Notification from "../Models/notification.js";
import Template from "../Models/template.js";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";

/* ================= GET TEMPLATE HTML ================= */
export const getTemplateHtml = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    if (!fs.existsSync(template.filePath)) {
      return res.status(404).json({ msg: "File not found on server" });
    }

    const options = {
      styleMap: [
        "p[style-name='Section Title'] => h2:fresh",
        "p[style-name='Subsection Title'] => h3:fresh",
        "table => table.docx-table",
        "tr => tr.docx-tr",
        "td => td.docx-td",
        "p[style-name='List Paragraph'] => li:fresh",
      ],
      includeDefaultStyleMap: true,
    };

    const result = await mammoth.convertToHtml(
      { path: template.filePath },
      options
    );

    res.status(200).json({ html: result.value });
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    res.status(500).json({ msg: "Parsing failed", error: error.message });
  }
};

/* ================= UPLOAD TEMPLATE ================= */
export const uploadTemplate = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!req.files?.templateFile || !req.files?.thumbnail) {
      return res
        .status(400)
        .json({ msg: "Template file & thumbnail required" });
    }

    const templatePath = req.files.templateFile[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;

    const newTemplate = new Template({
      name,
      category,
      filePath: templatePath,
      previewimage: thumbnailPath,
      status: "pending",
    });

    await newTemplate.save();

    // 🔔 ADMIN NOTIFICATION
await Notification.create({
  actor: "user",
  type: "TEMPLATE_CREATED",
  message: `New template submitted: ${name} (${category})`,
  userId: req.userId,
});

// 🔔 USER NOTIFICATION
await Notification.create({
  actor: "system",
  type: "TEMPLATE_CREATED",
  message: "Your template has been submitted for approval",
  userId: req.userId,
});


    res.status(201).json({
      msg: "Template uploaded & pending approval",
      template: newTemplate,
    });
  } catch (error) {
    console.error("Error uploading template:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

/* ================= GET TEMPLATES ================= */
export const getTemplates = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const templates = await Template.find(query).sort({ createdAt: -1 });

    const templatesWithUrls = templates.map((t) => ({
      ...t._doc,
      fileUrl: `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/templates/${path.basename(
        t.filePath
      )}`,
      imageUrl: `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/templates/${path.basename(
        t.previewimage
      )}`,
    }));

    res.status(200).json(templatesWithUrls);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

/* ================= GET TEMPLATE BY ID ================= */
export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    res.status(200).json({
      ...template._doc,
      fileUrl: `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/templates/${path.basename(
        template.filePath
      )}`,
      imageUrl: `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/templates/${path.basename(
        template.previewimage
      )}`,
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/* ================= APPROVE TEMPLATE ================= */
export const approveTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    await Notification.create({
  actor: "system",
  type: "TEMPLATE_APPROVED",
  message: "Your template has been approved 🎉",
  userId: template.createdBy || null,
});


    res.status(200).json({ msg: "Template approved", template });
  } catch (error) {
    console.error("Error approving template:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/* ================= UPDATE TEMPLATE ================= */
export const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    if (req.files?.templateFile?.[0]) {
      if (fs.existsSync(template.filePath)) fs.unlinkSync(template.filePath);
      template.filePath = req.files.templateFile[0].path;
    }

    if (req.files?.thumbnail?.[0]) {
      if (fs.existsSync(template.previewimage))
        fs.unlinkSync(template.previewimage);
      template.previewimage = req.files.thumbnail[0].path;
    }

    if (req.body.name) template.name = req.body.name;
    if (req.body.category) template.category = req.body.category;

    await template.save();

    // 🔔 ADMIN NOTIFICATION
    await Notification.create({
  actor: "user",
  type: "TEMPLATE_UPDATED",
  message: "Template updated",
  userId: req.userId,
});

    res.status(200).json({
      msg: "Template updated successfully",
      template,
    });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

/* ================= DELETE TEMPLATE ================= */
export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    if (fs.existsSync(template.filePath)) fs.unlinkSync(template.filePath);
    if (fs.existsSync(template.previewimage))
      fs.unlinkSync(template.previewimage);

    await Template.findByIdAndDelete(req.params.id);

    // 🔔 ADMIN NOTIFICATION
    await Notification.create({
  actor: "user",
  type: "TEMPLATE_DELETED",
  message: "Template deleted",
  userId: req.userId,
});


    res.status(200).json({ msg: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
