import React, { useState } from 'react';
import { MapPin, Briefcase, Clock, Users, Heart, Zap, Target, Rocket, Award, TrendingUp } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from "./Footer";

const CareersPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Roles');

  const filters = ['All Roles', 'Engineering', 'Product & Design', 'Marketing', 'Operations'];

  const values = [
    {
      icon: <Rocket className="w-12 h-12" />,
      title: 'Innovation First',
      description: 'We constantly push boundaries and challenge the status quo. Every team member is empowered to bring bold ideas that transform how job seekers succeed.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Collaborative Spirit',
      description: 'We believe the best solutions emerge from diverse perspectives. Our culture celebrates teamwork, open communication, and mutual support.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'User-Centric',
      description: 'Every decision starts with our users. We obsess over creating experiences that genuinely help people achieve their career goals.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Continuous Growth',
      description: 'We invest in our people through learning opportunities, mentorship programs, and career development paths that help you reach your potential.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Move Fast',
      description: "We're a startup at heart. We value speed, agility, and the ability to pivot quickly while maintaining quality and thoughtful execution.",
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Impact Driven',
      description: 'We measure success by the real-world impact we create for job seekers. Making a meaningful difference is what motivates us every day.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const perks = [
    { icon: '🏥', title: 'Comprehensive Health Coverage', description: 'Medical, dental, and vision insurance for you and your family with premium coverage options' },
    { icon: '🏖️', title: 'Unlimited PTO', description: 'Take the time you need to recharge. We trust you to manage your time and prioritize your wellbeing' },
    { icon: '💰', title: 'Competitive Salary', description: 'Top-tier compensation packages with equity options so you share in our success' },
    { icon: '🏠', title: 'Remote Flexibility', description: 'Work from anywhere or join us in our offices. We support whatever works best for you' },
    { icon: '📚', title: 'Learning Budget', description: 'Annual budget for courses, conferences, and professional development opportunities' },
    { icon: '⚖️', title: 'Work-Life Balance', description: 'Flexible hours and no-meeting Fridays to help you maintain a healthy balance' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      description: 'Build scalable AI-powered features that help millions of job seekers. Work with React, Node.js, and cutting-edge ML technologies.'
    },
    {
      id: 2,
      title: 'Product Designer',
      department: 'Product & Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Shape the future of career tools through thoughtful design. Create beautiful, intuitive experiences that delight users.'
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      department: 'Engineering',
      location: 'San Francisco / Remote',
      type: 'Full-time',
      description: 'Develop and optimize AI models that power our resume optimization engine. Work on NLP, recommendation systems, and more.'
    },
    {
      id: 4,
      title: 'Content Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our content strategy and create compelling stories about career development, AI technology, and the future of work.'
    },
    {
      id: 5,
      title: 'Customer Success Lead',
      department: 'Operations',
      location: 'Remote / New York',
      type: 'Full-time',
      description: 'Build and scale our customer success program. Help users achieve their career goals while gathering insights to improve our product.'
    },
    {
      id: 6,
      title: 'Product Manager',
      department: 'Product & Design',
      location: 'San Francisco',
      type: 'Full-time',
      description: 'Drive product strategy and roadmap for our core resume building platform. Work closely with engineering and design to launch features that matter.'
    }
  ];

  const team = [
    { name: 'Alex Chen', role: 'Co-Founder & CEO', emoji: '👨‍💼', color: 'from-indigo-500 to-purple-500' },
    { name: 'Sarah Johnson', role: 'CTO & Co-Founder', emoji: '👩‍💻', color: 'from-purple-500 to-pink-500' },
    { name: 'Michael Park', role: 'Head of Design', emoji: '👨‍🎨', color: 'from-pink-500 to-rose-500' },
    { name: 'Emily Rodriguez', role: 'Lead ML Engineer', emoji: '👩‍🔬', color: 'from-blue-500 to-cyan-500' },
    { name: 'David Kim', role: 'Head of Product', emoji: '👨‍💼', color: 'from-green-500 to-emerald-500' },
    { name: 'Lisa Thompson', role: 'VP of Marketing', emoji: '👩‍💼', color: 'from-yellow-500 to-orange-500' }
  ];

  const filteredJobs = activeFilter === 'All Roles' 
    ? jobs 
    : jobs.filter(job => job.department === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavBar />

      {/* Hero Section */}
      <div className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-2 bg-white rounded-full shadow-lg mb-6">
            <span className="text-indigo-600 font-bold select-none">We're Hiring! 🚀</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-tight select-none">
            Join Our
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Help us revolutionize how people build their careers. We're looking for passionate individuals who want to make a real impact.
          </p>
          
          <button 
            onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3 select-none"
          >
            View Open Positions <Briefcase className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 select-none">
          <h2 className="text-5xl font-black text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and shape how we work together
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className={`inline-block p-4 bg-gradient-to-r ${value.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform select-none`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Perks Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 select-none">
            <h2 className="text-5xl font-black text-white mb-4">Why Work With Us</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We believe in taking care of our team with meaningful benefits and perks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4 select-none">{perk.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{perk.title}</h4>
                <p className="text-white/80 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Openings */}
      <div id="openings" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12 select-none">
          <h2 className="text-5xl font-black text-gray-900 mb-4">Open Positions</h2>
          <p className="text-xl text-gray-600">Find your next opportunity and join our growing team</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 select-none ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-x-2 group"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {job.department}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {job.description}
                  </p>
                </div>
                
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap select-none">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No positions found</h3>
            <p className="text-gray-600">Try selecting a different department filter</p>
          </div>
        )}
      </div>

      

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 select-none">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Don't See the Perfect Role?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and let's talk about how you can contribute.
            </p>
            <button className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3">
              Get In Touch <Heart className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CareersPage;