import AtsScans from "../Models/atsScan.js";
import ResumeProfile from "../Models/resumeProfile.js";
import User from "../Models/User.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("username email");

    // ---- DATE HELPERS ----
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    // ---- RESUMES ----
    const totalResumes = await ResumeProfile.countDocuments({ userId });

    const resumesThisWeek = await ResumeProfile.countDocuments({
      userId,
      createdAt: { $gte: oneWeekAgo },
    });

    // ---- ATS ----
    const atsScans = await AtsScans.find({ userId })
      .sort({ createdAt: -1 })
      .limit(2);

    const latestAts = atsScans[0]?.overallScore || 0;
    const previousAts = atsScans[1]?.overallScore || latestAts;

    const atsDelta = latestAts - previousAts;

    // ---- RECENT RESUMES ----
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
        atsDelta,              // REAL delta
        profileViews: 0,       // real but untracked
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
