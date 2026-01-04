<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Admin Portal Dashboard</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#131316", secondary: "#1e293b", "background-light": "#f7f7f7", "background-dark": "#18181a"}, fontFamily: {display: "Inter"}, borderRadius: {DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"}}}};</script>
<style>
        body {
            font-family: 'Inter', sans-serif;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 font-display antialiased">
<div class="flex h-screen w-full overflow-hidden">
<!-- Sidebar -->
<aside class="w-64 bg-secondary flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out border-r border-slate-700/50 hidden md:flex">
<!-- Logo Section -->
<div class="h-16 flex items-center px-6 border-b border-slate-700/50">
<div class="flex items-center gap-3">
<div class="size-8 rounded bg-primary flex items-center justify-center text-white">
<span class="material-symbols-outlined text-[20px]">resume</span>
</div>
<span class="text-white text-lg font-bold tracking-tight">ResumeAI</span>
</div>
</div>
<!-- Navigation -->
<nav class="flex-1 overflow-y-auto no-scrollbar py-6 px-3 flex flex-col gap-1">
<!-- Section Label -->
<div class="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Overview</div>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white group shadow-sm shadow-primary/20" href="#">
<span class="material-symbols-outlined text-[22px]">dashboard</span>
<span class="text-sm font-medium">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">group</span>
<span class="text-sm font-medium">User Management</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">description</span>
<span class="text-sm font-medium">Resumes</span>
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
<!-- User Profile Snippet (Bottom Sidebar) -->
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
<!-- Main Content Area -->
<div class="flex-1 flex flex-col h-screen overflow-hidden relative">
<!-- Top Header -->
<header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-20 flex-shrink-0">
<!-- Left: Sidebar Toggle (Mobile) & Search -->
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
<input class="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Search users, resumes, or logs..." type="text"/>
</div>
</div>
<!-- Right: Actions -->
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
<!-- Scrollable Content -->
<main class="flex-1 overflow-y-auto bg-background-light p-6 lg:p-8">
<div class="max-w-[1600px] mx-auto flex flex-col gap-6">
<!-- Breadcrumbs -->
<div class="flex items-center text-sm text-gray-500">
<a class="hover:text-primary transition-colors" href="#">Home</a>
<span class="mx-2 text-gray-300">/</span>
<span class="font-medium text-gray-900">Dashboard</span>
</div>
<!-- Page Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 class="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
<p class="text-gray-500 mt-1">Welcome back, here's what's happening with your platform today.</p>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
                                Last 30 Days
                            </button>
<button class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-md shadow-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span>
                                Export Data
                            </button>
</div>
</div>
<!-- Stats / KPIs -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
<!-- KPI Card 1 -->
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
<div class="flex justify-between items-start z-10">
<div>
<p class="text-sm font-medium text-gray-500">Total Users</p>
<h3 class="text-2xl font-bold text-gray-900 mt-1">12,450</h3>
</div>
<div class="p-2 bg-blue-50 text-primary rounded-lg">
<span class="material-symbols-outlined text-[24px]">group</span>
</div>
</div>
<div class="flex items-center gap-1 z-10">
<span class="text-green-600 text-xs font-bold flex items-center">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
                                    12%
                                </span>
<span class="text-gray-400 text-xs">vs last month</span>
</div>
<!-- Decorational background shape -->
<div class="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
</div>
<!-- KPI Card 2 -->
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
<div class="flex justify-between items-start z-10">
<div>
<p class="text-sm font-medium text-gray-500">Resumes Generated</p>
<h3 class="text-2xl font-bold text-gray-900 mt-1">45,200</h3>
</div>
<div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
<span class="material-symbols-outlined text-[24px]">description</span>
</div>
</div>
<div class="flex items-center gap-1 z-10">
<span class="text-green-600 text-xs font-bold flex items-center">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
                                    5%
                                </span>
<span class="text-gray-400 text-xs">vs last month</span>
</div>
</div>
<!-- KPI Card 3 -->
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
<div class="flex justify-between items-start z-10">
<div>
<p class="text-sm font-medium text-gray-500">Active Subscriptions</p>
<h3 class="text-2xl font-bold text-gray-900 mt-1">3,100</h3>
</div>
<div class="p-2 bg-purple-50 text-purple-600 rounded-lg">
<span class="material-symbols-outlined text-[24px]">workspace_premium</span>
</div>
</div>
<div class="flex items-center gap-1 z-10">
<span class="text-green-600 text-xs font-bold flex items-center">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
                                    2.4%
                                </span>
<span class="text-gray-400 text-xs">vs last month</span>
</div>
</div>
<!-- KPI Card 4 -->
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
<div class="flex justify-between items-start z-10">
<div>
<p class="text-sm font-medium text-gray-500">Total Revenue</p>
<h3 class="text-2xl font-bold text-gray-900 mt-1">$124,500</h3>
</div>
<div class="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
<span class="material-symbols-outlined text-[24px]">attach_money</span>
</div>
</div>
<div class="flex items-center gap-1 z-10">
<span class="text-green-600 text-xs font-bold flex items-center">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
                                    8%
                                </span>
<span class="text-gray-400 text-xs">vs last month</span>
</div>
</div>
</div>
<!-- Main Chart Section -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Chart Container -->
<div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
<div class="flex justify-between items-center mb-6">
<h3 class="text-lg font-bold text-gray-900">Resume Generation Traffic</h3>
<button class="text-gray-400 hover:text-primary">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<!-- Chart Placeholder Visual -->
<div class="w-full h-64 bg-gray-50 rounded-lg relative overflow-hidden flex items-end justify-between px-4 pb-0 pt-10 gap-2 border border-dashed border-gray-200">
<!-- Fake Bars for Chart Visualization -->
<div class="w-full bg-blue-100 rounded-t-sm h-[30%]" title="Day 1"></div>
<div class="w-full bg-blue-200 rounded-t-sm h-[45%]" title="Day 2"></div>
<div class="w-full bg-blue-100 rounded-t-sm h-[35%]" title="Day 3"></div>
<div class="w-full bg-primary/30 rounded-t-sm h-[60%]" title="Day 4"></div>
<div class="w-full bg-primary/40 rounded-t-sm h-[75%]" title="Day 5"></div>
<div class="w-full bg-primary/20 rounded-t-sm h-[40%]" title="Day 6"></div>
<div class="w-full bg-primary/50 rounded-t-sm h-[65%]" title="Day 7"></div>
<div class="w-full bg-primary rounded-t-sm h-[85%]" title="Day 8"></div>
<div class="w-full bg-primary/60 rounded-t-sm h-[70%]" title="Day 9"></div>
<div class="w-full bg-primary/30 rounded-t-sm h-[50%]" title="Day 10"></div>
<div class="w-full bg-blue-200 rounded-t-sm h-[60%]" title="Day 11"></div>
<div class="w-full bg-blue-100 rounded-t-sm h-[40%]" title="Day 12"></div>
<!-- Tooltip simulation -->
<div class="absolute top-[25%] left-[60%] bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
                                    2,405 Resumes
                                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
</div>
</div>
<div class="flex justify-between text-xs text-gray-400 mt-2 px-1">
<span>Nov 01</span>
<span>Nov 05</span>
<span>Nov 10</span>
<span>Nov 15</span>
</div>
</div>
<!-- Sidebar Widget / Quick Stats -->
<div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
<h3 class="text-lg font-bold text-gray-900">Traffic Source</h3>
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="size-2 rounded-full bg-primary"></div>
<span class="text-sm font-medium text-gray-700">Direct</span>
</div>
<span class="text-sm font-bold text-gray-900">54%</span>
</div>
<div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
<div class="bg-primary h-1.5 rounded-full" style="width: 54%"></div>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="size-2 rounded-full bg-indigo-500"></div>
<span class="text-sm font-medium text-gray-700">Referral</span>
</div>
<span class="text-sm font-bold text-gray-900">32%</span>
</div>
<div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
<div class="bg-indigo-500 h-1.5 rounded-full" style="width: 32%"></div>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="size-2 rounded-full bg-emerald-500"></div>
<span class="text-sm font-medium text-gray-700">Social</span>
</div>
<span class="text-sm font-bold text-gray-900">14%</span>
</div>
<div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
<div class="bg-emerald-500 h-1.5 rounded-full" style="width: 14%"></div>
</div>
</div>
<div class="mt-auto pt-4 border-t border-gray-100">
<button class="w-full py-2 text-sm text-primary font-medium hover:bg-blue-50 rounded transition-colors">View Detailed Report</button>
</div>
</div>
</div>
<!-- Data Table Section -->
<div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
<div class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<h3 class="text-lg font-bold text-gray-900">Recent User Activity</h3>
<div class="flex items-center gap-2">
<div class="relative">
<span class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
</span>
<select class="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
<option>All Status</option>
<option>Active</option>
<option>Pending</option>
</select>
</div>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-gray-50 border-b border-gray-200">
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
<input class="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume Title</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Created</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<!-- Row 1 -->
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4 w-10">
<input class="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
</td>
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center" data-alt="User avatar male" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8UEyE9PszwDrZeww8zBYZb_CRyiha2Yc982ntPOG_Une5Exetk0J7Z6PjVJc1yBw58-FSlOYIf2NC_po5tdIpacqDRlag1LKjjhiaHKHrnZRaynksPzIRVGwNQ9XFUUoLo0Ax9Z0ssUVolD89pxDd0BJ941e9oJV-ibiGTLjdKHB-dwWrkV-3WJ8yhZforAS09XT7gHlpssVhaTn9VNY0ShHy7YuBpNw4AdebCQ7u9S5ci4r8nnNv63moA0Noe_HZiIQyKWLjoUw");'></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">John Doe</span>
<span class="text-xs text-gray-500">john.d@example.com</span>
</div>
</div>
</td>
<td class="p-4 text-sm text-gray-700 font-medium">Software Engineer Resume</td>
<td class="p-4 text-sm text-gray-500">Nov 14, 2023</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4 w-10">
<input class="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
</td>
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center" data-alt="User avatar female" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkwWqj9ncbhy_lkfmwGp2N5NG0Yr8IGCpjCcwAIbvEeUaoHmaewNa_Kxex7J9-5nxKrdtBkA3PjSzpcTeCcJhc8ZuVC-oHpNMVMHE07kKGN0cxJR2XS9lnpAjk4aal-8fqy2rxRp9bEibpqHHr6p2-xTkgnuFrDmOGH-lKBmYvHZMfyh6xNtYJJqiQV1oByrmKjE9MpJPwl4Pk7_keL2U_AD62QbT-QQjej3ZUbBsRQlZLvC2cuajGAVUF8LWhI7LiNhJfoRTN5O0");'></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Sarah Smith</span>
<span class="text-xs text-gray-500">sarah.s@example.com</span>
</div>
</div>
</td>
<td class="p-4 text-sm text-gray-700 font-medium">Marketing Manager CV</td>
<td class="p-4 text-sm text-gray-500">Nov 13, 2023</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4 w-10">
<input class="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
</td>
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs" data-alt="User avatar initials">
                                                    MJ
                                                </div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Michael Johnson</span>
