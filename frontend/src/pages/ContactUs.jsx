import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
    return (
        <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-16 pb-32 lg:pt-24 lg:pb-48 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background-dark">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.15]">
                        How can we help you today?
                    </h1>
                    <div className="relative max-w-xl mx-auto mb-8">
                        <input className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary focus:ring-1 bg-white dark:bg-slate-800 text-lg text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm transition-all" placeholder="Search for answers (e.g., 'How to download PDF')..." type="search" />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-2xl">search</span>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
                        Browse our Help Center or contact us below.
                    </p>
                </div>
            </section>

            {/* Support Options Cards */}
            <section className="relative -mt-24 pb-20 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sales */}
                        <a className="relative flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700 group cursor-pointer" href="#">
                            <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl fill-0">business_center</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Talk to Sales</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[250px]">For enterprise plans and bulk licenses.</p>
                            <div className="absolute -bottom-2 right-4 text-slate-200 dark:text-slate-700 text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </a>
                        {/* Support */}
                        <a className="relative flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700 group cursor-pointer" href="#">
                            <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl fill-0">support_agent</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Customer Support</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[250px]">Issues with your resume or billing?</p>
                            <div className="absolute -bottom-2 right-4 text-slate-200 dark:text-slate-700 text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </a>
                        {/* Live Chat */}
                        <a className="relative flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700 group cursor-pointer" href="#">
                            <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl fill-0">chat</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Live Chat</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-[250px]">Chat with our AI Assistant (Available 24/7).</p>
                            <div className="absolute -bottom-2 right-4 text-slate-200 dark:text-slate-700 text-5xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-background-light dark:bg-background-dark">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                        {/* Contact Info Sidebar */}
                        <div className="lg:w-1/3 p-8 md:p-12 text-white bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 relative flex flex-col justify-between overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                                <p className="text-lg mb-8">We're here to help you succeed. Reach out to us through any of these channels.</p>
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center gap-3 text-lg">
                                        <span className="material-symbols-outlined text-2xl">mail</span>
                                        support@resumeai.com
                                    </li>
                                    <li className="flex items-center gap-3 text-lg">
                                        <span className="material-symbols-outlined text-2xl">call</span>
                                        (123) 456-7890
                                    </li>
                                    <li className="flex items-center gap-3 text-lg">
                                        <span className="material-symbols-outlined text-2xl">pin_drop</span>
                                        123 AI Avenue, Innovation City
                                    </li>
                                </ul>
                                <div className="flex gap-6">
                                    <a aria-label="Facebook" className="text-white hover:text-blue-200 transition-colors" href="#">
                                        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.27 0-3.692 2.146-3.692 3.571v2.429z"></path></svg>
                                    </a>
                                    <a aria-label="Twitter" className="text-white hover:text-blue-200 transition-colors" href="#">
                                        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.379 0-6.123 2.744-6.123 6.129 0 .48.056.947.164 1.392-5.093-.254-9.605-2.69-12.637-6.38-1.57.94-2.47 2.148-2.47 3.444 0 2.129 1.144 4.009 2.884 5.107-.84-.025-1.625-.26-2.314-.64-.045.02-.091.03-.137.03-.699 0-1.372-.213-1.996-.582.571 1.905 2.196 3.298 4.16 3.635-.477.12-1.025.166-1.605.166-.39 0-.77-.04-1.139-.104.597 1.867 2.301 3.221 4.343 3.251-2.001 1.564-4.524 2.449-7.284 2.449-.475 0-.945-.028-1.407-.083 2.589 1.644 5.666 2.601 8.986 2.601 10.771 0 16.674-8.94 16.674-16.689 0-.253-.005-.505-.014-.756.963-.695 1.795-1.562 2.453-2.545z"></path></svg>
                                    </a>
                                    <a aria-label="LinkedIn" className="text-white hover:text-blue-200 transition-colors" href="#">
                                        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 6.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.564-11.01-3.6z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 p-4 opacity-50 z-0">
                                <span className="material-symbols-outlined text-[10rem] rotate-[-20deg] text-blue-300 dark:text-blue-800">send</span>
                            </div>
                        </div>
                        {/* The Form */}
                        <div className="lg:w-2/3 p-8 md:p-12 bg-white dark:bg-slate-800">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <input type="text" id="name" required className="block px-4 py-3 w-full text-slate-900 dark:text-white bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-300 dark:border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent" placeholder=" " />
                                        <label htmlFor="name" className="absolute text-base text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Your Name</label>
                                    </div>
                                    <div className="relative group">
                                        <input type="email" id="email" required className="block px-4 py-3 w-full text-slate-900 dark:text-white bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-300 dark:border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent" placeholder=" " />
                                        <label htmlFor="email" className="absolute text-base text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Your Email</label>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <select id="topic" required className="block px-4 py-3 w-full text-slate-900 dark:text-white bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-300 dark:border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent">
                                        <option value="" disabled selected></option>
                                        <option value="technical">Technical Issue</option>
                                        <option value="billing">Billing</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <label htmlFor="topic" className="absolute text-base text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Topic</label>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                                <div className="relative group">
                                    <textarea id="message" required className="block px-4 py-3 w-full text-slate-900 dark:text-white bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-300 dark:border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent h-32 resize-y" placeholder=" "></textarea>
                                    <label htmlFor="message" className="absolute text-base text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">Your Message</label>
                                </div>
                                <button type="submit" className="w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white dark:bg-background-dark">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 open:bg-primary/5 dark:open:bg-blue-900/20 transition-all duration-300" open>
                            <summary className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white cursor-pointer list-none">
                                Can I cancel my subscription anytime?
                                <span className="material-symbols-outlined text-primary text-3xl group-open:rotate-180 transition-transform duration-300">add_circle</span>
                            </summary>
                            <p className="pt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                                Yes, you can cancel your subscription at any time directly from your account settings. There are no long-term contracts or hidden fees. Your subscription will remain active until the end of your current billing period.
                            </p>
                        </details>
                        <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 open:bg-primary/5 dark:open:bg-blue-900/20 transition-all duration-300">
                            <summary className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white cursor-pointer list-none">
                                How do I fix ATS parsing errors?
                                <span className="material-symbols-outlined text-primary text-3xl group-open:rotate-180 transition-transform duration-300">add_circle</span>
                            </summary>
                            <p className="pt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                                Our ATS Score Checker provides detailed feedback on potential parsing errors and suggests improvements. Ensure you use a clean template, avoid complex graphics, and use standard fonts for best results.
                            </p>
                        </details>
                        <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 open:bg-primary/5 dark:open:bg-blue-900/20 transition-all duration-300">
                            <summary className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white cursor-pointer list-none">
                                Is my data private?
                                <span class="material-symbols-outlined text-primary text-3xl group-open:rotate-180 transition-transform duration-300">add_circle</span>
                            </summary>
                            <p className="pt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                                Absolutely. We take your privacy very seriously. All your data is encrypted and stored securely. We do not share your personal information with third parties. Please refer to our Privacy Policy for more details.
                            </p>
                        </details>
                        <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 open:bg-primary/5 dark:open:bg-blue-900/20 transition-all duration-300">
                            <summary className="flex justify-between items-center font-bold text-lg text-slate-900 dark:text-white cursor-pointer list-none">
                                Do you offer refunds?
                                <span className="material-symbols-outlined text-primary text-3xl group-open:rotate-180 transition-transform duration-300">add_circle</span>
                            </summary>
                            <p className="pt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                                We offer a 7-day money-back guarantee for all new Pro subscriptions if you are not satisfied with our service. Please contact our support team within 7 days of your purchase to request a refund.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactUs;
