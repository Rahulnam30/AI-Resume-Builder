<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Admin Portal - Template Management</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#131316", secondary: "#1e293b", "background-light": "#f3f4f6", "background-dark": "#18181a", "royal-blue": "#2563EB"}, fontFamily: {display: "Inter"}, borderRadius: {DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"}}}};</script>
<style>
        body {
            font-family: 'Inter', sans-serif;
        }.no-scrollbar::-webkit-scrollbar {
            display: none;
        }.no-scrollbar {
            -ms-overflow-style: none;scrollbar-width: none;}.a4-aspect {
            padding-bottom: 141.42%;}
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 font-display antialiased">
<div class="flex h-screen w-full overflow-hidden">
<aside class="w-64 bg-secondary flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out border-r border-slate-700/50 hidden md:flex">
<div class="h-16 flex items-center px-6 border-b border-slate-700/50">
<div class="flex items-center gap-3">
<div class="size-8 rounded bg-primary flex items-center justify-center text-white">
<span class="material-symbols-outlined text-[20px]">resume</span>
</div>
<span class="text-white text-lg font-bold tracking-tight">ResumeAI</span>
</div>
</div>
<nav class="flex-1 overflow-y-auto no-scrollbar py-6 px-3 flex flex-col gap-1">
<div class="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Overview</div>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">dashboard</span>
<span class="text-sm font-medium">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">group</span>
<span class="text-sm font-medium">User Management</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white group shadow-sm shadow-primary/20" href="#">
<span class="material-symbols-outlined text-[22px]">description</span>
<span class="text-sm font-medium">Templates</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">credit_card</span>
<span class="text-sm font-medium">Subscriptions</span>
</a>
<div class="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">System</div>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">analytics</span>
<span class="text-sm font-medium">Analytics</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">model_training</span>
<span class="text-sm font-medium">AI Models</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">settings</span>
<span class="text-sm font-medium">Settings</span>
</a>
</nav>
<div class="p-4 border-t border-slate-700/50">
<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
<div class="size-9 rounded-full bg-cover bg-center border border-slate-600" data-alt="Admin profile picture of a man" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJXJXHf9WTvw-DN51TxU1rbIFZXjBYM4KRkV1-FkeirQ_kvA3DqfizTv5rEbtvF2Bw-ouWgAsD_-oPQnAeUq7oRH7ScFANAHGA2H_Wm9_xPoFfGF8B5-RoOcpCRdm-dqDdLEYzACOP2NBmYFeUUUxI9W0OtVMFMEM8evhHULbkYnJL-glHPyYbQN71-bmKnU0A-7PeJ07utdSYPSooCM1DWbC57tcJPWSd7-JYY3q-7WI0iFlJSsKYZWYTLGji4jM9wZYf6gZbtKo");'></div>
<div class="flex flex-col overflow-hidden">
<span class="text-sm font-medium text-white truncate">Alex Morgan</span>
<span class="text-xs text-slate-400 truncate">Super Admin</span>
</div>
</div>
</div>
</aside>
<div class="flex-1 flex flex-col h-screen overflow-hidden relative">
<header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-20 flex-shrink-0">
<div class="flex items-center gap-4 flex-1">
<button class="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
<span class="material-symbols-outlined">menu</span>
</button>
<button class="hidden md:flex p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors" title="Collapse Sidebar">
<span class="material-symbols-outlined">menu_open</span>
</button>
<div class="hidden md:flex relative w-full max-w-md ml-4">
<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
<span class="material-symbols-outlined text-[20px]">search</span>
</span>
<input class="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Search templates, roles, or users..." type="text"/>
</div>
</div>
<div class="flex items-center gap-3 lg:gap-6">
<button class="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
<span class="material-symbols-outlined text-[22px]">notifications</span>
<span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
</button>
<div class="h-6 w-px bg-gray-200"></div>
<button class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
<span>Help</span>
<span class="material-symbols-outlined text-[18px]">help</span>
</button>
</div>
</header>
<main class="flex-1 overflow-y-auto bg-background-light p-6 lg:p-8">
<div class="max-w-[1600px] mx-auto flex flex-col gap-8">
<div class="flex items-center text-sm text-gray-500">
<a class="hover:text-primary transition-colors" href="#">Home</a>
<span class="mx-2 text-gray-300">/</span>
<a class="hover:text-primary transition-colors" href="#">Resumes</a>
<span class="mx-2 text-gray-300">/</span>
<span class="font-medium text-gray-900">Templates</span>
</div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 class="text-2xl font-bold text-gray-900 tracking-tight">Resume Templates</h1>
<p class="text-gray-500 mt-1">Manage and organize all available resume templates.</p>
</div>
<div class="flex gap-3 items-center">
<button class="px-4 py-2 bg-royal-blue text-white text-sm font-bold rounded-lg shadow-md shadow-royal-blue/20 hover:bg-blue-700 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">add</span>
                                Upload New Template
                            </button>
