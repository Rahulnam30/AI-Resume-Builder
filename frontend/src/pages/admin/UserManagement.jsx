import React from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#F3F4F6]">
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                <Link className="hover:text-primary transition-colors" to="/admin/dashboard">Home</Link>
                                <span className="mx-2 text-gray-300">/</span>
                                <span className="font-medium text-gray-700">Users</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-royal-blue text-white text-sm font-bold rounded-lg shadow-md shadow-royal-blue/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add New User
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full md:w-auto">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </span>
                            <input className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all" placeholder="Search by name, email, or ID..." type="text" />
                        </div>
                        <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
                            <div className="relative">
                                <select className="pl-4 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-royal-blue focus:border-royal-blue w-full md:w-28 appearance-none">
                                    <option>All Roles</option>
                                    <option>Admin</option>
                                    <option>User</option>
                                    <option>Editor</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">expand_more</span>
                            </div>
                            <div className="relative">
                                <select className="pl-4 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-royal-blue focus:border-royal-blue w-full md:w-28 appearance-none">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Banned</option>
                                    <option>Pending</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none">expand_more</span>
                            </div>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Export CSV
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[200px]">User</th>
                                        <th className="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">Role</th>
                                        <th className="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">Status</th>
                                        <th className="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">Plan</th>
                                        <th className="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[120px]">Date Joined</th>
                                        <th className="p-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right min-w-[100px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center" data-alt="User avatar male" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8UEyE9PszwDrZeww8zBYZb_CRyiha2Yc982ntPOG_Une5Exetk0J7Z6PjVJc1yBw58-FSlOYIf2NC_po5tdIpacqDRlag1LKjjhiaHKHrnZRaynksPzIRVGwNQ9XFUUoLo0Ax9Z0ssUVolD89pxDd0BJ941e9oJV-ibiGTLjdKHB-dwWrkV-3WJ8yhZforAS09XT7gHlpssVhaTn9VNY0ShHy7YuBpNw4AdebCQ7u9S5ci4r8nnNv63moA0Noe_HZiIQyKWLjoUw")' }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">John Doe</span>
                                                    <span className="text-xs text-gray-500">john.d@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">User</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Pro</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 14, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center" data-alt="User avatar female" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkwWqj9ncbhy_lkfmwGp2N5NG0Yr8IGCpjCcwAIbvEeUaoHmaewNa_Kxex7J9-5nxKrdtBkA3PjSzpcTeCcJhc8ZuVC-oHpNMVMHE07kKGN0cxJR2XS9lnpAjk4aal-8fqy2rxRp9bEibpqHHr6p2-xTkgnuFrDmOGH-lKBmYvHZMfyh6xNtYJJqiQV1oByrmKjE9MpJPwl4Pk7_keL2U_AD62QbT-QQjej3ZUbBsRQlZLvC2cuajGAVUF8LWhI7LiNhJfoRTN5O0")' }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Sarah Smith</span>
                                                    <span className="text-xs text-gray-500">sarah.s@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Admin</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Enterprise</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 13, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs" data-alt="User avatar initials">
                                                    MJ
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Michael Johnson</span>
                                                    <span className="text-xs text-gray-500">mj.dev@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Editor</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Free</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 12, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center" data-alt="User avatar male" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkRvazwtijERJw0vJX-g68uJNgsDzo1dwiF7Hz9J1dRjv76RMQsMQwUd8Ue6_rl6kPZ8gmezEEBY_GCJDbnHHZRwZKNzhcXrer0AFRoUztCOnb5q4pbIZZO7LW9D34f6fMh0cdhn1K1sb12bsMadaciiTMd7G_MrRvCZX__0qiiH7XgcvlAIXXeP-5jh6AJpF9m25CQ1839U-1Or9Xvd_Bs8Y-F1nSBApl5AIB5q7a9ZlK9sIGoqgxPkGOakrd0e5wtowxbsEe0hQ")' }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">David Wilson</span>
                                                    <span className="text-xs text-gray-500">david.w@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">User</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Banned
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Free</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 11, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-green-200 flex items-center justify-center text-green-700 font-bold text-xs" data-alt="User avatar initials">
                                                    AE
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Anna Evans</span>
                                                    <span className="text-xs text-gray-500">anna.e@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">User</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Pro</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 10, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs" data-alt="User avatar initials">
                                                    CM
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Chris Miller</span>
                                                    <span className="text-xs text-gray-500">chris.m@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Editor</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Free</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 09, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs" data-alt="User avatar initials">
                                                    LP
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Laura Perez</span>
                                                    <span className="text-xs text-gray-500">laura.p@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">User</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Pro</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 08, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-red-200 flex items-center justify-center text-red-700 font-bold text-xs" data-alt="User avatar initials">
                                                    RK
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Robert King</span>
                                                    <span className="text-xs text-gray-500">robert.k@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Admin</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Enterprise</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 07, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-xs" data-alt="User avatar initials">
                                                    JP
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Jessica Parker</span>
                                                    <span className="text-xs text-gray-500">jessica.p@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">User</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Free</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 06, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center bg-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs" data-alt="User avatar initials">
                                                    SM
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">Steven Miller</span>
                                                    <span className="text-xs text-gray-500">steven.m@example.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">User</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">Pro</td>
                                        <td className="p-4 text-sm text-gray-500">Nov 05, 2023</td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-royal-blue transition-colors p-1">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-1">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                            <span className="text-sm text-gray-500">Showing 1-10 of 2,450 results</span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                                <button className="px-3 py-1 border border-royal-blue bg-royal-blue text-white rounded-lg text-sm font-medium">1</button>
                                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">2</button>
                                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">3</button>
                                <span className="text-gray-500 text-sm">...</span>
                                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">245</button>
                                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserManagement;
