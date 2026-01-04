<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>User Portal Dashboard - ResumeAI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style type="text/tailwindcss">
        :root {
            --primary-light: #18181b;--primary-dark: #fafafa;--primary-bg-dark: #27272a;--background-light: #f9fafb;
            --background-dark: #0c0a09;
            --surface-light: #ffffff;
            --surface-dark: #1c1917;
            --text-main-light: #0f172a;
            --text-main-dark: #e2e8f0;
            --text-sub-light: #64748b;
            --text-sub-dark: #94a3b8;
            --border-light: #e2e8f0;
            --border-dark: #292524;
            --accent-green-light: #22c55e;
            --accent-green-dark: #16a34a;
            --accent-blue-light: #3b82f6;
            --accent-blue-dark: #2563eb;
            --accent-purple-light: #a855f7;
            --accent-purple-dark: #9333ea;
            --accent-orange-light: #f97316;
            --accent-orange-dark: #ea580c;
        }
        .light .bg-primary { background-color: #18181b; }
        .dark .bg-primary { background-color: #fafafa; }
        .light .hover\:bg-primary-dark:hover { background-color: #27272a; }
        .dark .hover\:bg-primary-dark:hover { background-color: #e4e4e7; }
        .light .text-primary { color: #18181b; }
        .dark .text-primary { color: #fafafa; }
        .light .bg-primary\/10 { background-color: rgba(24, 24, 27, 0.1); }
        .dark .bg-primary\/10 { background-color: rgba(250, 250, 250, 0.1); }
        .light .shadow-primary\/20 { box-shadow: 0 4px 6px -1px rgba(24, 24, 27, 0.1), 0 2px 4px -2px rgba(24, 24, 27, 0.1); }
        .dark .shadow-primary\/20 { box-shadow: 0 4px 6px -1px rgba(250, 250, 250, 0.1), 0 2px 4px -2px rgba(250, 250, 250, 0.1); }
        .bg-primary.text-white { color: #fafafa; }
        .dark .bg-primary.text-white { color: #18181b; }.bg-primary > span { color: inherit; }
        .text-primary.hover\:bg-blue-50:hover { background-color: #f4f4f5; color: #18181b; }.dark .text-primary.hover\:bg-primary\/20:hover { background-color: rgba(250, 250, 250, 0.2); color: #fafafa; }
        .bg-zinc-900 { background-color: #18181b; }
        .text-zinc-50 { color: #fafafa; }
</style>
<style>
        .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
        }
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: var(--border-light);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--text-sub-light);
        }
        .dark ::-webkit-scrollbar-thumb {
            background: var(--border-dark);
        }.progress-indicator {
            position: relative;
            width: 100%;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 9999px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background-color: white;
            border-radius: 9999px;
            transition: width 0.3s ease-in-out;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "var(--primary-light)",
                        "primary-dark": "var(--primary-bg-dark)",
                        "background-light": "var(--background-light)",
                        "background-dark": "var(--background-dark)",
                        "surface-light": "var(--surface-light)",
                        "surface-dark": "var(--surface-dark)",
                        "text-main-light": "var(--text-main-light)",
                        "text-main-dark": "var(--text-main-dark)",
                        "text-sub-light": "var(--text-sub-light)",
                        "text-sub-dark": "var(--text-sub-dark)",
                        "border-light": "var(--border-light)",
                        "border-dark": "var(--border-dark)",
                        "accent-green": "var(--accent-green-light)",
                        "accent-green-dark": "var(--accent-green-dark)",
                        "accent-blue": "var(--accent-blue-light)",
                        "accent-blue-dark": "var(--accent-blue-dark)",
                        "accent-purple": "var(--accent-purple-light)",
                        "accent-purple-dark": "var(--accent-purple-dark)",
                        "accent-orange": "var(--accent-orange-light)",
                        "accent-orange-dark": "var(--accent-orange-dark)",
                    },
                    fontFamily: {
                        "display": ["Inter", "Noto Sans", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "2xl": "1.25rem", "3xl": "1.5rem", "full": "9999px"},
                },
            },
        }
    </script>
</head>
<body class="font-display bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark overflow-hidden h-screen flex">
<aside class="hidden lg:flex w-64 flex-col bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark h-full p-4">
<div class="flex h-full flex-col justify-between">
<div class="flex flex-col gap-4">
<div class="flex items-center gap-2 px-2 py-3 mb-2">
<div class="bg-primary text-zinc-50 rounded-lg p-2 flex items-center justify-center">
<span class="material-symbols-outlined text-zinc-50 text-3xl">smart_toy</span>
</div>
<h1 class="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">ResumeAI</h1>
</div>
<nav class="flex flex-col gap-1">
<button class="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 px-4 text-zinc-50 hover:bg-zinc-800 transition-colors font-semibold shadow-md shadow-zinc-900/20 mb-4 text-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
<span class="material-symbols-outlined text-[20px]">add</span>
<span>Create New</span>
</button>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-sub-light dark:text-text-sub-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">description</span>
<span>My Resumes</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-sub-light dark:text-text-sub-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">edit_document</span>
<span>Cover Letters</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-sub-light dark:text-text-sub-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">article</span>
<span>View Templates</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-sub-light dark:text-text-sub-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">work</span>
<span>Job Tracker</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-sub-light dark:text-text-sub-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">analytics</span>
<span>Analytics</span>
</a>
</nav>
</div>
<div class="flex flex-col gap-2 pt-4 border-t border-border-light dark:border-border-dark">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-md text-text-sub-light dark:text-text-sub-dark hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-sm" href="#">
<span class="material-symbols-outlined text-lg">settings</span>
<span>Settings</span>
</a>
<div class="flex items-center gap-3 px-3 py-3 mt-2 rounded-md bg-background-light dark:bg-surface-dark/50 border border-border-light dark:border-border-dark cursor-pointer">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-zinc-900/10 dark:ring-zinc-100/10" data-alt="User Avatar" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjD-JbGRIbtLyuA5CIuvIodbCcpFC8ZEWRCpMdGxaVBffSssA4HN48vs1XeJgJJk-9gwANkGIpyoVg-Iphu0JCjOl8_S4FHFX_8085YyUyP218lBNzi4Q0kuQ9D0OJu3FGmBVlQ1xw_U1We0lhPZ_pgwhXrPo0thmX9gXPyXWkBK8vS8v5hbkhHIXPgnZ7ZCBJJbdHrP4D1Q5ci8ZC6kJoO_xMOvUANvaSxGfM85pdY6_ypeuOEe-cLvKutPDFwZlj11hM8jg0pRQ");'></div>
<div class="flex flex-col overflow-hidden">
<p class="text-sm font-semibold text-text-main-light dark:text-white truncate">Alex Johnson</p>
<p class="text-xs text-text-sub-light dark:text-text-sub-dark truncate">Pro Plan Member</p>
</div>
</div>
</div>
</div>
</aside>
<div class="flex-1 flex flex-col h-full relative overflow-hidden">
<header class="flex items-center justify-between px-6 py-4 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark z-20">
<button class="lg:hidden text-text-sub-light dark:text-text-sub-dark p-2">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="hidden md:flex flex-1 max-w-lg mx-4">
<div class="relative w-full">
<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-text-sub-light dark:text-text-sub-dark">
<span class="material-symbols-outlined text-lg">search</span>
</span>
<input class="w-full py-2.5 pl-10 pr-4 bg-background-light dark:bg-surface-dark/50 border border-border-light dark:border-border-dark rounded-md text-sm text-text-main-light dark:text-white placeholder-text-sub-light dark:placeholder-text-sub-dark focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:outline-none" placeholder="Search for resumes, templates..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4 ml-auto">
<button class="relative p-2 text-text-sub-light dark:text-text-sub-dark hover:bg-background-light dark:hover:bg-surface-dark/50 rounded-md transition-colors">
<span class="material-symbols-outlined text-xl">notifications</span>
<span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-surface-light dark:border-surface-dark"></span>
</button>
<button class="hidden md:flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-background-light dark:hover:bg-surface-dark/50 transition-colors border border-transparent hover:border-border-light dark:hover:border-border-dark">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" data-alt="User Avatar Small" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbkmoO7z6tv5iDc9wuoIrrvRV4RgQFkHbrZlHjGEabynMF627T85_fTRNgvL7HPdqcvlEA_iozPrH5Rgv-AWpvGSYI6CqDv_WuDJclWho7tfbed0nj95swOb3ecmk84LDDPcUbkK8tu5UcgYevjTMOTXZHMfDUr4UUM0DwZ6Rz08VDV4PjL9a8NcpiyfsOwG3Msno5WPs4Cxs-i1MpKz-Iv6U8EOhD4W-uFh0-YC_LHvGZsbxkbcnLRuurxS1-58hm86HMKBNYElk");'></div>
<span class="text-sm font-medium text-text-main-light dark:text-white">Profile</span>
<span class="material-symbols-outlined text-lg text-text-sub-light">expand_more</span>
</button>
</div>
</header>
<main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
<div class="max-w-7xl mx-auto flex flex-col gap-10">
<nav class="flex text-sm text-text-sub-light dark:text-text-sub-dark">
<a class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#">Home</a>
<span class="mx-2">/</span>
<span class="font-medium text-text-main-light dark:text-white">Dashboard</span>
</nav>
<div class="flex flex-wrap justify-between items-end gap-4">
<div>
<h2 class="text-3xl md:text-4xl font-black text-text-main-light dark:text-white tracking-tight">Welcome back, Alex</h2>
<p class="text-text-sub-light dark:text-text-sub-dark mt-2 text-lg">Ready to land your dream job today?</p>
</div>
<button class="hidden md:flex items-center justify-center gap-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main-light dark:text-white font-semibold py-2.5 px-5 rounded-md hover:bg-gray-50 dark:hover:bg-surface-dark/70 transition-all shadow-sm">
<span class="material-symbols-outlined text-lg">add</span>
                        Create New Resume
                    </button>
</div>
<div class="w-full bg-zinc-900 rounded-xl p-8 text-zinc-50 shadow-lg relative overflow-hidden">
<div class="absolute -right-16 -top-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
<div class="absolute -left-12 -bottom-12 w-40 h-40 bg-purple-400 opacity-20 rounded-full blur-2xl"></div>
<div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
<div class="flex-1">
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-3xl">auto_awesome</span>
<span class="font-semibold tracking-wide text-sm uppercase opacity-90">AI Resume Analysis</span>
</div>
<div class="flex items-end gap-2 mb-4">
<span class="text-7xl font-bold">75</span>
<span class="text-3xl opacity-80 mb-1">/100</span>
</div>
<div class="progress-indicator mb-6">
<div class="progress-fill" style="width: 75%;"></div>
</div>
<p class="text-lg opacity-95 leading-relaxed max-w-prose">
                            Your "Senior Software Engineer" resume is looking good, but could be stronger.
                        </p>
</div>
<div class="w-full md:w-auto md:max-w-xs flex-shrink-0">
<div class="bg-white/15 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
<div class="flex gap-3 items-start">
<span class="material-symbols-outlined text-yellow-300 shrink-0 text-2xl">lightbulb</span>
<p class="text-sm font-medium leading-normal">Tip: Try adding more strong action verbs to your 'Experience' section to increase impact.</p>
</div>
</div>
<button class="w-full py-3 bg-white text-zinc-900 font-bold rounded-md text-lg hover:bg-gray-100 transition-colors shadow-md">
                            Improve Now
                        </button>
</div>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
<div class="flex items-start justify-between">
<div>
<p class="text-text-sub-light dark:text-text-sub-dark font-medium text-sm">Resumes Created</p>
<h3 class="text-3xl font-bold text-text-main-light dark:text-white mt-2">5</h3>
</div>
<div class="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100">
<span class="material-symbols-outlined">description</span>
</div>
</div>
<div class="mt-4 flex items-center text-sm text-accent-green dark:text-accent-green-dark font-medium">
<span class="material-symbols-outlined text-sm mr-1">trending_up</span>
<span>+1 this week</span>
</div>
</div>
<div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
<div class="flex items-start justify-between">
<div>
<p class="text-text-sub-light dark:text-text-sub-dark font-medium text-sm">Applications Sent</p>
<h3 class="text-3xl font-bold text-text-main-light dark:text-white mt-2">12</h3>
</div>
<div class="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100">
<span class="material-symbols-outlined">send</span>
</div>
</div>
<div class="mt-4 flex items-center text-sm text-accent-green dark:text-accent-green-dark font-medium">
<span class="material-symbols-outlined text-sm mr-1">trending_up</span>
<span>+3 this week</span>
</div>
</div>
<div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
<div class="flex items-start justify-between">
<div>
<p class="text-text-sub-light dark:text-text-sub-dark font-medium text-sm">Profile Views</p>
<h3 class="text-3xl font-bold text-text-main-light dark:text-white mt-2">48</h3>
</div>
<div class="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100">
<span class="material-symbols-outlined">visibility</span>
</div>
</div>
<div class="mt-4 flex items-center text-sm text-accent-green dark:text-accent-green-dark font-medium">
<span class="material-symbols-outlined text-sm mr-1">trending_up</span>
<span>+12% vs last month</span>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<div class="lg:col-span-2 flex flex-col gap-6">
<div class="flex items-center justify-between">
<h3 class="text-xl font-bold text-text-main-light dark:text-white">Recent Documents</h3>
<a class="text-zinc-900 dark:text-zinc-100 font-medium text-sm hover:underline" href="#">View All</a>
</div>
<div class="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
<div class="w-28 h-36 flex-shrink-0 rounded-lg overflow-hidden relative border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
<div class="w-full h-full bg-white dark:bg-surface-dark p-3 flex flex-col justify-between opacity-95">
<div class="h-full flex flex-col gap-1.5 p-1 rounded-sm overflow-hidden relative bg-zinc-100 dark:bg-zinc-800/50">
<div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0)25%,rgba(0,0,0,0.02)25%,rgba(0,0,0,0.02)50%,rgba(0,0,0,0)50%,rgba(0,0,0,0)75%,rgba(0,0,0,0.02)75%,rgba(0,0,0,0.02)100%)] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0)25%,rgba(255,255,255,0.02)25%,rgba(255,255,255,0.02)50%,rgba(255,255,255,0)50%,rgba(255,255,255,0)75%,rgba(255,255,255,0.02)75%,rgba(255,255,255,0.02)100%)] bg-[length:10px_10px]"></div>
<div class="w-4/5 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full mb-2 z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-3/4 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mb-1 z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-1/2 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
</div>
</div>
<div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
</div>
<div class="flex-1 flex flex-col justify-between py-1">
<div>
<div class="flex justify-between items-start">
<h4 class="font-bold text-text-main-light dark:text-white text-lg">Senior Software Engineer</h4>
<div class="flex gap-1">
<button class="p-1.5 text-text-sub-light hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Edit">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-1.5 text-text-sub-light hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Download">
<span class="material-symbols-outlined text-xl">download</span>
</button>
</div>
</div>
<p class="text-sm text-text-sub-light dark:text-text-sub-dark">Tech Resume V3 • PDF</p>
</div>
<div class="flex items-center gap-2 text-xs text-text-sub-light dark:text-text-sub-dark mt-2">
<span class="material-symbols-outlined text-sm">schedule</span>
<span>Edited 2 hours ago</span>
</div>
</div>
</div>
<div class="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
<div class="w-28 h-36 flex-shrink-0 rounded-lg overflow-hidden relative border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
<div class="w-full h-full bg-white dark:bg-surface-dark p-3 flex flex-col justify-between opacity-95">
<div class="h-full flex flex-col gap-1.5 p-1 rounded-sm overflow-hidden relative bg-zinc-100 dark:bg-zinc-800/50">
<div class="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:10px_10px]"></div>
<div class="w-3/5 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full self-end mb-2 z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-2/3 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mb-1 z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
<div class="w-4/5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full z-10"></div>
</div>
</div>
<div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
</div>
<div class="flex-1 flex flex-col justify-between py-1">
<div>
<div class="flex justify-between items-start">
<h4 class="font-bold text-text-main-light dark:text-white text-lg">Marketing Manager - Tech</h4>
<div class="flex gap-1">
<button class="p-1.5 text-text-sub-light hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Edit">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-1.5 text-text-sub-light hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" title="Download">
<span class="material-symbols-outlined text-xl">download</span>
</button>
</div>
</div>
<p class="text-sm text-text-sub-light dark:text-text-sub-dark">Creative Template • Word</p>
</div>
<div class="flex items-center gap-2 text-xs text-text-sub-light dark:text-text-sub-dark mt-2">
<span class="material-symbols-outlined text-sm">schedule</span>
<span>Edited yesterday</span>
</div>
</div>
</div>
</div>
<div class="lg:col-span-1 flex flex-col gap-6">
<h3 class="text-xl font-bold text-text-main-light dark:text-white">Quick Actions</h3>
<div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-5">
<div class="flex gap-4 items-center">
<div class="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md text-zinc-900 dark:text-zinc-100">
<span class="material-symbols-outlined">mail</span>
</div>
<div class="flex-1">
<h5 class="font-bold text-text-main-light dark:text-white">Generate Cover Letter</h5>
<p class="text-xs text-text-sub-light dark:text-text-sub-dark mt-1">Generate a matching cover letter for your latest resume.</p>
</div>
<button class="text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-md transition-colors">
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
<div class="border-t border-border-light dark:border-border-dark pt-6 mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-text-sub-light dark:text-text-sub-dark gap-4">
<p>© 2023 ResumeAI Inc. All rights reserved.</p>
<div class="flex gap-4">
<a class="hover:text-text-main-light dark:hover:text-white" href="#">Privacy Policy</a>
<a class="hover:text-text-main-light dark:hover:text-white" href="#">Terms of Service</a>
<a class="hover:text-text-main-light dark:hover:text-white" href="#">Help Center</a>
</div>
</div>
</div>
</main>
</div>
</body></html>