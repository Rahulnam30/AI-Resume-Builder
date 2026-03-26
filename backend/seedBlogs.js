import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import Blog from "./Models/Blog.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoURL = process.env.MONGO_URI || process.env.MONGO_DB_URL;

const sampleBlogs = [
  {
    title: "10 Power Words That Make Your Resume Stand Out",
    excerpt:
      "Transform your resume from boring to brilliant with these action-packed words that recruiters actually notice and remember.",
    detail:
      "Using strong action verbs like \"spearheaded,\" \"optimized,\" and \"orchestrated\" can instantly elevate your resume. Recruiters spend an average of 7 seconds scanning a resume - make every word count by replacing generic phrases with impactful, results-driven language.",
    category: "Resume Tips",
    date: "Jan 2, 2026",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
    readTime: "5 min read",
    isPublished: true,
  },
  {
    title: "Mastering the Virtual Interview in 2026",
    excerpt:
      "Remote interviews are here to stay. Learn the technical setup, body language, and communication strategies that impress hiring managers.",
    detail:
      "Ensure your lighting is front-facing, your background is clean, and your camera is at eye level. Practice the STAR method for behavioral questions and always have a few thoughtful questions prepared for the interviewer to leave a lasting impression.",
    category: "Interview Prep",
    date: "Dec 28, 2025",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    readTime: "7 min read",
    isPublished: true,
  },
  {
    title: "How to Negotiate Your Salary Like a Pro",
    excerpt:
      "Master the art of salary negotiation with proven strategies that help you secure the compensation you deserve without damaging relationships.",
    detail:
      "Research market rates on platforms like Glassdoor and Levels.fyi before negotiations. Always negotiate the total package - including bonuses, equity, PTO, and remote flexibility - not just the base salary. Silence after stating your number is a powerful tool.",
    category: "Career Growth",
    date: "Dec 25, 2025",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    readTime: "8 min read",
    isPublished: true,
  },
  {
    title: "How ATS Systems Actually Read Your Resume",
    excerpt:
      "Demystify applicant tracking systems and learn how to optimize your resume to pass automated screening without sacrificing readability.",
    detail:
      "ATS software parses your resume into structured data fields. Use standard section headings like \"Experience\" and \"Education,\" avoid tables and columns, and mirror keywords from the job description to maximize your match score.",
    category: "AI Insights",
    date: "Dec 20, 2025",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    readTime: "6 min read",
    isPublished: true,
  },
  {
    title: "The Hidden Job Market: Finding Unadvertised Roles",
    excerpt:
      "Up to 70% of jobs are never publicly posted. Discover networking strategies and insider tactics to access these hidden opportunities.",
    detail:
      "Build genuine relationships on LinkedIn by engaging with industry leaders' content. Attend virtual meetups and reach out to hiring managers directly with a personalized message that demonstrates your value before a role is even posted.",
    category: "Job Search",
    date: "Dec 15, 2025",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    readTime: "9 min read",
    isPublished: true,
  },
  {
    title: "Career Transitions: Pivoting to a New Industry",
    excerpt:
      "Thinking of switching careers? Learn how to position your transferable skills and craft a compelling narrative for your career change.",
    detail:
      "Focus on transferable skills like leadership, communication, and problem-solving. Tailor your resume to highlight achievements that align with the target industry, and consider certifications or side projects to bridge any knowledge gaps.",
    category: "Career Growth",
    date: "Dec 10, 2025",
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&h=400&fit=crop",
    readTime: "10 min read",
    isPublished: true,
  },
];

const seedBlogs = async () => {
  if (!mongoURL) {
    console.error("MongoDB URL not found. Set MONGO_URI or MONGO_DB_URL in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURL);
    await Blog.deleteMany({});
    await Blog.insertMany(sampleBlogs);
    console.log("Seeded blog collection with original frontend sample blogs.");
  } catch (error) {
    console.error("Blog seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedBlogs();
