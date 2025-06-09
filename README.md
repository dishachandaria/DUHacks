# 💼 Business Expense Management App

A full-stack Business Expense Management system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This application helps employees log expenses, managers monitor budgets, and admins generate insightful reports. It also features a financial chatbot for real-time assistance.

---

## 📌 Features

### 👤 Role-Based Access Control
- **Employees**: Submit and categorize expenses, view history
- **Admins**: View team spending, generate PDF reports, oversee budget trends

### 💸 Expense Management
- Add, edit, delete expenses
- Categorize by travel, meals, supplies, etc.
- Attach receipts or notes

### 📊 Dashboard & Reports
- Interactive dashboard for real-time analytics
- Monthly budget summaries
- Export reports as **PDF**

### 🤖 Financial Chatbot
- Get budget tips, spending trends
- Ask for monthly or category-wise reports
- Get alerts about overspending

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dishachandaria/DUHacks.git
cd DUHacks
```

### 2. Set up the backend

```bash
cd server
npm install
```

> Create a `.env` file with:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_api_key_here
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

Visit `http://localhost:5173` to view the app.

---