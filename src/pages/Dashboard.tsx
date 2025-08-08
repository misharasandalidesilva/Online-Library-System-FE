import React from "react";
import {
    BookOpen,
    Users,
    Calendar,
    DollarSign,
    Bell,
    User,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const statCards = [
    {
        id: 1,
        label: "Total Books",
        value: "1,540",
        icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    },
    {
        id: 2,
        label: "Active Members",
        value: "785",
        icon: <Users className="w-6 h-6 text-emerald-600" />,
    },
    {
        id: 3,
        label: "Books Issued",
        value: "412",
        icon: <Calendar className="w-6 h-6 text-emerald-600" />,
    },
    {
        id: 4,
        label: "Total Fines",
        value: "$980",
        icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
    },
];

const chartData = [
    { month: "Jan", books: 100 },
    { month: "Feb", books: 120 },
    { month: "Mar", books: 160 },
    { month: "Apr", books: 140 },
    { month: "May", books: 180 },
    { month: "Jun", books: 220 },
    { month: "Jul", books: 250 },
];

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-emerald-100 font-sans">
            {/* Header */}
            <header
                className="w-full px-6 py-4 flex justify-between items-center bg-white/60 backdrop-blur-md shadow-sm">
                <div>
                <h2 className="text-3xl font-bold text-emerald-800 tracking-tight">📚 Library Dashboard</h2>
                <p className="text-teal-600 text-sm mt-1">Here’s a summary of this month's library activity</p></div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="w-6 h-6 text-emerald-700"/>
                        <span
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              3
            </span>
                    </div>
                    <div
                        className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                        <User className="w-5 h-5 text-white"/>
                    </div>
                </div>
            </header>

            {/* Stat Cards */}
            <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white/60 backdrop-blur-md border border-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                                <h3 className="text-3xl font-bold text-emerald-900 mt-1">{card.value}</h3>
                            </div>
                            <div className="bg-emerald-100 p-2 rounded-full">{card.icon}</div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Chart */}
            <section className="px-6 pb-6">
                <div className="bg-white/70 backdrop-blur-md border border-emerald-100 p-6 rounded-2xl shadow-lg transition-all hover:shadow-2xl">
                    <h4 className="text-xl font-semibold text-emerald-800 mb-4">
                        Monthly Borrowed Books Overview
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                            <XAxis dataKey="month" stroke="#065f46" />
                            <YAxis stroke="#065f46" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#ecfdf5",
                                    borderRadius: "8px",
                                    border: "1px solid #a7f3d0",
                                }}
                            />
                            <Line type="monotone" dataKey="books" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
































