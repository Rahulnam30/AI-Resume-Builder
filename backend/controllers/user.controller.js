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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats fetch failed" });
  }
};
