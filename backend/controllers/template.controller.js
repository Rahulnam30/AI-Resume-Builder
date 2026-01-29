import Template from "../Models/template.js";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";

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
                "p[style-name='List Paragraph'] => li:fresh"
            ],
            includeDefaultStyleMap: true
        };

        const result = await mammoth.convertToHtml({ path: template.filePath }, options);
        res.status(200).json({ html: result.value });

    } catch (error) {
        console.error("Error parsing DOCX:", error);
        res.status(500).json({ msg: "Parsing failed", error: error.message });
    }
};

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
        // If status is provided, filter by it; otherwise return all
        const query = status ? { status } : {}; 

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
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Get single template by ID
export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await Template.findById(id);

        if (!template) {
            return res.status(404).json({ msg: "Template not found" });
        }

        const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/templates/${path.basename(template.filePath)}`;
        const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/templates/${path.basename(template.previewimage)}`;

        res.status(200).json({
            ...template._doc,
            fileUrl,
            imageUrl
        });
    } catch (error) {
        console.error("Error fetching template:", error);
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

// Update a template (File and/or Thumbnail)
export const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await Template.findById(id);

        if (!template) {
            return res.status(404).json({ msg: "Template not found" });
        }

        // Delete old files if new ones are uploaded
        if (req.files) {
            if (req.files.templateFile && req.files.templateFile[0]) {
                if (fs.existsSync(template.filePath)) {
                    try { fs.unlinkSync(template.filePath); } catch (e) { console.error("Error deleting old file:", e); }
                }
                template.filePath = req.files.templateFile[0].path;
            }

            if (req.files.thumbnail && req.files.thumbnail[0]) {
                if (fs.existsSync(template.previewimage)) {
                    try { fs.unlinkSync(template.previewimage); } catch (e) { console.error("Error deleting old thumbnail:", e); }
                }
                template.previewimage = req.files.thumbnail[0].path;
            }
        }

        // Update other fields if sent
        if (req.body.name) template.name = req.body.name;
        if (req.body.category) template.category = req.body.category;

        // If we switched to HTML, we might want to note that? 
        // For now, thefilePath extension handles it.

        await template.save();

        // Return updated URLs
        const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/templates/${path.basename(template.filePath)}`;
        const imageUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/templates/${path.basename(template.previewimage)}`;

        res.status(200).json({ msg: "Template updated successfully", template: { ...template._doc, fileUrl, imageUrl } });

    } catch (error) {
        console.error("Error updating template:", error);
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
