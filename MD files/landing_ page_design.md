<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>AI Resume Builder - Variant 3</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#131316", "primary-hover": "#0f6ac6", "background-light": "#f7f7f7", "background-dark": "#18181a", "surface-light": "#f9fafb", "surface-dark": "#1a2632"}, fontFamily: {display: "Inter"}, borderRadius: {DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"}}}};</script>
<style>
        /* Custom scrollbar for cleaner look */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-x-hidden">
<!-- Sticky Navbar -->
<header class="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex items-center justify-between h-16">
<!-- Logo -->
<div class="flex items-center gap-2">
<div class="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
<span class="material-symbols-outlined text-xl">description</span>
</div>
<span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Resume<span class="text-primary">AI</span></span>
</div>
<!-- Desktop Nav -->
<nav class="hidden md:flex gap-8">
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Features</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Templates</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Pricing</a>
</nav>
<!-- CTAs -->
<div class="flex items-center gap-3">
<button class="hidden sm:flex px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
                        Log In
                    </button>
<button class="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-all shadow-md hover:shadow-lg">
                        Get Started
                    </button>
</div>
</div>
</div>
</header>
<!-- Hero Section -->
<section class="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
<div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
<!-- Text Content -->
<div class="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-10">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-semibold mb-6 border border-blue-100 dark:border-blue-800">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
                        New: AI Cover Letter Generator
                    </div>
<h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
                        Land Your Dream Job with <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">AI-Powered</span> Resumes
                    </h1>
<p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Create a professional, ATS-friendly resume in minutes. Let our advanced AI write, format, and optimize your application for you.
                    </p>
<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
<button class="px-8 py-3.5 text-base font-bold text-white bg-primary rounded-xl hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/25">
                            Build My Resume
                        </button>
<button class="px-8 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            View Samples
                        </button>
