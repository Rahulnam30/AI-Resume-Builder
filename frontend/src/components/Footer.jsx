import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark/50 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-xl">description</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">Resume<span className="text-primary-hover">AI</span></span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                            The #1 AI-powered resume builder designed to help you land more interviews and get hired faster.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">rss_feed</span></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary" href="#">Features</a></li>
                            <li><a className="hover:text-primary" href="#">Pricing</a></li>
                            <li><a className="hover:text-primary" href="#">Templates</a></li>
                            <li><a className="hover:text-primary" href="#">Examples</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary" href="#">Blog</a></li>
                            <li><a className="hover:text-primary" href="#">Career Advice</a></li>
                            <li><a className="hover:text-primary" href="#">Resume Guide</a></li>
                            <li><a class="hover:text-primary" href="#">Help Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary" to="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary" to="/contact">Contact</Link></li>
                            <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-primary" href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">© 2026 AI Resume Builder. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a className="hover:text-slate-900 dark:hover:text-white" href="#">Privacy</a>
                        <a className="hover:text-slate-900 dark:hover:text-white" href="#">Terms</a>
                        <a className="hover:text-slate-900 dark:hover:text-white" href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
