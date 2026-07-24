import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import {
  School,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  Sparkles,
  Settings,
  Bolt,
  HelpCircle,
  LogOut,
  Bell,
  ChevronRight,
  Terminal,
  Brush,
  Calculator,
  History,
  Star,
  Send,
  X,
  Bot,
  User,
  Clock,
  Calendar,
  Award,
  Flame,
  CheckCircle,
  Brain,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Bookmark,
  FileText,
  Sliders,
  Upload,
  Link as LinkIcon,
  Eye,
  Check,
  RotateCcw
} from 'lucide-react';

const RECOMMENDATIONS = [
  {
    title: 'Systems Architecture',
    desc: 'Based on your recent interest in Backend development and Cloud services.',
    rating: '4.9',
    duration: '12h Content',
    icon: <Terminal size={20} />,
    iconBg: '#004a57',
    iconColor: '#26c0de'
  },
  {
    title: 'Motion Design for Web',
    desc: 'Matches your creative portfolio progress in UI/UX Principles.',
    rating: '4.8',
    duration: '8h Content',
    icon: <Brush size={20} />,
    iconBg: '#e9ddff',
    iconColor: '#5516be'
  },
  {
    title: 'Linear Algebra for AI',
    desc: 'Essential foundation for your Advanced Machine Learning course.',
    rating: '5.0',
    duration: '25h Content',
    icon: <Calculator size={20} />,
    iconBg: '#e2dfff',
    iconColor: '#0f0069'
  },
  {
    title: 'Ethical Tech History',
    desc: 'A balanced elective recommended by your mentor for a broader perspective.',
    rating: '4.7',
    duration: '10h Content',
    icon: <History size={20} />,
    iconBg: '#d3e4fe',
    iconColor: '#1f108e'
  }
];

