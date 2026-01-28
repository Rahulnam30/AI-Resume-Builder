
const STORAGE_KEY = 'template_visibility_settings';

export const getTemplateStatus = (id) => {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    // Default to true if not set
    return settings[id] !== false;
};

export const toggleTemplateStatus = (id) => {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const currentStatus = settings[id] !== false;
    settings[id] = !currentStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return !currentStatus; // Return new status
};

export const getAllTemplateStatuses = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
};
