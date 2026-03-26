import mongoose from "mongoose";

const templateVisibilitySchema = new mongoose.Schema(
    {
        templateId: {
            type: String,
            required: true,
            unique: true, // "jessica-claire", "jessica-claire-1", etc.
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const TemplateVisibility = mongoose.model(
    "TemplateVisibility",
    templateVisibilitySchema
);

export default TemplateVisibility;