</div>
<div class="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
<div class="flex -space-x-2">
<div class="size-8 rounded-full border-2 border-white bg-gray-200" data-alt="User avatar 1" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPgl535LSFHSVgk7jw_vTqOnvfcRCLKb4LmvZKVdiPAo6K_uwMmduveodHyOd2oVtsY9ksrpK2NKgU0KxiTM8e4XoZiFWtGXW5xfUNZTzt3lGxjAjBMEwLeqQVlawJmD_quvRmXwK5ievmLrTvXn8D0-di_vQpyQe0zqS5sNcDb0bXHwdxrzLLjRolZ4qgn6dM9SEH8Gcmc34Ys5k7s5XNg8m9N1t6qd_zNDpIjkmhOTTYRxibZXHrHTPpKJ03Pu5FsLBvkstinko'); background-size: cover;"></div>
<div class="size-8 rounded-full border-2 border-white bg-gray-300" data-alt="User avatar 2" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7jzR8pVJXt4h0616f0uhGuAbhxqVpueaJG3g23MHOUGs5WKGOwUx2XZDLlRj8tLw8F_eN9V4QfTxi9bjHiYmZy8qlPhowiC5pbQjdUDrqnORWwfteN5hilehPT5k-bY6fyTsHXoYeFnnFjXYY__H0qgHaLS2Qux2rJvRZOr9DxLwSuvoJio_blBksdODPK9vnPz1H8_FdfhvdSx2TrHeq7Y2RTxCNEAbRvpafxtvJpSBTgW6ds2JpM2qZaadHIwKPrvVls5Tu4z0'); background-size: cover;"></div>
<div class="size-8 rounded-full border-2 border-white bg-gray-400" data-alt="User avatar 3" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3i6q6Db36OjfDtKAokwfk0ojJGmmTSyZW_u9k5GTXMlVHfGIvwTx2VNqMOF1knTIBJitDSoMraqhL4kJzyfu-joMXyaV9duXYObkd2QwmvLbG3L2S-83l0GHn7AyB--JOenXzugCKdwiGk6F24id96HlM0mCy-6_-qOAy3a4z-HL0NiH_jg6_LaNESo_9jZ-B-GeGJXUehrHyZ_Non6Dss3_JItFd5ROd2GRooJdiep0E08FALrFbayoeoHok8ssA6djQ64eOeLo'); background-size: cover;"></div>
</div>
<p>Join 50,000+ job seekers</p>
</div>
</div>
<!-- Hero Image / Visual -->
<div class="relative lg:h-auto z-0 flex justify-center items-center">
<div class="relative w-full aspect-square max-w-[500px] lg:max-w-none">
<!-- Abstract Background Blobs -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
<!-- Main 3D Illustration Placeholder -->
<div class="w-full h-full rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 p-4 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500" data-alt="3D isometric abstract resume visualization with AI sparks and floating elements">
<div class="w-full h-full bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden flex flex-col relative">
<!-- Fake UI Header -->
<div class="h-12 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 gap-2">
<div class="size-3 rounded-full bg-red-400"></div>
<div class="size-3 rounded-full bg-amber-400"></div>
<div class="size-3 rounded-full bg-green-400"></div>
</div>
<!-- Content -->
<div class="flex-1 p-6 relative">
<div class="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
<div class="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
<div class="h-4 w-5/6 bg-slate-100 dark:bg-slate-800 rounded mb-8"></div>
<div class="grid grid-cols-3 gap-4 mb-8">
<div class="h-24 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800"></div>
<div class="h-24 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800"></div>
<div class="h-24 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800"></div>
</div>
<div class="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
<div class="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
<div class="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
<!-- Floating Element 1 -->
<div class="absolute top-20 -right-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-slate-600 flex gap-3 items-center animate-bounce duration-[3000ms]">
<div class="size-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
<span class="material-symbols-outlined text-sm">check</span>
</div>
<div>
<div class="text-xs text-slate-500">ATS Score</div>
<div class="text-sm font-bold text-slate-900 dark:text-white">98/100</div>
</div>
</div>
<!-- Floating Element 2 -->
<div class="absolute bottom-20 -left-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-slate-600 flex gap-3 items-center animate-pulse">
<div class="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-sm">auto_awesome</span>
</div>
<div>
<div class="text-xs text-slate-500">AI Suggestion</div>
<div class="text-sm font-bold text-slate-900 dark:text-white">Applied</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Social Proof -->
<section class="py-10 bg-slate-50 dark:bg-surface-dark/50 border-y border-slate-100 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<p class="text-center text-sm font-medium text-slate-500 mb-6">TRUSTED BY CANDIDATES HIRED AT</p>
<div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
<!-- Using text for logos to avoid external dependencies, styled to look like logos -->
<span class="text-xl font-bold font-sans tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-1"><span class="material-symbols-outlined">circle</span> Acme Corp</span>
<span class="text-xl font-black font-serif text-slate-800 dark:text-slate-200 flex items-center gap-1"><span class="material-symbols-outlined">hexagon</span> Globex</span>
<span class="text-xl font-extrabold font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1"><span class="material-symbols-outlined">diamond</span> StarkInd</span>
<span class="text-xl font-semibold italic text-slate-800 dark:text-slate-200 flex items-center gap-1"><span class="material-symbols-outlined">add_triangle</span> Umbrella</span>
<span class="text-xl font-bold tracking-widest text-slate-800 dark:text-slate-200 flex items-center gap-1"><span class="material-symbols-outlined">square</span> Cyberdyne</span>
</div>
</div>
</section>
<!-- Why Us Section -->
<section class="py-20 bg-white dark:bg-background-dark">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="text-center max-w-3xl mx-auto mb-16">
<h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Our Builder?</h2>
<p class="text-lg text-slate-600 dark:text-slate-400">We combine cutting-edge AI with professional design standards to give you the competitive edge.</p>
</div>
<div class="grid md:grid-cols-3 gap-8">
<!-- Feature 1 -->
<div class="group p-8 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-300">
<div class="size-14 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl">view_quilt</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Formatting</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Never worry about margins or spacing again. Our builder handles the layout automatically ensuring a perfect fit.</p>
</div>
<!-- Feature 2 -->
<div class="group p-8 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-300">
<div class="size-14 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl">magic_button</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Writer Assistant</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Generate impact-driven bullet points instantly with a single click. Our AI suggests powerful action verbs.</p>
</div>
<!-- Feature 3 -->
<div class="group p-8 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-300">
<div class="size-14 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-3xl">shield</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">ATS Optimized</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Beat the applicant tracking systems. Our templates are specifically designed to be readable by ATS bots.</p>
</div>
</div>
</div>
</section>
<!-- Z-Pattern Feature 1: ATS Checker -->
<section class="py-20 overflow-hidden bg-slate-50 dark:bg-surface-dark/30">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col lg:flex-row items-center gap-16">
<!-- Text -->
<div class="flex-1 order-2 lg:order-1">
<div class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold mb-6">
<span class="material-symbols-outlined text-sm">verified</span>
                        PRO FEATURE
                    </div>
