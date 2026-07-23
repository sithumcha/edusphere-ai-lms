import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const [instructorStats, setInstructorStats] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);

  // Edit Course Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Web Development');
  const [editPrice, setEditPrice] = useState('49.99');
  const [editDesc, setEditDesc] = useState('');
  const [editModules, setEditModules] = useState([]);
  const [isUpdatingCourse, setIsUpdatingCourse] = useState(false);

  const handleOpenEditModal = (c) => {
    setEditingCourseId(c._id || c.id);
    setEditTitle(c.title || '');
    setEditCategory(c.category || 'Web Development');
    setEditPrice(c.price !== undefined ? String(c.price) : '49.99');
    setEditDesc(c.description || '');
    setEditThumbnail(c.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80');
    setEditLevel(c.level || 'beginner');

    if (c.modules && c.modules.length > 0) {
      const formattedModules = c.modules.map((m, mIdx) => ({
        id: Date.now() + mIdx,
        title: m.title || `Module ${mIdx + 1}: Core Concepts`,
        lessons: m.lessons && m.lessons.length > 0 ? m.lessons.map((l, lIdx) => ({
          id: Date.now() + mIdx * 100 + lIdx,
          title: l.title || `Lesson ${lIdx + 1}: Lecture Topic`,
          videoUrl: l.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          duration: l.duration || '15 mins',
          notes: l.transcript || l.aiSummary || 'Lesson notes & summary.'
        })) : [
          {
            id: Date.now() + mIdx * 100,
            title: 'Lesson 1: Introduction & Overview',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: '15 mins',
            notes: 'Lesson study notes and guidelines.'
          }
        ]
      }));
      setEditModules(formattedModules);
    } else {
      setEditModules([
        {
          id: Date.now(),
          title: 'Module 1: Core Fundamentals & Practical Setup',
          lessons: [
            {
              id: Date.now() + 1,
              title: 'Lesson 1: Introduction & Key Concepts',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              duration: '15 mins',
              notes: 'Overview of key module concepts.'
            }
          ]
        }
      ]);
    }
    setShowEditModal(true);
  };

  const handleAddEditModule = (count = 1) => {
    setEditModules((prev) => {
      const updated = [...prev];
      const startCount = updated.length;
      for (let i = 1; i <= count; i++) {
        const modNum = startCount + i;
        updated.push({
          id: Date.now() + i + Math.random(),
          title: `Module ${modNum}: Course Curriculum Section ${modNum}`,
          lessons: [
            {
              id: Date.now() + i * 10 + Math.random(),
              title: 'Lesson 1: Key Topic Overview',
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              duration: '15 mins',
              notes: 'Lesson notes & summary.'
            }
          ]
        });
      }
      return updated;
    });
  };

  const handleRemoveEditModule = (modIdx) => {
    if (editModules.length <= 1) {
      alert('A course must have at least one module.');
      return;
    }
    setEditModules((prev) => prev.filter((_, idx) => idx !== modIdx));
  };

  const handleAddEditLesson = (modIdx, count = 1) => {
    setEditModules((prev) => {
      const updated = [...prev];
      const startCount = updated[modIdx].lessons.length;
      for (let i = 1; i <= count; i++) {
        updated[modIdx].lessons.push({
          id: Date.now() + i + Math.random(),
          title: `Lesson ${startCount + i}: Topic Lecture & Implementation`,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          duration: '15 mins',
          notes: 'Detailed lecture notes and step-by-step guidelines.'
        });
      }
      return updated;
    });
  };

  const handleRemoveEditLesson = (modIdx, lesIdx) => {
    setEditModules((prev) => {
      const updated = [...prev];
      if (updated[modIdx].lessons.length <= 1) {
        alert('Each module must have at least one lesson.');
        return updated;
      }
      updated[modIdx].lessons = updated[modIdx].lessons.filter((_, idx) => idx !== lesIdx);
      return updated;
    });
  };

  const handleEditLessonChange = (modIdx, lesIdx, field, value) => {
    setEditModules((prev) => {
      const updated = [...prev];
      updated[modIdx].lessons[lesIdx][field] = value;
      return updated;
    });
  };

  const handleSaveEditCourse = async (e) => {
    e.preventDefault();
    if (!editingCourseId) return;
    setIsUpdatingCourse(true);

    const modulesPayload = editModules.map((m) => ({
      title: m.title.trim(),
      lessons: m.lessons.map((l) => ({
        title: l.title.trim(),
        videoUrl: l.videoUrl.trim(),
        duration: l.duration || '15 mins',
        transcript: l.notes.trim(),
        aiSummary: l.notes.trim()
      }))
    }));

    const quizPayload = newQuizQuestions.map((q) => ({
      question: q.question.trim() || 'What is the primary concept covered in this lesson?',
      options: q.options && q.options.length === 4 ? q.options.map(opt => opt.trim()) : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: Number(q.correctIndex) || 0
    }));

    try {
      await api.put(`/courses/${editingCourseId}`, {
        title: editTitle.trim(),
        category: editCategory,
        price: Number(editPrice) || 0,
        description: editDesc.trim(),
        thumbnail: editThumbnail.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
        level: editLevel,
        modules: modulesPayload,
        quizzes: quizPayload
      });

      setShowEditModal(false);
      alert(`Course "${editTitle}" updated successfully with all modules & lessons! 🚀`);

      // Refresh instructor dashboard data
      const statsRes = await api.get('/dashboard/instructor');
      setInstructorStats(statsRes.data);
      if (statsRes.data?.courses) {
        setInstructorCourses(statsRes.data.courses);
      }
    } catch (err) {
      console.error('Update course error:', err);
      alert('Failed to update course.');
    } finally {
      setIsUpdatingCourse(false);
    }
  };

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const statsRes = await api.get('/dashboard/instructor');
        setInstructorStats(statsRes.data);
        if (statsRes.data?.courses) {
          setInstructorCourses(statsRes.data.courses);
        }
      } catch (err) {
        console.error('Fetch instructor stats error:', err);
      }
    };
    fetchInstructorData();
  }, []);

  // New Course Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Web Development');
  const [newPrice, setNewPrice] = useState('49.99');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState('published');
  const [newThumbnail, setNewThumbnail] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80');
  const [newLevel, setNewLevel] = useState('beginner');
  const [newModuleTitle, setNewModuleTitle] = useState('Module 1: Core Fundamentals & Practical Setup');
  const [newLessonTitle, setNewLessonTitle] = useState('Lesson 1: Key Concepts & Video Overview');
  const [newVideoUrl, setNewVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [newLessonNotes, setNewLessonNotes] = useState('Overview of key module concepts, setup guidelines, and step-by-step notes.');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  // Edit Course Extra States
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editLevel, setEditLevel] = useState('beginner');
  const [editModuleTitle, setEditModuleTitle] = useState('');
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [editLessonNotes, setEditLessonNotes] = useState('');

  // Custom Quiz Questions State inside Course Builder
  const [newQuizQuestions, setNewQuizQuestions] = useState([
    { question: 'What is the primary objective of neural network backpropagation?', options: ['Compute loss gradients & update weights', 'Render UI components', 'Store database indexes', 'Format HTML code'], correctIndex: 0 }
  ]);

  const handleImageFileUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (isEdit) setEditThumbnail(reader.result);
      else setNewThumbnail(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFileUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (isEdit) setEditVideoUrl(reader.result);
      else setNewVideoUrl(reader.result);
      alert(`Video file "${file.name}" uploaded successfully! 🎥`);
    };
    reader.readAsDataURL(file);
  };

  const handleNotesFileUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : `Uploaded Notes File: ${file.name}`;
      if (isEdit) setEditLessonNotes(text);
      else setNewLessonNotes(text);
      alert(`Lesson notes file "${file.name}" uploaded successfully! 📝`);
    };
    reader.readAsText(file);
  };

  const handleAddQuizQuestion = () => {
    setNewQuizQuestions(prev => [
      ...prev,
      { question: '', options: ['', '', '', ''], correctIndex: 0 }
    ]);
  };

  const handleRemoveQuizQuestion = (index) => {
    setNewQuizQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuizQuestion = (index, field, value, optIdx = 0) => {
    setNewQuizQuestions(prev => {
      const updated = [...prev];
      if (field === 'question') {
        updated[index].question = value;
      } else if (field === 'option') {
        const opts = [...(updated[index].options || ['', '', '', ''])];
        opts[optIdx] = value;
        updated[index].options = opts;
      } else if (field === 'correctIndex') {
        updated[index].correctIndex = Number(value);
      }
      return updated;
    });
  };

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

  const handleCreateCourse = async (statusToSet = 'published') => {
    if (!newTitle.trim()) {
      alert('Please enter a course title.');
      return;
    }
    setIsCreatingCourse(true);

    const modulesPayload = [
      {
        title: newModuleTitle.trim() || 'Module 1: Core Fundamentals & Setup',
        lessons: [
          {
            title: newLessonTitle.trim() || 'Lesson 1: Introduction & Architecture Overview',
            videoUrl: newVideoUrl.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: '15 mins',
            transcript: newLessonNotes.trim() || 'Welcome to this lesson! Follow the video guide step-by-step.',
            aiSummary: newLessonNotes.trim() || 'Core architecture concepts, key workflows, and practical applications.'
          }
        ]
      }
    ];

    try {
      const res = await api.post('/courses', {
        title: newTitle.trim(),
        category: newCategory,
        price: Number(newPrice) || 0,
        description: newDesc.trim() || 'Comprehensive training course.',
        thumbnail: newThumbnail.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
        level: newLevel,
        status: statusToSet,
        modules: modulesPayload
      });

      setShowCreateModal(false);
      alert(`Course "${newTitle}" created & ${statusToSet === 'published' ? 'Published Live to Course Catalog with Lesson Video & Notes! 🚀' : 'Saved to Drafts! 📝'}`);
      setNewTitle('');
      setNewDesc('');

      // Refresh instructor dashboard data
      const statsRes = await api.get('/dashboard/instructor');
      setInstructorStats(statsRes.data);
      if (statsRes.data?.courses) {
        setInstructorCourses(statsRes.data.courses);
      }
    } catch (err) {
      console.error('Create course error:', err);
      alert('Failed to create course. Please try again.');
    } finally {
      setIsCreatingCourse(false);
    }
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
                  onClick={() => navigate('/instructor/create-course')}
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)' }}
                >
                  <Plus size={18} /> Open Course Studio 🎓
                </button>
              </div>

              {/* 3 STAT CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '36px' }}>
                <div className="glass-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>TOTAL REVENUE</span>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--text-title)' }}>
                        ${instructorStats?.totalRevenue ? instructorStats.totalRevenue.toLocaleString() : '0.00'}
                      </strong>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#cff4fc', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>Real Platform Revenue</span>
                </div>

                <div className="glass-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>ACTIVE STUDENTS</span>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--text-title)' }}>
                        {instructorStats?.totalStudents ?? 0}
                      </strong>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={20} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>Enrolled Learners</span>
                </div>

                <div className="glass-card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>PUBLISHED COURSES</span>
                      <strong style={{ fontSize: '1.8rem', color: 'var(--text-title)' }}>
                        {instructorStats?.totalCourses ?? instructorCourses.length}
                      </strong>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={20} />
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
                    {(instructorCourses.length > 0 ? instructorCourses : MY_COURSES_LIST).map((c, idx) => {
                      const title = c.title;
                      const status = (c.status || 'published').toUpperCase();
                      const statusBg = status === 'PUBLISHED' ? '#dcfce7' : '#f3e8ff';
                      const statusColor = status === 'PUBLISHED' ? '#15803d' : '#7c3aed';
                      const studentCount = c.enrolledStudents ? c.enrolledStudents.length : (c.students || 0);
                      const earnedText = c.price ? `$${(c.price * studentCount).toLocaleString()}` : (c.earned || '$0');
                      const thumbnail = c.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';

                      return (
                        <div key={c._id || c.id || idx} className="glass-card glass-card-hover" style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '110px 1fr 60px', gap: '18px', alignItems: 'center', borderRadius: '16px' }}>
                          <img src={thumbnail} alt={title} style={{ width: '100%', height: '75px', objectFit: 'cover', borderRadius: '12px' }} />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                              <span style={{ padding: '2px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, background: statusBg, color: statusColor }}>{status}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.category || 'Online Course'}</span>
                            </div>
                            <h3 style={{ fontSize: '1rem', color: 'var(--text-title)', marginBottom: '4px' }}>{title}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{studentCount} Students • {earnedText} Revenue</span>
                          </div>
                          <div style={{ display: 'flex', gap: '10px', color: 'var(--text-muted)' }}>
                            <Edit2 size={16} style={{ cursor: 'pointer' }} onClick={() => navigate(`/courses/${c._id || c.id}`)} />
                            <MoreVertical size={16} style={{ cursor: 'pointer' }} />
                          </div>
                        </div>
                      );
                    })}
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
                onClick={() => navigate('/instructor/create-course')}
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}
              >
                <Plus size={18} /> Open Course Studio 🎓
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {(instructorCourses.length > 0 ? instructorCourses : MY_COURSES_LIST).map((c, idx) => {
                const title = c.title;
                const category = c.category || 'General';
                const studentCount = c.enrolledStudents ? c.enrolledStudents.length : (c.students || 0);
                const earnedText = c.price ? `$${(c.price * studentCount).toLocaleString()}` : (c.earned || '$0');
                const thumbnail = c.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';

                return (
                  <div key={c._id || c.id || idx} className="glass-card glass-card-hover" style={{ borderRadius: '20px', overflow: 'hidden', padding: '20px' }}>
                    <img src={thumbnail} alt={title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '14px', marginBottom: '16px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="badge badge-primary">{category}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', background: c.status === 'draft' ? '#f3e8ff' : '#dcfce7', color: c.status === 'draft' ? '#7c3aed' : '#15803d' }}>
                        {(c.status || 'published').toUpperCase()}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>{title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                      <span>👥 {studentCount} Students</span>
                      <strong style={{ color: '#059669' }}>{earnedText} Earned</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleOpenEditModal(c)}
                        style={{ flex: 1, background: '#8455ef', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Manage & Edit
                      </button>
                      <button
                        onClick={() => navigate(`/learn/${c._id || c.id}`)}
                        style={{ background: 'var(--bg-main)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
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
          <div className="glass-card" style={{ padding: '32px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>Create New Course</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Configure course details, upload video files, lesson notes, and custom quizzes.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="var(--text-muted)" /></button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCreateCourse('published'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Basic Details */}
              <div>
                <label className="form-label">Course Title</label>
                <input type="text" className="form-input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Mastering Web Development with React & AI" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Level</label>
                  <select className="form-input" value={newLevel} onChange={(e) => setNewLevel(e.target.value)}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Price ($ USD)</label>
                  <input type="number" step="0.01" className="form-input" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
                </div>
              </div>

              <div>
                <label className="form-label">Course Description</label>
                <textarea className="form-input" rows={2} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Brief course overview and curriculum goals..." required />
              </div>

              {/* Thumbnail Image URL & File Upload */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Course Thumbnail Cover</span>
                  <span style={{ fontSize: '0.72rem', color: '#6366f1' }}>📁 Upload Image File or Enter URL</span>
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px', alignItems: 'center' }}>
                  <input type="text" className="form-input" value={newThumbnail} onChange={(e) => setNewThumbnail(e.target.value)} placeholder="https://... or upload file below" required />
                  <img src={newThumbnail} alt="Preview" style={{ width: '100%', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                  <label style={{ background: '#6366f1', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span>📷 Choose Image File</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageFileUpload(e, false)} style={{ display: 'none' }} />
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Supported: JPG, PNG, WEBP</span>
                </div>
              </div>

              {/* Curriculum, Video File & Lesson Notes Section */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '14px', marginTop: '4px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#6366f1', marginBottom: '10px' }}>📖 Module, Video Upload & Lesson Notes</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(99,102,241,0.04)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Module Title</label>
                    <input type="text" className="form-input" value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} required />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Lesson 1 Title</label>
                    <input type="text" className="form-input" value={newLessonTitle} onChange={(e) => setNewLessonTitle(e.target.value)} required />
                  </div>

                  {/* Video Upload Field */}
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Lesson Video File / MP4 Stream URL</label>
                    <input type="text" className="form-input" value={newVideoUrl.startsWith('data:') ? '[Uploaded Local Video MP4 File]' : newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} required />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                      <label style={{ background: '#059669', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span>🎥 Upload Video MP4 File</span>
                        <input type="file" accept="video/*" onChange={(e) => handleVideoFileUpload(e, false)} style={{ display: 'none' }} />
                      </label>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Direct device MP4/WebM video upload supported</span>
                    </div>
                  </div>

                  {/* Notes File Upload Field */}
                  <div>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Lesson Notes & Summary Text</label>
                    <textarea className="form-input" rows={2} value={newLessonNotes} onChange={(e) => setNewLessonNotes(e.target.value)} placeholder="Type notes or upload a text/document file below..." required />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                      <label style={{ background: '#8b5cf6', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span>📄 Upload Notes File (PDF / TXT)</span>
                        <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={(e) => handleNotesFileUpload(e, false)} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Quiz Builder Section */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '14px', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981' }}>🧪 Lesson Quiz Question Builder</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Add multiple choice questions for students</span>
                  </div>
                  <button type="button" onClick={handleAddQuizQuestion} style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                    + Add Quiz Question
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {newQuizQuestions.map((q, qIdx) => (
                    <div key={qIdx} style={{ background: 'rgba(16,185,129,0.04)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <strong style={{ fontSize: '0.82rem', color: 'var(--text-title)' }}>Question #{qIdx + 1}</strong>
                        {newQuizQuestions.length > 1 && (
                          <button type="button" onClick={() => handleRemoveQuizQuestion(qIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}>
                            Remove Question ✕
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter Question (e.g., What is gradient descent?)"
                        value={q.question}
                        onChange={(e) => handleUpdateQuizQuestion(qIdx, 'question', e.target.value)}
                        style={{ marginBottom: '10px' }}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        {['A', 'B', 'C', 'D'].map((optLabel, optIdx) => (
                          <div key={optIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{
                              background: q.correctIndex === optIdx ? '#10b981' : 'rgba(99,102,241,0.12)',
                              color: q.correctIndex === optIdx ? '#ffffff' : '#6366f1',
                              fontWeight: 800,
                              fontSize: '0.78rem',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              minWidth: '76px',
                              textAlign: 'center',
                              flexShrink: 0
                            }}>
                              Option {optLabel}
                            </span>
                            <input
                              type="text"
                              className="form-input"
                              placeholder={`Type Choice ${optLabel}`}
                              value={q.options[optIdx] || ''}
                              onChange={(e) => handleUpdateQuizQuestion(qIdx, 'option', e.target.value, optIdx)}
                              style={{ fontSize: '0.8rem', flex: 1 }}
                            />
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-title)' }}>Correct Option:</span>
                        <select
                          className="form-input"
                          style={{ width: 'auto', padding: '4px 10px', fontSize: '0.78rem' }}
                          value={q.correctIndex}
                          onChange={(e) => handleUpdateQuizQuestion(qIdx, 'correctIndex', e.target.value)}
                        >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  disabled={isCreatingCourse}
                  onClick={() => handleCreateCourse('published')}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Publish Live 🚀
                </button>
                <button
                  type="button"
                  disabled={isCreatingCourse}
                  onClick={() => handleCreateCourse('draft')}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Save as Draft 📝
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {showEditModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)', zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-card" style={{ padding: '32px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-title)', fontWeight: 800 }}>Manage & Edit Course</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Update course details, upload video files, and lesson notes.</p>
              </div>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="var(--text-muted)" /></button>
            </div>

            <form onSubmit={handleSaveEditCourse} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Course Title</label>
                <input type="text" className="form-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Level</label>
                  <select className="form-input" value={editLevel} onChange={(e) => setEditLevel(e.target.value)}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Price ($ USD)</label>
                  <input type="number" step="0.01" className="form-input" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required />
                </div>
              </div>

              <div>
                <label className="form-label">Course Description</label>
                <textarea className="form-input" rows={2} value={editDesc} onChange={(e) => setEditDesc(e.target.value)} required />
              </div>

              {/* Thumbnail Image URL & File Upload */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Course Thumbnail Cover</span>
                  <span style={{ fontSize: '0.72rem', color: '#6366f1' }}>📁 Upload Image File or Enter URL</span>
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px', alignItems: 'center' }}>
                  <input type="text" className="form-input" value={editThumbnail} onChange={(e) => setEditThumbnail(e.target.value)} required />
                  <img src={editThumbnail} alt="Preview" style={{ width: '100%', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                  <label style={{ background: '#6366f1', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span>📷 Upload New Cover Image File</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageFileUpload(e, true)} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Curriculum & Multi-Module / Multi-Lesson Builder Section */}
              <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '14px', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#6366f1' }}>📖 Modules & Video Lessons Builder</h4>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => handleAddEditModule(1)}
                      style={{ background: '#6366f1', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      + 1 Module
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddEditModule(3)}
                      style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      ⚡ + 3 Modules
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddEditModule(5)}
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      🚀 + 5 Modules
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const input = prompt('How many modules would you like to add to this course?', '10');
                        const num = parseInt(input, 10);
                        if (num && num > 0) {
                          handleAddEditModule(num);
                        }
                      }}
                      style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      ➕ Custom Count (e.g. 10)
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {editModules.map((mod, modIdx) => (
                    <div key={mod.id || modIdx} style={{ background: 'rgba(99,102,241,0.04)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(99,102,241,0.15)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#6366f1' }}>Module #{modIdx + 1}</strong>
                        {editModules.length > 1 && (
                          <button type="button" onClick={() => handleRemoveEditModule(modIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}>
                            Remove Module ✕
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        className="form-input"
                        value={mod.title}
                        onChange={(e) => {
                          const updated = [...editModules];
                          updated[modIdx].title = e.target.value;
                          setEditModules(updated);
                        }}
                        placeholder="Module Title"
                        style={{ marginBottom: '12px', fontWeight: 700 }}
                        required
                      />

                      {/* Lessons inside Module */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginLeft: '8px' }}>
                        {mod.lessons.map((les, lesIdx) => (
                          <div key={les.id || lesIdx} style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)' }}>🎬 Lesson #{lesIdx + 1}</span>
                              {mod.lessons.length > 1 && (
                                <button type="button" onClick={() => handleRemoveEditLesson(modIdx, lesIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}>
                                  Delete Lesson ✕
                                </button>
                              )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '8px', marginBottom: '8px' }}>
                              <input
                                type="text"
                                className="form-input"
                                placeholder="Lesson Title"
                                value={les.title}
                                onChange={(e) => handleEditLessonChange(modIdx, lesIdx, 'title', e.target.value)}
                                style={{ fontSize: '0.8rem' }}
                                required
                              />
                              <input
                                type="text"
                                className="form-input"
                                placeholder="Duration (e.g. 15 mins)"
                                value={les.duration}
                                onChange={(e) => handleEditLessonChange(modIdx, lesIdx, 'duration', e.target.value)}
                                style={{ fontSize: '0.8rem' }}
                              />
                            </div>

                            <input
                              type="text"
                              className="form-input"
                              placeholder="Video MP4 Stream / Upload URL"
                              value={les.videoUrl.startsWith('data:') ? '[Uploaded Local MP4 Video File]' : les.videoUrl}
                              onChange={(e) => handleEditLessonChange(modIdx, lesIdx, 'videoUrl', e.target.value)}
                              style={{ fontSize: '0.8rem', marginBottom: '8px' }}
                              required
                            />

                            <textarea
                              className="form-input"
                              rows={2}
                              placeholder="Lesson Notes & Key Takeaways"
                              value={les.notes}
                              onChange={(e) => handleEditLessonChange(modIdx, lesIdx, 'notes', e.target.value)}
                              style={{ fontSize: '0.8rem' }}
                              required
                            />
                          </div>
                        ))}

                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => handleAddEditLesson(modIdx, 1)}
                            style={{ background: 'var(--bg-main)', color: '#6366f1', border: '1px dashed #6366f1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            + 1 Lesson
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddEditLesson(modIdx, 5)}
                            style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            ⚡ + 5 Lessons
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddEditLesson(modIdx, 10)}
                            style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            🚀 + 10 Lessons
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const input = prompt('How many lessons would you like to add to this module?', '15');
                              const num = parseInt(input, 10);
                              if (num && num > 0) {
                                handleAddEditLesson(modIdx, num);
                              }
                            }}
                            style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            ➕ Custom Count (e.g. 15, 20)
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="submit"
                  disabled={isUpdatingCourse}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {isUpdatingCourse ? 'Updating...' : 'Save & Update Course 🚀'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
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
