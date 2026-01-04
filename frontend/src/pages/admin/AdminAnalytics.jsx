import React from 'react';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F3F4F6]">
            {/* Styles for charts */}
            <style>{`
                .donut-chart {
                    position: relative;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    background: conic-gradient(#2563EB 0% 45%, #A855F7 45% 70%, #F87171 70% 85%, #6B7280 85% 100%);
                }
                .donut-chart::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    background-color: white;
                    border-radius: 50%;
                }

                .sparkline {
                    display: flex;
                    align-items: flex-end;
                    height: 40px;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }
                .sparkline-bar {
                    flex-grow: 1;
                    background-color: #A7F3D0;
                    margin-right: 1px;
                    border-radius: 1px;
                    transition: height 0.3s ease;
                }
                .sparkline-bar-up { background-color: #34D399; }
                .sparkline-bar-red { background-color: #FCA5A5; }
                .sparkline-bar-purple { background-color: #E9D5FF; }
                .gradient-free { background: linear-gradient(to top, #E5E7EB, #F3F4F6); }
                .gradient-pro-monthly { background: linear-gradient(to top, #60A5FA, #93C5FD); }
                .gradient-pro-yearly { background: linear-gradient(to top, #A78BFA, #C4B5FD); }

            `}</style>

            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-20 flex-shrink-0">
                <div className="flex items-center gap-4 flex-1">
                    {/* Mobile menu button removed as it's handled by generic layout */}
                    <div className="hidden md:flex relative w-full max-w-md ml-4 invisible"> {/* Keeping space but hidden */}
                        <input className="hidden" />
                    </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-6">
                    <div className="relative group">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            Last 30 Days
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30 hidden group-hover:block">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Last 30 Days</a>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Last Quarter</a>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="#">Year to Date</a>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Report
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link className="hover:text-primary transition-colors" to="/admin/dashboard">Home</Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="font-medium text-gray-900">System Analytics</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Analytics</h1>
                            <p className="text-gray-500 mt-1">Deep dive into your platform's performance and user engagement.</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {/* User Growth */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                            <p className="text-sm font-medium text-gray-500 mb-1">User Growth Rate</p>
                            <h3 className="text-3xl font-bold text-green-600 font-mono flex items-center">
                                +12.5%
                                <span className="material-symbols-outlined text-green-600 text-2xl ml-1">arrow_upward</span>
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">vs previous 30 days</p>
                            <div className="sparkline mt-4">
                                <div className="sparkline-bar" style={{ height: '30%' }}></div>
                                <div className="sparkline-bar" style={{ height: '45%' }}></div>
                                <div className="sparkline-bar" style={{ height: '35%' }}></div>
                                <div className="sparkline-bar" style={{ height: '60%' }}></div>
                                <div className="sparkline-bar" style={{ height: '75%' }}></div>
                                <div className="sparkline-bar sparkline-bar-up" style={{ height: '90%' }}></div>
                                <div className="sparkline-bar" style={{ height: '80%' }}></div>
                                <div className="sparkline-bar" style={{ height: '65%' }}></div>
                                <div className="sparkline-bar" style={{ height: '70%' }}></div>
                                <div className="sparkline-bar" style={{ height: '55%' }}></div>
                            </div>
                        </div>

                        {/* Conversion Rate */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                            <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
                            <h3 className="text-3xl font-bold text-blue-600 font-mono">3.2%</h3>
                            <p className="text-gray-400 text-xs mt-1">Industry Avg: <span className="font-mono">2.5%</span></p>
                            <div className="flex items-center justify-between text-xs mt-4">
                                <span className="text-blue-500">Your Rate</span>
                                <span className="text-gray-400">Industry Avg</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mt-1">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '3.2%' }}></div>
                            </div>
                        </div>

                        {/* AI Token Usage */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                            <p className="text-sm font-medium text-gray-500 mb-1">AI Token Usage</p>
                            <h3 className="text-3xl font-bold text-purple-600 font-mono">1.2M Tokens</h3>
                            <p className="text-gray-400 text-xs mt-1">Est. Cost: <span className="font-mono text-orange-500">$450.00</span></p>
                            <div className="sparkline mt-4">
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '20%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '50%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '30%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '80%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '60%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '40%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '95%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '70%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '25%' }}></div>
                                <div className="sparkline-bar sparkline-bar-purple" style={{ height: '55%' }}></div>
                            </div>
                        </div>

                        {/* Churn Rate */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                            <p className="text-sm font-medium text-gray-500 mb-1">Churn Rate</p>
                            <h3 className="text-3xl font-bold text-red-600 font-mono">1.8%</h3>
                            <p className="text-gray-400 text-xs mt-1">Lowest recorded this quarter</p>
                            <div className="sparkline mt-4">
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '90%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '70%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '50%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '30%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '20%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '15%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '18%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '22%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '25%' }}></div>
                                <div className="sparkline-bar sparkline-bar-red" style={{ height: '18%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                        {/* Revenue Trends */}
                        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Revenue & Subscription Trends</h3>
                                <button className="text-gray-400 hover:text-blue-600">
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                            </div>
                            <div className="w-full h-64 bg-gray-50 rounded-lg relative overflow-hidden flex items-end justify-around px-2 pb-0 pt-6 gap-1 border border-dashed border-gray-200">
                                {['15%', '20%', '18%', '22%', '25%', '28%', '30%'].map((val, i) => (
                                    <div key={i} className="flex flex-col flex-grow w-full gap-0.5" title={`Week ${i + 1}`}>
                                        <div className="w-full gradient-pro-yearly rounded-t-sm" style={{ height: val }}></div>
                                        <div className="w-full gradient-pro-monthly" style={{ height: parseInt(val) + 10 + '%' }}></div>
                                        <div className="w-full gradient-free" style={{ height: 30 - i * 4 + '%' }}></div>
                                    </div>
                                ))}
                                <div className="absolute top-[20%] left-[calc(80%/2)] bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity">
                                    <span className="font-bold">Week 4:</span> $12,500 <br /> <span className="text-blue-300">Pro M:</span> $7,000 <br /> <span className="text-purple-300">Pro Y:</span> $3,500 <br /> <span className="text-gray-300">Free:</span> $2,000
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-gray-300"></span> Free Signups
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-blue-500"></span> Pro Monthly
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-purple-500"></span> Pro Yearly
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                                <span>Week 1</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                                <span>Week 5</span>
                                <span>Week 6</span>
                                <span>Week 7</span>
                            </div>
                        </div>

                        {/* Most Used Templates */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-6">
                            <h3 className="text-lg font-bold text-gray-900">Most Used Templates</h3>
                            <div className="flex justify-center items-center flex-col relative h-40">
                                <div className="donut-chart"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <span className="text-2xl font-bold text-gray-900 font-mono">45%</span>
                                    <p className="text-xs text-blue-600 font-medium">Modern Tech V2</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-blue-600"></span>
                                        <span>Modern Tech V2</span>
                                    </div>
                                    <span className="font-mono text-gray-900">45%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-purple-600"></span>
                                        <span>Creative Minimal</span>
                                    </div>
                                    <span className="font-mono text-gray-900">25%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-red-400"></span>
                                        <span>Corporate Standard</span>
                                    </div>
                                    <span className="font-mono text-gray-900">15%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-gray-500"></span>
                                        <span>Others</span>
                                    </div>
                                    <span className="font-mono text-gray-900">15%</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
};

export default AdminAnalytics;