<div class="relative">
<button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
                                Filter by Role: All
                                <span class="material-symbols-outlined text-[18px]">expand_more</span>
</button>
<div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden">
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Software Engineer</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Marketing</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Finance</a>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-10">
<section>
<div class="flex items-center justify-between mb-4">
<h2 class="text-xl font-bold text-gray-900">Modern Templates</h2>
<a class="text-royal-blue text-sm font-medium hover:underline flex items-center gap-1" href="#">
                                View All (12)
                                <span class="material-symbols-outlined text-base">chevron_right</span>
</a>
</div>
<div class="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 p-4 flex flex-col text-sm text-gray-800 leading-tight">
<h4 class="font-bold text-base mb-2">John Doe</h4>
<p class="text-xs text-gray-600 mb-2">Software Engineer | San Francisco, CA</p>
<hr class="my-1 border-gray-200"/>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Experience</span>
<span class="material-symbols-outlined text-xs">work</span>
</div>
<p class="text-[10px] truncate">Senior Developer, Tech Co. (2020-Present)</p>
<p class="text-[10px] mb-1">Lead development of scalable microservices...</p>
<p class="text-[10px] truncate">Software Engineer, Startup X (2017-2020)</p>
<p class="text-[10px] mb-1">Developed core features for mobile application...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Education</span>
<span class="material-symbols-outlined text-xs">school</span>
</div>
<p class="text-[10px] truncate">M.S. Computer Science, University Z (2017)</p>
<p class="text-[10px] mb-1">B.S. Software Eng., University Y (2015)</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Skills</span>
<span class="material-symbols-outlined text-xs">code</span>
</div>
<p class="text-[10px] mb-1 truncate">Python, Java, React, SQL, AWS, Docker...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Projects</span>
<span class="material-symbols-outlined text-xs">lightbulb</span>
</div>
<p class="text-[10px] truncate">AI Chatbot: Implemented NLP with Python...</p>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Minimalist Pro</p>
<p class="text-xs text-gray-500 mt-1">Used: 1.2k times</p>
</div>
</div>
</div>
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 p-4 flex flex-col text-sm text-gray-800 leading-tight">
<h4 class="font-bold text-base mb-2">Jane Smith</h4>
<p class="text-xs text-gray-600 mb-2">Product Manager | New York, NY</p>
<hr class="my-1 border-gray-200"/>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Experience</span>
<span class="material-symbols-outlined text-xs">work</span>
</div>
<p class="text-[10px] truncate">Senior PM, Global Corp. (2021-Present)</p>
<p class="text-[10px] mb-1">Launched 3 major features, +20% user engagement...</p>
<p class="text-[10px] truncate">Product Analyst, Big Data Inc. (2018-2021)</p>
<p class="text-[10px] mb-1">Analyzed market trends, defined product roadmaps...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Education</span>
<span class="material-symbols-outlined text-xs">school</span>
</div>
<p class="text-[10px] truncate">MBA, Business School A (2018)</p>
<p class="text-[10px] mb-1">B.A. Economics, University B (2016)</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Skills</span>
<span class="material-symbols-outlined text-xs">lightbulb</span>
</div>
<p class="text-[10px] mb-1 truncate">Product Strategy, Agile, UX/UI, Data Analysis...</p>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Elegant Professional</p>
<p class="text-xs text-gray-500 mt-1">Used: 980 times</p>
</div>
</div>
</div>
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 p-4 flex flex-col text-sm text-gray-800 leading-tight">
<h4 class="font-bold text-base mb-2">Mark Davis</h4>
<p class="text-xs text-gray-600 mb-2">Data Scientist | Boston, MA</p>
<hr class="my-1 border-gray-200"/>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Experience</span>
<span class="material-symbols-outlined text-xs">analytics</span>
</div>
<p class="text-[10px] truncate">Lead DS, Analytics Firm (2022-Present)</p>
<p class="text-[10px] mb-1">Built predictive models for client projects...</p>
<p class="text-[10px] truncate">Jr. Data Analyst, Retail Co. (2019-2022)</p>
<p class="text-[10px] mb-1">Cleaned and processed large datasets...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Education</span>
<span class="material-symbols-outlined text-xs">school</span>
</div>
<p class="text-[10px] truncate">M.S. Data Science, University C (2019)</p>
<p class="text-[10px] mb-1">B.S. Statistics, University D (2017)</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Skills</span>
<span class="material-symbols-outlined text-xs">calculate</span>
</div>
<p class="text-[10px] mb-1 truncate">R, Python (Pandas), SQL, Machine Learning...</p>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Clean &amp; Concise</p>
<p class="text-xs text-gray-500 mt-1">Used: 850 times</p>
</div>
</div>
</div>
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 p-4 flex flex-col text-sm text-gray-800 leading-tight">
<h4 class="font-bold text-base mb-2">Emily White</h4>
<p class="text-xs text-gray-600 mb-2">UX Designer | Seattle, WA</p>
<hr class="my-1 border-gray-200"/>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Experience</span>
<span class="material-symbols-outlined text-xs">palette</span>
</div>
<p class="text-[10px] truncate">Senior UX, Creative Agency (2021-Present)</p>
<p class="text-[10px] mb-1">Designed user flows, wireframes, prototypes...</p>
<p class="text-[10px] truncate">Jr. UI Designer, Digital Studio (2018-2021)</p>
<p class="text-[10px] mb-1">Contributed to design system, user research...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Education</span>
<span class="material-symbols-outlined text-xs">school</span>
</div>
<p class="text-[10px] truncate">M.A. Interaction Design, University E (2018)</p>
<p class="text-[10px] mb-1">B.A. Graphic Design, University F (2016)</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Skills</span>
<span class="material-symbols-outlined text-xs">design_services</span>
</div>
<p class="text-[10px] mb-1 truncate">Figma, Sketch, Adobe XD, User Research, Prototyping...</p>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Modern Minimal</p>
<p class="text-xs text-gray-500 mt-1">Used: 710 times</p>
</div>
</div>
</div>
</div>
</section>
<section>
<div class="flex items-center justify-between mb-4">
<h2 class="text-xl font-bold text-gray-900">Creative Templates</h2>
<a class="text-royal-blue text-sm font-medium hover:underline flex items-center gap-1" href="#">
                                View All (8)
                                <span class="material-symbols-outlined text-base">chevron_right</span>
