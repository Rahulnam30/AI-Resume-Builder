import Blog from "../Models/Blog.js";
import Notification from "../Models/notification.js";

const formatDate = (value) => {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const toBlogResponse = (blogDoc) => ({
  id: blogDoc._id,
  _id: blogDoc._id,
  title: blogDoc.title,
  excerpt: blogDoc.excerpt,
  detail: blogDoc.detail,
  category: blogDoc.category,
  date: blogDoc.date || formatDate(blogDoc.createdAt),
  image: blogDoc.image,
  readTime: blogDoc.readTime,
  isPublished: blogDoc.isPublished,
  createdAt: blogDoc.createdAt,
  updatedAt: blogDoc.updatedAt,
});

const createMutationNotification = async (type, message, userId) => {
  if (!userId) return;

  try {
    await Notification.create({
      actor: "user",
      type,
      message,
      userId,
    });
  } catch (error) {
    // Blog operation should not fail if notification creation fails.
    console.error("Blog notification error:", error.message);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { category, search, includeUnpublished } = req.query;

    const query = includeUnpublished === "true" ? {} : { isPublished: true };

    if (category && category !== "All Articles") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: blogs.map(toBlogResponse),
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, data: toBlogResponse(blog) });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, detail, category, date, image, readTime, isPublished } = req.body;

    if (!title || !excerpt || !detail || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "title, excerpt, detail, category, and image are required",
      });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      detail,
      category,
      date: date || "",
      image,
      readTime: readTime || "",
      isPublished: typeof isPublished === "boolean" ? isPublished : true,
    });

    await createMutationNotification(
      "BLOG_CREATED",
      `Blog created: ${blog.title}`,
      req.userId
    );

    return res.status(201).json({ success: true, data: toBlogResponse(blog) });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, excerpt, detail, category, date, image, readTime, isPublished } = req.body;

    const updatePayload = {};

    if (title !== undefined) updatePayload.title = title;
    if (excerpt !== undefined) updatePayload.excerpt = excerpt;
    if (detail !== undefined) updatePayload.detail = detail;
    if (category !== undefined) updatePayload.category = category;
    if (date !== undefined) updatePayload.date = date;
    if (image !== undefined) updatePayload.image = image;
    if (readTime !== undefined) updatePayload.readTime = readTime;
    if (isPublished !== undefined) updatePayload.isPublished = isPublished;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    await createMutationNotification(
      "BLOG_UPDATED",
      `Blog updated: ${blog.title}`,
      req.userId
    );

    return res.status(200).json({ success: true, data: toBlogResponse(blog) });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    await createMutationNotification(
      "BLOG_DELETED",
      `Blog deleted: ${blog.title}`,
      req.userId
    );

    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
