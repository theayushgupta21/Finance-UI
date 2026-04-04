import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const [active, setActive] = useState("Dashboard");

  //theme store
  const theme = useThemeStore((state) => state.theme);

  // 🔥 ROLE STATE (IMPORTANT)
  const [role, setRole] = useState("viewer");

  // 🔥 Page Renderer
  const renderPage = () => {
    switch (active) {
      case "Transactions":
        return <Transactions role={role} />;
      case "Insights":
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);



  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col">

        {/* Navbar (Role Control) */}
        <Navbar role={role} setRole={setRole} />

        {/* 🔥 Role Indicator (Nice UX) */}
        <div className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 flex justify-between">
          <span>
            Current Role: <strong className="capitalize">{role}</strong>
          </span>

          {role === "viewer" && (
            <span className="text-yellow-600">🔒 Read-only mode</span>
          )}

          {role === "admin" && (
            <span className="text-green-600">🛠️ Full access enabled</span>
          )}
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {renderPage()}
        </div>

      </div>
    </div>
  );
}