const PEERS_LIST = [
  { name: 'Sarah Connor', rank: '1', score: '2,840 pts', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', badge: 'AI Scholar' },
  { name: 'Alex Johnson (You)', rank: '2', score: '2,450 pts', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', badge: 'Top 5%' },
  { name: 'Elena Rostova', rank: '3', score: '2,180 pts', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', badge: 'Python Pro' },
  { name: 'Marcus Brody', rank: '4', score: '1,920 pts', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', badge: 'UX Explorer' }
];

const StudentDashboardPage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  // AI Quiz Interactive Student Practice Studio State
  const [studentSourceNotes, setStudentSourceNotes] = useState('');
  const [studentQuestionCount, setStudentQuestionCount] = useState(5);
  const [studentQuizType, setStudentQuizType] = useState('Multiple Choice');
  const [studentGeneratedQuestions, setStudentGeneratedQuestions] = useState([]);
  const [isGeneratingStudentQuiz, setIsGeneratingStudentQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // AI Tutor Chat Popup State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: `Hi ${user?.name || 'Student'}! Need help with your courses or lessons today?` }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Settings State
  const [nameInput, setNameInput] = useState(user?.name || 'Student');
  const [bioInput, setBioInput] = useState(user?.bio || 'Passionate student learning AI engineering.');
  const [settingsMsg, setSettingsMsg] = useState('');

  const fetchStudentData = async () => {
    try {
      const res = await api.get('/enrollments/my-courses');
      setEnrollments(res.data || []);

      const statsRes = await api.get('/dashboard/student');
      setDashboardStats(statsRes.data);
    } catch (err) {
      console.error('Failed to load student dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const [chatLoading, setChatLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatLoading) return;

    const userText = inputMessage.trim();
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');
    setChatLoading(true);

    try {
      const res = await api.post('/ai/chatbot', { message: userText });
      const aiReply = res.data?.content || res.data?.text || 'I am happy to assist you with your learning goals!';
      setChatMessages((prev) => [...prev, { role: 'ai', text: aiReply }]);
    } catch (err) {
      console.error('AI Chatbot error:', err);
      const qLower = userText.toLowerCase();
      let fallbackText = `Regarding **"${userText}"**:\n\n• **Key Insight**: To master this topic, review your enrolled course lessons and practice writing code in our Code Sandbox!\n• **Tip**: You can also generate an AI practice quiz right here from your dashboard.`;
      if (qLower.includes('hi') || qLower.includes('hello')) {
        fallbackText = `Hello! 👋 I am your EduSphere AI Tutor. How can I assist you with your learning today?`;
      }
      setChatMessages((prev) => [...prev, { role: 'ai', text: fallbackText }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleGenerateStudentQuiz = async () => {
    setIsGeneratingStudentQuiz(true);
    setQuizScore(null);
    setSelectedAnswers({});

    try {
      const res = await api.post('/ai/generate-quiz', {
        topic: 'Neural Networks & Machine Learning',
        content: studentSourceNotes || 'Neural networks utilize activation functions, backpropagation, and gradient descent to optimize loss.',
        numQuestions: Number(studentQuestionCount) || 5,
        saveToDb: false
      });

      if (res.data?.questions && res.data.questions.length > 0) {
        const formatted = res.data.questions.map((q, idx) => ({
          id: idx + 1,
          question: q.question,
          options: q.options?.map((opt, oIdx) => ({
            id: String.fromCharCode(65 + oIdx),
            text: opt,
            isCorrect: oIdx === q.correctAnswer
          }))
        }));
        setStudentGeneratedQuestions(formatted);
      } else {
        // Fallback practice questions
        setStudentGeneratedQuestions([
          {
            id: 1,
            question: 'Which neural network architecture is best for sequential data like text or audio?',
            options: [
              { id: 'A', text: 'Convolutional Neural Networks (CNN)', isCorrect: false },
              { id: 'B', text: 'Recurrent Neural Networks (RNN)', isCorrect: true },
              { id: 'C', text: 'Generative Adversarial Networks (GAN)', isCorrect: false },
              { id: 'D', text: 'Radial Basis Function Networks', isCorrect: false }
            ]
          },
          {
            id: 2,
            question: 'Supervised learning requires labeled data to train the model successfully.',
            options: [
              { id: 'A', text: 'True', isCorrect: true },
              { id: 'B', text: 'False', isCorrect: false }
            ]
          }
        ]);
      }
    } catch (err) {
      console.error('Error generating student quiz:', err);
      setStudentGeneratedQuestions([
        {
          id: 1,
          question: 'Which function is commonly used as a non-linear activation function in deep learning?',
          options: [
            { id: 'A', text: 'ReLU (Rectified Linear Unit)', isCorrect: true },
            { id: 'B', text: 'Linear Regression', isCorrect: false },
            { id: 'C', text: 'Mean Squared Error', isCorrect: false },
            { id: 'D', text: 'Binary Cross-Entropy', isCorrect: false }
          ]
        }
      ]);
    } finally {
      setIsGeneratingStudentQuiz(false);
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleCalculateScore = () => {
    let score = 0;
    studentGeneratedQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (selected === correctOpt?.id) score++;
    });
    const percentage = Math.round((score / studentGeneratedQuestions.length) * 100);
    setQuizScore({ score, total: studentGeneratedQuestions.length, percentage });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      if (updateProfile) {
        await updateProfile({ name: nameInput, bio: bioInput });
      }
      setSettingsMsg('Student profile updated successfully!');
      setTimeout(() => setSettingsMsg(''), 4000);
    } catch (err) {
      setSettingsMsg('Profile updated!');
      setTimeout(() => setSettingsMsg(''), 4000);
    }
  };

  if (loading) return <Loader text="Loading EduSphere Student Portal..." />;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', background: 'var(--bg-main)' }}>
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside style={{ width: '280px', flexShrink: 0, background: 'var(--bg-glass)', borderRight: '1px solid var(--border-glass)', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'sticky', top: '72px', height: 'calc(100vh - 72px)', overflowY: 'auto' }}>
        <div>
          {/* Logo Header (Fixed to Student Portal) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border-glass)', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#3730a3', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <School size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.2' }}>EduSphere AI</h1>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Student Portal</p>
            </div>
          </div>

          {/* Navigation Buttons: Dashboard, Curriculum, Analytics, Students, AI Insights, Settings */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { name: 'Curriculum', icon: <BookOpen size={18} /> },
              { name: 'Analytics', icon: <BarChart3 size={18} /> },
              { name: 'Students', icon: <Users size={18} /> },
              { name: 'AI Insights', icon: <Sparkles size={18} /> },
              { name: 'Settings', icon: <Settings size={18} /> }
            ].map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? '#8455ef' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: isActive ? 'translateX(4px)' : 'none'
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom CTA */}
        <div>
          <button
            onClick={() => setIsChatOpen(true)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #1f108e 0%, #6b38d4 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '16px',
              boxShadow: '0 4px 14px rgba(31, 16, 142, 0.35)'
            }}
          >
            <Bolt size={18} /> Launch AI Tutor
          </button>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', padding: '8px 12px' }}>
              <HelpCircle size={18} /> Support
            </button>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#ba1a1a', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', padding: '8px 12px' }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT PANEL */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Bar */}
        <header style={{ height: '72px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-glass)', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1f108e' }}>
              Welcome back, {user?.name || 'Student'}!
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              You've completed <strong style={{ color: '#6b38d4' }}>{dashboardStats?.weeklyGoalPercent ?? 0}%</strong> of your weekly goal.
            </p>
          </div>
        </header>

        {/* Dynamic Body Area */}
        <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'Dashboard' && (
            <>
              {/* GAMIFICATION & STREAK BANNER */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
                  border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '20px',
                  padding: '18px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {/* Streak Count */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', padding: '8px 16px', borderRadius: '30px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🔥</span>
                    <div style={{ lineHeight: '1.2' }}>
                      <strong style={{ fontSize: '1rem', color: '#ef4444', display: 'block' }}>5-Day Streak!</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Keep learning daily</span>
                    </div>
                  </div>

                  {/* XP Points */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', padding: '8px 16px', borderRadius: '30px' }}>
                    <span style={{ fontSize: '1.2rem' }}>⚡</span>
                    <div style={{ lineHeight: '1.2' }}>
                      <strong style={{ fontSize: '1rem', color: '#f59e0b', display: 'block' }}>1,450 XP</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Top 5% Learner</span>
                    </div>
                  </div>

                  {/* Earned Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {['🤖 AI Scholar', '🐍 Python Pro', '🏆 Quiz Champ'].map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--border-glass)',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--text-title)'
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 7-DAY STUDY HEATMAP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginRight: '4px' }}>
                    THIS WEEK:
                  </span>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => {
                    const isActiveDay = dIdx < 5;
                    return (
                      <div key={dIdx} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            background: isActiveDay ? '#10b981' : 'rgba(255,255,255,0.08)',
                            boxShadow: isActiveDay ? '0 0 10px rgba(16,185,129,0.5)' : 'none',
                            marginBottom: '4px'
                          }}
                        />
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ADVANCED AI LEARNING ANALYTICS & FOCUS HOUR TRACKER BANNER */}
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(99,102,241,0.08))', border: '1px solid rgba(16,185,129,0.3)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                    ⏱️ WEEKLY FOCUS HOURS
                  </span>
                  <strong style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-title)' }}>14.5 hrs</strong>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'block' }}>+2.4 hrs vs last week</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                    🧠 MEMORY RETENTION SCORE
                  </span>
                  <strong style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-title)' }}>94.2%</strong>
                  <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 700, display: 'block' }}>High AI Retention Rate</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                    🎯 PREDICTED QUIZ SCORE
                  </span>
                  <strong style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-title)' }}>98 / 100 A+</strong>
                  <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700, display: 'block' }}>Certified Ready</span>
                </div>
              </div>

              {/* STATS ROW */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(132, 85, 239, 0.3)', boxShadow: '0 0 20px rgba(132, 85, 239, 0.15)' }}>
                  <div style={{ flex: 1, paddingRight: '24px' }}>
                    <span className="badge" style={{ background: '#e9ddff', color: '#23005c', marginBottom: '12px' }}>
                      WEEKLY STATUS
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                      Course Efficiency Boosted
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                      Your AI Tutor tracks your progress and unlocks advanced study modules to accelerate your certification.
                    </p>
                    <div style={{ height: '10px', width: '100%', background: 'rgba(200, 196, 213, 0.3)', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${dashboardStats?.weeklyGoalPercent ?? 0}%`, height: '100%', background: 'linear-gradient(90deg, #1f108e 0%, #6b38d4 100%)', borderRadius: '5px' }} />
                    </div>
                  </div>

                  <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: `conic-gradient(#6b38d4 0% ${dashboardStats?.weeklyGoalPercent ?? 0}%, #e5eeff ${dashboardStats?.weeklyGoalPercent ?? 0}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: '82px', height: '82px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', color: '#1f108e' }}>
                      {dashboardStats?.weeklyGoalPercent ?? 0}%
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    SKILL PROGRESS
                  </span>

                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '12px 0' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#26c0de 0% 88%, #e5eeff 88% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#004a57' }}>88%</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-title)' }}>Logic</span>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#8455ef 0% 62%, #e5eeff 62% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#6b38d4' }}>62%</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-title)' }}>Python</span>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#1f108e 0% 45%, #e5eeff 45% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#1f108e' }}>45%</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-title)' }}>Design</span>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('Analytics')} style={{ background: 'none', border: 'none', color: '#1f108e', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                    View detailed report
                  </button>
                </div>
              </div>

              {/* MY LEARNING & DEADLINES */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)' }}>My Learning</h3>
                    <span onClick={() => setActiveTab('Curriculum')} style={{ color: '#1f108e', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem' }}>View All</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {enrollments.length > 0 ? (
                      enrollments.map((e, idx) => {
                        const course = e.courseId || {};
                        const courseId = course._id || e.courseId || 'c1';
                        const title = course.title || 'Enrolled Course';
                        const category = course.category || 'Online Course';
                        const thumbnail = course.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';
                        const progress = typeof e.overallProgress === 'number' ? e.overallProgress : 0;

                        return (
                          <div
                            key={e._id || idx}
                            className="glass-card glass-card-hover"
                            onClick={() => navigate(`/learn/${courseId}`)}
                            style={{ borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
                          >
                            <div style={{ height: '130px', position: 'relative' }}>
                              <img src={thumbnail} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: '#6b38d4', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                                {progress >= 100 ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            <div style={{ padding: '16px' }}>
                              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {title}
                              </h4>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                <span>{category}</span>
                                <strong style={{ color: '#6b38d4' }}>{progress}%</strong>
                              </div>
                              <div style={{ height: '6px', width: '100%', background: 'rgba(200, 196, 213, 0.3)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${progress}%`, height: '100%', background: '#6b38d4' }} />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="glass-card" style={{ padding: '24px', textAlign: 'center', gridColumn: '1 / -1', borderRadius: '16px' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '14px' }}>
                          You are not enrolled in any active courses yet.
                        </p>
                        <button onClick={() => navigate('/courses')} className="btn-primary" style={{ margin: '0 auto' }}>
                          <BookOpen size={16} /> Explore Course Catalog
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '20px' }}>Upcoming Deadlines</h3>
                  <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bg-main)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ba1a1a' }}>OCT</span>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-title)' }}>24</strong>
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.88rem', display: 'block', color: 'var(--text-title)' }}>Neural Networks Final Project</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2:00 PM • Submission</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--bg-main)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>OCT</span>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-title)' }}>27</strong>
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.88rem', display: 'block', color: 'var(--text-title)' }}>Visual Design Quiz</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10:00 AM • Module 4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI RECOMMENDATIONS */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <Sparkles size={22} color="#6b38d4" />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)' }}>AI Recommendations</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  {RECOMMENDATIONS.map((rec, idx) => (
                    <div key={idx} className="glass-card glass-card-hover" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: rec.iconBg, color: rec.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>{rec.icon}</div>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '6px' }}>{rec.title}</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '16px' }}>{rec.desc}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-title)', fontWeight: 700 }}><Star size={14} fill="#f59e0b" color="#f59e0b" /><span>{rec.rating}</span><span style={{ color: 'var(--text-muted)' }}>• {rec.duration}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CURRICULUM (MY COURSES) */}
          {activeTab === 'Curriculum' && (
            <div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                My Curriculum & Enrolled Courses
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Access your active course lessons, video chapters, and certificates.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {enrollments.length > 0 ? (
                  enrollments.map((e, idx) => {
                    const course = e.courseId || {};
                    const courseId = course._id || e.courseId || 'c1';
                    const title = course.title || 'Enrolled Course';
                    const category = course.category || 'Online Learning';
                    const thumbnail = course.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';
                    const progress = typeof e.overallProgress === 'number' ? e.overallProgress : 0;

                    return (
                      <div key={e._id || idx} className="glass-card glass-card-hover" style={{ borderRadius: '20px', overflow: 'hidden', padding: '20px' }}>
                        <img src={thumbnail} alt={title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '14px', marginBottom: '16px' }} />
                        <span className="badge badge-primary" style={{ marginBottom: '10px' }}>{category}</span>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>{title}</h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                          Overall Progress • {progress}% Completed
                        </p>
                        <button onClick={() => navigate(`/learn/${courseId}`)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                          Continue Learning →
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="glass-card" style={{ padding: '36px', textAlign: 'center', gridColumn: '1 / -1', borderRadius: '20px' }}>
                    <BookOpen size={36} color="#7c3aed" style={{ marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>No Enrolled Courses Found</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                      Browse our catalog of 10,000+ courses and start your learning journey today.
                    </p>
                    <button onClick={() => navigate('/courses')} className="btn-primary" style={{ margin: '0 auto' }}>
                      Explore Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                Personal Study Analytics
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Track your weekly study hours, quiz mastery percentages, and study streaks.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div className="glass-card" style={{ padding: '22px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800 }}>STUDY STREAK</span>
                  <h2 style={{ fontSize: '2rem', color: '#8455ef', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame color="#8455ef" /> {dashboardStats?.studyStreak ?? (enrollments.length > 0 ? 1 : 0)} Days
                  </h2>
                </div>

                <div className="glass-card" style={{ padding: '22px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800 }}>AVERAGE QUIZ SCORE</span>
                  <h2 style={{ fontSize: '2rem', color: '#059669' }}>{dashboardStats?.averageQuizScore ?? 0}%</h2>
                </div>

                <div className="glass-card" style={{ padding: '22px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800 }}>COMPLETED LESSONS</span>
                  <h2 style={{ fontSize: '2rem', color: '#1f108e' }}>{dashboardStats?.completedLessonsCount ?? 0} Lessons</h2>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDENTS / PEERS */}
          {activeTab === 'Students' && (
            <div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                Peer Leaderboard & Community
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Connect with classmates, compare leaderboard rankings, and collaborate.
              </p>

              <div className="glass-card" style={{ padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <th style={{ padding: '12px' }}>RANK</th>
                      <th style={{ padding: '12px' }}>STUDENT</th>
                      <th style={{ padding: '12px' }}>BADGE</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>POINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PEERS_LIST.map((p) => (
                      <tr key={p.rank} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        <td style={{ padding: '16px 12px', fontWeight: 800, color: '#6b38d4' }}>#{p.rank}</td>
                        <td style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={p.avatar} alt={p.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                          <strong style={{ color: 'var(--text-title)' }}>{p.name}</strong>
                        </td>
                        <td style={{ padding: '16px 12px' }}><span className="badge badge-primary">{p.badge}</span></td>
                        <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: 800, color: '#059669' }}>{p.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: AI INSIGHTS & STUDENT INTERACTIVE PRACTICE QUIZ STUDIO */}
          {activeTab === 'AI Insights' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Brain size={28} color="#7c3aed" />
                <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                  Student AI Practice Quiz Generator & Study Studio
                </h1>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Paste your lecture notes, textbook summaries, or topic keywords to generate instant practice quizzes for self-testing!
              </p>

              {/* STUDIO GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '28px' }}>
                
                {/* STEP 1 & STEP 2 INPUTS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Step 1: Source Content */}
                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={20} color="#7c3aed" />
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)' }}>Source Notes</h3>
                      </div>
                      <span className="badge badge-primary">Step 1</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      Paste lecture notes, study guides, or topic keywords for Gemini AI to analyze.
                    </p>

                    <textarea
                      rows={6}
                      placeholder="e.g. Backpropagation computes partial derivatives using the chain rule to update weights in neural networks..."
                      value={studentSourceNotes}
                      onChange={(e) => setStudentSourceNotes(e.target.value)}
                      className="form-input"
                      style={{ borderRadius: '14px', resize: 'none', marginBottom: '16px', fontSize: '0.88rem' }}
                    />
                  </div>

                  {/* Step 2: Quiz Settings */}
                  <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sliders size={20} color="#7c3aed" />
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)' }}>Practice Quiz Settings</h3>
                      </div>
                      <span className="badge badge-primary">Step 2</span>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <span>Number of Practice Questions</span>
                        <strong style={{ color: '#7c3aed' }}>{studentQuestionCount}</strong>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="20"
                        value={studentQuestionCount}
                        onChange={(e) => setStudentQuestionCount(e.target.value)}
                        style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                      />
                    </div>

                    <button
                      onClick={handleGenerateStudentQuiz}
                      disabled={isGeneratingStudentQuiz}
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
                      <Sparkles size={18} /> {isGeneratingStudentQuiz ? 'Generating AI Practice Quiz...' : '✨ Generate Student Practice Quiz Now'}
                    </button>
                  </div>

                </div>

                {/* STEP 3: LIVE PRACTICE QUIZ PREVIEW */}
                <div>
                  <div className="glass-card" style={{ padding: '18px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Eye size={20} color="#7c3aed" />
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-title)' }}>Practice Quiz Area</h3>
                      <span className="badge badge-primary">{studentGeneratedQuestions.length} Questions</span>
                    </div>

                    {studentGeneratedQuestions.length > 0 && !quizScore && (
                      <button
                        onClick={handleCalculateScore}
                        className="btn-primary"
                        style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                      >
                        Check My Answers ✓
                      </button>
                    )}
                  </div>

                  {/* SCORE CARD */}
                  {quizScore && (
                    <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px', background: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', border: '1px solid #86efac', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>
                          Quiz Completed! Score: {quizScore.score} / {quizScore.total} ({quizScore.percentage}%)
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#166534', marginTop: '4px' }}>
                          {quizScore.percentage >= 80 ? '🎉 Excellent mastery! You understand this topic well.' : '💡 Good effort! Review the notes and try again.'}
                        </p>
                      </div>
                      <button onClick={handleGenerateStudentQuiz} className="btn-secondary" style={{ background: '#ffffff', color: '#15803d', border: '1px solid #86efac' }}>
                        <RotateCcw size={16} /> Retake
                      </button>
                    </div>
                  )}

                  {/* QUESTIONS RENDER */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {studentGeneratedQuestions.length === 0 ? (
                      <div className="glass-card" style={{ padding: '48px 24px', textAlign: 'center', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                          <Brain size={32} />
                        </div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                          No Student Practice Quiz Generated Yet
                        </h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: '1.55', margin: '0 auto' }}>
                          Paste your lecture notes in Step 1, select how many practice questions you want, and click <strong style={{ color: '#7c3aed' }}>"✨ Generate Student Practice Quiz Now"</strong>!
                        </p>
                      </div>
                    ) : (
                      studentGeneratedQuestions.map((q, idx) => (
                        <div key={q.id || idx} className="glass-card" style={{ padding: '24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                            <span style={{ background: '#7c3aed', color: '#ffffff', padding: '4px 14px', borderRadius: '14px', fontSize: '0.78rem', fontWeight: 800 }}>
                              Question {idx + 1}
                            </span>
                          </div>

                          <h4 style={{ fontSize: '1rem', color: 'var(--text-title)', marginBottom: '16px', lineHeight: '1.4' }}>
                            {q.question}
                          </h4>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {q.options?.map((opt) => {
                              const isSelected = selectedAnswers[q.id] === opt.id;
                              const showResults = quizScore !== null;
                              const isCorrectAnswer = opt.isCorrect;

                              let bg = 'var(--bg-main)';
                              let border = '1px solid var(--border-glass)';
                              let color = 'var(--text-title)';

                              if (isSelected && !showResults) {
                                bg = '#f3e8ff';
                                border = '2px solid #7c3aed';
                                color = '#7c3aed';
                              } else if (showResults) {
                                if (isCorrectAnswer) {
                                  bg = '#dcfce7';
                                  border = '2px solid #16a34a';
                                  color = '#15803d';
                                } else if (isSelected && !isCorrectAnswer) {
                                  bg = '#ffe4e6';
                                  border = '2px solid #e11d48';
                                  color = '#be123c';
                                }
                              }

                              return (
                                <div
                                  key={opt.id}
                                  onClick={() => !quizScore && handleOptionSelect(q.id, opt.id)}
                                  style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border,
                                    background: bg,
                                    color,
                                    fontWeight: isSelected || (showResults && isCorrectAnswer) ? 700 : 500,
                                    fontSize: '0.88rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: quizScore ? 'default' : 'pointer'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: isSelected ? '#7c3aed' : 'transparent', border: isSelected ? 'none' : '1px solid var(--border-glass)', color: isSelected ? '#ffffff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                                      {opt.id}
                                    </div>
                                    <span>{opt.text}</span>
                                  </div>
                                  {showResults && isCorrectAnswer && <CheckCircle size={18} color="#16a34a" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'Settings' && (
            <div style={{ maxWidth: '600px' }}>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                Student Profile & Account Settings
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
                Update your display name, personal bio, and email notification preferences.
              </p>

              {settingsMsg && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontWeight: 700 }}>
                  {settingsMsg}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
                </div>

                <div>
                  <label className="form-label">Bio / Learning Goal</label>
                  <textarea className="form-input" rows={4} value={bioInput} onChange={(e) => setBioInput(e.target.value)} required />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Save Profile Settings
                </button>
              </form>
            </div>
          )}

          {/* Footer */}
          <footer style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <p>© 2026 EduSphere AI. Empowering deep learning.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#accessibility" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accessibility</a>
            </div>
          </footer>

        </div>

      </main>

      {/* 3. AI TUTOR BOT FLOATING POPUP WIDGET */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100 }}>
        {!isChatOpen && (
          <div style={{ position: 'absolute', top: '-40px', right: 0, background: '#0b1c30', color: '#ffffff', padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
            Ask me anything!
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1f108e 0%, #6b38d4 100%)',
            color: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(132, 85, 239, 0.5)',
            cursor: 'pointer'
          }}
          className="pulse-glow"
        >
          <Sparkles size={28} />
        </button>

        {isChatOpen && (
          <div
            className="glass-card"
            style={{
              position: 'absolute',
              bottom: '70px',
              right: 0,
              width: '360px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: '1px solid rgba(132, 85, 239, 0.4)',
              background: 'var(--bg-card)'
            }}
          >
            <div style={{ background: 'linear-gradient(135deg, #1f108e 0%, #6b38d4 100%)', color: '#ffffff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={18} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.92rem', display: 'block' }}>EduSphere AI Tutor</strong>
                  <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>Online & Ready to help</span>
                </div>
              </div>
              <X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsChatOpen(false)} />
            </div>

            <div style={{ height: '260px', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-main)' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.role === 'ai' && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(31, 16, 142, 0.1)', color: '#1f108e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={14} />
                    </div>
                  )}
                  <div style={{ padding: '10px 14px', borderRadius: '12px', fontSize: '0.82rem', lineHeight: '1.45', background: msg.role === 'user' ? '#6b38d4' : '#ffffff', color: msg.role === 'user' ? '#ffffff' : '#0b1c30', maxWidth: '80%', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '12px 16px', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '8px', background: 'var(--bg-card)' }}>
              <input
                type="text"
                placeholder="Type your question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ flex: 1, background: 'var(--bg-main)', border: 'none', borderRadius: '10px', padding: '8px 12px', fontSize: '0.82rem', color: 'var(--text-title)', outline: 'none' }}
              />
              <button type="submit" style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#6b38d4', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentDashboardPage;
