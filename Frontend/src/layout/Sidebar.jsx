import React from "react";
import {
    LayoutDashboard,
    Receipt,
    BarChart3,
} from "lucide-react";
import { useUIStore } from "../store/useUIStore";

export default function Sidebar({ active, setActive }) {
    const sidebarOpen = useUIStore((state) => state.sidebarOpen);

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Transactions", icon: Receipt },
        { name: "Insights", icon: BarChart3 },
    ];

    return (
        <div
            className={`h-screen bg-white dark:bg-gray-900 border-r 
      transition-all duration-300 ease-in-out
      ${sidebarOpen ? "w-64" : "w-20"}`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b">
                <span className="text-lg font-bold text-gray-800 dark:text-white tracking-tight relative group cursor-pointer">

                    {sidebarOpen ? "💰 Lix Finance" : "💰"}

                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-200 transition-all duration-300 group-hover:w-full"></span>

                </span>
            </div>

            {/* Menu */}
            <ul className="p-3 space-y-2">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = active === item.name;

                    return (
                        <li
                            key={index}
                            onClick={() => setActive(item.name)}
                            className={`group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
              
                                    $isActive
                                   ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 border-l-4 border-indigo-500"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            <Icon size={20} />

                            <span
                                className={`text-sm font-medium transition-all duration-200
                ${sidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}
                            >
                                {item.name}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}