<h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Instant ATS Score Checker</h2>
<p class="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Don't let your resume get lost in the digital pile. Upload your current resume or build a new one and get instant feedback on how well it parses against job descriptions.
                    </p>
<ul class="space-y-4 mb-8">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">check_circle</span>
<span class="text-slate-700 dark:text-slate-300">Real-time keyword analysis</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">check_circle</span>
<span class="text-slate-700 dark:text-slate-300">Formatting compatibility check</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">check_circle</span>
<span class="text-slate-700 dark:text-slate-300">Actionable improvement suggestions</span>
</li>
</ul>
<button class="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        Try Score Checker <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<!-- Image Visual -->
<div class="flex-1 order-1 lg:order-2 w-full">
<div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 aspect-[4/3] group">
<div class="absolute inset-0 bg-slate-100 dark:bg-slate-800" data-alt="ATS Score checker dashboard showing a score of 85 and various formatting metrics"></div>
<!-- UI Mockup built with CSS for sharpness -->
<div class="absolute inset-0 p-8 flex flex-col justify-center items-center">
<div class="size-48 rounded-full border-[12px] border-slate-200 dark:border-slate-700 border-t-primary border-r-primary transform -rotate-45 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-sm z-10">
<span class="text-5xl font-black text-slate-900 dark:text-white">85</span>
<span class="text-sm font-medium text-slate-500 uppercase tracking-wide">Good</span>
</div>
<div class="mt-8 w-full max-w-sm space-y-3">
<div class="flex justify-between text-sm font-medium"><span class="text-slate-600 dark:text-slate-400">Keywords</span> <span class="text-green-600">92%</span></div>
<div class="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="h-full w-[92%] bg-green-500 rounded-full"></div></div>
<div class="flex justify-between text-sm font-medium"><span class="text-slate-600 dark:text-slate-400">Formatting</span> <span class="text-amber-500">74%</span></div>
<div class="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="h-full w-[74%] bg-amber-500 rounded-full"></div></div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Z-Pattern Feature 2: AI Suggestion -->
<section class="py-20 overflow-hidden bg-white dark:bg-background-dark">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col lg:flex-row items-center gap-16">
<!-- Image Visual -->
<div class="flex-1 w-full">
<div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 aspect-[4/3] group bg-gradient-to-br from-primary/5 to-purple-500/5">
<div class="absolute inset-0" data-alt="AI Writing assistant interface suggesting text improvements for a resume"></div>
<!-- UI Mockup -->
<div class="absolute inset-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 flex flex-col">
<div class="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
<div class="space-y-3 mb-6 opacity-40">
<div class="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
<div class="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
</div>
<!-- AI Popup -->
<div class="relative bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
<div class="absolute -top-3 left-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
<span class="material-symbols-outlined text-[10px]">auto_awesome</span> AI SUGGESTION
                                </div>
