import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  MapPin,
  Search,
  MousePointer2,
  BellRing,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Clock,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import UpToSkillsImg from "../assets/UptoSkills.webp";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const JobTrackerPro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] font-jakarta text-[#1a2e52]">
      <NavBar />
      {/* --- 1. HERO SECTION --- */}
      <section className="relative px-8 pt-24 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full translate-x-20 skew-x-12 bg-gradient-to-l from-blue-50/40 to-transparent"></div>

        <div className="relative z-10 grid items-center gap-16 mx-auto max-w-7xl lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-[#0077cc]"></div>
              <span className="text-sm font-bold tracking-[.3em] text-[#0077cc] uppercase">
                The Future of Search
              </span>
            </div>
            <h1 className="text-6xl font-black leading-[1.1] mb-8 text-[#1a2e52]">
              Track your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077cc] to-[#e65100]">
                Applications
              </span>{" "}
              <br />
              with intelligence.
            </h1>
            <p className="max-w-lg mb-10 text-xl leading-relaxed text-gray-500">
              The UptoSkills Job Tracker is your personal mission control. We've
              redesigned the job hunt to be organized, automated, and visually
              stunning.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-10 py-5 bg-[#1a2e52] text-white rounded-2xl font-bold hover:shadow-2xl hover:bg-[#0077cc] transition-all duration-300 flex items-center gap-2"
              >
                Start Tracking Now <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white p-8 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h4 className="flex items-center gap-2 font-bold">
                  <Sparkles size={18} className="text-[#e65100]" /> Application
                  Pipeline
                </h4>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 border-2 border-white rounded-full bg-slate-200"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    company: "Google",
                    status: "Applied",
                    color: "bg-blue-500",
                    icon: <Search size={14} />,
                  },
                  {
                    company: "Microsoft",
                    status: "Interviewing",
                    color: "bg-orange-500",
                    icon: <BellRing size={14} />,
                  },
                  {
                    company: "Stripe",
                    status: "Offer Received",
                    color: "bg-green-500",
                    icon: <Trophy size={14} />,
                  },
                ].map((job, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${job.color} text-white rounded-lg flex items-center justify-center`}
                      >
                        {job.icon}
                      </div>
                      <span className="text-sm font-bold">{job.company}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      {job.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute w-40 h-40 bg-blue-100 rounded-full opacity-50 -top-10 -right-10 blur-3xl"></div>
            <div className="absolute w-40 h-40 bg-orange-100 rounded-full opacity-50 -bottom-10 -left-10 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* --- 2. THE THREE PILLARS --- */}
      <section className="px-8 py-24 mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              icon: <MousePointer2 size={30} />,
              title: "Drag & Drop Simplicity",
              color: "text-[#0077cc]",
              bg: "hover:bg-[#0077cc]",
              desc: "Move your applications through different stages with a simple drag. Visualizing your progress reduces anxiety.",
            },
            {
              icon: <Layers size={30} />,
              title: "Smart Documentation",
              color: "text-[#e65100]",
              bg: "hover:bg-[#e65100]",
              desc: "Store specific resume versions and job descriptions for every card. Everything is ready for the interview.",
            },
            {
              icon: <BarChart3 size={30} />,
              title: "Success Analytics",
              color: "text-green-600",
              bg: "hover:bg-green-600",
              desc: "Get insights on your conversion ratio. Our AI tells you which resume versions perform best in the real world.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <div
                className={`mb-8 w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center ${item.color} group-hover:text-white ${item.bg} transition-all duration-500`}
              >
                {item.icon}
              </div>
              <h3 className="mb-4 text-2xl italic font-bold">{item.title}</h3>
              <p className="leading-relaxed text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. THE "HOW IT WORKS" TIMELINE --- */}
      <section className="relative px-8 py-24 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-black">
              Your Path to <span className="text-[#0077cc]">Hired</span>
            </h2>
            <p className="text-gray-500">
              Four steps to a perfectly organized career search.
            </p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-4">
            <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
            {[
              {
                step: "01",
                title: "Capture",
                desc: "Save jobs from any site instantly.",
              },
              {
                step: "02",
                title: "Optimize",
                desc: "Tailor your resume using our AI checker.",
              },
              {
                step: "03",
                title: "Track",
                desc: "Manage interview dates and follow-ups.",
              },
              {
                step: "04",
                title: "Compare",
                desc: "Analyze offers side-by-side.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-[#1a2e52] text-white rounded-full flex items-center justify-center font-bold mb-6 ring-8 ring-slate-50">
                  {s.step}
                </div>
                <h4 className="mb-2 text-xl font-bold">{s.title}</h4>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CLARITY & BENEFITS GRID --- */}
      <section className="px-8 py-24 bg-[#1a2e52] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Designed for clarity. Built for results.
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              We've broken down the chaos of the job search into a structured
              path to success.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: <BellRing size={24} />,
                title: "Automated Reminders",
                desc: "Our system pings you when a follow-up is due, ensuring you never miss a recruiter's window.",
              },
              {
                icon: <Zap size={24} />,
                title: "Salary Benchmarking",
                desc: "Compare your offers against industry standards directly within the tracker interface.",
              },
              {
                icon: <Clock size={24} />,
                title: "Interview Notes",
                desc: "Dedicated space to jot down questions and key points before your live sessions.",
              },
              {
                icon: <ShieldCheck size={24} />,
                title: "Secure & Private",
                desc: "Your application data is encrypted and visible only to you. We never share with recruiters.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group"
              >
                <div className="text-[#0077cc] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FAQ / CLARITY SECTION --- */}
      <section className="max-w-4xl px-8 py-24 mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex p-3 bg-blue-50 text-[#0077cc] rounded-2xl mb-4">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-black">Common Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Is the Job Tracker free to use?",
              a: "Yes, our basic tracking features are free for all users to help you get organized.",
            },
            {
              q: "Can I import jobs from LinkedIn?",
              a: "Absolutely! Our browser extension allows one-click imports from major job boards.",
            },
            {
              q: "How does the AI help in tracking?",
              a: "The AI analyzes job descriptions to suggest the best resume version from your library.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-100 rounded-3xl flex justify-between items-center cursor-pointer hover:border-[#0077cc]/30 transition-all"
            >
              <div>
                <h5 className="font-bold text-[#1a2e52] mb-1">{faq.q}</h5>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
              <ChevronDown size={20} className="text-gray-300" />
            </div>
          ))}
        </div>
      </section>

      
<Footer />
    </div>
  );
};

export default JobTrackerPro;
