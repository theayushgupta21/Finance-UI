import axios from "axios";

// 🔥 Base Instance
const API = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

// ==============================
// 🔹 TRANSACTIONS APIs
// ==============================

export const getTransactions = () => API.get("/transactions");

export const addTransaction = (data) =>
    API.post("/transactions", data);

export const deleteTransaction = (id) =>
    API.delete(`/transactions/${id}`);


// ==============================
// 🔹 DASHBOARD APIs
// ==============================

export const getDashboardData = () => API.get("/dashboard");


// ==============================
// 🔹 INSIGHTS APIs
// ==============================

export const getInsights = () => API.get("/insights");


// ==============================
// 🔹 CATEGORIES APIs
// ==============================

export const getCategories = () => API.get("/categories");
export const addCategory = (data) =>
    API.post("/categories", data);