</a>
</div>
<div class="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 flex text-sm text-gray-800 leading-tight">
<div class="w-1/3 bg-purple-600 text-white p-4">
<p class="text-xs font-bold uppercase tracking-wide mb-2">Jane Doe</p>
<p class="text-[10px] leading-none">Graphic Designer</p>
<p class="text-[10px] leading-none">London, UK</p>
<div class="mt-4">
<span class="material-symbols-outlined text-sm">phone</span>
<p class="text-[8px]">123-456-7890</p>
<span class="material-symbols-outlined text-sm mt-1">mail</span>
<p class="text-[8px]">jane.d@email.com</p>
</div>
</div>
<div class="w-2/3 p-4 flex flex-col">
<h4 class="font-bold text-base mb-1">Profile</h4>
<p class="text-[10px] mb-2">Highly creative designer with a passion for visual storytelling...</p>
<h4 class="font-bold text-base mb-1">Experience</h4>
<p class="text-[10px] truncate">Senior Designer, Agency X (2020-Present)</p>
<p class="text-[10px] mb-1">Led design projects for major brands...</p>
<h4 class="font-bold text-base mb-1">Skills</h4>
<p class="text-[10px] truncate">Photoshop, Illustrator, InDesign, Figma, UX/UI...</p>
</div>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Vibrant Designer</p>
<p class="text-xs text-gray-500 mt-1">Used: 620 times</p>
</div>
</div>
</div>
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 flex text-sm text-gray-800 leading-tight">
<div class="w-full p-4 flex flex-col">
<div class="bg-emerald-500 h-6 -mx-4 -mt-4 mb-2 flex items-center justify-center text-white text-sm font-bold">
                                                ALEX BROWN
                                            </div>
