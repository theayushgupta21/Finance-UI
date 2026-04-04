# 💰 Lix Finance Dashboard

A modern SaaS-style Finance Dashboard built using **React + Tailwind CSS + Zustand + Framer Motion**.

---

## 🚀 Features

### 📊 Dashboard
- Total Balance, Income, Expenses summary
- Balance trend visualization
- Spending breakdown by category
- Recent transactions preview

### 💳 Transactions
- View all transactions
- Search by category
- Filter by type (Income / Expense)
- Add new transactions (Admin only)
- Smooth animations using Framer Motion

### 📈 Insights
- Highest spending category
- Monthly comparison (Income vs Expense)
- Smart observations based on data

### 🎭 Role Simulation (Frontend Only)
- **Viewer** → Read-only access
- **Admin** → Can add transactions
- Switch roles using dropdown

### 🌙 Dark Mode
- Global dark/light theme using Zustand
- Smooth transitions across entire app

---

## 🧠 Tech Stack

- React (Functional Components)
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- Axios (API calls)
- JSON Server (Mock Backend)

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/lix-finance.git
cd frontend

npm install

npm run dev 

Start JSON Server (Mock API)

npx json-server --watch db.json --port 3000
npm run server 


```
Mock backend will run on `http://localhost:3001` and frontend on `http://localhost:5173`.

Mock 
( Endpoint : 

`GET /transactions ,
POST /transactions,
GET /categories` )
