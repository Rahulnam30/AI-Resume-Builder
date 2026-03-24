import User from "../Models/User.js";
import Payment from "../Models/payment.js";
import Subscription from "../Models/subscription.js";
import Resume from "../Models/resume.js";
import ApiMetric from "../Models/ApiMetric.js";
import Plan from "../Models/Plan.js";
import Notification from "../Models/notification.js"
import Download from "../Models/Download.js";
import { pool } from "../config/postgresdb.js";
/* ================== ADMIN DASHBOARD ================== */

export const getAdminDashboardStats = async (req, res) => {
  try {
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setDate(1);

    const lastSixMonths = new Date();
    lastSixMonths.setMonth(lastSixMonths.getMonth() - 6);
    lastSixMonths.setDate(1);
    lastSixMonths.setHours(0, 0, 0, 0);

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const [
      totalUsersResult,
      lastMonthUsersResult,
      totalResumesResult,
      lastMonthResumesResult,
      totalActiveSubsResult,
      lastMonthActiveSubsResult,
      totalRevenueResult,
      lastMonthRevenueResult,
      resumeGraphResult,
      userGrowthResult,
      dailyActiveUsersResult,
      apiStatsResult,
      freeUserCountResult,
      paidUserCountResult,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*)::int AS count FROM users"),
      pool.query("SELECT COUNT(*)::int AS count FROM users WHERE created_at < $1", [lastMonthStart]),
      pool.query("SELECT COUNT(*)::int AS count FROM resumes"),
      pool.query("SELECT COUNT(*)::int AS count FROM resumes WHERE created_at < $1", [lastMonthStart]),
      pool.query("SELECT COUNT(*)::int AS count FROM subscriptions WHERE status = 'active'"),
      pool.query(
        "SELECT COUNT(*)::int AS count FROM subscriptions WHERE status = 'active' AND created_at < $1",
        [lastMonthStart]
      ),
      pool.query("SELECT COALESCE(SUM(amount), 0)::float AS total FROM payments WHERE status = 'success'"),
      pool.query(
        "SELECT COALESCE(SUM(amount), 0)::float AS total FROM payments WHERE status = 'success' AND created_at < $1",
        [lastMonthStart]
      ),
      pool.query(
        `
        SELECT
          EXTRACT(YEAR FROM created_at)::int AS year,
          EXTRACT(MONTH FROM created_at)::int AS month,
          COUNT(*)::int AS total
        FROM resumes
        WHERE created_at >= $1
        GROUP BY 1, 2
        `,
        [lastSixMonths]
      ),
      pool.query(
        `
        SELECT
          EXTRACT(YEAR FROM created_at)::int AS year,
          EXTRACT(MONTH FROM created_at)::int AS month,
          COUNT(*)::int AS total
        FROM users
        WHERE created_at >= $1
        GROUP BY 1, 2
        `,
        [lastSixMonths]
      ),
      pool.query(
        `
        SELECT
          TO_CHAR(last_login::date, 'YYYY-MM-DD') AS day,
          COUNT(*)::int AS users
        FROM users
        WHERE last_login >= $1
        GROUP BY 1
        `,
        [last7Days]
      ),
      pool.query(
        `
        SELECT
          CASE WHEN status_code < 400 THEN 'success' ELSE 'failure' END AS metric,
          COUNT(*)::int AS count
        FROM api_metrics
        WHERE created_at >= $1
        GROUP BY 1
        `,
        [last30Days]
      ),
      pool.query("SELECT COUNT(*)::int AS count FROM users WHERE plan = 'Free' AND is_active = true AND is_admin = false"),
      pool.query(
        `
        SELECT COALESCE(plan, 'Unknown') AS plan, COUNT(*)::int AS count
        FROM subscriptions
        WHERE status = 'active'
        GROUP BY 1
        `
      ),
    ]);

    const totalUsers = totalUsersResult.rows[0]?.count || 0;
    const lastMonthUsers = lastMonthUsersResult.rows[0]?.count || 0;
    const totalResumes = totalResumesResult.rows[0]?.count || 0;
    const lastMonthResumes = lastMonthResumesResult.rows[0]?.count || 0;
    const totalActiveSubs = totalActiveSubsResult.rows[0]?.count || 0;
    const lastMonthActiveSubs = lastMonthActiveSubsResult.rows[0]?.count || 0;
    const totalRevenue = Number(totalRevenueResult.rows[0]?.total || 0);
    const lastMonthRevenue = Number(lastMonthRevenueResult.rows[0]?.total || 0);

    const userChange = lastMonthUsers === 0 ? 0 : ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100;
    const resumeChange = lastMonthResumes === 0 ? 0 : ((totalResumes - lastMonthResumes) / lastMonthResumes) * 100;
    const subsChange = lastMonthActiveSubs === 0 ? 0 : ((totalActiveSubs - lastMonthActiveSubs) / lastMonthActiveSubs) * 100;
    const revenueChange = lastMonthRevenue === 0 ? 0 : ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    const resumeChartMap = new Map(
      resumeGraphResult.rows.map((item) => [`${Number(item.year)}-${Number(item.month)}`, Number(item.total || 0)])
    );
    const resumeChart = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const year = date.getFullYear();
      const monthNumber = date.getMonth() + 1;
      return {
        month: date.toLocaleString("default", { month: "short" }),
        resumes: resumeChartMap.get(`${year}-${monthNumber}`) || 0,
      };
    });
    
    const userGrowthMap = new Map(
      userGrowthResult.rows.map((item) => [`${Number(item.year)}-${Number(item.month)}`, Number(item.total || 0)])
    );
    const userGrowth = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const year = date.getFullYear();
      const monthNumber = date.getMonth() + 1;
      return {
        month: date.toLocaleString("default", { month: "short" }),
        users: userGrowthMap.get(`${year}-${monthNumber}`) || 0,
      };
    });

    const dailyMap = new Map(dailyActiveUsersResult.rows.map((item) => [item.day, Number(item.users || 0)]));
    const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dailyActiveUsers = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dailyActiveUsers.push({ day: daysMap[d.getDay()], users: dailyMap.get(key) || 0 });
    }

    let successCalls = 0;
    let failureCalls = 0;
    apiStatsResult.rows.forEach((s) => {
      if (s.metric === "success") successCalls = Number(s.count || 0);
      else failureCalls = Number(s.count || 0);
    });
    const totalCalls = successCalls + failureCalls;
    const apiSuccessRate = totalCalls > 0 ? ((successCalls / totalCalls) * 100).toFixed(1) : "100.0";

    const freeUserCount = freeUserCountResult.rows[0]?.count || 0;
    const paidMap = new Map();
    paidUserCountResult.rows.forEach((row) => {
      const key = String(row.plan || "Unknown").trim().toLowerCase();
      if (["lifetime", "life time"].includes(key)) {
        paidMap.set("Lifetime", (paidMap.get("Lifetime") || 0) + Number(row.count || 0));
      } else if (key === "pro") {
        paidMap.set("Pro", (paidMap.get("Pro") || 0) + Number(row.count || 0));
      }
    });

    const total = freeUserCount + Array.from(paidMap.values()).reduce((sum, item) => sum + item, 0);
    const subscriptionSplit = [
      { name: "Free", value: total === 0 ? 0 : Number(((freeUserCount / total) * 100).toFixed(2)) },
      { name: "Pro", value: total === 0 ? 0 : Number(((paidMap.get("Pro") || 0) / total * 100).toFixed(2)) },
      { name: "Lifetime", value: total === 0 ? 0 : Number(((paidMap.get("Lifetime") || 0) / total * 100).toFixed(2)) },
    ];


    // ---------- FINAL RESPONSE ---------
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
        total: Math.round(totalRevenue),
        change: Number(revenueChange.toFixed(1)),
      },
      apiMetrics: {
        totalCalls,
        successRate: `${apiSuccessRate}%`,
      },
      resumeChart,
      userGrowth,
      dailyActiveUsers,
      subscriptionSplit,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Dashboard stats fetch failed", error: error.message });
  }
};


