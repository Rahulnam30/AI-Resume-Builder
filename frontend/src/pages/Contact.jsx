import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpToSkillsImg from '../assets/UptoSkills.webp';
import NavBar from "../components/NavBar";
import Footer from "./Footer";

function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: 'fa-envelope',
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      detail: 'support@uptoskills.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'fa-comments',
      title: 'Live Chat',
      description: 'Chat with our support team',
      detail: 'Available 9 AM - 6 PM EST',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'fa-phone',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      detail: '+1 (555) 123-4567',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: 'fa-question-circle',
      title: 'Help Center',
      description: 'Browse our knowledge base',
      detail: 'Self-service resources',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Outfit']">

      <NavBar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-100 to-pink-50 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-full border border-gray-100 shadow-sm">
              <i className="fas fa-headset text-[#0077cc]"></i>
              <span className="text-sm font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                24/7 Support • Fast Response • Expert Guidance
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1]">
              <span className="bg-gradient-to-r from-[#0077cc] via-[#0077cc] to-[#1a2e52] bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help you succeed with your resume and career goals
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#0077cc] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mb-6`}>
                  <i className={`fas ${method.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0077cc] transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {method.description}
                </p>
                <p className="text-sm font-bold text-[#0077cc]">
                  {method.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#0077cc] to-[#e65100] bg-clip-text text-transparent">Send Us</span> a Message
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-100 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0077cc] transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0077cc] transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0077cc] transition-all duration-300"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0077cc] transition-all duration-300 bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0077cc] transition-all duration-300 resize-none"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                <i className="fas fa-check-circle text-green-500 text-xl"></i>
                <p className="text-green-700 font-semibold">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#0077cc] to-[#0056b3] text-white font-bold rounded-xl hover:from-[#e65100] hover:to-[#f4511e] transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <i className="fas fa-paper-plane"></i>
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>

      {/* FAQ QUICK LINKS */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-[#0077cc] via-[#0056b3] to-[#1a2e52]">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Looking for Quick Answers?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Check out our Help Center for instant solutions to common questions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/help-center')}
              className="group px-8 py-4 bg-white text-[#0077cc] rounded-xl font-bold hover:bg-[#e65100] hover:text-white transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <i className="fas fa-book"></i>
              <span>Visit Help Center</span>
            </button>
            <button
              onClick={() => navigate('/register')}
              className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#0077cc] transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <i className="fas fa-file-alt"></i>
              <span>Start Building Resume</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