<p class="text-xs text-gray-600 mb-2">Marketing Specialist | Sydney, AU</p>
<hr class="my-1 border-emerald-100"/>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Summary</span>
<span class="material-symbols-outlined text-xs text-emerald-500">campaign</span>
</div>
<p class="text-[10px] mb-1">Dynamic marketer with expertise in digital campaigns...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Experience</span>
<span class="material-symbols-outlined text-xs text-emerald-500">business_center</span>
</div>
<p class="text-[10px] truncate">Marketing Lead, Innovate Corp. (2021-Present)</p>
<p class="text-[10px] mb-1">Managed social media strategy, increased engagement...</p>
<div class="flex justify-between items-center text-xs mb-1">
<span class="font-semibold">Education</span>
<span class="material-symbols-outlined text-xs text-emerald-500">school</span>
</div>
<p class="text-[10px] truncate">B.Comm. Marketing, University G (2018)</p>
</div>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Bold Marketer</p>
<p class="text-xs text-gray-500 mt-1">Used: 580 times</p>
</div>
</div>
</div>
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 flex text-sm text-gray-800 leading-tight">
<div class="grid grid-cols-2 h-full">
<div class="bg-red-50 text-red-800 p-3 flex flex-col justify-start">
<h4 class="font-bold text-xs mb-1">Contact</h4>
<p class="text-[9px]">123-456-7890</p>
<p class="text-[9px]">jake.m@email.com</p>
<h4 class="font-bold text-xs mt-3 mb-1">Skills</h4>
<p class="text-[9px]">Creative Writing</p>
<p class="text-[9px]">Content Strategy</p>
</div>
<div class="p-3 flex flex-col">
<h4 class="font-bold text-sm mb-1 text-red-700">Jake Miller</h4>
<p class="text-[10px] text-gray-600 mb-2">Content Writer | Berlin, DE</p>
<h4 class="font-bold text-xs mb-1">Experience</h4>
<p class="text-[9px] truncate">Content Lead, Startup Y (2021-Present)</p>
<p class="text-[9px] mb-1">Developed blog content, grew traffic by 30%...</p>
<h4 class="font-bold text-xs mb-1">Education</h4>
<p class="text-[9px]">B.A. Journalism, University H (2020)</p>
</div>
</div>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Creative Content</p>
<p class="text-xs text-gray-500 mt-1">Used: 490 times</p>
</div>
</div>
</div>
</div>
</section>
<section>
<div class="flex items-center justify-between mb-4">
<h2 class="text-xl font-bold text-gray-900">Professional Templates</h2>
<a class="text-royal-blue text-sm font-medium hover:underline flex items-center gap-1" href="#">
                                View All (15)
                                <span class="material-symbols-outlined text-base">chevron_right</span>
