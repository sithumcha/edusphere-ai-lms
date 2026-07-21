# 🚀 EduSphere AI — Next-Generation AI LMS Platform

![EduSphere AI Platform](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

> **EduSphere AI** is a state-of-the-art, full-stack Learning Management System (LMS) powered by **Google Gemini AI**. Built with modern Web Standards, React 18, Node.js, Express, and MongoDB, featuring a custom **Lumina Learning Design System** with complete Light/Dark mode accessibility.

---

## 🌟 Key Features

### 👨‍🎓 1. Student Learning Portal & AI Tutor
- **Interactive Course Player**: HTML5 video playback with syllabus progress checklist and downloadable lab resources (PDF Cheat Sheets & Python Colab Notebooks).
- **24/7 AI Tutor Assistant**: Floating chat widget & RAG assistant powered by Google Gemini AI for instant Q&A.
- **Voice AI Speech Assistant**: Web Speech Synthesis integration allowing students to listen to AI lesson summaries spoken aloud in real-time.
- **Interactive Student Quiz Studio**: Students can paste study notes to generate instant self-testing practice quizzes with automated score feedback.
- **Verified Certificate Generator**: Official printable Certificate of Completion featuring student name, official seal, verified credential ID, and PDF export capabilities.

### 👨‍🏫 2. Instructor Studio & AI Quiz Generator
- **Revenue & Analytics Overview**: Total revenue ($42,850), active students counter, average rating (4.9), and AI engagement release predictions.
- **AI Quiz Generator Studio**: Step 1 Source Content input, Step 2 Quiz Settings slider & difficulty dropdowns, Step 3 Live Preview with MCQs & True/False options, Edit & Delete controls, and `Save to Course` action.
- **Course Management Catalog**: Full catalog listing published & draft courses with student enrollment counts and edit controls.

### 🛡️ 3. Admin Overseer Infrastructure Dashboard
- **System Bento Stats**: Server Health (99.98% Healthy), Active Users (24.8k), MRR ($142,500), and CPU/Memory allocation metrics.
- **User Account Management**: User table with role management (`Student`, `Instructor`, `Admin`) and 1-click `Block User` / `Unblock User` actions.
- **Course Approval Queue**: Review queue table for approving or rejecting submitted instructor courses before publication.
- **Gemini AI Diagnostics**: Platform AI model performance monitoring and system diagnostic report generator.

### 🎨 4. Lumina Design System & Resources Hub
- **Lumina Learning Theme Tokens**: Curated indigo (`#1f108e`), violet (`#6b38d4`), and cyan (`#26c0de`) custom properties with smooth glassmorphism cards and dark/light mode toggle.
- **EduSphere Knowledge Resources Hub (`/resources`)**: Free downloadable AI cheat sheets, Jupyter notebooks, Figma design kits, and GitHub cookbooks.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Lucide Icons, Vanilla CSS (Lumina Design Tokens)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ODM), JWT Authentication, bcryptjs
- **AI Integration**: Google Gemini API (`@google/generative-ai`), RAG Prompt Engineering
- **Voice & Speech**: Web Speech API (Synthesis)

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0+`
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017`

### 1. Clone the Repository
```bash
git clone https://github.com/sithumcha/edusphere-ai-lms.git
cd edusphere-ai-lms
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `server/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lms_ai_db
JWT_SECRET=your_lms_super_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

Seed the Database with Demo Data:
```bash
node seed.js
```

Start the Backend Server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser! 🎉

---

## 🔑 Demo Login Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| 👨‍🎓 **Student** | `student@lms.com` | `password123` |
| 👨‍🏫 **Instructor** | `instructor@lms.com` | `password123` |
| 🛡️ **Admin** | `admin@lms.com` | `password123` |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
