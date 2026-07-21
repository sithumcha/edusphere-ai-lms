import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  BarChart3,
  Users,
  Settings,
  Zap,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  FileText,
  Upload,
  Link as LinkIcon,
  Sliders,
  Eye,
  Save,
  CheckCircle,
  Edit2,
  Trash2,
  Check,
  X,
  Plus,
  Star,
  MoreVertical,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Info,
  Shield,
  Key,
  UserCheck,
  Brain,
  FileSpreadsheet
} from 'lucide-react';

const MY_COURSES_LIST = [
  {
    id: 'mc1',
    title: 'Mastering Generative AI for Designers & Developers',
    category: 'AI & Machine Learning',
    status: 'PUBLISHED',
    statusBg: '#dcfce7',
    statusColor: '#15803d',
    updated: 'Updated 2 days ago',
    students: 452,
    earned: '$24,000',
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'mc2',
    title: 'Advanced Data Architectures with RAG & Vector DBs',
    category: 'Data Science',
    status: 'DRAFT',
    statusBg: '#f1f5f9',
    statusColor: '#64748b',
    updated: 'Modified 4 hours ago',
    students: 0,
    earned: '$0',
    rating: 0,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'mc3',
    title: 'UI/UX Foundations: The Human-AI Interface Systems',
    category: 'Design Systems',
    status: 'PUBLISHED',
    statusBg: '#dcfce7',
    statusColor: '#15803d',
    updated: 'Updated 1 week ago',
    students: 831,
    earned: '$18,850',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80'
  }
];

