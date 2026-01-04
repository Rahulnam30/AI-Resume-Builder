<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>System Analytics</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;family=Roboto+Mono:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#131316",
                        secondary: "#1e293b",
                        "background-light": "#F3F4F6","background-dark": "#18181a"
                    },
                    fontFamily: {
                        display: "Inter",
                        mono: "Roboto Mono"},
                    borderRadius: {
                        DEFAULT: "0.25rem",
                        lg: "0.5rem",
                        xl: "0.75rem",
                        full: "9999px"
                    }
                }
            }
        };
    </script>
<style type="text/tailwindcss">body {
    font-family: "Inter", sans-serif
    }
.font-mono {
    font-family: "Roboto Mono", monospace
    }.no-scrollbar::-webkit-scrollbar {
    display: none
    }.no-scrollbar {
    -ms-overflow-style: none;scrollbar-width: none;}.donut-chart {
    position: relative;
    width: 150px;height: 150px;
    border-radius: 50%;
    background: conic-gradient(#2563EB 0% 45%,#A855F7 45% 70%,#F87171 70% 85%,#6B7280 85% 100%)
    }
.donut-chart::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;height: 80px;
    background-color: white;
    border-radius: 50%
    }.gauge {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: conic-gradient(#34D399 var(--percentage), #E5E7EB var(--percentage));}
.gauge-inner {
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Roboto Mono", monospace;
    font-size: 1.125rem;font-weight: 700;color: #1F2937;}
.gauge-label {
    position: absolute;
    top: 105%;text-align: center;
    font-size: 0.875rem;color: #6B7280;width: 120%;}.sparkline {
    display: flex;
    align-items: flex-end;
    height: 40px;
    width: 100%;
    overflow: hidden;
    position: relative
    }
.sparkline-bar {
    flex-grow: 1;
    background-color: #A7F3D0;margin-right: 1px;
    border-radius: 1px;
    transition: height 0.3s ease
    }
.sparkline-bar-up {
    background-color: #34D399;}
.sparkline-bar-red {
    background-color: #FCA5A5;}
.sparkline-bar-purple {
    background-color: #E9D5FF;}.gradient-free {
    background: linear-gradient(to top, #E5E7EB, #F3F4F6)
    }
.gradient-pro-monthly {
    background: linear-gradient(to top, #60A5FA, #93C5FD)
    }
.gradient-pro-yearly {
    background: linear-gradient(to top, #A78BFA, #C4B5FD)
    }.world-map-container {
    position: relative;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuCqDoDH7csJxQgl3XD6BTH25cPW1qhIeBlARmqRZ8njOGo7C1Utendr4T_6KYxhTieOqbUOIxxGjLnwWGn_iFxuGmElh8JKaWQPP94kXlbaIPqZFF5sylK9rogBTQb94l4G2n1vIjVYIunfn8wLdpCOFp3Ka5QIRJmI0l3VcB1_jJLd7h_QyagTwLOiX9bt0VfIkNxancarslyw63OO1UQaW1YJMKQHF_VUBymjiSdUZZa5oO4ZQUO6RsK_xhvwwPzkkW85iyO9Pmo);background-size: cover;
    background-position: center;
    width: 100%;
    height: 350px;
    border-radius: 0.75rem;filter: grayscale(80%) brightness(90%);}
.map-bubble {
    position: absolute;
    background-color: #3B82F6;border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2)
    }
.map-bubble:hover {
    transform: scale(1.1);
    z-index: 10
    }
.map-bubble-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translatex(-50%);
    background-color: #1F2937;color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    pointer-events: none
    }
.map-bubble:hover .map-bubble-tooltip {
    opacity: 1;
    visibility: visible
    }
.map-bubble-tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translatex(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background-color: #1F2937
    }</style>
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
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">description</span>
<span class="text-sm font-medium">Resumes</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group" href="#">
<span class="material-symbols-outlined text-[22px]">credit_card</span>
<span class="text-sm font-medium">Subscriptions</span>
</a>
<div class="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">System</div>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white group shadow-sm shadow-primary/20" href="#">
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
</div>
<div class="flex items-center gap-3 lg:gap-6">
<div class="relative">
<button class="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
                        Last 30 Days
                        <span class="material-symbols-outlined text-[18px]">expand_more</span>
</button>
<div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30 hidden">
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Last 30 Days</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Last Quarter</a>
<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Year to Date</a>
</div>
</div>
<button class="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span>
                    Export Report
                </button>
</div>
</header>
<main class="flex-1 overflow-y-auto bg-background-light p-6 lg:p-8">
<div class="max-w-[1600px] mx-auto flex flex-col gap-6">
<div class="flex items-center text-sm text-gray-500">
<a class="hover:text-primary transition-colors" href="#">Home</a>
<span class="mx-2 text-gray-300">/</span>
<span class="font-medium text-gray-900">System Analytics</span>
</div>
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h1 class="text-2xl font-bold text-gray-900 tracking-tight">System Analytics</h1>
<p class="text-gray-500 mt-1">Deep dive into your platform's performance and user engagement.</p>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
<p class="text-sm font-medium text-gray-500 mb-1">User Growth Rate</p>
<h3 class="text-3xl font-bold text-green-600 font-mono flex items-center">
                            +12.5%
                            <span class="material-symbols-outlined text-green-600 text-2xl ml-1">arrow_upward</span>
</h3>
<p class="text-gray-400 text-xs mt-1">vs previous 30 days</p>
<div class="sparkline mt-4">
<div class="sparkline-bar" style="height: 30%;"></div>
<div class="sparkline-bar" style="height: 45%;"></div>
<div class="sparkline-bar" style="height: 35%;"></div>
<div class="sparkline-bar" style="height: 60%;"></div>
<div class="sparkline-bar" style="height: 75%;"></div>
<div class="sparkline-bar sparkline-bar-up" style="height: 90%;"></div>
<div class="sparkline-bar" style="height: 80%;"></div>
<div class="sparkline-bar" style="height: 65%;"></div>
<div class="sparkline-bar" style="height: 70%;"></div>
<div class="sparkline-bar" style="height: 55%;"></div>
</div>
</div>
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
<p class="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
<h3 class="text-3xl font-bold text-blue-600 font-mono">3.2%</h3>
<p class="text-gray-400 text-xs mt-1">Industry Avg: <span class="font-mono">2.5%</span></p>
<div class="flex items-center justify-between text-xs mt-4">
<span class="text-blue-500">Your Rate</span>
<span class="text-gray-400">Industry Avg</span>
</div>
<div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-1">
<div class="bg-blue-500 h-1.5 rounded-full" style="width: 3.2%"></div>
</div>
</div>
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
<p class="text-sm font-medium text-gray-500 mb-1">AI Token Usage</p>
<h3 class="text-3xl font-bold text-purple-600 font-mono">1.2M Tokens</h3>
<p class="text-gray-400 text-xs mt-1">Est. Cost: <span class="font-mono text-orange-500">$450.00</span></p>
<div class="sparkline mt-4">
<div class="sparkline-bar sparkline-bar-purple" style="height: 20%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 50%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 30%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 80%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 60%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 40%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 95%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 70%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 25%;"></div>
<div class="sparkline-bar sparkline-bar-purple" style="height: 55%;"></div>
</div>
</div>
<div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
<p class="text-sm font-medium text-gray-500 mb-1">Churn Rate</p>
<h3 class="text-3xl font-bold text-red-600 font-mono">1.8%</h3>
<p class="text-gray-400 text-xs mt-1">Lowest recorded this quarter</p>
<div class="sparkline mt-4">
<div class="sparkline-bar sparkline-bar-red" style="height: 90%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 70%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 50%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 30%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 20%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 15%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 18%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 22%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 25%;"></div>
<div class="sparkline-bar sparkline-bar-red" style="height: 18%;"></div>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
<div class="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
<div class="flex justify-between items-center mb-6">
<h3 class="text-lg font-bold text-gray-900">Revenue &amp; Subscription Trends</h3>
<button class="text-gray-400 hover:text-blue-600">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<div class="w-full h-64 bg-gray-50 rounded-lg relative overflow-hidden flex items-end justify-around px-2 pb-0 pt-6 gap-1 border border-dashed border-gray-200">
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 1">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 15%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 25%;"></div>
<div class="w-full gradient-free" style="height: 30%;"></div>
</div>
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 2">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 20%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 30%;"></div>
<div class="w-full gradient-free" style="height: 25%;"></div>
</div>
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 3">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 18%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 35%;"></div>
<div class="w-full gradient-free" style="height: 20%;"></div>
</div>
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 4">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 22%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 40%;"></div>
<div class="w-full gradient-free" style="height: 15%;"></div>
</div>
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 5">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 25%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 38%;"></div>
<div class="w-full gradient-free" style="height: 10%;"></div>
</div>
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 6">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 28%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 42%;"></div>
<div class="w-full gradient-free" style="height: 8%;"></div>
</div>
<div class="flex flex-col flex-grow w-full gap-0.5" title="Week 7">
<div class="w-full gradient-pro-yearly rounded-t-sm" style="height: 30%;"></div>
<div class="w-full gradient-pro-monthly" style="height: 45%;"></div>
<div class="w-full gradient-free" style="height: 5%;"></div>
</div>
<div class="absolute top-[20%] left-[calc(80%/2)] bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity">
<span class="font-bold">Week 4:</span> $12,500 <br/> <span class="text-blue-300">Pro M:</span> $7,000 <br/> <span class="text-purple-300">Pro Y:</span> $3,500 <br/> <span class="text-gray-300">Free:</span> $2,000
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
</div>
</div>
<div class="flex justify-center items-center gap-4 mt-4 text-sm text-gray-600">
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-gray-300"></span> Free Signups
                            </div>
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-blue-500"></span> Pro Monthly
                            </div>
<div class="flex items-center gap-1">
<span class="size-2 rounded-full bg-purple-500"></span> Pro Yearly
                            </div>
</div>
<div class="flex justify-between text-xs text-gray-400 mt-2 px-1">
<span>Week 1</span>
<span>Week 2</span>
<span>Week 3</span>
<span>Week 4</span>
<span>Week 5</span>
<span>Week 6</span>
<span>Week 7</span>
</div>
</div>
<div class="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
<h3 class="text-lg font-bold text-gray-900">Most Used Templates</h3>
<div class="flex justify-center items-center flex-col relative h-40">
<div class="donut-chart"></div>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
<span class="text-2xl font-bold text-gray-900 font-mono">45%</span>
<p class="text-xs text-blue-600 font-medium">Modern Tech V2</p>
</div>
</div>
<div class="flex flex-col gap-2 text-sm text-gray-700">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="size-2 rounded-full bg-blue-600"></span>
<span>Modern Tech V2</span>
</div>
<span class="font-mono text-gray-900">45%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="size-2 rounded-full bg-purple-600"></span>
<span>Creative Minimal</span>
</div>
<span class="font-mono text-gray-900">25%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="size-2 rounded-full bg-red-400"></span>
<span>Corporate Standard</span>
</div>
<span class="font-mono text-gray-900">15%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="size-2 rounded-full bg-gray-500"></span>
<span>Others</span>
</div>
<span class="font-mono text-gray-900">15%</span>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
<h3 class="text-lg font-bold text-gray-900 mb-6">AI Feature Engagement</h3>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 justify-items-center">
<div class="flex flex-col items-center">
<div class="gauge" style="--percentage: 85%;">
<div class="gauge-inner">
<span>85%</span>
</div>
</div>
<span class="gauge-label mt-4">AI Summary Generator</span>
</div>
<div class="flex flex-col items-center">
<div class="gauge" style="--percentage: 60%;">
<div class="gauge-inner">
<span>60%</span>
</div>
</div>
<span class="gauge-label mt-4">ATS Score Checker</span>
</div>
<div class="flex flex-col items-center">
<div class="gauge" style="--percentage: 40%;">
<div class="gauge-inner">
<span>40%</span>
</div>
</div>
<span class="gauge-label mt-4">Cover Letter Generator</span>
</div>
</div>
</div>
<div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
<h3 class="text-lg font-bold text-gray-900 mb-6">Geographic Distribution</h3>
<div class="world-map-container">
<div class="map-bubble size-16" style="top: 30%; left: 15%;">
<span class="text-xs text-white font-bold">USA</span>
<div class="map-bubble-tooltip">USA: 6,800 Users (Primary)</div>
</div>
<div class="map-bubble size-14" style="top: 45%; left: 70%;">
<span class="text-xs text-white font-bold">India</span>
<div class="map-bubble-tooltip">India: 4,500 Users (Top Market)</div>
</div>
<div class="map-bubble size-10" style="top: 25%; left: 50%;">
<span class="text-xs text-white font-bold">UK</span>
<div class="map-bubble-tooltip">UK: 2,100 Users</div>
</div>
<div class="map-bubble size-8" style="top: 30%; left: 55%;">
<span class="text-xs text-white font-bold">Ger</span>
<div class="map-bubble-tooltip">Germany: 1,800 Users</div>
</div>
<div class="map-bubble size-6" style="top: 60%; left: 25%; background-color: #93C5FD;">
<div class="map-bubble-tooltip">Brazil: 1,200 Users</div>
</div>
<div class="map-bubble size-4" style="top: 35%; left: 40%; background-color: #93C5FD;">
<div class="map-bubble-tooltip">Canada: 800 Users</div>
</div>
<div class="map-bubble size-4" style="top: 20%; left: 80%; background-color: #93C5FD;">
<div class="map-bubble-tooltip">Japan: 700 Users</div>
</div>
</div>
</div>
</div>
</main>
</div>
</div>

</body></html>