</a>
</div>
<div class="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 p-4 flex flex-col text-sm text-gray-800 leading-tight">
<h4 class="font-bold text-lg mb-1 text-gray-900 text-center uppercase">ROBERT JOHNSON</h4>
<p class="text-xs text-gray-600 text-center mb-3">FINANCE DIRECTOR | NEW YORK, NY | +1 (555) 123-4567 | RJ@EMAIL.COM</p>
<hr class="my-2 border-gray-300"/>
<h5 class="font-semibold text-xs uppercase mb-1">Summary</h5>
<p class="text-[10px] mb-2">Results-driven finance professional with 10+ years experience...</p>
<h5 class="font-semibold text-xs uppercase mb-1">Experience</h5>
<p class="text-[10px] font-semibold">Finance Director, Global Bank (2018-Present)</p>
<p class="text-[10px] mb-1">Managed $500M budget, optimized financial operations...</p>
<p class="text-[10px] font-semibold">Financial Analyst, Investment Firm (2014-2018)</p>
<p class="text-[10px] mb-1">Conducted market research, prepared financial reports...</p>
<h5 class="font-semibold text-xs uppercase mb-1">Education</h5>
<p class="text-[10px] font-semibold">MBA, Wharton School (2014)</p>
<p class="text-[10px] mb-1">B.A. Finance, NYU Stern (2012)</p>
<h5 class="font-semibold text-xs uppercase mb-1">Skills</h5>
<p class="text-[10px] mb-1">Financial Modeling, Budgeting, Forecasting, GAAP, Excel...</p>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Executive Classic</p>
<p class="text-xs text-gray-500 mt-1">Used: 2.1k times</p>
</div>
</div>
</div>
<div class="flex-none w-64">
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group overflow-hidden border border-gray-200">
<div class="relative w-full a4-aspect">
<div class="absolute inset-0 p-4 flex flex-col text-sm text-gray-800 leading-tight">
<h4 class="font-bold text-lg mb-1 text-gray-900 border-b-2 border-gray-300 pb-1">ANNA LEE</h4>
<p class="text-xs text-gray-600 mb-3">PROJECT MANAGER | LONDON, UK | +44 20 7946 0958 | AL@EMAIL.COM</p>
<h5 class="font-semibold text-xs uppercase mb-1">Profile</h5>
<p class="text-[10px] mb-2">Highly organized project manager skilled in Agile methodologies...</p>
<h5 class="font-semibold text-xs uppercase mb-1">Work History</h5>
<p class="text-[10px] font-semibold">Senior Project Manager, Tech Solutions (2019-Present)</p>
<p class="text-[10px] mb-1">Led cross-functional teams, delivered projects on time...</p>
<p class="text-[10px] font-semibold">Project Coordinator, Consult Inc. (2016-2019)</p>
<p class="text-[10px] mb-1">Assisted PMs with planning, monitoring, and reporting...</p>
<h5 class="font-semibold text-xs uppercase mb-1">Education</h5>
<p class="text-[10px] font-semibold">M.S. Project Management, University I (2016)</p>
<p class="text-[10px] mb-1">B.Sc. Business Admin., University J (2014)</p>
<div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<button class="size-10 rounded-full bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">edit</span>
</button>
<button class="size-10 rounded-full bg-white text-red-500 hover:bg-gray-100 flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-lg">delete</span>
</button>
</div>
</div>
</div>
<div class="p-4 bg-white border-t border-gray-100">
<p class="text-sm font-semibold text-gray-900">Corporate Standard</p>
<p class="text-xs text-gray-500 mt-1">Used: 1.8k times</p>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</main>
</div>
</div>
</body></html>