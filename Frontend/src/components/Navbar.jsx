import React from "react";
import { User, Bell, Menu } from "lucide-react";
import { useUIStore } from "../store/useUIStore";

export default function Navbar({ role, setRole }) {

    const toggleSidebar = useUIStore((state) => state.toggleSidebar);

    return (
        <div className="w-full h-16 bg-white dark:bg-gray-900 border-b flex items-center justify-between px-6 shadow-sm">

            {/* Left */}
            <div className="flex items-center gap-3">

                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <Menu size={20} />
                </button>

                {/* 🔥 Brand */}


            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                <div className="relative">
                    <Bell size={18} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg tracking-tight text-gray-600 dark:text-gray-300">
                    <User size={17} />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-transparent outline-none text-sm"
                    >
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                        AG
                    </div>
                </div>

            </div>
        </div>
    );
}