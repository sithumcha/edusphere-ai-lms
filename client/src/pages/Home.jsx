import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Search,
  ArrowRight,
  Star,
  Clock,
  BookOpen,
  Terminal,
  Briefcase,
  Palette,
  FlaskConical,
  Brain,
  Zap,
  BarChart2,
  Mic,
  Award,
  Compass,
  CheckCircle2,
  Play,
  Code,
  Flame,
  Check,
  Send,
  Layers,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Tech', courses: '1,200+ Courses', icon: <Terminal size={28} />, bg: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' },
  { name: 'Business', courses: '850+ Courses', icon: <Briefcase size={28} />, bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
  { name: 'Arts', courses: '420+ Courses', icon: <Palette size={28} />, bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' },
  { name: 'Science', courses: '310+ Courses', icon: <FlaskConical size={28} />, bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }
];

const PRESET_PROMPTS = [
  {
    label: '🚀 Build React & Node App',
    query: 'How do I build a Full-Stack React & Node.js application?',
    aiResponse: 'To build a Full-Stack app: 1) Initialize React frontend with Vite. 2) Set up Express server with MongoDB & JWT auth. 3) Connect API endpoints using Axios.'
  },
  {
    label: '🐍 Machine Learning Roadmap',
    query: 'What is the best path to learn Python AI & Machine Learning?',
    aiResponse: 'Start with Python syntax & NumPy, master Pandas data frames, learn Scikit-Learn algorithms, and build Neural Networks using TensorFlow & PyTorch.'
  },
  {
    label: '💼 Pass Tech Voice Interview',
    query: 'How does the AI Voice Mock Interview Studio evaluate my responses?',
    aiResponse: 'Our WebSpeech AI transcribes your spoken answers, evaluates technical depth, checks keyword relevance, and returns a detailed 0-100 score with improvement tips.'
  },
  {
    label: '📜 QR Verifiable Certificates',
    query: 'How do I earn a verifiable PDF certificate?',
    aiResponse: 'Complete all video lessons in a course, take the 5-question Final Assessment Quiz, and score at least 40% to unlock your printable QR-coded PDF certificate!'
  }
];

const FEATURED_COURSES = [
  {
    _id: 'fc1',
    title: 'Full-Stack Web Development Masterclass',
    instructorName: 'Alex Rivera',
    category: 'Web Development',
    level: 'intermediate',
    price: 49,
    averageRating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    description: 'Learn modern Web Development from React & Node.js to Cloud deployment with AI tools.'
  },
  {
    _id: 'fc2',
    title: 'Machine Learning & Neural Networks',
    instructorName: 'Dr. Sarah Chen',
    category: 'Artificial Intelligence',
    level: 'advanced',
    price: 79,
    averageRating: 5.0,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80',
    description: 'Build deep learning neural network models using Python, TensorFlow, and Gemini AI.'
  },
  {
    _id: 'fc3',
    title: 'UI/UX Design Systems & Micro-Animations',
    instructorName: 'Elena Rostova',
    category: 'Design',
    level: 'beginner',
    price: 29,
    averageRating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80',
    description: 'Craft high-converting user interfaces, dark modes, glassmorphism, and responsive layouts.'
  }
];

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [dbCourses, setDbCourses] = useState([]);

  // Interactive AI Sandbox State
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Interactive AI Tool Playground Tab State
  const [activeToolTab, setActiveToolTab] = useState('tutor');

  useEffect(() => {
    const fetchHomeCourses = async () => {
      try {
        const res = await api.get('/courses?limit=6');
        if (res.data && res.data.length > 0) {
          setDbCourses(res.data);
        }
      } catch (err) {
        console.error('Home courses fetch error:', err);
      }
    };
    fetchHomeCourses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectPrompt = (idx) => {
    setActivePromptIndex(idx);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 400);
  };

  const displayCourses = (dbCourses.length >= 3 ? dbCourses : FEATURED_COURSES).slice(0, 3);
  const currentPrompt = PRESET_PROMPTS[activePromptIndex];

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION WITH AMBIENT NEON MESH & INTERACTIVE AI PROMPT SANDBOX */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 0 100px',
          background: 'radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.22) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 45%)'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '56px', alignItems: 'center' }}>
          
          {/* Left Hero Text & Search */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            
            {/* Tag Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(236, 72, 153, 0.18))',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                padding: '8px 20px',
                borderRadius: '30px',
                width: 'fit-content',
                boxShadow: '0 4px 18px rgba(99, 102, 241, 0.25)'
              }}
            >
              <Sparkles size={16} color="#818cf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#818cf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {t('revolutionizingEdu')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: '3.7rem', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: '1.1', color: 'var(--text-title)' }}>
              Learn Skills 10x Faster with <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Personalized AI</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.65', maxWidth: '560px' }}>
              Instant RAG AI assistance, live voice interview practice, dynamic skill roadmaps, and QR-verifiable certificates built for modern tech learners.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '14px', paddingTop: '6px' }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                <Search size={20} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-title)', paddingLeft: '12px', fontSize: '0.98rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0 32px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Get Started ✨
              </button>
            </form>

            {/* Social Proof & Streak Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '6px' }}>
              <div style={{ display: 'flex' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Student" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--bg-main)' }} />
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100" alt="Student" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--bg-main)', marginLeft: '-12px' }} />
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Student" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--bg-main)', marginLeft: '-12px' }} />
              </div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-title)' }}>1M+ Active Learners</strong> • 4.9 ★ Rating
              </span>
            </div>

          </div>

          {/* Right Hero Image Frame with Ambient Glow & Floating AI Interactive Sandbox Overlay */}
          <div style={{ position: 'relative' }}>
            {/* Main High-Res Workspace Image Frame */}
            <div
              className="glass-card"
              style={{
                padding: '10px',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(99, 102, 241, 0.35)',
                border: '2px solid rgba(99, 102, 241, 0.4)',
                background: 'rgba(23, 29, 45, 0.8)',
                backdropFilter: 'blur(16px)',
                position: 'relative'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80"
                alt="AI Learning Student Workspace"
                style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '24px', opacity: 0.85 }}
              />

              {/* OVERLAY INTERACTIVE AI SIMULATOR BOX */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(14px)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#818cf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Brain size={14} color="#818cf8" /> Interactive AI Simulator
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800, background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                    ⚡ LIVE DEMO
                  </span>
                </div>

                {/* Prompt Selector Pills - 2x2 Grid Layout Without Scrollbar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
                  {PRESET_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(idx)}
                      style={{
                        background: activePromptIndex === idx ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.08)',
                        color: activePromptIndex === idx ? '#ffffff' : '#cbd5e1',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '14px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: activePromptIndex === idx ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* AI Answer Text */}
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '12px', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: '1.5', opacity: isTyping ? 0.4 : 1, transition: 'opacity 0.2s' }}>
                  <strong style={{ color: '#10b981', display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>EduSphere AI:</strong>
                  {currentPrompt.aiResponse}
                </div>
              </div>

            </div>

            {/* Floating Badge 1: AI Match (Top Left) */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '-16px',
                left: '-20px',
                padding: '12px 18px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)'
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
                <Brain size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI TUTOR ASSIST</span>
                <strong style={{ fontSize: '0.92rem', display: 'block', color: 'var(--text-title)' }}>99.8% Progress Match</strong>
              </div>
            </div>

            {/* Floating Badge 2: Verified Certification (Top Right) */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-20px',
                padding: '12px 18px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(16,185,129,0.4)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
              }}
            >
              <ShieldCheck size={22} color="#10b981" />
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#10b981', display: 'block' }}>QR Verified Certs</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>40%+ Pass Threshold</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. LIVE INTERACTIVE AI TOOLS PLAYGROUND SHOWCASE */}
      <section style={{ padding: '80px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
              PLAYGROUND DEMO
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-title)' }}>
              Experience Our 4 Core AI Platforms Live ⚡
            </h2>
          </div>

          {/* Tool Selector Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {[
              { id: 'tutor', label: '🤖 RAG AI Tutor', color: '#6366f1' },
              { id: 'interview', label: '🎙️ Voice Mock Interview', color: '#ec4899' },
              { id: 'roadmap', label: '🗺️ AI Career Roadmap', color: '#10b981' },
              { id: 'cert', label: '📜 Verifiable Certificates', color: '#f59e0b' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveToolTab(tab.id)}
                style={{
                  background: activeToolTab === tab.id ? tab.color : 'var(--bg-main)',
                  color: activeToolTab === tab.id ? '#ffffff' : 'var(--text-title)',
                  border: activeToolTab === tab.id ? 'none' : '1px solid var(--border-glass)',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: activeToolTab === tab.id ? `0 8px 20px ${tab.color}40` : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tool Tab Preview Container */}
          <div className="glass-card" style={{ padding: '36px', borderRadius: '28px', border: '1px solid var(--border-glass)', minHeight: '260px' }}>
            {activeToolTab === 'tutor' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    FEATURE #1: RAG AI TUTOR
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-title)', margin: '8px 0 14px' }}>
                    Instant Answers Trained on Your Course Content
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    No more waiting for forum replies. Ask questions mid-video and get instant, accurate explanations with code samples.
                  </p>
                  <Link to="/courses" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                    Start Learning with AI Tutor →
                  </Link>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#6366f1', fontWeight: 800 }}>
                    <Brain size={20} /> AI Tutor Live Session
                  </div>
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '14px', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-title)', lineHeight: '1.5' }}>
                    "Here is how React useEffect works: It runs side effects after render cycles, allowing you to fetch data or subscribe to events safely."
                  </div>
                </div>
              </div>
            )}

            {activeToolTab === 'interview' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    FEATURE #2: MOCK INTERVIEW
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-title)', margin: '8px 0 14px' }}>
                    Voice-Powered Technical Practice Studio
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    Speak your responses naturally into your microphone. Our WebSpeech engine evaluates your answer accuracy, confidence, and terminology.
                  </p>
                  <Link to="/mock-interview" className="btn-primary" style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', padding: '12px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                    Launch Mock Interview Studio →
                  </Link>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-glass)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🎙️ 🔊</div>
                  <strong style={{ fontSize: '1rem', color: '#ec4899', display: 'block', marginBottom: '6px' }}>Score: 92 / 100 Excellent</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>"Great explanation of closure scope and event loops!"</span>
                </div>
              </div>
            )}

            {activeToolTab === 'roadmap' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    FEATURE #3: CAREER ROADMAP
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-title)', margin: '8px 0 14px' }}>
                    Step-by-Step Skill Timeline Generators
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    Set your target career role (e.g. Senior Full-Stack Engineer) and get an interactive milestone roadmap with progress tracking.
                  </p>
                  <Link to="/career-roadmap" className="btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '12px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                    Explore Career Roadmaps →
                  </Link>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>
                    <CheckCircle2 size={16} /> Phase 1: React Fundamentals (100% Done)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#6366f1', fontWeight: 700 }}>
                    <CheckCircle2 size={16} /> Phase 2: Node.js Microservices (In Progress)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    ⚪ Phase 3: Cloud Deployment & Docker (Next)
                  </div>
                </div>
              </div>
            )}

            {activeToolTab === 'cert' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    FEATURE #4: VERIFIABLE CERTIFICATES
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-title)', margin: '8px 0 14px' }}>
                    Printable Credentials with QR Code Verification
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    Pass course quizzes with a score of 40%+ to earn an official certificate featuring a scannable QR badge for employers.
                  </p>
                  <Link to="/leaderboard" className="btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '12px 24px', borderRadius: '14px', textDecoration: 'none' }}>
                    View Student Leaderboard →
                  </Link>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-glass)', textAlign: 'center' }}>
                  <Award size={36} color="#f59e0b" style={{ marginBottom: '8px' }} />
                  <strong style={{ fontSize: '1rem', color: 'var(--text-title)', display: 'block' }}>Official Certificate Unlocked 📜</strong>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>✓ Scannable QR Verification Active</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. EXPLORE TOP CATEGORIES */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '44px' }}>
            {t('exploreCategories')}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="glass-card glass-card-hover"
                style={{
                  padding: '36px 24px',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1px solid var(--border-glass)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: cat.bg, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.courses}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES SECTION */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '8px' }}>{t('featuredCourses')}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>Hand-picked by our AI curriculum experts</p>
            </div>
            <Link to="/courses" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {t('viewAllCourses')} <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {displayCourses.map((course, idx) => {
              const priceText = course.price === 0 || course.price === 'Free' ? 'Free' : (typeof course.price === 'number' ? `$${course.price}` : course.price || 'Free');
              const ratingText = course.averageRating ? `${course.averageRating} (${course.totalReviews || 10})` : '4.9 (15+)';

              return (
                <Link
                  key={course._id || idx}
                  to={`/courses/${course._id}`}
                  className="glass-card glass-card-hover"
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src={course.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#6366f1', color: '#ffffff', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {course.level ? course.level.toUpperCase() : 'POPULAR'}
                    </span>
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          {course.category || 'GENERAL'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)' }}>
                          <Star size={15} fill="#f59e0b" color="#f59e0b" />
                          <span>{ratingText}</span>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '12px', lineHeight: '1.35', fontWeight: 800 }}>
                        {course.title}
                      </h3>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={15} /> {course.modules?.length ? `${course.modules.length * 4} Modules` : 'Self-Paced'}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <BarChart2 size={15} /> {course.level || 'All Levels'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>By {course.instructorName || 'Alex Rivera'}</span>
                      <strong style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 900 }}>{priceText}</strong>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. STATS & GAMIFICATION COUNTER BANNER */}
      <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, #1e1b4b 0%, #31108e 100%)', color: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 900, color: '#a7f3d0', marginBottom: '4px' }}>1M+</p>
              <p style={{ fontSize: '0.9rem', color: '#c7d2fe', fontWeight: 600 }}>Active Learners</p>
            </div>
            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 900, color: '#a7f3d0', marginBottom: '4px' }}>50k+</p>
              <p style={{ fontSize: '0.9rem', color: '#c7d2fe', fontWeight: 600 }}>Online AI Courses</p>
            </div>
            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 900, color: '#a7f3d0', marginBottom: '4px' }}>150+</p>
              <p style={{ fontSize: '0.9rem', color: '#c7d2fe', fontWeight: 600 }}>Countries Reached</p>
            </div>
            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 900, color: '#a7f3d0', marginBottom: '4px' }}>98%</p>
              <p style={{ fontSize: '0.9rem', color: '#c7d2fe', fontWeight: 600 }}>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
