import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Transactions({ role }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    // 🔥 Fetch from db.json
    useEffect(() => {
        axios.get("http://localhost:3000/transactions")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    // 🔍 Filter Logic
    const filteredData = data.filter((item) => {
        return (
            item.category.toLowerCase().includes(search.toLowerCase()) &&
            (typeFilter === "all" || item.type === typeFilter)
        );
    });
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        category: "",
        amount: "",
        type: "expense",
        date: "",
        description: "",
    });
    const handleAdd = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/transactions",
                {
                    ...form,
                    amount: Number(form.amount),
                }
            );

            setData((prev) => [...prev, res.data]);
            setShowModal(false);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Transactions
                </h1>

                {role === "admin" && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                    >
                        + Add
                    </button>
                )}
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[300px] space-y-4">

                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Add Transaction
                            </h2>

                            <input
                                placeholder="Category"
                                className="w-full p-2 border rounded"
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                            />

                            <input
                                placeholder="Amount"
                                type="number"
                                className="w-full p-2 border rounded"
                                onChange={(e) =>
                                    setForm({ ...form, amount: e.target.value })
                                }
                            />

                            <select
                                className="w-full p-2 border rounded"
                                onChange={(e) =>
                                    setForm({ ...form, type: e.target.value })
                                }
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>

                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                            />

                            <input
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1 text-gray-500"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAdd}
                                    className="px-3 py-1 bg-indigo-500 text-white rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-3">

                {filteredData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        {/* Left */}
                        <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                                {item.category}
                            </p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                            <p className="text-xs text-gray-400">{item.description}</p>
                        </div>

                        {/* Right */}
                        <div
                            className={`flex items-center gap-2 font-semibold
                            ${item.type === "income" ? "text-green-600" : "text-red-500"}`}
                        >
                            {item.type === "income" ? (
                                <ArrowUpRight size={18} />
                            ) : (
                                <ArrowDownRight size={18} />
                            )}
                            ₹{item.amount}
                        </div>
                    </motion.div>
                ))}

                {/* Empty */}
                {filteredData.length === 0 && (
                    <p className="text-center text-gray-500">No results found</p>
                )}
            </div>
        </div>
    );
}