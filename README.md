# 🚀 EduSphere AI — Next-Generation AI LMS & RAG Learning Platform

![EduSphere AI Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80)

[![React 18](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Google Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5-8E7CC3?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Stripe Secured](https://img.shields.io/badge/Stripe-Secured_Payment-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Mobile_Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

> **EduSphere AI** is a world-class, full-stack Learning Management System (LMS) powered by **Google Gemini AI**. Built with modern Web Standards, React 18, Node.js, Express, and MongoDB, featuring a custom **Lumina Design System**, Stripe Payment Gateway, QR-Verifiable PDF Certificates, Multi-Language Engine (English 🇺🇸, Sinhala 🇱🇰, Tamil 🇱🇰), and PWA Mobile App Support.

---

## 📸 Platform Visual Showcase Gallery

| **Home Page Hero & AI Interactive Sandbox** | **Course Player & Interactive Video Lab** |
| :---: | :---: |
| ![Hero Preview](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80) | ![Course Player](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80) |

| **AI Code Sandbox Studio & Labs** | **QR Verifiable PDF Certificates & Invoices** |
| :---: | :---: |
| ![Code Sandbox](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80) | ![Verified Credentials](https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80) |

---

## 🌟 Key Features Overview

### 💳 1. Stripe Payment Gateway & Discount Coupons
- **Stripe Hosted & Card Gateway**: Official Stripe Checkout redirect & embedded 256-bit SSL encrypted card processing.
- **Promo Coupon Engine**: Apply promo codes `SAVE50` (50% OFF), `AI2026` (30% OFF), `WELCOME100` (100% FREE).
- **High-Res Styled PDF Tax Invoices**: Downloadable PDF payment receipts generated via `jsPDF` with transaction details.

### 🤖 2. Comprehensive Gemini AI Suite (8 Core AI Tools)
- **💬 RAG AI Tutor Chatbot**: 24/7 intelligent contextual Q&A assistance during video lessons.
- **🤖 AI Quiz Generator**: Automated MCQ quiz generator from course notes or instructor inputs.
- **🗺️ AI Career Roadmap Advisor (`/career-roadmap`)**: Step-by-step career path & milestone roadmap generator.
- **🎙️ AI Voice Mock Interview Studio (`/mock-interview`)**: Technical interview simulator with real-time WebSpeech voice transcription and automated scoring.
- **📄 AI Resume & Verified Portfolio Builder (`/resume-builder`)**: Export printable PDF resumes showcasing verified completed courses & skills.
- **🎧 AI Audio Podcast Mode (TTS)**: Listen to lesson audio notes on the go via Web Speech Synthesis.
- **💬 AI Video Subtitles / CC Overlay**: Live AI video caption overlay banner.
- **🎯 AI Practical Assignment Evaluator**: Instant automated grading (`96/100 A+`) and feedback for student code/text submissions.

### 📜 3. QR Code Verifiable PDF Certificates
- **Scannable Verification Badge**: Official PDF certificates automatically generated when students pass course final quizzes (40%+ score).
- **Embedded Credentials**: Features Credential ID, student name, instructor name, completion date, and scannable QR verification badge.

### 🎮 4. Gamification & Student Engagement Arena
- **🔥 Streaks & XP System**: 5-Day Daily Streaks 🔥, 1,450 XP Points, and Earned Achievement Badges.
- **📅 7-Day GitHub Study Heatmap**: Weekly activity visualization bar on the student dashboard.
- **🏆 Global Leaderboard & Hall of Fame (`/leaderboard`)**: Live global student rankings by XP, Streaks, and Certificates.

### 🛠️ 5. Interactive Labs & Studio Environments
- **💻 Multi-Language Code Sandbox Studio (`/code-sandbox`)**: Live in-browser code editor and runner supporting JavaScript, Python, C++, HTML/CSS.
- **🎥 Virtual Classroom Studio (`/virtual-classroom`)**: Live webinar studio with Speaker View, Screen Share, Interactive Whiteboard, Emoji Reactions (👏 ❤️ 🔥 💡 🚀), Live MCQ Polls, and AI Co-Pilot transcripts.
- **📝 AI Flashcards & Mind Map Visualizer**: Interactive study cards with tap-to-reveal AI answers.
- **🤖 AI Co-Learner Avatar ("Maya ✨")**: Interactive AI study partner in lesson sidebars providing real-time tips.

### 🌐 6. Internationalization & PWA Support
- **Multi-Language Engine**: Seamless switching between **English (🇺🇸)**, **Sinhala (🇱🇰)**, and **Tamil (🇱🇰)** dictionaries.
- **PWA Mobile App Support**: Installable Web Application (`manifest.json`) for iOS & Android devices.
- **Lumina Theme Presets**: Switch between Indigo Glass, Cyberpunk Neon ⚡, Emerald Mint 🍃, and Royal Gold 👑 presets.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Framer Motion, Lucide Icons, jsPDF, html2canvas, Recharts
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ODM), JWT Authentication, bcryptjs, Stripe SDK
- **AI Integration**: Google Gemini API (`@google/generative-ai`), RAG Engineering
- **Voice & Audio**: Web Speech API (SpeechRecognition & SpeechSynthesis)
- **Styling**: Lumina Glassmorphic Design System, Vanilla CSS Theme Variables

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0+`
- **MongoDB**: Local instance running on `mongodb://127.0.0.1:27017`

### 1. Clone Repository
```bash
git clone https://github.com/sithumcha/edusphere-ai-lms.git
cd edusphere-ai-lms
```

### 2. Backend Setup
```bash
cd server
npm install
```

Configure `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lms_ai_db
JWT_SECRET=your_lms_super_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PRICE_ID=price_dummy_id
STRIPE_WEBHOOK_SECRET=whsec_dummy
NODE_ENV=development
```

Seed Database with Demo Data:
```bash
node seed.js
```

Start Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser! 🎉

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| 👨‍🎓 **Student** | `student@lms.com` | `password123` | Student Dashboard, Learning Portal, Quiz Studio, Certificates |
| 👨‍🏫 **Instructor** | `instructor@lms.com` | `password123` | Instructor Studio, AI Quiz Generator, Sales Analytics |
| 🛡️ **Admin** | `admin@lms.com` | `password123` | Overseer Bento Stats, User Block/Unblock, Course Approvals |

---

## 📜 License & Acknowledgments

Built with ❤️ for learners worldwide. Powered by Google Gemini AI & Stripe.
