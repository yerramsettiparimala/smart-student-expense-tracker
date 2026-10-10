# 🎓 Smart Student Expense Tracker

A modern, responsive, full-stack web application designed especially for college and university students to manage pocket money, income sources, campus expenses, smart budgets, savings goals, and shared flatmate bills.

---

## 🌟 Key Highlights & Features

1. **User Authentication & Privacy:**
   - Secure registration, session-based login, and logout.
   - Passwords securely hashed with `werkzeug.security` (PBKDF2/SHA256).
   - Multi-tenant data isolation: Each student accesses only their own private records.
   - Built-in **1-Click Demo Login** (`Alex Sharma`) with pre-seeded college transactions, budgets, goals, and flatmate splits for immediate testing.

2. **Interactive Financial Dashboard:**
   - Real-time stat cards: Total Income, Total Expenses, Current Pocket Money Balance, and Savings in Goals.
   - Current month burn rate and recommended daily spending cap (`remaining budget / remaining days`).
   - Transparent **Student Financial Health Score (0–100)** with breakdown.
   - 6-Month Income vs Expense Bar Chart & Current Month Category Doughnut Chart using **Chart.js**.
   - Active budget progress bars with automatic color transitions.

3. **Income Management:**
   - Dedicated portal to record, edit, and delete income.
   - Student sources: *Pocket Money, Scholarship, Salary, Part-time Work, Gifts, Other Income*.
   - Filter by source and search by note.

4. **Expense Management & Unusual Spike Detection:**
   - Record expenses with payment method (*UPI, Cash, Debit Card, Credit Card, Net Banking*).
   - Student categories: *Food & Canteen, Hostel & Rent, Travel & Transport, Books & Stationery, College Fees, Mobile Recharge, Shopping, Entertainment, Healthcare, Other Expenses*.
   - Multi-facet filters: Date range, category, payment method, min/max amount, and description search.
   - **Unusual Expense Detection:** Automatically flags expenses exceeding 2x the average category spend and creates an instant notification alert.

5. **Smart Budget Alerts (80% & 100% Rules):**
   - Overall monthly budget and category-wise spending limits.
   - Dynamic daily spending limit calculation.
   - **80% Early Warning:** Generates early alert to pace spending.
   - **100% Exceeded Alert:** Generates danger notification and flags month-end deficit risks.

6. **Savings Goal Tracker:**
   - Milestones for laptops, smartphones, semester trips, certifications, and emergency funds.
   - Target amount, target date, and incremental contribution recorder.
   - Real-time percentage progress bar and goal completion toggle.

7. **Student Expense Analysis:**
   - Campus spending breakdown: Canteen vs Hostel vs Books vs Commute.
   - Month-over-month comparison (% increase or decrease).
   - 14-day spending velocity chart.
   - Personalized savings suggestions tailored to student spending patterns.

8. **Roommate & Flat Expense Splitter:**
   - Create shared groups (*"Flat 302 Roommates"*, *"Hostel Wing"*, *"Goa Trip"*).
   - Record shared bills (WiFi, apartment rent, groceries, electricity).
   - Equal splits or custom shares.
   - **Debt Minimization Algorithm:** Automatically calculates exact net balances and resolves *"Who owes whom"* in minimal transactions.
   - Settlement payment tracking.

9. **Reports, Calendar & Statements:**
   - **Expense Calendar:** Interactive grid of days showing daily spending totals.
   - **No-Spend Days Tracker:** Highlights days where zero money was spent.
   - **Recurring Reminders:** Track due dates for room rent, mobile recharges, etc.
   - **CSV Export:** Download all transaction history to a CSV spreadsheet.
   - **Official PDF Statements:** Dynamically generated PDF monthly financial statement powered by `reportlab`.

10. **UI/UX & Design:**
    - Emerald Green and Slate Clean Modern Aesthetic.
    - Dark Mode & Light Mode toggle with `localStorage` persistence.
    - Fully responsive desktop sidebar and mobile offcanvas menu.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (CSS Variables), Vanilla JavaScript (ES6+) |
| **Charts** | Chart.js 4.4 |
| **Backend** | Python Flask 3.0+ |
| **Database** | MongoDB (PyMongo) with built-in persistent fallback engine |
| **PDF Generation** | ReportLab 5.0+ |
| **Authentication** | Flask Sessions + Werkzeug Password Hashing |

---

## 📁 Project Folder Structure

