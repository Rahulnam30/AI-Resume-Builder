<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Admin Portal - Subscription Management</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#131316", secondary: "#1e293b", "background-light": "#f7f7f7", "background-dark": "#18181a", 'royal-blue': '#2563EB', 'emerald-green': '#10B981', 'rose-red': '#F43F5E', 'gold-badge': '#FFD700'}, fontFamily: {display: "Inter"}, borderRadius: {DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"}}}};</script>
<style>
        body {
            font-family: 'Inter', sans-serif;
        }.no-scrollbar::-webkit-scrollbar {
            display: none;
        }.no-scrollbar {
            -ms-overflow-style: none;scrollbar-width: none;}
    </style>
</head>
<body class="bg-[#F3F4F6] text-slate-900 font-display antialiased">
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
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">description</span>
<span class="text-sm font-medium">Resumes</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 text-white group shadow-sm shadow-primary/20" href="#">
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
<input class="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Search users, resumes, or logs..." type="text"/>
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
<main class="flex-1 overflow-y-auto bg-[#F3F4F6] p-6 lg:p-8">
<div class="max-w-[1600px] mx-auto flex flex-col gap-6">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<div class="flex items-center text-sm text-gray-500 mb-1">
<a class="hover:text-primary transition-colors" href="#">Home</a>
<span class="mx-2 text-gray-300">/</span>
<span class="font-medium text-gray-700">Subscriptions</span>
</div>
<h1 class="text-2xl font-bold text-gray-900 tracking-tight">Subscription Management</h1>
</div>
<div class="flex gap-3">
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
<span class="material-symbols-outlined text-base text-gray-400">info</span>
</div>
<div class="flex items-end gap-2">
<span class="text-3xl font-bold text-gray-900">$124,500</span>
<span class="text-sm font-medium text-emerald-green flex items-center">
<span class="material-symbols-outlined text-base">arrow_upward</span>
                                +12%
                            </span>
</div>
</div>
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<h3 class="text-sm font-medium text-gray-500">Active Subscribers</h3>
<span class="material-symbols-outlined text-base text-gray-400">group</span>
</div>
<div class="flex items-end gap-2">
<span class="text-3xl font-bold text-gray-900">3,100</span>
<span class="text-base text-gray-500">(Pro Users)</span>
</div>
</div>
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between mb-2">
<h3 class="text-sm font-medium text-gray-500">Free Users</h3>
<span class="material-symbols-outlined text-base text-gray-400">person</span>
</div>
<div class="flex items-end gap-2">
<span class="text-3xl font-bold text-gray-900">15,400</span>
<span class="text-base text-gray-500">(Potential leads)</span>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
<div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
<div class="flex items-center gap-2 mb-4">
<span class="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">Basic / Free</span>
</div>
<h3 class="text-4xl font-bold text-gray-900 mb-2">$0.00 <span class="text-base font-medium text-gray-500">/ mo</span></h3>
<ul class="text-sm text-gray-700 space-y-2 flex-1 mb-6">
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    1 Resume
                                </li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    Basic Templates
                                </li>
</ul>
<button class="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                Edit Plan Details
                            </button>
</div>
<div class="bg-white p-6 rounded-xl border border-2 border-royal-blue shadow-lg shadow-royal-blue/10 flex flex-col">
<div class="flex items-center gap-2 mb-4">
<span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pro Plan</span>
</div>
<h3 class="text-4xl font-bold text-gray-900 mb-2">$19.00 <span class="text-base font-medium text-gray-500">/ mo</span></h3>
<ul class="text-sm text-gray-700 space-y-2 flex-1 mb-6">
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    Unlimited Resumes
                                </li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    AI Writer
                                </li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    ATS Check
                                </li>
</ul>
<button class="w-full px-4 py-2 bg-royal-blue text-white text-sm font-bold rounded-lg shadow-md shadow-royal-blue/20 hover:bg-blue-700 transition-all">
                                Edit Plan Details
                            </button>
</div>
</div>
<div class="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
<div class="p-5">
<h2 class="text-lg font-semibold text-gray-900 mb-4">Subscriber List</h2>
<div class="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-4 mb-4">
<div class="flex space-x-2">
<button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-royal-blue border-b-2 border-transparent hover:border-royal-blue transition-colors">
                                    All Users
                                </button>
<button class="px-4 py-2 text-sm font-medium text-royal-blue border-b-2 border-royal-blue">
                                    Pro (Paid)
                                </button>
<button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-royal-blue border-b-2 border-transparent hover:border-royal-blue transition-colors">
                                    Free
                                </button>
<button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-royal-blue border-b-2 border-transparent hover:border-royal-blue transition-colors">
                                    Cancelled
                                </button>
<button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-rose-red border-b-2 border-transparent hover:border-rose-red transition-colors">
                                    Past Due
                                </button>