// // File: src/pages/Dashboard.tsx
// // Updated Unique Look - Online Library System Dashboard
// import { useState } from 'react';
// import {
//     BookOpen,
//     Users,
//     Calendar,
//     DollarSign,
//     TrendingUp,
//     TrendingDown,
//     User,
//     Bell,
//     Search,
//     Settings
// } from 'lucide-react';
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     ResponsiveContainer,
//     AreaChart,
//     Area
// } from 'recharts';
//
// export default function Dashboard() {
//     const [notifications] = useState(3);
//
//     const monthlyData = [
//         { month: 'Jan', revenue: 4200, books: 45 },
//         { month: 'Feb', revenue: 4800, books: 52 },
//         { month: 'Mar', revenue: 5200, books: 48 },
//         { month: 'Apr', revenue: 4900, books: 55 },
//         { month: 'May', revenue: 5800, books: 62 },
//         { month: 'Jun', revenue: 6200, books: 58 }
//     ];
//
//     const borrowingTrend = [
//         { week: 'Week 1', borrowed: 45 },
//         { week: 'Week 2', borrowed: 52 },
//         { week: 'Week 3', borrowed: 48 },
//         { week: 'Week 4', borrowed: 65 },
//         { week: 'Week 5', borrowed: 58 },
//         { week: 'Week 6', borrowed: 72 }
//     ];
//
//     const statsCards = [
//         {
//             title: 'Total Members',
//             value: '1,250',
//             change: '+12%',
//             trend: 'up',
//             subtitle: 'from last month',
//             icon: Users,
//             iconBg: 'bg-gradient-to-tr from-teal-100 to-cyan-100',
//             iconColor: 'text-teal-600'
//         },
//         {
//             title: 'Total Books',
//             value: '8,950',
//             change: '+8%',
//             trend: 'up',
//             subtitle: 'from last month',
//             icon: BookOpen,
//             iconBg: 'bg-gradient-to-tr from-green-100 to-emerald-100',
//             iconColor: 'text-green-600'
//         },
//         {
//             title: 'Books Borrowed',
//             value: '342',
//             change: '-5%',
//             trend: 'down',
//             subtitle: 'from last month',
//             icon: Calendar,
//             iconBg: 'bg-gradient-to-tr from-sky-100 to-blue-100',
//             iconColor: 'text-sky-600'
//         },
//         {
//             title: 'Monthly Revenue',
//             value: '$6,750.50',
//             change: '+15%',
//             trend: 'up',
//             subtitle: 'from last month',
//             icon: DollarSign,
//             iconBg: 'bg-gradient-to-tr from-lime-100 to-yellow-100',
//             iconColor: 'text-lime-600'
//         }
//     ];
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//             {/* Header */}
//             <header className="bg-white border-b border-teal-300 shadow-sm sticky top-0 z-20">
//                 <div className="px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-3xl font-bold text-teal-800 tracking-tight">📚 Library Dashboard</h1>
//                             <p className="text-teal-600 text-sm mt-1">Here’s a summary of this month's library activity</p>
//                         </div>
//
//                         <div className="flex items-center space-x-4">
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     className="pl-10 pr-4 py-2 border border-teal-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-72"
//                                 />
//                             </div>
//                             <button className="relative p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-lg transition-colors">
//                                 <Bell className="w-6 h-6" />
//                                 {notifications > 0 && (
//                                     <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                     {notifications}
//                   </span>
//                                 )}
//                             </button>
//                             <button className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-100 rounded-lg transition-colors">
//                                 <Settings className="w-6 h-6" />
//                             </button>
//                             <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center shadow-md">
//                                 <User className="w-6 h-6 text-white" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//
//             {/* Main */}
//             <main className="px-6 py-8 max-w-7xl mx-auto">
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//                     {statsCards.map((card, i) => {
//                         const Icon = card.icon;
//                         return (
//                             <div
//                                 key={i}
//                                 className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
//                             >
//                                 <div className="flex justify-between items-center mb-4">
//                                     <div className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center`}>
//                                         <Icon className={`w-7 h-7 ${card.iconColor}`} />
//                                     </div>
//                                     <div
//                                         className={`flex items-center text-sm font-medium space-x-1 ${
//                                             card.trend === 'up' ? 'text-green-600' : 'text-red-500'
//                                         }`}
//                                     >
//                                         {card.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
//                                         <span>{card.change}</span>
//                                     </div>
//                                 </div>
//                                 <p className="text-sm text-teal-700">{card.title}</p>
//                                 <h3 className="text-3xl font-extrabold text-gray-900">{card.value}</h3>
//                                 <p className="text-sm text-gray-400">{card.subtitle}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//
//                 {/* Charts */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
//                         <h2 className="text-xl font-semibold text-teal-900 mb-1">📈 Monthly Revenue</h2>
//                         <p className="text-sm text-gray-500 mb-4">Library earnings from fees and fines</p>
//                         <div className="h-80">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <AreaChart data={monthlyData}>
//                                     <defs>
//                                         <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
//                                             <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
//                                             <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
//                                         </linearGradient>
//                                     </defs>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
//                                     <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                                     <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
//                                     <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fill="url(#revenueGradient)" strokeWidth={3} />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//
//                     <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
//                         <h2 className="text-xl font-semibold text-teal-900 mb-1">📚 Borrowing Trend</h2>
//                         <p className="text-sm text-gray-500 mb-4">Weekly statistics of book borrowing</p>
//                         <div className="h-80">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={borrowingTrend}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
//                                     <XAxis dataKey="week" tick={{ fontSize: 12 }} />
//                                     <YAxis tick={{ fontSize: 12 }} />
//                                     <Line type="monotone" dataKey="borrowed" stroke="#14b8a6" strokeWidth={3} />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
