"use client";

import { Users, FileText, CheckCircle2, Clock, AlertCircle, Activity, Search, Bell } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ticketData = [
    { name: 'Mon', open: 4, resolved: 3 },
    { name: 'Tue', open: 3, resolved: 5 },
    { name: 'Wed', open: 7, resolved: 4 },
    { name: 'Thu', open: 2, resolved: 8 },
    { name: 'Fri', open: 6, resolved: 5 },
    { name: 'Sat', open: 1, resolved: 2 },
    { name: 'Sun', open: 0, resolved: 1 },
];

export default function HomeDashboard() {
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col space-y-8">

            {/* Top Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-md pb-4 border-b border-slate-200/60 z-10 w-full mb-2">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Resumen general del centro de ayuda
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-64 pl-10 sm:text-sm border-slate-200 rounded-xl py-2 px-3 bg-slate-50/50 focus:ring-indigo-500 focus:border-indigo-500 border transition-colors shadow-sm"
                            placeholder="Buscar tickets, chats..."
                        />
                    </div>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                        <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-indigo-50">
                            AD
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-slate-800 leading-none">Admin</p>
                            <p className="text-xs text-slate-500 mt-1">Administrador</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Stats Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Active Tickets", value: "32", icon: FileText, change: "+12%", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                    { label: "Resolved Today", value: "14", icon: CheckCircle2, change: "+4%", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                    { label: "Avg Resolution Time", value: "2.4h", icon: Clock, change: "-10%", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
                    { label: "Critical Issues", value: "3", icon: AlertCircle, change: "Requires attention", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full ${stat.bg} opacity-50 group-hover:scale-150 transition-transform duration-500 ease-in-out`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} ${stat.border} border`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') || stat.change.includes('-')
                                    ? stat.change.includes('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-700'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                                <div className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-slate-800 flex items-center">
                                <Activity className="h-4 w-4 mr-2 text-indigo-500" />
                                Ticket Volume (This Week)
                            </h3>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={ticketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dx={-10} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                                />
                                <Area type="monotone" dataKey="open" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorOpen)" name="Opened" />
                                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Links / Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
                    <h3 className="font-semibold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { title: "VPN Connection Issue", time: "10 mins ago", status: "Critical", user: "Alice S." },
                            { title: "Password Reset Request", time: "1 hr ago", status: "Resolved", user: "Bob T." },
                            { title: "New Monitor Request", time: "2 hrs ago", status: "Open", user: "Charlie D." },
                            { title: "Software Installation", time: "5 hrs ago", status: "In Progress", user: "Dana R." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                                {i !== 3 && <div className="absolute left-2 top-8 bottom-0 w-px bg-slate-200 -ml-px"></div>}
                                <div className={`relative z-10 w-4 h-4 rounded-full mt-1 shrink-0 ${item.status === 'Critical' ? 'bg-rose-500 ring-4 ring-rose-50' :
                                    item.status === 'Resolved' ? 'bg-emerald-500 ring-4 ring-emerald-50' :
                                        item.status === 'Open' ? 'bg-yellow-500 ring-4 ring-yellow-50' :
                                            'bg-blue-500 ring-4 ring-blue-50'
                                    }`}></div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-800">{item.title}</h4>
                                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                        <span>{item.time}</span>
                                        <span>•</span>
                                        <span>{item.user}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <Link href="/dashboard/tickets" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                            View all tickets &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
