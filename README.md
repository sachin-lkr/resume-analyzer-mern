# 🚀 Resume Analyzer & AI Job Preparation Platform

A production-ready Full Stack Gen AI Web Application designed to supercharge your job preparation. Simply input a Target Job Description, Resume, and Quick Self-Description to receive:

- **📊 ATS Match Score & Skill Gap Analysis
- **🎯 Tailored Technical & Behavioral Interview Questions
- **🗓️ Custom 5-Day Preparation Roadmap
- **📄 AI-Generated ATS Resume (Available for instant PDF download)

---

## 📌 Features

- **🔐 Secure Authentication**: Full JWT-based auth with HTTP-Only Cookies and Token Blacklisting logic for secure logout.
- **📄 Resume Analysis**: Upload PDF resumes and analyze them against target Job Descriptions.
- **📊 AI Skill Gap Detection**: Identifies missing skills and structural gaps in your resume.
- **📑 ATS-Optimized Resume Generation**: Generates clean, recruiter-ready ATS resumes.
- **🗺️ Preparation Roadmap**: Tailored step-by-step study plan based on the targeted role.
- **❓ Targeted Interview Questions**: Generates AI-driven practice questions customized to the position.
- **📄 Dynamic PDF Export**: Converts generated resumes into high-quality PDFs using **Puppeteer**.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React.js (Vite)
- **Architecture**: Feature-based Folder Architecture (`features/auth`, `features/ai`)
- **Styling**: Tailwind CSS 
- **State Management & Routing**: React Context API & React Router DOM
- **HTTP Client**: Axios

### **Backend**
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas with Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) & Token Blacklisting
- **File Uploads**: Multer
- **AI Engine**: Google Gemini API
- **PDF Generation**: Puppeteer
- **Validation**: Gemini Response Schema Validation

---

## 📁 Project Structure
```text
Gen_AI_Resume_Analyzer/
│
├── Backend/
│   ├── src/
│   │   ├── config/        # Database & Environment configurations
│   │   ├── controllers/   # Request handlers for Auth & AI features
│   │   ├── middlewares/   # Auth check & Token validation middlewares
│   │   ├── models/        # Mongoose schemas (User, Blacklist, Reports)
│   │   ├── routes/        # Express API endpoints
│   │   ├── service/       # External services (Gemini AI & Puppeteer)
│   │   └── app.js         # Express app initialization
│   ├── server.js          # Entry server runner
│   └── .env
│
└── Frontend/
    ├── src/
    │   ├── features/
    │   │   ├── ai/        # AI Resume & Interview features
    │   │   │   ├── hooks/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   └── interviewContext.jsx
    │   │   │
    │   │   └── auth/      # User authentication feature module
    │   │       ├── components/
    │   │       ├── hooks/
    │   │       ├── pages/
    │   │       ├── services/
    │   │       └── authContexts.jsx
    │   │
    │   ├── appRoutes.jsx  # Route configurations
    │   ├── App.jsx        # Main application layout
    │   └── main.jsx       # React entry point
    └── vite.config.js

```

## ⚡ Getting Started

### **Prerequisites**
- Node.js (v18+)
- MongoDB Atlas connection string
- Gemini API Key

---

### **1. Clone the Repository**

git clone [https://github.com/sachin-lkr/resume-analyzer-mern.git](https://github.com/sachin-lkr/resume-analyzer-mern.git)
cd resume-analyzer-mern

### **2. Backend Setup

- cd Backend
- npm install

## Create an .env file inside the Backend/ directory:
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
- GEMINI_API_KEY=your_gemini_api_key
  
## Start the backend development server:
- npm run dev

### **2. Frontend Setup
- cd ../Frontend
- npm install
## Start the frontend Vite application:
- npm run dev
## 👨‍💻 Author
- Sachin Kumar
- GitHub: @sachin-lkr
