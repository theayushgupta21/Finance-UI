import React, { useEffect, useState } from "react";
import { getTransactions } from "../api/axios";
import { motion } from "framer-motion";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function Insights() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTransactions().then((res) => setData(res.data));
    }, []);

    // =============================
    // 🔥 CATEGORY SPENDING (Pie)
    // =============================
    const categoryMap = {};

    data.forEach((item) => {
        if (item.type === "expense") {
            categoryMap[item.category] =
                (categoryMap[item.category] || 0) + item.amount;
        }
    });

    const pieData = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
    }));

    // =============================
    // 🔥 MONTHLY TREND (Line)
    // =============================
    const monthly = {};

    data.forEach((item) => {
        const month = item.date.slice(0, 7);

        if (!monthly[month]) {
            monthly[month] = { month, income: 0, expense: 0 };
        }

        monthly[month][item.type] += item.amount;
    });

    const lineData = Object.values(monthly);

    // =============================
    // 🔥 HIGHEST CATEGORY
    // =============================
    const highest = pieData.sort((a, b) => b.value - a.value)[0];

    // =============================
    // 🔥 OBSERVATION
    // =============================
    let observation = "No major changes detected";

    if (lineData.length >= 2) {
        const last = lineData[lineData.length - 1];
        const prev = lineData[lineData.length - 2];

        if (last.expense > prev.expense) {
            observation = "⚠️ Spending increased this month";
        } else {
            observation = "✅ Spending is under control";
        }
    }

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* 🔹 Heading */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Insights & Analytics
            </h1>

            {/* 🔹 Top Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">

                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Highest Spending</p>
                    <h2 className="text-lg font-semibold text-red-500 mt-2">
                        {highest ? `${highest.name} (₹${highest.value})` : "No data"}
                    </h2>
                </motion.div>

                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Categories</p>
                    <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                        {pieData.length}
                    </h2>
                </motion.div>

                <motion.div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Observation</p>
                    <h2 className="text-md mt-2 text-gray-800 dark:text-white">
                        {observation}
                    </h2>
                </motion.div>

            </div>

            {/* 🔹 Charts Section */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* 🥧 Pie Chart */}
                <motion.div
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2 className="text-sm text-gray-500 mb-4">
                        Spending Breakdown
                    </h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                outerRadius={80}
                                label
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={index} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* 📈 Line Chart */}
                <motion.div
                    className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h2 className="text-sm text-gray-500 mb-4">
                        Monthly Trend
                    </h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />

                            <Line type="monotone" dataKey="income" />
                            <Line type="monotone" dataKey="expense" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

            </div>
        </div>
    );
}