import fs from "fs";
import path from "path";

/**
 * Save file metadata to database
 */
export const saveFileMetadata = (fileData) => {
  return {
    filename: fileData.filename,
    originalName: fileData.originalname,
    path: fileData.path,
    size: fileData.size,
    mimetype: fileData.mimetype,
    uploadedAt: new Date(),
  };
};

/**
 * Delete file from filesystem
 */
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    }
    return { success: false, error: "File not found" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get file from filesystem
 */
export const getFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      return {
        success: true,
        buffer: fs.readFileSync(filePath),
      };
    }
    return { success: false, error: "File not found" };
  } catch (error) {
    console.error("Error reading file:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get file URL for download
 */
export const getFileURL = (filename) => {
  return `/api/resumes/download/${filename}`;
};

/**
 * Validate file exists
 */
export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 * Create directory if it doesn't exist
 */
export const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Get file extension
 */
export const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

/**
 * Generate unique filename
 */
export const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const ext = path.extname(originalName);
  return `resume-${timestamp}-${random}${ext}`;
};