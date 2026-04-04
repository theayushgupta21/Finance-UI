import React, { useEffect, useState } from "react";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { getTransactions } from "../api/axios";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTransactions().then((res) => setData(res.data));
    }, []);

    // =============================
    // 🔥 CALCULATIONS
    // =============================
    const income = data
        .filter((i) => i.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const expense = data
        .filter((i) => i.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    const balance = income - expense;

    // =============================
    // 🔥 MONTHLY TREND
    // =============================
    const monthly = {};

    data.forEach((item) => {
        const month = item.date.slice(0, 7);

        if (!monthly[month]) {
            monthly[month] = { month, balance: 0 };
        }

        monthly[month].balance +=
            item.type === "income" ? item.amount : -item.amount;
    });

    const chartData = Object.values(monthly);

    // =============================
    // 🔥 CATEGORY BREAKDOWN
    // =============================
    const categoryMap = {};

    data.forEach((item) => {
        if (item.type === "expense") {
            categoryMap[item.category] =
                (categoryMap[item.category] || 0) + item.amount;
        }
    });

    const categories = Object.entries(categoryMap);

    // =============================
    // 🔥 RECENT TRANSACTIONS
    // =============================
    const recent = [...data].slice(-3).reverse();

    return (
        <div className="flex-1 overflow-auto p-6">

            {/* Header */}
            <div className="mb-6">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-extrabold text-gray-800 dark:text-white"
                >
                    Dashboard
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 text-sm mt-1"
                >
                    Welcome back! Here’s your financial overview.
                </motion.p>
            </div>

            {/* 🔹 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 flex justify-between items-center group hover:border-indigo-500/50 transition-colors"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</p>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-1 group-hover:text-indigo-500 transition-colors">
                            ₹{balance}
                        </h2>
                    </div>
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                        <Wallet className="text-indigo-600 dark:text-indigo-400" size={28} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 flex justify-between items-center group hover:border-emerald-500/50 transition-colors"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Income</p>
                        <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                            ₹{income}
                        </h2>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                        <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={28} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 flex justify-between items-center group hover:border-rose-500/50 transition-colors"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expenses</p>
                        <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                            ₹{expense}
                        </h2>
                    </div>
                    <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl">
                        <TrendingDown className="text-rose-600 dark:text-rose-400" size={28} />
                    </div>
                </motion.div>

            </div>

            {/* 🔹 Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* 📈 Balance Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6 relative overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                            Balance Trend
                        </h2>
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <BarChart3 size={18} className="text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <Tooltip
                                    cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', background: 'var(--tw-colors-gray-900)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* 📊 Spending Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card p-6"
                >
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
                        Spending Breakdown
                    </h2>

                    <div className="space-y-4">
                        {categories.map(([name, value], idx) => {
                            const maxVal = Math.max(...categories.map(c => c[1]));
                            const percentage = (value / maxVal) * 100;
                            return (
                                <div key={name} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-gray-700 dark:text-gray-300 capitalize">{name}</span>
                                        <span className="text-gray-900 dark:text-white font-bold">₹{value}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>

            {/* 🔹 Recent Transactions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        Recent Transactions
                    </h2>
                    <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-gray-500 dark:text-gray-400 border-b dark:border-gray-700/50">
                                <th className="py-3 font-medium">Category</th>
                                <th className="py-3 font-medium">Date</th>
                                <th className="py-3 font-medium">Amount</th>
                                <th className="py-3 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recent.map((item) => (
                                <tr key={item.id} className="border-b dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="py-3">
                                        <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{item.category}</span>
                                    </td>
                                    <td className="py-3 text-gray-500 dark:text-gray-400">{item.date}</td>
                                    <td
                                        className={`py-3 font-medium ${item.type === "income"
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-rose-600 dark:text-rose-400"
                                            }`}
                                    >
                                        {item.type === "income" ? "+" : "-"}₹{item.amount}
                                    </td>
                                    <td className="py-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.type === "income"
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                                            }`}>
                                            {item.type === "income" ? "Received" : "Completed"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </motion.div>
        </div>
    );
}