const STUDENTS_LIST = [
  { id: 's1', name: 'Alex Johnson', email: 'alex@example.com', course: 'Mastering Generative AI', progress: 85, score: '94%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { id: 's2', name: 'Samantha Reed', email: 'samantha@example.com', course: 'UI/UX Foundations', progress: 92, score: '98%', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' },
  { id: 's3', name: 'Marcus Brody', email: 'marcus@example.com', course: 'Mastering Generative AI', progress: 40, score: '82%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: 's4', name: 'Elena Rostova', email: 'elena@example.com', course: 'UI/UX Foundations', progress: 65, score: '88%', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
];

const INITIAL_GENERATED_QUESTIONS = [
  {
    id: 1,
    type: 'Multiple Choice',
    question: 'Which of the following neural network architectures is best suited for sequential data processing like natural language?',
    options: [
      { id: 'A', text: 'Convolutional Neural Networks (CNN)' },
      { id: 'B', text: 'Recurrent Neural Networks (RNN)', isCorrect: true },
      { id: 'C', text: 'Generative Adversarial Networks (GAN)' },
      { id: 'D', text: 'Radial Basis Function Networks' }
    ]
  },
  {
    id: 2,
    type: 'True / False',
    question: 'Supervised learning requires labeled data to train the model successfully.',
    options: [
      { id: 'T', text: 'True', isCorrect: true },
      { id: 'F', text: 'False', isCorrect: false }
    ]
  }
];

const InstructorDashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // New Course Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Web Development');
  const [newPrice, setNewPrice] = useState('49.99');
  const [newDesc, setNewDesc] = useState('');

  // AI Quiz Studio States
  const [sourceContent, setSourceContent] = useState('');
  const [questionCount, setQuestionCount] = useState(25);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [quizType, setQuizType] = useState('Multiple Choice');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');

  // Settings State
  const [profName, setProfName] = useState(user?.name || 'Dr. Sarah Chen');
  const [profBio, setProfBio] = useState(user?.bio || 'Senior AI Engineer & Educator');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    setShowCreateModal(false);
    alert(`Course "${newTitle}" created successfully as Draft!`);
    setNewTitle('');
    setNewDesc('');
  };

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setSaveSuccess('');

    try {
      const res = await api.post('/ai/generate-quiz', {
        topic: 'Neural Networks & Deep Learning',
        content: sourceContent || 'Neural networks process sequential data using RNNs and Transformers...',
        numQuestions: Number(questionCount) || 5,
        saveToDb: true
      });

      if (res.data?.questions && res.data.questions.length > 0) {
        const formatted = res.data.questions.map((q, idx) => ({
          id: idx + 1,
          type: 'Multiple Choice',
          question: q.question,
          options: q.options?.map((opt, oIdx) => ({
            id: String.fromCharCode(65 + oIdx),
            text: opt,
            isCorrect: oIdx === q.correctAnswer
          }))
        }));
        setGeneratedQuestions(formatted);
      } else {
        setGeneratedQuestions(INITIAL_GENERATED_QUESTIONS);
      }
    } catch (err) {
      console.error('AI quiz generation error:', err);
      setGeneratedQuestions(INITIAL_GENERATED_QUESTIONS);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToCourse = () => {
    setSaveSuccess('Quiz successfully saved & published to course curriculum!');
    setTimeout(() => setSaveSuccess(''), 4000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 72px)', background: 'var(--bg-main)' }}>
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside style={{ background: 'var(--bg-glass)', borderRight: '1px solid var(--border-glass)', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Logo Header */}
          <div style={{ padding: '0 12px 24px', borderBottom: '1px solid var(--border-glass)', marginBottom: '20px' }}>
            <strong style={{ fontSize: '1.15rem', display: 'block', color: 'var(--text-title)' }}>EduSphere Pro</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Instructor Portal</span>
          </div>

          {/* Nav Items (Dashboard, Curriculum, Analytics, Students, AI Insights, Settings) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { name: 'Curriculum', icon: <BookOpen size={18} /> },
              { name: 'Analytics', icon: <BarChart3 size={18} /> },
              { name: 'Students', icon: <Users size={18} /> },
              { name: 'AI Insights', icon: <Sparkles size={18} /> },
              { name: 'Settings', icon: <Settings size={18} /> }
            ].map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 14px rgba(139, 92, 246, 0.35)' : 'none'
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Bottom CTA */}
        <div>
          <button
            onClick={() => setActiveMenu('AI Insights')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '18px',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)'
            }}
          >
            <Zap size={16} fill="#ffffff" /> Launch AI Tutor
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <HelpCircle size={16} /> Support
            </div>
            <div onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#f43f5e' }}>
              <LogOut size={16} /> Logout
            </div>
          </div>
        </div>
      </aside>

      {/* 2. RIGHT MAIN CONTENT PANEL */}
      <main style={{ padding: '28px 36px', overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search courses, students..."
              className="form-input"
              style={{ paddingLeft: '42px', borderRadius: '20px', height: '40px', fontSize: '0.85rem', background: '#e0e7ff22' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Bell size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            <HelpCircle size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '0.88rem', display: 'block', color: 'var(--text-title)' }}>Dr. Sarah Chen</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>SENIOR INSTRUCTOR</span>
              </div>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120'}
                alt="Dr. Sarah Chen"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
            </div>
          </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeMenu === 'Dashboard' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                <div>
                  <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>
                    Instructor Overview
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Welcome back, Sarah. Here's what's happening with your courses today.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{ background: '#1e1b4b', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 18px rgba(30, 27, 75, 0.35)' }}
                >
                  <Plus size={18} /> Create New Course
                </button>
              </div>

              {/* 3 STAT CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '36px' }}>
                <div className="glass-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>TOTAL REVENUE</span>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--text-title)' }}>$42,850.00</strong>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cff4fc', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>↗ +12.5% this month</span>
                </div>

                <div className="glass-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>ACTIVE STUDENTS</span>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--text-title)' }}>1,284</strong>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={20} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>↗ +82 new today</span>
                </div>

                <div className="glass-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>AVERAGE RATING</span>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--text-title)' }}>4.9</strong>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={20} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                </div>
              </div>

              {/* MY COURSES & ENGAGEMENT GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px', marginBottom: '40px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.3rem', color: 'var(--text-title)' }}>My Courses</h2>
                    <span onClick={() => setActiveMenu('Curriculum')} style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 700, cursor: 'pointer' }}>View all</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {MY_COURSES_LIST.map((c) => (
                      <div key={c.id} className="glass-card glass-card-hover" style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '110px 1fr 60px', gap: '18px', alignItems: 'center', borderRadius: '16px' }}>
                        <img src={c.thumbnail} alt={c.title} style={{ width: '100%', height: '75px', objectFit: 'cover', borderRadius: '12px' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ padding: '2px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, background: c.statusBg, color: c.statusColor }}>{c.status}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.updated}</span>
                          </div>
                          <h3 style={{ fontSize: '1rem', color: 'var(--text-title)', marginBottom: '4px' }}>{c.title}</h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.students} Students • {c.earned} Earned</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', color: 'var(--text-muted)' }}>
                          <Edit2 size={16} style={{ cursor: 'pointer' }} />
                          <MoreVertical size={16} style={{ cursor: 'pointer' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--text-title)' }}>Student Engagement</h3>
                      <Info size={18} color="var(--text-muted)" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Course Completion Rate</span>
                          <strong style={{ color: 'var(--text-title)' }}>78%</strong>
                        </div>
                        <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: '78%', height: '100%', background: '#7c3aed' }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Quiz Pass Rate</span>
                          <strong style={{ color: 'var(--text-title)' }}>92%</strong>
                        </div>
                        <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: '92%', height: '100%', background: '#7c3aed' }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Average Session Duration</span>
                          <strong style={{ color: 'var(--text-title)' }}>24m</strong>
                        </div>
                        <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: '60%', height: '100%', background: '#6366f1' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#f3e8ff', border: '1px solid #e9d5ff', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#7c3aed' }}>
                      <Sparkles size={18} />
                      <strong style={{ fontSize: '0.92rem' }}>AI Prediction</strong>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#4c1d95', lineHeight: '1.5', marginBottom: '14px' }}>
                      Engagement is predicted to rise by <strong>15%</strong> next week if you release Module 4 of "Mastering GenAI".
                    </p>
                    <a href="#schedule" style={{ color: '#7c3aed', fontWeight: 800, fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Schedule Release <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <footer style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div><strong style={{ color: 'var(--text-title)', marginRight: '10px' }}>EduSphere AI</strong><span>© 2026 EduSphere AI. Empowering deep learning.</span></div>
              <div style={{ display: 'flex', gap: '20px' }}><a href="#privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a><a href="#terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a></div>
            </footer>
          </div>
        )}

        {/* TAB 2: CURRICULUM MANAGEMENT */}
        {activeMenu === 'Curriculum' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Curriculum & Course Management
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Manage modules, upload video lessons, and publish new courses.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                style={{ background: '#1e1b4b', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus size={18} /> Create New Course
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {MY_COURSES_LIST.map((c) => (
                <div key={c.id} className="glass-card glass-card-hover" style={{ borderRadius: '20px', overflow: 'hidden', padding: '20px' }}>
                  <img src={c.thumbnail} alt={c.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '14px', marginBottom: '16px' }} />
                  <span className="badge badge-primary" style={{ marginBottom: '10px' }}>{c.category}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>{c.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <span>👥 {c.students} Students</span>
                    <strong style={{ color: '#059669' }}>{c.earned} Earned</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ flex: 1, background: '#8455ef', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                      Edit Curriculum
                    </button>
                    <button style={{ background: 'var(--bg-main)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeMenu === 'Analytics' && (
          <div>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
              Course Performance Analytics
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
              Deep dive metrics into student watch times, quiz success rates, and revenue trends.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '16px' }}>Revenue & Student Engagement Trend</h3>
                <div style={{ height: '220px', background: 'rgba(132, 85, 239, 0.05)', borderRadius: '14px', border: '2px dashed rgba(132, 85, 239, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b38d4', fontWeight: 700 }}>
                  <TrendingUp size={28} style={{ marginRight: '10px' }} /> Interactive Visual Analytics Chart (Updated Live)
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>TOTAL WATCH TIME</span>
                  <h3 style={{ fontSize: '2rem', color: 'var(--text-title)' }}>14,280 hrs</h3>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>QUIZ COMPLETION RATE</span>
                  <h3 style={{ fontSize: '2rem', color: '#059669' }}>94.2%</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STUDENTS */}
        {activeMenu === 'Students' && (
          <div>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
              Enrolled Students Roster
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
              Track student progress, grades, and engagement scores.
            </p>

            <div className="glass-card" style={{ padding: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    <th style={{ padding: '12px' }}>STUDENT NAME</th>
                    <th style={{ padding: '12px' }}>ENROLLED COURSE</th>
                    <th style={{ padding: '12px' }}>PROGRESS</th>
                    <th style={{ padding: '12px' }}>QUIZ SCORE</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENTS_LIST.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={s.avatar} alt={s.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ color: 'var(--text-title)', display: 'block' }}>{s.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.email}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 12px', color: 'var(--text-title)' }}>{s.course}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <span className="badge badge-primary">{s.progress}% Completed</span>
                      </td>
                      <td style={{ padding: '16px 12px', fontWeight: 800, color: '#059669' }}>{s.score}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                        <button style={{ background: 'none', border: 'none', color: '#1f108e', fontWeight: 700, cursor: 'pointer' }}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: AI INSIGHTS & QUIZ GENERATOR */}
        {activeMenu === 'AI Insights' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={24} color="#7c3aed" />
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  AI Quiz Generator & Insights Studio
                </h1>
              </div>
            </div>

            {saveSuccess && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', borderRadius: '12px', padding: '14px', marginBottom: '20px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                {saveSuccess}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={20} color="#7c3aed" />
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)' }}>Source Content</h3>
                    </div>
                    <span className="badge badge-primary">Step 1</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Paste lecture notes, book chapters, or transcripts for the AI to analyze.
                  </p>

                  <textarea
                    rows={7}
                    placeholder="Enter your educational content here..."
                    value={sourceContent}
                    onChange={(e) => setSourceContent(e.target.value)}
                    className="form-input"
                    style={{ borderRadius: '14px', resize: 'none', marginBottom: '16px', fontSize: '0.88rem' }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button style={{ background: 'var(--bg-main)', border: '2px dashed var(--border-glass)', borderRadius: '12px', padding: '12px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <Upload size={16} /> Upload Document
                    </button>
                    <button style={{ background: 'var(--bg-main)', border: '2px dashed var(--border-glass)', borderRadius: '12px', padding: '12px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <LinkIcon size={16} /> Import URL
                    </button>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sliders size={20} color="#7c3aed" />
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)' }}>Quiz Settings</h3>
                    </div>
                    <span className="badge badge-primary">Step 2</span>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <span>Number of Questions</span>
                      <strong style={{ color: '#7c3aed' }}>{questionCount}</strong>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(e.target.value)}
                      style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <div>
                      <label className="form-label">Difficulty</label>
                      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-input" style={{ borderRadius: '12px', fontSize: '0.85rem' }}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Quiz Type</label>
                      <select value={quizType} onChange={(e) => setQuizType(e.target.value)} className="form-input" style={{ borderRadius: '12px', fontSize: '0.85rem' }}>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True / False">True / False</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateQuiz}
                    disabled={isGenerating}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '14px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={18} /> {isGenerating ? 'Gemini AI Generating Questions...' : 'Generate Quiz Now'}
                  </button>
                </div>
              </div>

              <div>
                <div className="glass-card" style={{ padding: '18px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Eye size={20} color="#7c3aed" />
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-title)' }}>Live Preview</h3>
                    <span className="badge badge-primary" style={{ marginLeft: '10px' }}>{generatedQuestions.length}/25 Generated</span>
                  </div>

                  <button
                    onClick={handleSaveToCourse}
                    style={{ background: '#1e1b4b', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Save size={16} /> Save to Course
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {generatedQuestions.length === 0 ? (
                    <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <Sparkles size={32} />
                      </div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                        No Quiz Questions Generated Yet
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: '1.55', margin: '0 auto' }}>
                        Enter your lecture notes or source content in Step 1, select your quiz settings in Step 2, and click <strong style={{ color: '#7c3aed' }}>"✨ Generate Quiz Now"</strong> to preview questions here.
                      </p>
                    </div>
                  ) : (
                    generatedQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="glass-card" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ background: '#7c3aed', color: '#ffffff', padding: '4px 14px', borderRadius: '14px', fontSize: '0.78rem', fontWeight: 800 }}>
                            Question {idx + 1}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{q.type}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)' }}>
                          <Edit2 size={16} style={{ cursor: 'pointer' }} onClick={() => alert(`Editing Question ${idx + 1}...`)} />
                          <Trash2 size={16} style={{ cursor: 'pointer' }} onClick={() => setGeneratedQuestions(prev => prev.filter((_, i) => i !== idx))} />
                        </div>
                      </div>

                      <h4 style={{ fontSize: '1rem', color: 'var(--text-title)', marginBottom: '16px', lineHeight: '1.4' }}>
                        {q.question}
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {q.options?.map((opt) => (
                          <div
                            key={opt.id}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '12px',
                              border: opt.isCorrect ? '2px solid #7c3aed' : '1px solid var(--border-glass)',
                              background: opt.isCorrect ? '#f3e8ff' : 'var(--bg-main)',
                              color: opt.isCorrect ? '#7c3aed' : 'var(--text-title)',
                              fontWeight: opt.isCorrect ? 700 : 500,
                              fontSize: '0.88rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: opt.isCorrect ? '#7c3aed' : 'transparent', border: opt.isCorrect ? 'none' : '1px solid var(--border-glass)', color: opt.isCorrect ? '#ffffff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                                {opt.id}
                              </div>
                              <span>{opt.text}</span>
                            </div>
                            {opt.isCorrect && <CheckCircle size={18} color="#7c3aed" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeMenu === 'Settings' && (
          <div style={{ maxWidth: '640px' }}>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
              Instructor Profile & Settings
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
              Update your public bio, profile picture, and notification preferences.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Profile settings updated successfully!'); }} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={profName} onChange={(e) => setProfName(e.target.value)} required />
              </div>

              <div>
                <label className="form-label">Instructor Bio</label>
                <textarea className="form-input" rows={4} value={profBio} onChange={(e) => setProfBio(e.target.value)} required />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                Save Changes
              </button>
            </form>
          </div>
        )}

      </main>

      {/* CREATE NEW COURSE MODAL */}
      {showCreateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-card" style={{ padding: '36px', width: '100%', maxWidth: '540px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-title)' }}>Create New Course</h2>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="var(--text-muted)" /></button>
            </div>

            <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Course Title</label>
                <input type="text" className="form-input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Price ($ USD)</label>
                  <input type="number" step="0.01" className="form-input" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
                </div>
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={3} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Create & Save Draft
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default InstructorDashboardPage;
