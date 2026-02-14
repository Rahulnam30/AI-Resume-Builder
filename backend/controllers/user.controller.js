import AtsScans from "../Models/atsScan.js";

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

    const totalResumes = await Resume.countDocuments({ user: userId });
    const resumesThisWeek = await Resume.countDocuments({
      user: userId,
      createdAt: { $gte: oneWeekAgo },
    });

    const atsScans = await AtsScans.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2);

    const latestAts = atsScans[0]?.overallScore || 0;
    const previousAts = atsScans[1]?.overallScore || latestAts;
    const atsDelta = latestAts - previousAts;

    const recentResumes = await Resume.find({ user: userId })
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
    if (typeof isActive === "boolean") {
      console.log(`Updating user ${user.email} isActive from ${user.isActive} to ${isActive}`);
      user.isActive = isActive;
    }
    if (req.body.createdAt) user.createdAt = req.body.createdAt;
    if (req.body.plan) user.plan = req.body.plan;

    await user.save();
    console.log(`User ${user.email} updated - isActive is now: ${user.isActive}`);
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

    // ---------- CHURN RATE (Last Quarter) ----------
    const lastQuarter = new Date();
    lastQuarter.setMonth(lastQuarter.getMonth() - 3);
    const churnedUsers = await Subscription.countDocuments({
      status: { $in: ["cancelled", "expired"] },
      updatedAt: { $gte: lastQuarter },
    });

    const activeSubscriptions = await Subscription.countDocuments({ status: "active" });

    // ---------- MOST USED TEMPLATES (Top 5) ----------
    const mostUsedTemplatesAgg = await Resume.aggregate([
      {
        $group: {
          _id: "$templateId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const totalTemplateUsage = mostUsedTemplatesAgg.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const mostUsedTemplates = mostUsedTemplatesAgg.map((item) => ({
      templateId: item._id,
      count: item.count,
      percentage: totalTemplateUsage > 0
        ? Math.round((item.count / totalTemplateUsage) * 100)
        : 0,
    }));

    // ---------- REVENUE TREND (LAST 6 MONTHS) ----------
    const revenueByMonth = await Payment.aggregate([
      {
        $match: { status: "success" },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ]);

    const revenueTrend = revenueByMonth.length > 0
      ? revenueByMonth.map((item) => ({
        month: new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" }),
        revenue: item.revenue,
      }))
      : [
        { month: "Aug", revenue: 1200 },
        { month: "Sep", revenue: 1850 },
        { month: "Oct", revenue: 2300 },
        { month: "Nov", revenue: 2800 },
        { month: "Dec", revenue: 3500 },
        { month: "Jan", revenue: 4200 },
      ];

    // ---------- SUBSCRIPTION TREND (LAST 6 MONTHS) ----------
    const subscriptionsByMonth = await Subscription.aggregate([
      {
        $match: { status: "active" },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ]);

    const subscriptionTrend = subscriptionsByMonth.length > 0
      ? subscriptionsByMonth.map((item) => ({
        month: new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" }),
        subscriptions: item.count,
      }))
      : [
        { month: "Aug", subscriptions: 15 },
        { month: "Sep", subscriptions: 28 },
        { month: "Oct", subscriptions: 42 },
        { month: "Nov", subscriptions: 58 },
        { month: "Dec", subscriptions: 75 },
        { month: "Jan", subscriptions: 92 },
      ];

    // ---------- FINAL RESPONSE ----------
    res.status(200).json({
      userGrowth: {
        count: newUsersLast30Days,
        note: "New users in last 30 days",
      },
      conversions: {
        count: paidSubscriptions,
        note: `${activeSubscriptions} total active subscriptions`,
      },
      activeUsers: {
        count: activeUsersLast7Days,
        note: "Active users in last 7 days",
      },
      churnRate: {
        count: churnedUsers,
        note: "Churned users this quarter",
      },
      mostUsedTemplates: mostUsedTemplates,
      revenueTrend: revenueTrend,
      subscriptionTrend: subscriptionTrend,
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