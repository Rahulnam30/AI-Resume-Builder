import Template from "../Models/template.js";
import fs from "fs";
import path from "path";

// Upload a new template
export const uploadTemplate = async (req, res) => {
    try {
        const { name, category } = req.body;

        // Check if files are present
        if (!req.files || !req.files.templateFile || !req.files.thumbnail) {
            return res.status(400).json({ msg: "Both template file and thumbnail are required." });
        }

        const templatePath = req.files.templateFile[0].path;
        const thumbnailPath = req.files.thumbnail[0].path;

        // Create new template entry
        const newTemplate = new Template({
            name,
            category,
            filePath: templatePath,
            previewimage: thumbnailPath,
            status: "pending",
        });

        await newTemplate.save();

        res.status(201).json({ msg: "Template uploaded successfully and is pending approval.", template: newTemplate });
    } catch (error) {
        console.error("Error uploading template:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Get templates (with filter for pending/approved)
export const getTemplates = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status ? { status } : {}; // If no status provided, return all? Or maybe default to approved?

        // If user is admin (you'd normally check req.user.role), they might want all.
        // For public API, we usually just want approved.
        // Let's assume this endpoint handles both based on query param.

        const templates = await Template.find(query).sort({ createdAt: -1 });

        // We need to transform the paths to be accessible URLs if we are serving them statically
        const templatesWithUrls = templates.map(t => {
            const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/templates/${path.basename(t.filePath)}`;
            const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/templates/${path.basename(t.previewimage)}`;
            return {
                ...t._doc,
                fileUrl,
                imageUrl
            };
        });

        res.status(200).json(templatesWithUrls);
    } catch (error) {
        console.error("Error fetching templates:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

// Approve a template
export const approveTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await Template.findByIdAndUpdate(id, { status: "approved" }, { new: true });

        if (!template) {
            return res.status(404).json({ msg: "Template not found" });
        }

        res.status(200).json({ msg: "Template approved", template });
    } catch (error) {
        console.error("Error approving template:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

// Delete a template
export const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await Template.findById(id);

        if (!template) {
            return res.status(404).json({ msg: "Template not found" });
        }

        // Delete files from filesystem
        try {
            if (fs.existsSync(template.filePath)) fs.unlinkSync(template.filePath);
            if (fs.existsSync(template.previewimage)) fs.unlinkSync(template.previewimage);
        } catch (err) {
            console.error("Error deleting files:", err);
        }

        await Template.findByIdAndDelete(id);
        res.status(200).json({ msg: "Template deleted successfully" });
    } catch (error) {
        console.error("Error deleting template:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};