<p class="text-sm text-slate-700 dark:text-slate-300 italic mb-3">
                                    "Spearheaded a team of 5 designers to increase conversion rates by 15%..."
                                </p>
<div class="flex gap-2">
<button class="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-primary-hover">Accept</button>
<button class="text-slate-500 text-xs font-medium px-3 py-1.5 hover:text-slate-700 dark:hover:text-slate-300">Try Another</button>
</div>
</div>
<div class="space-y-3 mt-6 opacity-40">
<div class="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
<div class="h-2 w-4/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
</div>
</div>
</div>
</div>
<!-- Text -->
<div class="flex-1">
<div class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold mb-6">
<span class="material-symbols-outlined text-sm">psychology</span>
                        SMART ASSISTANT
                    </div>
<h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Write Like a Pro with AI</h2>
<p class="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Stuck on what to say? Our AI writer analyzes your industry and role to suggest impactful bullet points that highlight your achievements, not just your duties.
                    </p>
<div class="grid grid-cols-2 gap-6">
<div>
<div class="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-primary flex items-center justify-center mb-3">
<span class="material-symbols-outlined">edit_note</span>
</div>
<h4 class="font-bold text-slate-900 dark:text-white mb-1">Auto-Generation</h4>
<p class="text-sm text-slate-600 dark:text-slate-400">Create full summaries from scratch.</p>
</div>
<div>
<div class="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center mb-3">
<span class="material-symbols-outlined">spellcheck</span>
</div>
<h4 class="font-bold text-slate-900 dark:text-white mb-1">Grammar Check</h4>
<p class="text-sm text-slate-600 dark:text-slate-400">Zero errors, guaranteed.</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Template Showcase -->
<section class="py-20 bg-slate-50 dark:bg-surface-dark/30">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
<div class="max-w-2xl">
<h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Professional Templates</h2>
<p class="text-lg text-slate-600 dark:text-slate-400">Choose from dozens of recruiter-approved layouts designed for every industry.</p>
</div>
<button class="text-primary font-bold hover:underline underline-offset-4 decoration-2">View all templates</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Template 1 -->
<div class="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
<div class="aspect-[1/1.4] bg-slate-200 dark:bg-slate-700 w-full" data-alt="Minimalist Resume Template with clean typography" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsF6-XloIzgwU9aSwvTKkWscxdwAAQ-IucXAVcHYPnXGQCxVn-z7LeHp5nNEFm-vTBBegtbOPmxFv-1iUc1Gupc_Nb3NqNwnPMp-cgDxLu5Qvt6muzHJxMdqlJcIf7Q0SmezdRXdHKuYnoVEsAhtunm8KVfM_hyvB8coFEvXPDYcNKoVZK-NecMs4Y-JToU6JksRDAq3v239DHk2xCBoSxbB8ATbK5GVN0fLsfVN1vU8iYYV9sn2UzcIiaJACVGlQ1xciu4csCB-I'); background-size: cover; background-position: top;"></div>
<div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
<button class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-6 py-2 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:scale-105">
                            Use Template
                        </button>
</div>
<div class="p-4 border-t border-slate-100 dark:border-slate-700">
<h3 class="font-bold text-slate-900 dark:text-white">Minimalist</h3>
<p class="text-xs text-slate-500">Best for Tech &amp; Design</p>
</div>
</div>
<!-- Template 2 -->
<div class="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
<div class="aspect-[1/1.4] bg-slate-200 dark:bg-slate-700 w-full" data-alt="Corporate Resume Template with blue header" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSfvfA5TBcW955kpZ1WxXMSfUmh8Slr65NNUFBKxWLzOPKohm-z9QHc21Yyjp5r15lMfOEBhChnwKeOtdEX3HLZJFZfFoF_Z3OsFhzwo2jVdl3iBnu-rMCc59IN1gkUIGbCHFSMaLF4N2f8mA_j4Lo-0Z61wHSXX69YZ-v7_80kPvXtl-c_Bp7H7VSTiiOrWawheR5NIgGq4D8m98P7_lLNzXL_bsH-ZAnaK0XYq5pQpLoQVcyAZQ50EqYkjL3T-aALiJfM5EBB7s'); background-size: cover; background-position: top;"></div>
<div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
<button class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-6 py-2 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:scale-105">
                            Use Template
                        </button>
