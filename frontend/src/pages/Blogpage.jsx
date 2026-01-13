import React, { useState } from 'react';
import { Search, ArrowRight, Calendar, Tag } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Articles',
    'Resume Tips',
    'Interview Prep',
    'Career Growth',
    'AI Insights',
    'Job Search'
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Power Words That Make Your Resume Stand Out',
      excerpt: 'Transform your resume from boring to brilliant with these action-packed words that recruiters actually notice and remember.',
      category: 'Resume Tips',
      date: 'Jan 2, 2026',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Mastering the Virtual Interview in 2026',
      excerpt: 'Remote interviews are here to stay. Learn the technical setup, body language, and communication strategies that impress hiring managers.',
      category: 'Interview Prep',
      date: 'Dec 28, 2025',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'How to Negotiate Your Salary Like a Pro',
      excerpt: 'Master the art of salary negotiation with proven strategies that help you secure the compensation you deserve without damaging relationships.',
      category: 'Career Growth',
      date: 'Dec 25, 2025',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 4,
      title: 'How ATS Systems Actually Read Your Resume',
      excerpt: 'Demystify applicant tracking systems and learn how to optimize your resume to pass automated screening without sacrificing readability.',
      category: 'AI Insights',
      date: 'Dec 20, 2025',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'The Hidden Job Market: Finding Unadvertised Roles',
      excerpt: 'Up to 70% of jobs are never publicly posted. Discover networking strategies and insider tactics to access these hidden opportunities.',
      category: 'Job Search',
      date: 'Dec 15, 2025',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      readTime: '9 min read'
    },
    {
      id: 6,
      title: 'Career Transitions: Pivoting to a New Industry',
      excerpt: 'Thinking of switching careers? Learn how to position your transferable skills and craft a compelling narrative for your career change.',
      category: 'Career Growth',
      date: 'Dec 10, 2025',
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&h=400&fit=crop',
      readTime: '10 min read'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All Articles' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 select-none">
      <NavBar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Career Insights
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              & Expert Tips
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Master the art of job hunting with actionable advice from industry experts and career coaches
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, guides, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white shadow-xl border-2 border-transparent focus:border-indigo-400 focus:outline-none text-lg transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center p-10 md:p-16">
            <div className="text-white">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">
                ⭐ Featured Article
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                The Future of Resume Writing is Here
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Discover how AI is transforming the job application process and helping candidates stand out in competitive markets. Learn the strategies top performers use.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center gap-2">
                Read Full Article <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Featured"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl">
                Must Read! 🔥
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <button className="text-indigo-600 font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest career tips, industry insights, and resume strategies delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-400"
              />
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
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
      `}</style>
    </div>
  );
};

export default BlogPage;