# Campus Event Management System

## 📝 Project Description
The **Campus Event Management System** is a secure, Full-Stack Web Application designed for universities to streamline event organization and student engagement. The platform allows authorized system administrators to manually schedule, update, and manage university events (such as Seminars, Workshops, Competitions, and Sports Gala) with strict real-time scheduling conflict validations. Concurrently, it empowers university students to securely authenticate, search through live listings, and register for their desired events dynamically.

---

## 👥 Team Structure & Roles
Per the assignment criteria, our development team is structured as follows:

*   **Student 1 (Team Lead / Project Manager):** GitHub repository manager, issue tracker, branch coordinator, and deployment head. Branch: `main`
*   **Student 2 (Front-End Developer 1):** Built the primary interactive dashboard components, navbar layout, responsive event cards grid system, and modular footer design. Branch: `feature/frontend-ui`
*   **Student 3 (Front-End Developer 2):** Developed authentication components (Login/Signup systems), student registration form processing, client-side input validations, and state synchronization. Branch: `feature/frontend-functionality`
*   **Student 4 (Back-End Developer 1):** Built the scalable Node.js server engine, engineered robust REST API endpoints (`/api/events`, `/api/register`, `/api/login`, `/api/signup`), and added double-booking data controls. Branch: `feature/backend-api`
*   **Student 5 (Back-End Developer 2 / Database Specialist):** Structured core relational PostgreSQL database tables (`users`, `events`, `registrations`), managed connection connection pool variables, error metrics, and executed test suites. Branch: `feature/database-testing`

---

## 🛠️ Technology Stack
*   **Front End:** React.js, JSX, CSS3, JavaScript (ES6)
*   **Back End:** Node.js, Express.js framework, CORS security mapping
*   **Database:** PostgreSQL (Relational Database Engine)
*   **Tools & Environment:** Git, GitHub Version Control, Command Line Interface (CLI), Postman client

---

## 📁 Repository Structure
```text
campus-event-management/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx         # Main Dynamic Front-End Shell Component
│   │   └── App.css
│   └── package.json
│
├── backend/
│   ├── database.sql        # Database Table Structure Schemas
│   ├── index.js            # Node.js Core API Server
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚡ Installation and Local Setup Guide

Follow these sequential professional system steps to install and boot the project locally:

### 1. Prerequisite Database Setup
Ensure **PostgreSQL Server** is operational on your machine. Open your database console (`pgAdmin` or `psql shell`) and run:
```sql
CREATE DATABASE campus_event_db;
```
Navigate to the `backend/database.sql` file in this repository and execute the scripts into the active query runner tool to map the required relational tables (`users`, `events`, `registrations`).

### 2. Configure Environment Connection
Open `backend/index.js` and input your native PostgreSQL superuser credentials on the configuration connector layer block around Line 14:
```javascript
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'campus_event_db',
    password: 'YOUR_REAL_PASSWORD_HERE',
    port: 5432,
});
```

### 3. Launch Back-End API Engine
Open a separate terminal shell inside the repository root directory and execute:
```bash
cd backend
npm install
node index.js
```
*You will verify the confirmation log prompt: `Server is running on port 5000`.*

### 4. Launch Front-End Web Client
Open a secondary independent terminal shell window panel and execute:
```bash
cd frontend
npm install
npm start
```
*The local execution engine will automatically compile and stream the live application on your local default host listener browser `http://localhost:3000`.*