</div>
<div class="p-4 border-t border-slate-100 dark:border-slate-700">
<h3 class="font-bold text-slate-900 dark:text-white">Executive</h3>
<p class="text-xs text-slate-500">Best for Management</p>
</div>
</div>
<!-- Template 3 -->
<div class="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
<div class="aspect-[1/1.4] bg-slate-200 dark:bg-slate-700 w-full" data-alt="Creative Resume Template with sidebar" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrTI9e-yLjOfeU3gzZlBvyufHRHgDAq1UQCfa9ymv3UBaHSpm0oS6xvor6RFnMIH2THEOug3coXn3UYiXjcutwRyjoi1-ocE0er95KuEipAMDQ3c-cd235O0F3kvUkGKIEAAmNmn9VWBImY7_wA5ok2vcRdQ5yGYcyjISQ-vkbgzzacfeDJbuy3bnEJTqYzJVY_95E7AfRZ3jQRkcrJFdmJjyhvyoe6fN65nfQuAJsZew-IhNpN5c9RIdufqUQCYFEJUuKaWthrvY'); background-size: cover; background-position: top;"></div>
<div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
<button class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-6 py-2 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:scale-105">
                            Use Template
                        </button>
</div>
<div class="p-4 border-t border-slate-100 dark:border-slate-700">
<h3 class="font-bold text-slate-900 dark:text-white">Modern</h3>
<p class="text-xs text-slate-500">Best for Marketing</p>
</div>
</div>
<!-- Template 4 -->
<div class="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
<div class="aspect-[1/1.4] bg-slate-200 dark:bg-slate-700 w-full" data-alt="Simple Resume Template black and white" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLDP1M8wA8DekT_evLHr93PG6gFGaWW4PqYhBXEDk1I69iYn0xrXLIHZL2O9QNfKSfE0BvjXPgKjMFtmlJCcFfmQU1Ihqo5ZqejB6x8AGAldmwlXsdf1On-v1KG547RdJ_phJ0bUBKxQBbY9Y1oFvkDQh4GWmy2LUBvouaIItFm0Wm5MP42me4wa1oRW6U_sRN6gH6zeGt_B8-suscB7BRxqxy21aZ0p9inwyGF9rGW-NcyihuDm9Oa3VXIXf-K4GzK-C9e7vvGe8'); background-size: cover; background-position: top;"></div>
<div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
<button class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-6 py-2 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:scale-105">
                            Use Template
                        </button>
</div>
<div class="p-4 border-t border-slate-100 dark:border-slate-700">
<h3 class="font-bold text-slate-900 dark:text-white">Academic</h3>
<p class="text-xs text-slate-500">Best for Education</p>
</div>
</div>
</div>
</div>
</section>
<!-- Pricing Section -->
<section class="py-24 bg-white dark:bg-background-dark">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="text-center max-w-3xl mx-auto mb-16">
<h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
<p class="text-lg text-slate-600 dark:text-slate-400">Start for free, upgrade to unlock the full potential of AI.</p>
</div>
<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
<!-- Free Tier -->
<div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-shadow">
<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Free</h3>
<p class="text-slate-500 mb-6 text-sm">For trying out the builder.</p>
<div class="text-4xl font-bold text-slate-900 dark:text-white mb-6">$0</div>
<button class="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-8">
                        Get Started
                    </button>
<ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-lg">check</span> 1 Resume Template</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-lg">check</span> Basic Export (TXT)</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-slate-300 text-lg">close</span> No AI Writer</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-slate-300 text-lg">close</span> No ATS Checker</li>
</ul>
</div>
<!-- Pro Tier -->
<div class="relative rounded-2xl border-2 border-primary bg-white dark:bg-slate-900 p-8 shadow-2xl transform md:-translate-y-4">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                        MOST POPULAR
                    </div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
<p class="text-slate-500 mb-6 text-sm">Everything you need to get hired.</p>
<div class="flex items-baseline mb-6">
<span class="text-4xl font-bold text-slate-900 dark:text-white">$12</span>
<span class="text-slate-500 ml-2">/month</span>
</div>
<button class="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors mb-8 shadow-lg shadow-primary/20">
                        Upgrade to Pro
                    </button>
<ul class="space-y-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check</span> Unlimited Resumes</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check</span> All Premium Templates</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check</span> AI Writing Assistant</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check</span> ATS Score Checker</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">check</span> PDF &amp; Word Export</li>
</ul>
</div>
<!-- Enterprise Tier -->
<div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-shadow">
<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Lifetime</h3>
<p class="text-slate-500 mb-6 text-sm">One-time payment, forever access.</p>
<div class="text-4xl font-bold text-slate-900 dark:text-white mb-6">$99</div>
<button class="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-8">
                        Buy Lifetime
                    </button>
<ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-lg">check</span> Everything in Pro</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-lg">check</span> No Monthly Fees</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-lg">check</span> Priority Support</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-lg">check</span> Cover Letter Builder</li>
</ul>
</div>
</div>
</div>
</section>
<!-- Footer -->
<footer class="bg-surface-light dark:bg-surface-dark/50 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
<div class="col-span-2 lg:col-span-2">
<div class="flex items-center gap-2 mb-4">
<div class="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
<span class="material-symbols-outlined text-xl">description</span>
</div>
<span class="text-xl font-bold text-slate-900 dark:text-white">Resume<span class="text-primary">AI</span></span>
</div>
<p class="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                        The #1 AI-powered resume builder designed to help you land more interviews and get hired faster.
                    </p>
<div class="flex gap-4">
<a class="text-slate-400 hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">public</span></a>
<a class="text-slate-400 hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">alternate_email</span></a>
<a class="text-slate-400 hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">rss_feed</span></a>
</div>
</div>
<div>
<h4 class="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
<ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
<li><a class="hover:text-primary" href="#">Features</a></li>
<li><a class="hover:text-primary" href="#">Pricing</a></li>
<li><a class="hover:text-primary" href="#">Templates</a></li>
<li><a class="hover:text-primary" href="#">Examples</a></li>
</ul>
</div>
<div>
<h4 class="font-bold text-slate-900 dark:text-white mb-4">Resources</h4>
<ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
<li><a class="hover:text-primary" href="#">Blog</a></li>
<li><a class="hover:text-primary" href="#">Career Advice</a></li>
<li><a class="hover:text-primary" href="#">Resume Guide</a></li>
<li><a class="hover:text-primary" href="#">Help Center</a></li>
</ul>
</div>
<div>
<h4 class="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
<ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
<li><a class="hover:text-primary" href="#">About Us</a></li>
<li><a class="hover:text-primary" href="#">Contact</a></li>
<li><a class="hover:text-primary" href="#">Privacy Policy</a></li>
<li><a class="hover:text-primary" href="#">Terms of Service</a></li>
</ul>
</div>
</div>
<div class="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-sm text-slate-500">© 2026 AI Resume Builder. All rights reserved.</p>
<div class="flex gap-6 text-sm text-slate-500">
<a class="hover:text-slate-900 dark:hover:text-white" href="#">Privacy</a>
<a class="hover:text-slate-900 dark:hover:text-white" href="#">Terms</a>
<a class="hover:text-slate-900 dark:hover:text-white" href="#">Cookies</a>
</div>
</div>
</div>
</footer>
</body></html>