<span class="text-xs text-gray-500">mj.dev@example.com</span>
</div>
</div>
</td>
<td class="p-4 text-sm text-gray-700 font-medium">Full Stack V2</td>
<td class="p-4 text-sm text-gray-500">Nov 12, 2023</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4 w-10">
<input class="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox"/>
</td>
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center" data-alt="User avatar male" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkRvazwtijERJw0vJX-g68uJNgsDzo1dwiF7Hz9J1dRjv76RMQsMQwUd8Ue6_rl6kPZ8gmezEEBY_GCJDbnHHZRwZKNzhcXrer0AFRoUztCOnb5q4pbIZZO7LW9D34f6fMh0cdhn1K1sb12bsMadaciiTMd7G_MrRvCZX__0qiiH7XgcvlAIXXeP-5jh6AJpF9m25CQ1839U-1Or9Xvd_Bs8Y-F1nSBApl5AIB5q7a9ZlK9sIGoqgxPkGOakrd0e5wtowxbsEe0hQ");'></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">David Wilson</span>
<span class="text-xs text-gray-500">david.w@example.com</span>
</div>
</div>
</td>
<td class="p-4 text-sm text-gray-700 font-medium">Project Manager Lead</td>
<td class="p-4 text-sm text-gray-500">Nov 11, 2023</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Draft
                                            </span>
</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">edit</span>
</button>
<button class="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="p-4 border-t border-gray-200 flex items-center justify-between">
<span class="text-sm text-gray-500">Showing 1-4 of 240 results</span>
<div class="flex gap-2">
<button class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-600 disabled:opacity-50" disabled="">Previous</button>
<button class="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm text-gray-600">Next</button>
</div>
</div>
</div>
</div>
</main>
</div>
</div>
</body></html>