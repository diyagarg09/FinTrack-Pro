# 💰 FinTrack Pro

FinTrack Pro is a modern, full-stack Personal Finance Management Web Application that helps users securely manage their daily income and expenses. Built with a Node.js + Express backend and MongoDB database, it provides an intuitive dashboard with financial insights, transaction management, budget planning, dark mode, and interactive charts.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login with JWT)
- 📊 Financial Dashboard with real-time data
- 💵 Income & Expense Tracking
- 💳 Add & Delete Transactions
- 📈 Cash Flow Analysis using Charts
- 📊 Expense Categories with Interactive Analytics (Doughnut & Bar charts)
- 🎯 Monthly Budget Planning with visual status indicators
- 📥 Export transaction ledger to CSV & print-friendly PDF reports
- 🏷️ Custom Category Management (Add & delete custom categories)
- 💾 Data Backup & Restore (JSON export & import)
- 🔍 Search Transactions
- 🏷️ Filter by Transaction Type
- 🌙 Dark Mode Support
- 👤 User Profile Settings
- 💱 Multiple Currency Support (INR, USD, EUR, GBP, JPY)
- 📱 Responsive User Interface
- 🗄️ MongoDB Cloud-Ready Database Persistence

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Libraries
- Chart.js
- Font Awesome
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- JSON Web Tokens (JWT) — for secure authentication
- bcryptjs — for password hashing

### Database
- MongoDB (via Mongoose ODM)

---

## 📂 Project Structure

```
FinTrack-Pro/
│── server.js           # Express server & MongoDB connection
│── package.json        # Dependencies
│── .env.example        # Environment variables template
│── .gitignore
│
├── middleware/
│   └── auth.js         # JWT authentication middleware
│
├── models/
│   ├── User.js         # User schema (username, password, settings)
│   ├── Transaction.js  # Transaction schema (income/expense)
│   ├── Budget.js       # Budget schema (per-category limits)
│   └── Category.js     # Category schema (custom categories)
│
├── routes/
│   ├── auth.js         # Register, Login, Profile endpoints
│   ├── transactions.js # CRUD transaction endpoints
│   ├── budgets.js      # CRUD budget endpoints
│   └── categories.js   # CRUD category endpoints
│
└── public/
    └── index.html      # Frontend Single Page Application
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login & receive JWT token |
| PUT | `/api/auth/profile` | Update profile settings |
| GET | `/api/transactions` | Get all user transactions |
| POST | `/api/transactions` | Add a new transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/budgets` | Get all budgets |
| POST | `/api/budgets` | Set/update a budget |
| DELETE | `/api/budgets/:category` | Clear a budget |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Add a custom category |
| DELETE | `/api/categories/:name` | Delete a category |

---

## 📸 Application Modules

- Login & Registration
- Dashboard
- Transaction Management
- Cash Flow Analysis
- Budget Management
- Settings & Profile
- Dark Mode

---

## 💻 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Steps

1. Clone the repository

```bash
git clone https://github.com/diyagarg09/FinTrack-Pro.git
```

2. Navigate to the project folder

```bash
cd FinTrack-Pro
```

3. Install dependencies

```bash
npm install
```

4. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:
```
MONGODB_URI=mongodb://localhost:27017/fintrackpro
JWT_SECRET=your_super_secret_key_here
PORT=3000
```

5. Start MongoDB (if running locally)

```bash
net start MongoDB        # Windows
# or
brew services start mongodb-community  # macOS
```

6. Run the server

```bash
npm start
# or for development with auto-restart:
npm run dev
```

7. Open your browser and visit:

```
http://localhost:3000
```

---

## ✨ Key Features

- Real-time Balance Calculation
- Income & Expense Summary
- Interactive Financial Dashboard
- Secure JWT-based Authentication
- Bcrypt Password Hashing
- Per-user Data Isolation in MongoDB
- Clean & Modern UI
- Responsive Design

---

## 📊 Dashboard Includes

- Current Balance
- Total Income
- Total Expenses
- Total Transactions
- Cash Flow Chart
- Recent Transactions Table

---

## 🎯 Future Enhancements

- MongoDB Atlas Cloud Deployment
- Email Notifications
- Mobile App Version
- Transaction Recurring Rules
- AI-powered Spending Insights

---



## 📄 License

This project is developed for educational and learning purposes.