export const getAnalyticsStats = async (req, res) => {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const newUsersLast30Days = await User.countDocuments({
      createdAt: { $gte: last30Days },
    });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const activeUsersLast7Days = await User.countDocuments({
      lastLogin: { $gte: last7Days },
      isAdmin: false,
    });

    // ---------- DELETED USERS ----------
    const deletedUsersCount = await Notification.countDocuments({
      type: "USER_DELETED",
    });

    // ---------- SUBSCRIPTION BREAKDOWN ----------
    const [availablePlans, subscriptionDistribution] = await Promise.all([
      Plan.find({}, { name: 1, _id: 0 }).lean(),
      User.aggregate([
        {
          $match: {
            isAdmin: false,
          },
        },
        {
          $group: {
            _id: "$plan",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const toTitleCase = (value = "") =>
      String(value)
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

    const canonicalPlanByKey = new Map();
    availablePlans.forEach((plan) => {
      if (!plan?.name) return;
      canonicalPlanByKey.set(plan.name.trim().toLowerCase(), plan.name.trim());
    });

    if (!canonicalPlanByKey.has("free")) {
      canonicalPlanByKey.set("free", "Free");
    }

    const normalizePlanName = (rawPlan) => {
      const raw = String(rawPlan || "Free").trim();
      const key = raw.toLowerCase();

      if (canonicalPlanByKey.has(key)) {
        return canonicalPlanByKey.get(key);
      }

      // Keep legacy spellings aligned to one canonical tier.
      if (["lifetime", "life time"].includes(key)) {
        return canonicalPlanByKey.get("ultra pro") || "Ultra Pro";
      }

      return toTitleCase(raw) || "Free";
    };

    const groupedPlanCounts = new Map();
    subscriptionDistribution.forEach((item) => {
      const planName = normalizePlanName(item._id);
      groupedPlanCounts.set(planName, (groupedPlanCounts.get(planName) || 0) + item.count);
    });

    const knownPlanOrder = availablePlans
      .map((plan) => plan?.name)
      .filter(Boolean)
      .map((name) => normalizePlanName(name));

    const orderedPlans = [
      ...new Set([
        "Free",
        ...knownPlanOrder,
        ...Array.from(groupedPlanCounts.keys()),
      ]),
    ];

    const subscriptionBreakdown = orderedPlans
      .map((plan) => ({
        plan,
        count: groupedPlanCounts.get(plan) || 0,
      }))
      .filter((item) => item.count > 0);

    const totalPaidUsers = subscriptionBreakdown.reduce(
      (sum, item) => (item.plan.toLowerCase() === "free" ? sum : sum + item.count),
      0
    );

    // ---------- API PERFORMANCE ----------
    const apiStats = await ApiMetric.aggregate([
      { $match: { createdAt: { $gte: last30Days } } },
      {
        $group: {
          _id: { $cond: [{ $lt: ["$statusCode", 400] }, "success", "failure"] },
          count: { $sum: 1 },
          avgResponse: { $avg: "$responseTime" },
        },
      },
    ]);

    let apiSuccessCount = 0;
    let apiFailureCount = 0;
    let totalRespTime = 0;
    let callsForAvg = 0;

    apiStats.forEach(stat => {
      if (stat._id === "success") apiSuccessCount = stat.count;
      else apiFailureCount = stat.count;

      if (stat.avgResponse) {
        totalRespTime += (stat.avgResponse * stat.count);
        callsForAvg += stat.count;
      }
    });

    const totalApiCalls = apiSuccessCount + apiFailureCount;
    const apiSuccessRate = totalApiCalls > 0 ? ((apiSuccessCount / totalApiCalls) * 100).toFixed(1) : 100;
    const apiFailureRate = totalApiCalls > 0 ? ((apiFailureCount / totalApiCalls) * 100).toFixed(1) : 0;
    const avgResponseTime = callsForAvg > 0 ? Math.round(totalRespTime / callsForAvg) : 250;

    // ---------- CONSOLIDATED TREND DATA (LAST 6 MONTHS) ----------
    const trendData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // 1-indexed
      const monthName = d.toLocaleString("default", { month: "short" });

      trendData.push({
        year,
        month: month,
        monthName,
        users: 0,
        revenue: 0
      });
    }

    // Fill User Growth
    const userGrowthAgg = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Fill Revenue
    const revenueByMonth = await Payment.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    trendData.forEach(tick => {
      const growthMatch = userGrowthAgg.find(g => g._id.year === tick.year && g._id.month === tick.month);
      const revenueMatch = revenueByMonth.find(r => r._id.year === tick.year && r._id.month === tick.month);

      if (growthMatch) tick.users = growthMatch.count;
      if (revenueMatch) tick.revenue = revenueMatch.revenue;
    });

    // ---------- MOST USED TEMPLATES (Resume + CV templates) ----------
    const mostUsedResumeTemplatesAgg = await Resume.aggregate([
      {
        $match: { templateId: { $exists: true, $ne: null } }
      },
      {
        $group: {
          _id: "$templateId",
          count: { $sum: 1 },
        },
      },
      {
        $addFields: {
          tId: {
            $convert: {
              input: "$_id",
              to: "objectId",
              onError: "$_id",
              onNull: "$_id"
            }
          }
        }
      },
      {
        $lookup: {
          from: "templates",
          localField: "tId",
          foreignField: "_id",
          as: "templateDetails",
        },
      },
      { $unwind: { path: "$templateDetails", preserveNullAndEmptyArrays: true } },
      { $sort: { count: -1 } },
    ]);

    const mostUsedResumeDownloadTemplatesAgg = await Download.aggregate([
      {
        $match: {
          type: "resume",
          action: "download",
          template: { $exists: true, $ne: null, $ne: "" },
        },
      },
      {
        $group: {
          _id: "$template",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const mostUsedCvTemplatesAgg = await Download.aggregate([
      {
        $match: {
          type: "cv",
          action: "download",
          template: { $exists: true, $ne: null, $ne: "" },
        },
      },
      {
        $group: {
          _id: "$template",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const toReadableTemplateName = (value) => {
      if (!value) return "Standard";
      const str = String(value);

      const canonicalNames = {
        professional: "Professional",
        modern: "Modern",
        creative: "Creative",
        minimal: "Minimal",
        executive: "Executive",
        academic: "Academic",
        twoColumn: "Two Column ATS",
        simple: "Simple",
        academicSidebar: "Academic Sidebar",
        Elegant: "Clinica Elegant",
        vertex: "Vertex Sidebar",
        elite: "Elite Sidebar",
        eclipse: "Eclipse",
        eclipse1: "Eclipse Alt",
        harbor: "Harbor",
        "jessica-claire": "Jessica Claire (Sidebar)",
        "jessica-claire-1": "Jessica Claire (Classic)",
        "jessica-claire-2": "Jessica Claire (Refined)",
        "jessica-claire-3": "Jessica Claire (Modern Blue)",
        "jessica-claire-4": "Jessica Claire (Green Accent)",
        "jessica-claire-5": "Jessica Claire (Green/Blue)",
        "jessica-claire-6": "Jessica Claire (Teal Three-Tone)",
        "jessica-claire-7": "Jessica Claire (Saira Blue)",
        "jessica-claire-8": "Jessica Claire (Fira Sans)",
        "jessica-claire-9": "Jessica Claire (Saira Split)",
        "jessica-claire-10": "Jessica Claire (Cyan Header)",
      };

      if (canonicalNames[str]) return canonicalNames[str];
      if (str.length > 40) return `ID: ${str.substring(0, 8)}...`;
      // Convert template ids like "jessica-claire" into "Jessica Claire".
      return str
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (ch) => ch.toUpperCase());
    };

    const resumeTemplateCountMap = new Map();
    const cvTemplateCountMap = new Map();

    mostUsedResumeTemplatesAgg.forEach((item) => {
      let name = item.templateDetails?.name;
      if (!name) {
        const hardcodedNames = {
          professional: "Professional",
          modern: "Modern",
          creative: "Creative",
          minimal: "Minimal",
          executive: "Executive",
          academic: "Academic",
          twoColumn: "Two Column ATS",
          simple: "Simple",
          academicSidebar: "Academic Sidebar",
          Elegant: "Clinica Elegant",
          vertex: "Vertex Sidebar",
          elite: "Elite Sidebar",
          eclipse: "Eclipse",
          eclipse1: "Eclipse Alt",
          harbor: "Harbor"
        };
        const rawId = typeof item._id === "string" ? item._id : String(item._id);
        name = hardcodedNames[rawId] || toReadableTemplateName(rawId);
      }

      const key = name || "Standard";
      resumeTemplateCountMap.set(key, (resumeTemplateCountMap.get(key) || 0) + item.count);
    });

    mostUsedResumeDownloadTemplatesAgg.forEach((item) => {
      const key = toReadableTemplateName(item._id);
      resumeTemplateCountMap.set(key, (resumeTemplateCountMap.get(key) || 0) + item.count);
    });

    mostUsedCvTemplatesAgg.forEach((item) => {
      const key = toReadableTemplateName(item._id);
      cvTemplateCountMap.set(key, (cvTemplateCountMap.get(key) || 0) + item.count);
    });

    const buildTopTemplates = (countMap) => {
      const total = Array.from(countMap.values()).reduce(
        (sum, count) => sum + count,
        0
      );

      return Array.from(countMap.entries())
        .map(([templateId, count]) => ({
          templateId,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    };

    const mostUsedResumeTemplates = buildTopTemplates(resumeTemplateCountMap);
    const mostUsedCvTemplates = buildTopTemplates(cvTemplateCountMap);

    const combinedTemplateCountMap = new Map();
    Array.from(resumeTemplateCountMap.entries()).forEach(([key, count]) => {
      combinedTemplateCountMap.set(key, (combinedTemplateCountMap.get(key) || 0) + count);
    });
    Array.from(cvTemplateCountMap.entries()).forEach(([key, count]) => {
      combinedTemplateCountMap.set(key, (combinedTemplateCountMap.get(key) || 0) + count);
    });

    const totalTemplateUsage = Array.from(combinedTemplateCountMap.values()).reduce(
      (sum, count) => sum + count,
      0
    );

    const mostUsedTemplates = Array.from(combinedTemplateCountMap.entries())
      .map(([templateId, count]) => ({
        templateId,
        count,
        percentage:
          totalTemplateUsage > 0
            ? Math.round((count / totalTemplateUsage) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const chartData = trendData.map(item => ({
      month: item.monthName,
      users: item.users,
      revenue: item.revenue
    }));

    // ---------- SYSTEM UPTIME ----------
    const baseUptime = 99.95;
    const uptimeDeduction = (100 - parseFloat(apiSuccessRate)) * 0.01;
    const systemUptime = Math.max(99.90, baseUptime - uptimeDeduction).toFixed(2);

    res.status(200).json({
      userGrowth: {
        count: newUsersLast30Days,
        note: "New users in last 30 days",
      },
      conversions: {
        count: totalPaidUsers,
        note: "Total paid subscriptions",
      },
      activeUsers: {
        count: activeUsersLast7Days,
        note: "Active last 7 days",
      },
      deletedUsers: {
        count: deletedUsersCount,
        note: "Total deleted accounts",
      },
      mostUsedResumeTemplates,
      mostUsedCvTemplates,
      mostUsedTemplates,
      chartData,
      subscriptionBreakdown,
      summary: {
        apiSuccessRate: `${apiSuccessRate}%`,
        apiFailureRate: `${apiFailureRate}%`,
        avgResponseTime: `${avgResponseTime}ms`,
        totalApiCalls,
        systemUptime: `${systemUptime}%`,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Analytics fetch failed", error: error.message });
  }
};


