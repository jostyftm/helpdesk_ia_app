"use client";

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, Legend
} from 'recharts';
import { Download, Calendar, Filter } from "lucide-react";

// Mock Data
const volumeData = [
    { name: 'Mon', created: 65, resolved: 45 },
    { name: 'Tue', created: 52, resolved: 50 },
    { name: 'Wed', created: 78, resolved: 65 },
    { name: 'Thu', created: 45, resolved: 55 },
    { name: 'Fri', created: 89, resolved: 70 },
    { name: 'Sat', created: 35, resolved: 40 },
    { name: 'Sun', created: 25, resolved: 30 },
];

const channelData = [
    { name: 'Web Portal', value: 400 },
    { name: 'Email', value: 300 },
    { name: 'Phone', value: 150 },
    { name: 'Chat', value: 100 },
];

const satisfactionData = [
    { name: 'Week 1', satisfaction: 4.2, responseTime: 2.5 },
    { name: 'Week 2', satisfaction: 4.3, responseTime: 2.2 },
    { name: 'Week 3', satisfaction: 4.1, responseTime: 2.8 },
    { name: 'Week 4', satisfaction: 4.6, responseTime: 1.5 },
];

const agentPerformance = [
    { name: 'John D.', tickets: 145, avgTime: 1.2 },
    { name: 'Sarah M.', tickets: 132, avgTime: 1.5 },
    { name: 'Mike T.', tickets: 98, avgTime: 2.1 },
    { name: 'Alice S.', tickets: 115, avgTime: 1.8 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e'];

export default function ReportsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 h-full flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Reporting & Analytics
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">Comprehensive overview of helpdesk performance metrics.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                        Last 30 Days
                    </button>
                    <button className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                        <Filter className="h-4 w-4 mr-2 text-slate-400" />
                        Filters
                    </button>
                    <button className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:shadow-md">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

                {/* Ticket Volume */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 100C0 44.7715 44.7715 0 100 0V100H0Z" fill="#6366f1" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">Ticket Volume Trend</h3>
                    <div className="h-80 relative z-10 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ fontWeight: 600 }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Area type="monotone" dataKey="created" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCreated)" name="Tickets Created" />
                                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" name="Tickets Resolved" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Channels */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Tickets by Channel</h3>
                    <div className="h-64 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={channelData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {channelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* SLA & Rating */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Quality of Service</h3>
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-100">+0.4 CSAT</span>
                    </div>
                    <div className="h-64 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={satisfactionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#f59e0b', fontSize: 12 }} domain={[0, 5]} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#3b82f6', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="CSAT (Out of 5)" />
                                <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} name="Avg Response (Hours)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Agent Performance */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Agent Performance Snapshot</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={agentPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} width={80} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                <Bar dataKey="tickets" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} name="Tickets Closed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
