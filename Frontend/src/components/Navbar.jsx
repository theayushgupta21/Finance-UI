import React, { useEffect, useState } from "react";
import { Moon, Sun, User, Bell } from "lucide-react";

function Navbar({ role, setRole }) {
    const [darkMode, setDarkMode] = useState(true);

    // Theme toggle
    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 transition flex justify-between items-center  px-6 py-3">

            <div className="flex justify-between items-center px-6 py-3">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-xl font-bold">

                    </div>
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Finance
                    </h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">

                    {/* Notification Icon */}
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <Bell size={18} />
                    </button>

                    {/* Role Selector */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
                        <User size={16} />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-transparent outline-none text-sm text-gray-700 dark:text-white"
                        >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Profile Avatar */}
                    <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold cursor-pointer">

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;