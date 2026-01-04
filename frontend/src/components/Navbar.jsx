import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800' : 'bg-transparent border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white transition-transform group-hover:scale-105">
                            <span className="material-symbols-outlined text-xl">description</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Resume<span className="text-primary-hover">AI</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8">
                        <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="/#features">Features</a>
                        <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="/#templates">Templates</a>
                        <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="/#pricing">Pricing</a>
                        <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">About Us</Link>
                        <Link to="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Contact</Link>
                    </nav>

                    {/* CTAs */}
                    <div className="hidden sm:flex items-center gap-3">
                        <Link to="/login">
                            <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                                Log In
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-all shadow-md hover:shadow-lg">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 dark:text-white p-2">
                            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                        <a onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md" href="/#features">Features</a>
                        <a onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md" href="/#templates">Templates</a>
                        <a onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md" href="/#pricing">Pricing</a>
                        <div className="pt-4 flex flex-col gap-3">
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <button className="w-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 rounded-lg hover:bg-slate-50">Log In</button>
                            </Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)}>
                                <button className="w-full px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover">Get Started</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
