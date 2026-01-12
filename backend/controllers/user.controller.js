import Payment from "../Models/payment.js";
import Resume from "../Models/resume.js";
import Subscription from "../Models/subscription.js";
import User from "../Models/User.js";

// Helper: last month date
const getLastMonthDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

// -------------------- GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// -------------------- UPDATE USER --------------------
export const updateUser = async (req, res) => {
  try {
    const { username, email, isAdmin, isActive } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (typeof isAdmin === "boolean") {
      user.isAdmin = isAdmin;
    }
    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }
    if (req.body.createdAt) {
      user.createdAt = req.body.createdAt;
    }
    if (req.body.plan) {
      user.plan = req.body.plan;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// -------------------- DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAdminDashboardStats = async (req, res) => {
  try {
    const lastMonth = getLastMonthDate();

    // ---------- USERS ----------
    const totalUsers = await User.countDocuments();
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $lt: lastMonth },
    });

    const userChange =
      lastMonthUsers === 0
        ? 0
        : ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100;

    // // ---------- RESUMES ----------
    const totalResumes = await Resume.countDocuments();
    const lastMonthResumes = await Resume.countDocuments({
      createdAt: { $lt: lastMonth },
    });

    const resumeChange =
      lastMonthResumes === 0
        ? 0
        : ((totalResumes - lastMonthResumes) / lastMonthResumes) * 100;

    // ---------- ACTIVE SUBSCRIPTIONS ----------
    const totalActiveSubs = await Subscription.countDocuments({
      status: "active",
    });

    const lastMonthActiveSubs = await Subscription.countDocuments({
      status: "active",
      createdAt: { $lt: lastMonth },
    });

    const subsChange =
      lastMonthActiveSubs === 0
        ? 0
        : ((totalActiveSubs - lastMonthActiveSubs) / lastMonthActiveSubs) * 100;

    // ---------- REVENUE ----------
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const lastMonthRevenueAgg = await Payment.aggregate([
      {
        $match: {
          status: "success",
          createdAt: { $lt: lastMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;
    const lastMonthRevenue = lastMonthRevenueAgg[0]?.total || 0;

    const revenueChange =
      lastMonthRevenue === 0
        ? 0
        : ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    // ---------- RESUME GRAPH (LAST 6 MONTHS) ----------
    const resumeGraph = await Resume.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 },
    ]);

    // const resumeChart = resumeGraph.map((item) => ({
    //   month: `${item._id.month}/${item._id.year}`,
    //   resumes: item.total,
    // }));
    const resumeChart = [
      { month: "Aug", resumes: 5 },
      { month: "Sep", resumes: 12 },
      { month: "Oct", resumes: 20 },
      { month: "jan", resumes: 50 },
      { month: "feb", resumes: 120 },
      { month: "march", resumes: 2 },
    ];

    // ---------- RECENT USERS ----------
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("username email createdAt plan");

    // ---------- FINAL RESPONSE ----------
    res.status(200).json({
      users: {
        total: totalUsers,
        change: Number(userChange.toFixed(1)),
      },
      resumes: {
        total: totalResumes,
        change: Number(resumeChange.toFixed(1)),
      },
      subscriptions: {
        total: totalActiveSubs,
        change: Number(subsChange.toFixed(1)),
      },
      revenue: {
        total: totalRevenue,
        change: Number(revenueChange.toFixed(1)),
      },
      resumeChart,
      recentUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats fetch failed" });
  }
};