```
smart-student-expense-tracker/
│
├── app.py                      # Flask Application factory & blueprints registration
├── config.py                   # Configuration and environment variables
├── db.py                       # MongoDB connection & index initialization
├── helpers.py                  # Auth decorator, currency helpers, health score & alerts
├── roommate_calc.py            # Roommate debt minimization & balance calculator
├── seed_demo.py                # Pre-seeded college student sample data
├── test_app.py                 # Automated unit and integration test suite
├── requirements.txt            # Python dependencies
├── .env.example                # Example environment file
├── .gitignore                  # Git ignore rules
├── README.md                   # Complete documentation & setup instructions
│
├── routes/                     # Blueprint modules
│   ├── auth_routes.py          # Register, Login, Logout, 1-Click Demo
│   ├── dashboard_routes.py     # Main financial dashboard
│   ├── transaction_routes.py   # Income, Expenses & unified ledger CRUD
│   ├── budget_routes.py        # Monthly & category budgets, daily caps
│   ├── goal_routes.py          # Savings goals & contributions
│   ├── analysis_routes.py      # Campus expense analysis & smart tips
│   ├── roommate_routes.py      # Roommate group bills & settlements
│   ├── report_routes.py        # Calendar, No-spend tracker, CSV & PDF export
│   ├── profile_routes.py       # Profile settings, password, demo reloader
│   ├── notification_routes.py  # Notification center & alerts
│   └── api_routes.py           # Chart.js dynamic JSON endpoints
│
├── static/
│   ├── css/
│   │   └── style.css           # Modern styles, variables, light/dark themes
│   └── js/
│       ├── main.js             # Theme toggle, modals, alerts, search
│       └── charts.js           # Chart.js renderers
│
└── templates/                  # Jinja2 HTML Templates
    ├── base.html               # Master layout with sidebar & quick-add modal
    ├── landing.html            # Public landing page
    ├── dashboard.html          # Main financial dashboard
    ├── income.html             # Income management
    ├── expenses.html           # Expense management & filters
    ├── transactions.html       # Full unified transaction history
    ├── budgets.html            # Budgets & daily limit calculator
    ├── goals.html              # Savings goals tracker
    ├── analysis.html           # Student expense analysis
    ├── roommates.html          # Roommate groups overview
    ├── roommate_detail.html    # Group detail, bill splits & settlements
    ├── reports.html            # Calendar, No-spend tracker & statement downloads
    ├── notifications.html      # Notifications inbox
    ├── profile.html            # Profile, preferences, and data reset
    ├── 404.html                # Not Found page
    ├── 500.html                # Server error page
    └── auth/
        ├── login.html          # Login page with 1-click demo button
        └── register.html       # Student registration page
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- **Python 3.10+** installed on your system.
- *(Optional)* **MongoDB Community Server** running locally on port 27017, OR a free **MongoDB Atlas** connection string.
  *(Note: If MongoDB is not installed, the application automatically falls back to its built-in persistent database engine so you can run and test it immediately without any setup!)*

---

### Step 1: Open Terminal (PowerShell / Command Prompt)

Navigate to the project directory:
```powershell
cd "C:\Users\YERRAMSETTI PARIMALA\.gemini\antigravity\scratch\smart-student-expense-tracker"
```

### Step 2: (Optional) Create and Activate Virtual Environment
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Step 3: Install Required Dependencies
```powershell
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
Copy the `.env.example` file to create your `.env`:
```powershell
Copy-Item .env.example .env
```
Default `.env` contents:
```ini
SECRET_KEY=student-smart-expense-tracker-secret-key-2026
MONGO_URI=mongodb://localhost:27017/student_expense_db
DB_NAME=student_expense_db
PORT=5000
```

### Step 5: Run the Automated Test Suite
Verify that all routes and calculations pass:
```powershell
python test_app.py
```
*Expected output: `Ran 7 tests ... OK`*

### Step 6: Start the Flask Application
```powershell
python app.py
```

Open your browser and navigate to:
👉 **`http://127.0.0.1:5000`**

---

## 🧑‍💻 How to Test & Review

1. Click **"✨ Launch Live Demo (Alex Sharma)"** on the landing page or on `/login`.
2. This immediately signs you in as **Alex Sharma** with realistic college data:
   - Monthly pocket money and freelance income.
   - Hostel rent, canteen meals, book purchases, and mobile recharges.
   - Active budgets showing 80% warnings.
   - Goals for a *Coding Laptop* and *Goa Trip*.
   - Flatmate group *"Flat 302 Roommates"* with WiFi and grocery splits.
3. Test recording expenses using the **"+ Quick Add"** button in the top navigation.
4. Download the **Monthly PDF Statement** via the **"Calendar & Reports"** menu.
5. Toggle between **Dark Mode** and **Light Mode** using the moon/sun icon in the top header.

---

## 🌐 Online Deployment Instructions

### Option A: Deploy to Render (Recommended Free Tier)
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New Web Service**.
3. Connect your GitHub repository.
4. Set:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app` (or `python app.py`)
5. Add Environment Variables in Render:
   - `SECRET_KEY` = your secret key
   - `MONGO_URI` = your MongoDB Atlas connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/student_expense_db`)
6. Click **Deploy Web Service**!

### Option B: Deploy with Docker
Create a `Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```
Build and run:
```bash
docker build -t smart-student-expense-tracker .
docker run -p 5000:5000 -e MONGO_URI="mongodb://host.docker.internal:27017/student_expense_db" smart-student-expense-tracker
```

---

## 🔒 Security Practices Implemented
- Passwords hashed using PBKDF2 with SHA-256 salts.
- Session cookies configured with `HttpOnly` and `SameSite=Lax`.
- MongoDB injection prevention via structured PyMongo query dictionaries.
- Authorization checks on every single record update and delete.
- Zero hardcoded production secrets.
