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
    LineChart,
    Line,
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
        <div className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Welcome back! Here’s your financial overview.
                </p>
            </div>

            {/* 🔹 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm flex justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Total Balance</p>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-1">
                            ₹{balance}
                        </h2>
                    </div>
                    <Wallet className="text-indigo-500" size={28} />
                </motion.div>

                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm flex justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Income</p>
                        <h2 className="text-xl font-semibold text-green-600 mt-1">
                            ₹{income}
                        </h2>
                    </div>
                    <TrendingUp className="text-green-500" size={28} />
                </motion.div>

                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm flex justify-between">
                    <div>
                        <p className="text-sm text-gray-500">Expenses</p>
                        <h2 className="text-xl font-semibold text-red-500 mt-1">
                            ₹{expense}
                        </h2>
                    </div>
                    <TrendingDown className="text-red-500" size={28} />
                </motion.div>

            </div>

            {/* 🔹 Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* 📈 Balance Trend */}
                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between mb-4">
                        <h2 className="font-semibold text-gray-800 dark:text-white">
                            Balance Trend
                        </h2>
                        <BarChart3 size={20} />
                    </div>

                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="balance" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* 📊 Spending Breakdown */}
                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                    <h2 className="font-semibold text-gray-800 dark:text-white mb-4">
                        Spending Breakdown
                    </h2>

                    <div className="space-y-3">
                        {categories.map(([name, value]) => (
                            <div key={name} className="flex justify-between text-sm">
                                <span>{name}</span>
                                <span>₹{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* 🔹 Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                <h2 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Recent Transactions
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b dark:border-gray-700">
                                <th className="py-2">Category</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recent.map((item) => (
                                <tr key={item.id} className="border-b dark:border-gray-700">
                                    <td className="py-2">{item.category}</td>
                                    <td>{item.date}</td>
                                    <td
                                        className={
                                            item.type === "income"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }
                                    >
                                        {item.type === "income" ? "+" : "-"}₹{item.amount}
                                    </td>
                                    <td>
                                        {item.type === "income" ? "Received" : "Completed"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}