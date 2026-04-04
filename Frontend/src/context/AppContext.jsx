// AppContext.jsx
import React, { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

export function AppWrapper({ children }) {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    return <>{children}</>;
}