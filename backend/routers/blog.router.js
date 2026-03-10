import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// Public endpoints for blog listing and details.
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Protected endpoints for admin/editor actions.
router.post("/", isAuth, createBlog);
router.put("/:id", isAuth, updateBlog);
router.delete("/:id", isAuth, deleteBlog);

export default router;
