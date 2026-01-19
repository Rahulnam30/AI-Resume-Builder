import AtsScans from "../Models/atsScan.js";
import ResumeProfile from "../Models/resumeProfile.js";
import User from "../Models/User.js";
import Payment from "../Models/payment.js";
import Resume from "../Models/resume.js";
import Subscription from "../Models/subscription.js";

// Helper: last month date
const getLastMonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

// -------------------- USER DASHBOARD --------------------
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("username email");

    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const totalResumes = await ResumeProfile.countDocuments({ userId });
    const resumesThisWeek = await ResumeProfile.countDocuments({
      userId,
      createdAt: { $gte: oneWeekAgo },
    });

    const atsScans = await AtsScans.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2);

    const latestAts = atsScans[0]?.overallScore || 0;
    const previousAts = atsScans[1]?.overallScore || latestAts;
    const atsDelta = latestAts - previousAts;

    const recentResumes = await ResumeProfile.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      user: {
        name: user?.username || "User",
        email: user?.email,
      },
      stats: {
        resumesCreated: totalResumes,
        resumesThisWeek,
        avgAtsScore: latestAts,
        atsDelta,
        profileViews: 0,
      },
      recentResumes: recentResumes.map((r) => ({
        id: r._id,
        name: r.title,
        date: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

// -------------------- ADMIN: GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// -------------------- ADMIN: UPDATE USER --------------------
export const updateUser = async (req, res) => {
  try {
    const { username, email, isAdmin, isActive } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (typeof isAdmin === "boolean") user.isAdmin = isAdmin;
    if (typeof isActive === "boolean") user.isActive = isActive;
    if (req.body.createdAt) user.createdAt = req.body.createdAt;
    if (req.body.plan) user.plan = req.body.plan;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// -------------------- ADMIN: DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// -------------------- ADMIN: ANALYTICS --------------------
export const getAnalyticsStats = async (req, res) => {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const newUsersLast30Days = await User.countDocuments({ createdAt: { $gte: last30Days } });
    const paidSubscriptions = await Subscription.countDocuments({
      plan: { $in: ["basic", "premium"] },
      status: "active",
    });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const activeUsersLast7Days = await User.countDocuments({ updatedAt: { $gte: last7Days } });

    const totalTemplatesUsed = await Resume.distinct("templateId").then((t) => t.length);
    const totalResumesCreated = await Resume.countDocuments();

    res.status(200).json({
      userGrowth: { count: newUsersLast30Days, note: "New users in last 30 days" },
      conversions: { count: paidSubscriptions, note: "Total active paid subs" },
      activeUsers: { count: activeUsersLast7Days, note: "Active users in last 7 days" },
      templatesUsed: { count: totalTemplatesUsed, note: `${totalResumesCreated} total resumes` },
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics stats fetch failed" });
  }
};

// -------------------- ADMIN: DASHBOARD STATS --------------------
export const getAdminDashboardStats = async (req, res) => {
  try {
    const lastMonth = getLastMonthDate();
    const totalUsers = await User.countDocuments();
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      users: { total: totalUsers },
      revenue: { total: totalRevenueAgg[0]?.total || 0 },
      resumeChart: [
        { month: "jan", resumes: 50 },
        { month: "feb", resumes: 120 },
        { month: "march", resumes: 2 },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats fetch failed" });
  }
};