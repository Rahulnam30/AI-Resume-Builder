import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F3F4F6]">
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center text-sm text-gray-500">
                        <Link className="hover:text-primary transition-colors" to="/admin/dashboard">Home</Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="font-medium text-gray-900">System Settings</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
                            <p className="text-gray-500 mt-1">Manage global configurations, security preferences, and system defaults.</p>
                        </div>
                        <button className="px-4 py-2 bg-royal-blue text-white text-sm font-bold rounded-lg shadow-md shadow-royal-blue/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            Save Changes
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 -mb-px overflow-x-auto">
                            {['general', 'security', 'email', 'notifications'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                                        ${activeTab === tab
                                            ? 'border-royal-blue text-royal-blue'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                    `}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        {activeTab === 'general' && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">General Configuration</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                                            <input type="text" defaultValue="ResumeAI" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                                            <input type="email" defaultValue="support@resumeai.com" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                                                <p className="text-xs text-gray-500 mt-1">Prevent users from accessing the site during updates.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Branding</h3>
                                    <div className="flex items-center gap-6">
                                        <div className="size-24 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                                            <span className="material-symbols-outlined text-3xl">image</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900">Logo Upload</h4>
                                            <p className="text-xs text-gray-500 mt-1 mb-3">Recommended size: 512x512px. PNG or JPG.</p>
                                            <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                                Choose File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Authentication Policy</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                                            <input type="number" defaultValue="8" className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3">
                                                <input type="checkbox" defaultChecked className="text-royal-blue focus:ring-royal-blue rounded border-gray-300" />
                                                <span className="text-sm text-gray-700">Require special characters (!@#$)</span>
                                            </label>
                                            <label className="flex items-center gap-3">
                                                <input type="checkbox" defaultChecked className="text-royal-blue focus:ring-royal-blue rounded border-gray-300" />
                                                <span className="text-sm text-gray-700">Require numbers</span>
                                            </label>
                                            <label className="flex items-center gap-3">
                                                <input type="checkbox" defaultChecked className="text-royal-blue focus:ring-royal-blue rounded border-gray-300" />
                                                <span className="text-sm text-gray-700">Require uppercase letters</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-gray-100" />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Multi-Factor Authentication (MFA)</h4>
                                        <p className="text-xs text-gray-500 mt-1">Force all admin users to use 2FA.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                                        <p className="text-xs text-gray-500 mt-1">Automatically log out inactive users.</p>
                                    </div>
                                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-royal-blue">
                                        <option>15 Minutes</option>
                                        <option>30 Minutes</option>
                                        <option>1 Hour</option>
                                        <option>4 Hours</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'email' && (
                            <div className="flex flex-col gap-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">SMTP Configuration</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                                        <input type="text" placeholder="smtp.example.com" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                                        <input type="number" placeholder="587" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                                        <select className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all">
                                            <option>TLS</option>
                                            <option>SSL</option>
                                            <option>None</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" />
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                                    <span className="material-symbols-outlined text-blue-600 mt-0.5">info</span>
                                    <div className="text-sm text-blue-800">
                                        <p className="font-semibold mb-1">Test Connection</p>
                                        <p>Save your settings before sending a test email to ensure the configuration works correctly.</p>
                                        <button className="mt-2 text-blue-700 hover:text-blue-900 font-medium underline">Send Test Email</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="flex flex-col gap-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Alert Preferences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <span className="material-symbols-outlined">person_add</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">New User Signups</h4>
                                                <p className="text-xs text-gray-500">Notify when a new user registers.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <span className="material-symbols-outlined">payments</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">New Subscription</h4>
                                                <p className="text-xs text-gray-500">Notify when a user upgrades to Pro.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                                <span className="material-symbols-outlined">warning</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">System Errors</h4>
                                                <p className="text-xs text-gray-500">Receive alerts for critical system failures.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminSettings;
