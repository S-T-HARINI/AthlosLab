# AthlosLab 🚀

> **An interactive developer-first learning platform and competitive coding arena for C, C++, Java, and Python.**

![AthlosLab Banner](https://img.shields.io/badge/Platform-AthlosLab-6366F1?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📌 Overview

**AthlosLab** is designed to take developers from core syntax fundamentals to competitive algorithmic problem-solving. It pairs high-yield concept documentation with an integrated in-browser IDE workspace, automated test case evaluation, and granular progress tracking across **C**, **C++**, **Java**, and **Python**.

---

## ✨ Key Features

- **Multi-Language Curriculum**: Complete 20-topic mastery modules for C, C++, Java, and Python.
- **In-Browser Code Studio**:
  - Live syntax highlighting (language keywords highlighted in red, surrounding syntax in clean white).
  - Clean monokai line-numbered editor with custom input (`stdin`) support.
- **Progressive Difficulty Tiers**:
  - Every topic includes curated levels: `1. Easy`, `2. Medium`, `3. Hard`, and `4. Test`.
- **Automated Test Case Runner**:
  - Stacked vertical comparison cards displaying **Expected Output** vs **Your Output** across public and hidden test cases.
  - Strict language-specific syntax validation (e.g., catching missing `System.out.println()` in Java or missing `printf()` in C).
- **Interactive Coding Timers**:
  - 10-second environment preparation countdown with one-click skip option before entering question workspaces.
- **Session Pause & Save**:
  - Pause any active `Easy`, `Medium`, or `Hard` exercise. Your written code, execution state, and active question index persist across browser restarts and logouts.
- **Real-Time Progress Metrics**:
  - Dynamic completion badges updating at `25%`, `50%`, `75%`, and `100%` with green visual progress indicators.
- **Full Authentication System**:
  - Secure user registration, login, JWT token management, and one-click Google OAuth simulation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Styling**: Modern dark-mode theme with glassmorphism and Monokai syntax highlighting
- **State & Storage**: React Context API + LocalStorage persistence

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ASGI Server**: Uvicorn
- **ORM & DB**: SQLAlchemy with SQLite (`codevora.db`)
- **Authentication**: OAuth2 password bearer with JWT (Jose) & Passlib (Bcrypt)
- **Validation**: Pydantic v2

---

## 📂 Project Structure

```text
AthlosLab/
├── backend/
│   ├── app/
│   │   ├── models/         # SQLAlchemy DB models (User, Profile)
│   │   ├── routes/         # API endpoints (Auth, User)
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── services/       # Business logic & security hashing
│   │   ├── config.py       # App configurations & settings
│   │   ├── database.py     # SQLite connection & sessionmaker
│   │   └── main.py         # FastAPI application entrypoint & CORS
│   ├── requirements.txt    # Python backend dependencies
│   └── .env                # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components (Logo, InputField, AuthButton)
│   │   ├── context/        # AuthContext for session management
│   │   ├── data/           # 20 topics, starter templates & test cases
│   │   ├── pages/          # Home, Login, Signup, LanguageDetail
│   │   ├── services/       # API client & fetch wrappers
│   │   ├── App.jsx         # App routing setup
│   │   └── index.css       # Global styling & IDE themes
│   ├── package.json        # Frontend scripts and packages
│   └── vite.config.js      # Vite build configuration
│
└── README.md

