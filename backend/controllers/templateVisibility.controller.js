import TemplateVisibility from "../Models/templateVisibility.js";

// Get all visibility statuses
export const getVisibilityStatuses = async (req, res) => {
    try {
        const statuses = await TemplateVisibility.find({});
        // Convert array to object map for easy frontend lookup: { "jessica-claire": true, ... }
        const statusMap = statuses.reduce((acc, curr) => {
            acc[curr.templateId] = curr.isActive;
            return acc;
        }, {});

        res.status(200).json(statusMap);
    } catch (error) {
        console.error("Error fetching visibility statuses:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// Toggle visibility
export const toggleVisibility = async (req, res) => {
    try {
        const { templateId } = req.body;

        if (!templateId) {
            return res.status(400).json({ msg: "Template ID is required" });
        }

        let visibility = await TemplateVisibility.findOne({ templateId });

        if (!visibility) {
            // If not exists, create it with isActive: false (since default is true, toggling means false)
            // Wait, if it doesn't exist, it is implicitly true. So first toggle makes it false.
            visibility = new TemplateVisibility({
                templateId,
                isActive: false // Toggling from implicit true -> false
            });
        } else {
            visibility.isActive = !visibility.isActive;
        }

        await visibility.save();

        res.status(200).json({
            msg: "Visibility updated",
            templateId,
            isActive: visibility.isActive
        });

    } catch (error) {
        console.error("Error toggling visibility:", error);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};
