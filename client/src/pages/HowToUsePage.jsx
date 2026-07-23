import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Video,
  Award,
  HelpCircle,
  Code2,
  PlayCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Upload,
  Bot,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const HowToUsePage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '50px 24px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* TOP HERO HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
              color: '#6366f1',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              border: '1px solid rgba(99,102,241,0.3)'
            }}
          >
            <HelpCircle size={16} /> User Guide & Documentation
          </span>

          <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-0.8px', marginBottom: '12px' }}>
            How to Use EduSphere AI LMS 🚀
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6' }}>
            Learn how to enroll in courses, use the AI Tutor, complete assessments, build multi-lesson video courses, and earn verified certificates.
          </p>
        </div>

        {/* ROLE PERSONA SWITCHER TABS */}
        <div
          className="glass-card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '10px',
            borderRadius: '20px',
            marginBottom: '40px'
          }}
        >
          {[
            { id: 'student', label: '🎓 For Students & Learners', desc: 'Enroll, learn & earn certificates' },
            { id: 'instructor', label: '👨‍🏫 For Instructors & Creators', desc: 'Create modules & video lessons' },
            { id: 'tools', label: '🤖 AI Tools & Sandbox Labs', desc: 'AI Tutor, Code Sandbox & Classroom' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: isActive ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-title)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 6px 20px rgba(99,102,241,0.35)' : 'none'
                }}
              >
                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '4px' }}>{tab.label}</strong>
                <span style={{ fontSize: '0.78rem', opacity: isActive ? 0.9 : 0.7 }}>{tab.desc}</span>
              </div>
            );
          })}
        </div>

        {/* TAB 1: STUDENT & LEARNER GUIDE */}
        {activeTab === 'student' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fadeIn 0.3s ease' }}>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserCheck color="#6366f1" size={28} /> Step-by-Step Student Learning Path
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  {
                    step: '01',
                    title: 'Create Account & Login',
                    icon: ShieldCheck,
                    color: '#6366f1',
                    desc: 'Sign up as a Student on the Register page. Log in with your email and password to access your personalized learning dashboard.'
                  },
                  {
                    step: '02',
                    title: 'Browse & Enroll in Courses',
                    icon: BookOpen,
                    color: '#8b5cf6',
                    desc: 'Filter courses by category (Web Dev, Data Science, AI), level, or price. Click Enroll or Checkout to instantly unlock course contents.'
                  },
                  {
                    step: '03',
                    title: 'Interactive Video Player & AI Notes',
                    icon: PlayCircle,
                    color: '#059669',
                    desc: 'Stream high-definition MP4 video lectures. Use Real-Time AI Insights to listen to audio summaries and copy notes to your notepad.'
                  },
                  {
                    step: '04',
                    title: '24/7 AI Tutor Assistant',
                    icon: Bot,
                    color: '#ec4899',
                    desc: 'Ask questions anytime! The built-in Gemini AI Tutor explains difficult concepts, generates code snippets, and assists with homework.'
                  },
                  {
                    step: '05',
                    title: 'Take Assessment Quiz (Score >= 40%)',
                    icon: HelpCircle,
                    color: '#f59e0b',
                    desc: 'Click on the Course Final Assessment Quiz. Complete multiple-choice questions (Option A, B, C, D). A passing score of 40%+ is required.'
                  },
                  {
                    step: '06',
                    title: 'Download Official Verified Certificate',
                    icon: Award,
                    color: '#10b981',
                    desc: 'Once you pass the 40%+ threshold (or complete non-quiz courses), your official certificate will display your full profile name for download!'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '24px',
                        borderRadius: '18px',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        gap: '16px'
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: item.color,
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: '1rem',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: item.color, letterSpacing: '1px' }}>
                          STEP {item.step}
                        </span>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', margin: '4px 0 8px' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Link */}
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <Link to="/courses" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                  Explore All Courses Now 🚀 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INSTRUCTOR GUIDE */}
        {activeTab === 'instructor' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fadeIn 0.3s ease' }}>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Video color="#8b5cf6" size={28} /> Step-by-Step Instructor Course Creation Path
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  {
                    step: '01',
                    title: 'Open Course Creation Studio',
                    icon: Video,
                    color: '#6366f1',
                    desc: 'From your Instructor Dashboard, click "Open Course Studio 🎓" or visit /instructor/create-course to launch the 4-Step Slide Wizard.'
                  },
                  {
                    step: '02',
                    title: 'Slide 1: Details & Direct Image Cover',
                    icon: Upload,
                    color: '#8b5cf6',
                    desc: 'Enter Course Title, Price, Description, Category, and Difficulty Level. Upload cover photos directly from your PC (JPG/PNG).'
                  },
                  {
                    step: '03',
                    title: 'Slide 2: Multi-Module & Unlimited Lessons',
                    icon: FileText,
                    color: '#059669',
                    desc: 'Add multiple modules (+1, +3, +5, or Custom Count). Add unlimited lessons, upload local MP4 video files, and attach notes documents (PDF/TXT).'
                  },
                  {
                    step: '04',
                    title: 'Slide 3: Quiz Builder & AI Generation',
                    icon: Sparkles,
                    color: '#ec4899',
                    desc: 'Add custom MCQs with clear Option A, B, C, D badges and select the correct answer. Or click "✨ Auto-Generate AI Quiz" using Gemini AI.'
                  },
                  {
                    step: '05',
                    title: 'Slide 4: Live Review & Instant Publishing',
                    icon: Award,
                    color: '#10b981',
                    desc: 'Review total modules, lessons, and quizzes count. Click "Publish Course Live 🚀" to list it in the catalog, or "Save as Draft 📝".'
                  },
                  {
                    step: '06',
                    title: 'Manage & Edit Live Courses',
                    icon: Zap,
                    color: '#f59e0b',
                    desc: 'Edit existing courses anytime from the Instructor Dashboard using the Manage & Edit Modal to update videos, notes, or add more lessons.'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '24px',
                        borderRadius: '18px',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        gap: '16px'
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: item.color,
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: '1rem',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: item.color, letterSpacing: '1px' }}>
                          STEP {item.step}
                        </span>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', margin: '4px 0 8px' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Link */}
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <Link to="/instructor/create-course" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
                  Launch Course Creation Studio 🎓 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI TOOLS & SANDBOX LABS */}
        {activeTab === 'tools' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fadeIn 0.3s ease' }}>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code2 color="#10b981" size={28} /> Interactive AI & Virtual Learning Tools
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  {
                    title: 'Interactive Multi-Language Code Sandbox 💻',
                    link: '/code-sandbox',
                    linkText: 'Open Code Sandbox',
                    desc: 'Write, compile, and execute HTML, CSS, JavaScript, and Python code directly in your browser. Features live output previews and AI code review.'
                  },
                  {
                    title: 'Virtual Classroom Studio 🎥',
                    link: '/virtual-classroom',
                    linkText: 'Join Virtual Classroom',
                    desc: 'Attend live video streams, interactive whiteboard sessions, real-time student Q&A, and downloadable lecture notes.'
                  },
                  {
                    title: 'Voice AI Audio Assistant 🔊',
                    link: '/courses',
                    linkText: 'Try Voice AI in Courses',
                    desc: 'Listen to AI-synthesized audio summaries of video lessons. Perfect for learning on the go and auditory review.'
                  },
                  {
                    title: 'Verified Certificate Engine 📜',
                    link: '/dashboard/student',
                    linkText: 'View My Certificates',
                    desc: 'Generates official certificates featuring the student\'s full profile name, course title, issue date, and unique verification ID.'
                  }
                ].map((tool, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '10px' }}>
                        {tool.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                        {tool.desc}
                      </p>
                    </div>

                    <Link to={tool.link} style={{ color: '#6366f1', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {tool.linkText} <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <div style={{ marginTop: '50px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-title)', textAlign: 'center', marginBottom: '24px' }}>
            Frequently Asked Questions (FAQ) ❓
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                q: 'How do I unlock and download my official Certificate?',
                a: 'For courses with a quiz, you must complete the Course Final Assessment Quiz and score at least 40% or higher. For courses without a quiz, simply complete all the lesson modules (100% course progress). Once unlocked, click "View Certificate" to view or download your certificate featuring your full name.'
              },
              {
                q: 'How do I upload MP4 videos and PDF notes when creating a course?',
                a: 'In the Course Creation Studio (/instructor/create-course) under Step 2, click "Upload Video MP4 File" to attach local video files, or "Upload Notes File" to attach PDF or TXT documents directly from your device.'
              },
              {
                q: 'How can I add 10 or 20 lessons to a module quickly?',
                a: 'Inside the Course Creation Studio or Edit Modal, use the quick buttons (+1, +5, +10 Lessons) or click "➕ Add Custom Count" and type any number (e.g. 15 or 20) to instantly generate multiple lessons.'
              },
              {
                q: 'Does the AI Tutor work offline or if Gemini API key is missing?',
                a: 'Yes! EduSphere AI includes a built-in smart fallback engine that answers questions about Web Dev, Python, AI, and course architectures even when offline.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="glass-card"
                onClick={() => toggleFaq(idx)}
                style={{ padding: '20px 24px', borderRadius: '16px', cursor: 'pointer', border: '1px solid var(--border-glass)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--text-title)' }}>{faq.q}</strong>
                  {expandedFaq === idx ? <ChevronUp size={18} color="#6366f1" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>

                {expandedFaq === idx && (
                  <p style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-glass)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', animation: 'fadeIn 0.2s ease' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowToUsePage;
