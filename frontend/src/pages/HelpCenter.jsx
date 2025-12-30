import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpToSkillsImg from '../assets/UptoSkills.webp';

function HelpCenter() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('guides');
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedArticle, setExpandedArticle] = useState(null);

    const guides = [
        {
            id: 1,
            icon: 'fa-play-circle',
            title: 'Create Your First Resume',
            description: 'Step-by-step guide to building your professional resume from scratch using our AI-powered builder',
            content: 'Learn how to start from scratch, fill in your information, choose templates, and customize your resume with our intuitive interface.'
        },
        {
            id: 2,
            icon: 'fa-wand-magic-sparkles',
            title: 'Using AI Suggestions',
            description: 'Learn how to leverage our AI to enhance content, improve descriptions, and optimize keywords',
            content: 'Discover how our AI analyzes your resume and provides intelligent suggestions to improve content quality and impact.'
        },
        {
            id: 3,
            icon: 'fa-file-pdf',
            title: 'Download & Export Options',
            description: 'Export your resume in PDF, Word, or other formats and customize the layout to your preference',
            content: 'Master different export formats, maintain formatting across platforms, and customize file settings for job applications.'
        },
        {
            id: 4,
            icon: 'fa-sliders',
            title: 'Editing & Customization',
            description: 'Master all editing features including templates, colors, fonts, and section management',
            content: 'Learn advanced editing techniques including font changes, color schemes, section reordering, and layout customization.'
        }
    ];

    const atsGuides = [
        {
            id: 5,
            icon: 'fa-robot',
            title: 'Understanding ATS Systems',
            description: 'Learn how Applicant Tracking Systems work and why ATS optimization is crucial for your job search',
            content: 'ATS systems scan resumes for keywords and formatting. Learn how to structure your resume to pass ATS filters while remaining readable for humans.'
        },
        {
            id: 6,
            icon: 'fa-magnifying-glass',
            title: 'Keyword Optimization Tips',
            description: 'Discover how to strategically place keywords to improve your ATS score and increase visibility',
            content: 'Research job descriptions, identify relevant keywords, and strategically place them in your resume for better ATS compatibility.'
        },
        {
            id: 7,
            icon: 'fa-chart-line',
            title: 'Improving Your ATS Score',
            description: 'Get actionable tips to fix formatting issues and increase your resume\'s ATS compatibility score',
            content: 'Use our ATS scoring tool to identify weaknesses, fix formatting issues, and improve your overall ATS compatibility score.'
        },
        {
            id: 8,
            icon: 'fa-star',
            title: 'Best Practices & Structure',
            description: 'Follow industry-leading formatting guidelines to ensure your resume passes ATS filters seamlessly',
            content: 'Learn proper resume structure, font choices, spacing, and formatting conventions that work well with ATS systems.'
        }
    ];

    const troubleshooting = [
        {
            id: 9,
            icon: 'fa-download',
            title: 'Download Issues',
            description: 'Resume not downloading? Clear your cache, try different browsers, or use our support team for help',
            content: 'Try clearing browser cache, disabling extensions, using incognito mode, or switching browsers. Contact support if issues persist.'
        },
        {
            id: 10,
            icon: 'fa-lock',
            title: 'Login & Account Problems',
            description: 'Trouble accessing your account? Reset your password, clear cookies, or contact support immediately',
            content: 'Use password reset, clear browser cookies, check email verification, or enable two-factor authentication troubleshooting.'
        },
        {
            id: 11,
            icon: 'fa-credit-card',
            title: 'Payment & Billing Issues',
            description: 'Payment declined? Check your billing details, verify security info, or reach out to our payment support',
            content: 'Verify card details, check expiration date, ensure 3D secure authentication, or try a different payment method.'
        },
        {
            id: 12,
            icon: 'fa-sync',
            title: 'Syncing & Data Issues',
            description: 'Changes not saving? Refresh your browser, check your connection, or restore from backup versions',
            content: 'Check internet connection, refresh browser, clear cache, and restore from previous versions if needed.'
        }
    ];

    const careerTips = [
        {
            id: 13,
            icon: 'fa-graduation-cap',
            title: 'Fresher Resume Guide',
            description: 'Build an impactful resume as a fresher with emphasis on education, projects, and skills',
            content: 'Highlight academic achievements, internships, projects, certifications, and technical skills. Use our fresher templates.'
        },
        {
            id: 14,
            icon: 'fa-briefcase',
            title: 'Experienced Professional Resume',
            description: 'Highlight your career achievements, leadership, and measurable impact for experienced roles',
            content: 'Emphasize career progression, measurable achievements, leadership experience, and industry impact. Use executive summary.'
        },
        {
            id: 15,
            icon: 'fa-code',
            title: 'Tech & Developer Resume',
            description: 'Showcase technical skills, projects, certifications, and GitHub profiles effectively',
            content: 'Include programming languages, frameworks, tools, GitHub links, portfolio projects, and technical certifications.'
        },
        {
            id: 16,
            icon: 'fa-linkedin',
            title: 'LinkedIn & Cover Letter Tips',
            description: 'Optimize your LinkedIn profile and write compelling cover letters that complement your resume',
            content: 'Align LinkedIn with resume, write tailored cover letters, use keywords, and maintain professional online presence.'
        }
    ];

    const faqs = [
        {
            id: 1,
            question: 'How do I create a resume if I have no experience?',
            answer: 'Start with your education, internships, volunteer work, projects, and academic achievements. Our AI can help enhance these sections with impactful language. Use our fresher resume templates designed specifically for students and early-career professionals.',
            category: 'Getting Started'
        },
        {
            id: 2,
            question: 'Can I edit AI-generated content?',
            answer: 'Absolutely! All AI-generated suggestions are fully editable. You have complete control over the final content. The AI provides suggestions as a starting point that you can customize to match your personal voice and experience.'
        },
        {
            id: 3,
            question: 'How does the ATS scoring system work?',
            answer: 'Our ATS analyzes your resume against industry standards and job descriptions. It evaluates formatting, keyword optimization, structure, and content relevance to give you a score and actionable recommendations for improvement.'
        },
        {
            id: 4,
            question: 'Is my data safe and private?',
            answer: 'Yes, we use industry-leading encryption protocols. Your resume and personal data are never shared with third parties. We comply with all privacy regulations including GDPR. You own all your data and can delete it anytime.'
        },
        {
            id: 5,
            question: 'What file formats can I download my resume in?',
            answer: 'You can download your resume in PDF, Word (.docx), and plain text formats. PDF is best for maintaining formatting, while Word allows further editing. Choose based on your specific needs.'
        },
        {
            id: 6,
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, cancel anytime from your account settings with no penalties. No charges apply if you cancel before your next billing date. You\'ll retain access to all your resumes and can export them before canceling.'
        },
        {
            id: 7,
            question: 'How long does it take to build a complete resume?',
            answer: 'Most users complete a quality resume in 15-30 minutes using our builder. With AI suggestions enabled, you can create a professional, optimized resume even faster. Editing and refining typically takes another 10-15 minutes.'
        },
        {
            id: 8,
            question: 'Do you offer refunds?',
            answer: 'Yes, we offer a 30-day money-back guarantee on all premium plans. If unsatisfied, contact our support team for a hassle-free refund. No questions asked.'
        }
    ];

    const getAllArticles = () => {
        switch (activeTab) {
            case 'guides':
                return guides;
            case 'ats':
                return atsGuides;
            case 'troubleshooting':
                return troubleshooting;
            case 'career':
                return careerTips;
            default:
                return guides;
        }
    };

    const getTabIcon = (tab) => {
        const icons = {
            guides: 'fa-book',
            ats: 'fa-robot',
            troubleshooting: 'fa-wrench',
            career: 'fa-briefcase'
        };
        return icons[tab];
    };

    const tabLabels = {
        guides: 'Guides & Tutorials',
        ats: 'ATS & Resume Tips',
        troubleshooting: 'Troubleshooting',
        career: 'Career Resources'
    };

    const filteredArticles = getAllArticles().filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white font-['Outfit']">

            {/* NAVIGATION */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div onClick={() => navigate('/')} className="cursor-pointer transition-transform hover:scale-105">
                            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
                                <img src={UpToSkillsImg} alt="UpToSkills Logo" className="w-[150px]" />
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="group flex items-center gap-2 px-5 py-2.5 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300"
                        >
                            <i className="fas fa-arrow-left text-sm group-hover:-translate-x-1 transition-transform duration-300"></i>
                            <span>Back to Home</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-full blur-3xl opacity-40 animate-float"></div>
                    <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-100 to-pink-50 rounded-full blur-3xl opacity-40 animate-float-delayed"></div>
                    <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-full border border-gray-100 shadow-sm animate-fade-in-up">
                            <div className="relative">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse-slow"></div>
                            </div>
                            <span className="text-sm font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                                Expert Guidance • Step-by-Step Tutorials • 24/7 Support
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <span className="bg-gradient-to-r from-[#0077cc] via-[#0077cc] to-[#1a2e52] bg-clip-text text-transparent">
                                Resume Help Center
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Master the art of resume building with our comprehensive guides, tutorials, and expert advice
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <div className="relative">
                                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Search for help..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#0077cc] transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TAB NAVIGATION */}
            <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 py-4 px-6 lg:px-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-wrap justify-center gap-3">
                        {Object.entries(tabLabels).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`group px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === key
                                    ? 'bg-gradient-to-r from-[#0077cc] to-[#0056b3] text-white shadow-lg scale-105'
                                    : 'bg-gray-50 border-2 border-gray-100 text-gray-700 hover:border-[#0077cc] hover:text-[#0077cc]'
                                    }`}
                            >
                                <i className={`fas ${getTabIcon(key)} text-sm`}></i>
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARTICLES GRID */}
            <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="max-w-[1400px] mx-auto min-h-[700px] transition-all duration-300">


                    {filteredArticles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredArticles.map((article, index) => (
                                <div
                                    key={article.id}
                                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0077cc] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Article Header */}
                                    <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white border-b-2 border-gray-100">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0077cc] to-[#e65100] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mb-4">
                                            <i className={`fas ${article.icon} text-2xl text-white`}></i>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0077cc] transition-colors duration-300 pr-8">
                                            {article.title}
                                        </h3>
                                        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#0077cc] flex items-center justify-center transition-all duration-300">
                                            <i className={`fas fa-chevron-down text-gray-600 group-hover:text-white transition-all duration-300 ${expandedArticle === article.id ? 'rotate-180' : ''
                                                }`}></i>
                                        </div>
                                    </div>

                                    {/* Article Description */}
                                    <div className="p-6">
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {article.description}
                                        </p>

                                        {/* Expanded Content */}
                                        {expandedArticle === article.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                                    {article.content}
                                                </p>
                                                <button className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0077cc] to-[#0056b3] hover:from-[#e65100] hover:to-[#f4511e] text-white text-sm font-bold rounded-lg transition-all duration-300 hover:shadow-lg">
                                                    <span>Learn More</span>
                                                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-600">Try adjusting your search query</p>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 px-6 lg:px-8 bg-white">
                <div className="max-w-[1000px] mx-auto">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl lg:text-5xl font-black mb-4">
                            <span className="bg-gradient-to-r from-[#0077cc] to-[#e65100] bg-clip-text text-transparent">Frequently Asked</span> Questions
                        </h2>
                        <p className="text-lg text-gray-600">
                            Quick answers to common questions about our platform
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="group border-2 border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#0077cc] hover:shadow-lg animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <button
                                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                                    className="w-full px-6 lg:px-8 py-6 flex items-start justify-between gap-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-300"
                                >
                                    <div className="text-left flex-1">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-[#0077cc] text-xs font-bold rounded-full mb-2">
                                            {faq.category || 'FAQ'}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0077cc] transition-colors duration-300">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#0077cc] to-[#e65100] flex items-center justify-center text-white transition-all duration-300 ${expandedFAQ === faq.id ? 'rotate-180' : ''
                                        }`}>
                                        <i className="fas fa-chevron-down text-sm"></i>
                                    </div>
                                </button>

                                {expandedFAQ === faq.id && (
                                    <div className="px-6 lg:px-8 pb-6 bg-gradient-to-r from-gray-50 to-white border-t-2 border-gray-100 animate-fade-in">
                                        <p className="text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-[#0077cc] via-[#0056b3] to-[#1a2e52]">
                <div className="max-w-[1000px] mx-auto text-center">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 animate-fade-in-up">
                        Still Need Help?
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Our expert team is here to help you create the perfect resume and land your dream job
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <button
                            onClick={() => navigate('/Contact')}
                            className="group px-8 py-4 bg-white text-[#0077cc] rounded-xl font-bold hover:bg-[#e65100] hover:text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <i className="fas fa-envelope"></i>
                            <span>Contact Support</span>
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#0077cc] transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <i className="fas fa-file-alt"></i>
                            <span>Create Resume Free</span>
                        </button>
                    </div>
                </div>
            </section>


            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-5deg); }
          66% { transform: translate(20px, -20px) rotate(5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}

export default HelpCenter;