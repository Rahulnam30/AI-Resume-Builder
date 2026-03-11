import User from "../Models/User.js";
import Payment from "../Models/payment.js";
import Subscription from "../Models/subscription.js";
import Resume from "../Models/resume.js";
import ApiMetric from "../Models/ApiMetric.js";
import Notification from "../Models/notification.js";
/* ================== ADMIN DASHBOARD ================== */

export const getAdminDashboardStats = async (req, res) => {
  try {
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setDate(1);

    // ---------- CORE STATS ----------
    // USERS
    const [
      totalUsers,
      lastMonthUsers,
      totalResumes,
      lastMonthResumes,
      totalActiveSubs,
      lastMonthActiveSubs,
      totalRevenueAgg,
      lastMonthRevenueAgg,
    ] = await Promise.all([

      User.countDocuments(),
      User.countDocuments({ createdAt: { $lt: lastMonthStart } }),

      Resume.countDocuments(),
      Resume.countDocuments({ createdAt: { $lt: lastMonthStart } }),

      Subscription.countDocuments({ status: "active" }),
      Subscription.countDocuments({
        status: "active",
        createdAt: { $lt: lastMonthStart }
      }),

      await Payment.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      await Payment.aggregate([
        {
          $match: {
            status: "success",
            createdAt: { $lt: lastMonthStart },
          },
        },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),

    ]);

    const userChange = lastMonthUsers === 0 ? 0 : ((totalUsers - lastMonthUsers) / lastMonthUsers) * 100;

    // RESUMES
    const resumeChange = lastMonthResumes === 0 ? 0 : ((totalResumes - lastMonthResumes) / lastMonthResumes) * 100;

    // SUBSCRIPTIONS

    const subsChange = lastMonthActiveSubs === 0 ? 0 : ((totalActiveSubs - lastMonthActiveSubs) / lastMonthActiveSubs) * 100;

    // REVENUE
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const lastMonthRevenue = lastMonthRevenueAgg[0]?.total || 0;
    const revenueChange = lastMonthRevenue === 0 ? 0 : ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    // ---------- CHARTS & DISTRIBUTIONS ----------
   
    const lastSixMonths = new Date();
    lastSixMonths.setMonth(lastSixMonths.getMonth() - 6);
    lastSixMonths.setDate(1);
    lastSixMonths.setHours(0, 0, 0);

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const [
      resumeGraph,
      userGrowthAgg,
      revenueByMonth,
      dailyActiveUsersAgg,
      apiStats,
      subscriptionCounts
    ] = await Promise.all([
      // resume counts for chart
      Resume.aggregate([
        { $match: { createdAt: { $gte: lastSixMonths } } },
        {
          $group: {
            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
            total: { $sum: 1 }
          }
        }
      ]),

      // user growth
      User.aggregate([
        { $match: { createdAt: { $gte: lastSixMonths } } },
        {
          $group: {
            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
            total: { $sum: 1 }
          }
        }
      ]),

      // revenue by month
      Payment.aggregate([
        { $match: { status: "success" } },
        {
          $group: {
            _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
            revenue: { $sum: "$amount" }
          }
        }
      ]),

      // daily active users
      User.aggregate([
        { $match: { lastLogin: { $gte: last7Days } } },
        {
          $group: {
            _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$lastLogin" } } },
            users: { $sum: 1 }
          }
        }
      ]),

      // api summary for past month
      ApiMetric.aggregate([
        { $match: { createdAt: { $gte: last30Days } } },
        {
          $group: {
            _id: { $cond: [{ $lt: ["$statusCode", 400] }, "success", "failure"] },
            count: { $sum: 1 }
          }
        }
      ]),

      // subscription distribution
      Promise.all([
        User.countDocuments({ plan: "Free", isActive: true, isAdmin: false }),
        Subscription.aggregate([
          { $match: { status: "active" } },
          { $group: { _id: { $ifNull: ["$plan", "Unknown"] }, count: { $sum: 1 } } }
        ])
      ])
    ]);

    // resume chart maping  
    const resumeChartMap = new Map(resumeGraph.map((item) => [item._id.month, item.total]));
    const resumeChart = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const monthNumber = date.getMonth() + 1;
      return {
        month: date.toLocaleString("default", { month: "short" }),
        resumes: resumeChartMap.get(monthNumber) || 0,
      };
    });
    
    // user growth mapping

    const userGrowthMap = new Map(userGrowthAgg.map((item) => [item._id.month, item.total]));
    const userGrowth = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const monthNumber = date.getMonth() + 1;
      return {
        month: date.toLocaleString("default", { month: "short" }),
        users: userGrowthMap.get(monthNumber) || 0,
      };
    });

   // daily active user mapping
   
    const dailyMap = new Map(dailyActiveUsersAgg.map((item) => [item._id.date, item.users]));
    const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dailyActiveUsers = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dailyActiveUsers.push({ day: daysMap[d.getDay()], users: dailyMap.get(key) || 0 });
    }

    // api response rate
    let successCalls = 0;
    let failureCalls = 0;
    apiStats.forEach((s) => {
      if (s._id === "success") successCalls = s.count;
      else failureCalls = s.count;
    });
    const totalCalls = successCalls + failureCalls;
    const apiSuccessRate = totalCalls > 0 ? ((successCalls / totalCalls) * 100).toFixed(1) : 100;

    // subscription split maping
    const [freeUserCount, paidUserCount] = subscriptionCounts;
    const total = freeUserCount + paidUserCount.reduce((sum, item) => sum + item.count, 0);
    const paidMap = new Map(paidUserCount.map((p) => [p._id, p.count]));
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
    const range = req.query.range || "30d";
    const {start,end} = req.query;
    let threeMonth = false;
    let filter = {};
    if(start && end){
        filter.createdAt = {
            $gte : new Date(start),
            $lte : new Date(end)
        }
        filter.updatedAt = {
            $gte : new Date(start),
            $lte : new Date(end)
        }
    }
    else if(range == "30d"){
       const date = new Date();
       date.setDate(date.getDate() - 30)
       filter.createdAt = {
         $gte : date
       }
       filter.updatedAt = {
        $gte : date
       }
    }else if(range === "7d"){
        const date = new Date();
        date.setDate(date.getDate() - 7)
          filter.createdAt = {
         $gte : date
       }
       filter.updatedAt = {
        $gte : date
       }
    }
    else if(range === "3m"){
        const date = new Date();
        date.setMonth(date.getMonth() - 3)
        date.setDate(1)
        threeMonth = true;
          filter.createdAt = {
         $gte : date
       }
       filter.updatedAt = {
        $gte : date
       }
       ;
    }
   
    const newUsers = await User.countDocuments({createdAt : filter.createdAt});

    const activeUsers = await User.countDocuments({updatedAt : filter.updatedAt});

    // ---------- DELETED USERS ----------
    const deletedUsersCount = await Notification.countDocuments({
      type: "USER_DELETED",
      createdAt : filter.createdAt
    });

    // ---------- SUBSCRIPTION BREAKDOWN ----------
    const subscriptionDistribution = await User.aggregate([
      {
        $group: {
          _id: "$plan",
          count: { $sum: 1 },
        },
      },
    ]);

    const subscriptionBreakdown = subscriptionDistribution.map((item) => ({
      plan: (item._id || "Free").charAt(0).toUpperCase() + (item._id || "Free").slice(1),
      count: item.count,
    }));

    const totalPaidUsers = subscriptionBreakdown.reduce((sum, item) => {
      if (item.plan !== "Free") return sum + item.count;
      return sum;
    }, 0);

    // ---------- API PERFORMANCE ----------
    const apiStats = await ApiMetric.aggregate([
      { $match: {createdAt : filter.createdAt} },
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
    for (let i = threeMonth ? 2 : 5; i >= 0; i--) {
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

    // ---------- MOST USED TEMPLATES (Top 5) ----------
    const mostUsedTemplatesAgg = await Resume.aggregate([
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
      { $limit: 5 },
    ]);

    const totalTemplateUsage = await Resume.countDocuments({ templateId: { $ne: null } });

    const mostUsedTemplates = mostUsedTemplatesAgg.map((item) => {
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
        name = hardcodedNames[item._id] || (typeof item._id === 'string' && item._id.length > 20 ? `ID: ${item._id.substring(0, 8)}...` : item._id);
      }
      return {
        templateId: name || "Standard",
        count: item.count,
        percentage: totalTemplateUsage > 0 ? Math.round((item.count / totalTemplateUsage) * 100) : 0,
      };
    });

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
        count: newUsers,
        note: `New users`,
      },
      conversions: {
        count: totalPaidUsers,
        note: "Total paid subscriptions",
      },
      activeUsers: {
        count: activeUsers,
        note: `Active users`,
      },
      deletedUsers: {
        count: deletedUsersCount,
        note: "Total deleted accounts",
      },
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
    }
   catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Analytics fetch failed", error: error.message });
  }
};