</div>
<div class="flex-1 min-w-[200px] md:flex-none">
<label class="sr-only" for="date-range">Date Range</label>
<div class="relative">
<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
<span class="material-symbols-outlined text-base">calendar_today</span>
</span>
<input class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-royal-blue focus:border-royal-blue" id="date-range" placeholder="Date Range (Next Billing)" type="text"/>
</div>
</div>
<button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0">
<span class="material-symbols-outlined text-[18px]">download</span>
                                Export CSV
                            </button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-gray-50 border-b border-gray-200">
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[200px]">User Info</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[120px]">Current Plan</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[120px]">Billing Status</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">Revenue (LTV)</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[120px]">Next Billing</th>
<th class="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right min-w-[100px]">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-100">
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center" data-alt="User avatar male" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8UEyE9PszwDrZeww8zBYZb_CRyiha2Yc982ntPOG_Une5Exetk0J7Z6PjVJc1yBw58-FSlOYIf2NC_po5tdIpacqDRlag1LKjjhiaHKHrnZRaynksPzIRVGwNQ9XFUUoLo0Ax9Z0ssUVolD89pxDd0BJ941e9oJV-ibiGTLjdKHB-dwWrkV-3WJ8yhZforAS09XT7gHlpssVhaTn9VNY0ShHy7YuBpNw4AdebCQ7u9S5ci4r8nnNv63moA0Noe_HZiIQyKWLjoUw");'></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">John Doe</span>
<span class="text-xs text-gray-500">john.d@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-blue/10 text-royal-blue">
                                        Pro Monthly
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-emerald-green"></span>
<span class="text-sm text-gray-700">Active</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$240.00</td>
<td class="p-4 text-sm text-gray-500">Nov 24, 2025</td>
<td class="p-4 text-right relative">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1 relative z-10">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
<div class="absolute right-4 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Upgrade Plan</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Downgrade to Free</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Cancel Subscription</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">View Invoices</a>
</div>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center" data-alt="User avatar female" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkwWqj9ncbhy_lkfmwGp2N5NG0Yr8IGCpjCcwAIbvEeUaoHmaewNa_Kxex7J9-5nxKrdtBkA3PjSzpcTeCcJhc8ZuVC-oHpNMVMHE07kKGN0cxJR2XS9lnpAjk4aal-8fqy2rxRp9bEibpqHHr6p2-xTkgnuFrDmOGH-lKBmYvHZMfyh6xNtYJJqiQV1oByrmKjE9MpJPwl4Pk7_keL2U_AD62QbT-QQjej3ZUbBsRQlZLvC2cuajGAVUF8LWhI7LiNhJfoRTN5O0");'></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Sarah Smith</span>
<span class="text-xs text-gray-500">sarah.s@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        Pro Yearly
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-emerald-green"></span>
<span class="text-sm text-gray-700">Active</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$180.00</td>
<td class="p-4 text-sm text-gray-500">Dec 01, 2024</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
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
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        Free
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-gray-400"></span>
<span class="text-sm text-gray-700">Cancelled</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$0.00</td>
<td class="p-4 text-sm text-gray-500">N/A</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center" data-alt="User avatar male" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkRvazwtijERJw0vJX-g68uJNgsDzo1dwiF7Hz9J1dRjv76RMQsMQwUd8Ue6_rl6kPZ8gmezEEBY_GCJDbnHHZRwZKNzhcXrer0AFRoUztCOnb5q4pbIZZO7LW9D34f6fMh0cdhn1K1sb12bsMadaciiTMd7G_MrRvCZX__0qiiH7XgcvlAIXXeP-5jh6AJpF9m25CQ1839U-1Or9Xvd_Bs8Y-F1nSBApl5AIB5q7a9ZlK9sIGoqgxPkGOakrd0e5wtowxbsEe0hQ");'></div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">David Wilson</span>
<span class="text-xs text-gray-500">david.w@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-blue/10 text-royal-blue">
                                        Pro Monthly
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-rose-red"></span>
<span class="text-sm text-gray-700">Payment Failed</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$19.00</td>
<td class="p-4 text-sm text-gray-500">Nov 18, 2023</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center bg-green-200 flex items-center justify-center text-green-700 font-bold text-xs" data-alt="User avatar initials">
                                                    AE
                                                </div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Anna Evans</span>
<span class="text-xs text-gray-500">anna.e@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-blue/10 text-royal-blue">
                                        Pro Monthly
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-emerald-green"></span>
<span class="text-sm text-gray-700">Active</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$38.00</td>
<td class="p-4 text-sm text-gray-500">Dec 01, 2023</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs" data-alt="User avatar initials">
                                                    CM
                                                </div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Chris Miller</span>
<span class="text-xs text-gray-500">chris.m@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        Free
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-emerald-green"></span>
<span class="text-sm text-gray-700">Active</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$0.00</td>
<td class="p-4 text-sm text-gray-500">N/A</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs" data-alt="User avatar initials">
                                                    LP
                                                </div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Laura Perez</span>
<span class="text-xs text-gray-500">laura.p@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        Pro Yearly
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-emerald-green"></span>
<span class="text-sm text-gray-700">Active</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$180.00</td>
<td class="p-4 text-sm text-gray-500">Jan 15, 2024</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-gray-50 transition-colors">
<td class="p-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded-full bg-cover bg-center bg-red-200 flex items-center justify-center text-red-700 font-bold text-xs" data-alt="User avatar initials">
                                                    RK
                                                </div>
<div class="flex flex-col">
<span class="text-sm font-medium text-gray-900">Robert King</span>
<span class="text-xs text-gray-500">robert.k@example.com</span>
</div>
</div>
</td>
<td class="p-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-royal-blue/10 text-royal-blue">
                                        Pro Monthly
                                    </span>
</td>
<td class="p-4">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-emerald-green"></span>
<span class="text-sm text-gray-700">Active</span>
</div>
</td>
<td class="p-4 text-sm text-gray-700">$95.00</td>
<td class="p-4 text-sm text-gray-500">Dec 05, 2023</td>
<td class="p-4 text-right">
<button class="text-gray-400 hover:text-royal-blue transition-colors p-1">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
<span class="text-sm text-gray-500">Showing 1-10 of 3,100 results</span>
<div class="flex items-center gap-2">
<button class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
<button class="px-3 py-1 border border-royal-blue bg-royal-blue text-white rounded-lg text-sm font-medium">1</button>
<button class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">2</button>
<button class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">3</button>
<span class="text-gray-500 text-sm">...</span>
<button class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">310</button>
<button class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">Next</button>
</div>
</div>
</div>
</div>
</main>
</div>
</div>

</body></html>