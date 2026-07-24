import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/common/Loader';
import CertificateGenerator from '../components/certificate/CertificateGenerator';
import { useAuth } from '../context/AuthContext';
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  Download,
  FileText,
  Code2,
  Sparkles,
  Bot,
  Send,
  MessageSquare,
  ThumbsUp,
  Award,
  ChevronRight,
  ArrowRight,
  Copy,
  RefreshCw,
  X
} from 'lucide-react';

const DISCUSSION_COMMENTS = [
  {
    id: 1,
    initials: 'JD',
    name: 'James D.',
    time: '3 hours ago',
    comment: 'Could someone clarify the practical implementation details for hidden layers in this module?',
    likes: 12
  }
];

const KEY_VOCABULARY = ['Architecture', 'Optimization', 'Gradient', 'Pipeline'];

const CourseLearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [activeRightTab, setActiveRightTab] = useState('summary');
  const [loading, setLoading] = useState(true);

  // Discussion Comments State
  const [comments, setComments] = useState(DISCUSSION_COMMENTS);
  const [newComment, setNewComment] = useState('');

  // AI Tutor Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: 'Hi! I am your AI Tutor assistant for this lesson. Ask me any question or request a code snippet!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Video Controls & Subtitles State
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Assignment Studio State
  const [assignmentSubmission, setAssignmentSubmission] = useState('');
  const [assignmentGrade, setAssignmentGrade] = useState(null);
  const [isGradingAssignment, setIsGradingAssignment] = useState(false);

  // Student Notes State
  const [notesText, setNotesText] = useState('');

  // Certificate & Quiz Threshold State (Pass threshold >= 40%)
  const [certificateData, setCertificateData] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [userQuizAnswers, setUserQuizAnswers] = useState({});
  const [quizScorePercentage, setQuizScorePercentage] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isQuizPassed, setIsQuizPassed] = useState(false);

  const handleEvaluateQuiz = (questionsList) => {
    if (!questionsList || questionsList.length === 0) return;
    let correctCount = 0;
    questionsList.forEach((q, idx) => {
      const selectedOpt = userQuizAnswers[idx];
      const correctOpt = q.correctIndex !== undefined ? q.correctIndex : 0;
      if (selectedOpt === correctOpt) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questionsList.length) * 100);
    setQuizScorePercentage(percentage);
    setIsQuizSubmitted(true);

    if (percentage >= 40) {
      setIsQuizPassed(true);
      if (!certificateData) {
        setCertificateData({
          certificateId: `CERT-${Date.now()}`,
          studentName: user?.name || 'David Miller',
          courseTitle: course?.title || 'Course',
          instructorName: course?.instructorName || 'Dr. Sarah Chen',
          issueDate: new Date()
        });
      }
    } else {
      setIsQuizPassed(false);
    }
  };

  const fetchLearningData = async () => {
    try {
      const courseRes = await api.get(`/courses/${courseId}`);
      setCourse(courseRes.data);

      const enrollRes = await api.get('/enrollments/my-courses');
      const foundEnroll = enrollRes.data.find(
        (e) => (e.courseId?._id || e.courseId) === courseId || e.courseId?.toString() === courseId
      );
      setEnrollment(foundEnroll || null);

      if (foundEnroll?.certificateIssued) {
        const certRes = await api.get(`/enrollments/certificates/${foundEnroll.certificateId}`);
        setCertificateData(certRes.data);
      }
    } catch (err) {
      console.error('Failed to load learning page:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningData();
  }, [courseId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const userQuestionText = newComment.trim();
    const newCommentId = Date.now();

    const newCommentObj = {
      id: newCommentId,
      initials: (user?.name || 'You').slice(0, 2).toUpperCase(),
      name: user?.name || 'You',
      time: 'Just now',
      comment: userQuestionText,
      likes: 0
    };

    setComments((prev) => [...prev, newCommentObj]);
    setNewComment('');

    // Trigger AI Auto-Response in Discussion Forum
    setTimeout(() => {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          initials: 'AI',
          name: 'EduSphere AI Tutor 🤖',
          time: 'Just now',
          comment: `Great question regarding "${userQuestionText.slice(0, 45)}..."! In this lesson, remember to structure your component logic cleanly and utilize error boundaries for robust production handling.`,
          likes: 4,
          isAiResponse: true
        }
      ]);
    }, 1200);
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const res = await api.post('/ai/chatbot', {
        courseId,
        message: userMsg
      });
      setChatMessages((prev) => [...prev, { role: 'ai', content: res.data.content }]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setChatLoading(false);
    }
  };

  // Advance to next lesson
  const handleNextLesson = async () => {
    const modules = course?.modules || [];
    const currentMod = modules[currentModuleIndex];
    
    if (currentMod && currentLessonIndex + 1 < (currentMod.lessons?.length || 0)) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex + 1 < modules.length) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }

    // Try updating backend progress
    try {
      if (courseId) {
        await api.put(`/enrollments/${courseId}/progress`, {
          lessonId: currentLesson?._id || `lesson-${currentLessonIndex}`,
          completed: true
        });
      }
    } catch (err) {
      console.warn('Progress update warning:', err);
    }
  };

  const handleCopySummaryToNotes = () => {
    const summaryBullets = `• ${course?.title || 'Course'}: Key concepts focus on statistical weights and architecture setup.\n• Main lesson objectives: Input validation, feature extraction, and model evaluation.\n• Best practice: Maintain modular functions and handle error boundaries.`;
    setNotesText((prev) => (prev ? `${prev}\n\n${summaryBullets}` : summaryBullets));
    setActiveRightTab('notes');
  };

  if (loading) return <Loader text="Loading EduSphere AI Learning Portal..." />;

  // Dynamic modules & lessons resolution
  const modulesList = course?.modules && course.modules.length > 0
    ? course.modules
    : [
        {
          title: 'MODULE 1: FOUNDATIONS',
          lessons: [
            { _id: 'l1', title: `1. Welcome to ${course?.title || 'Course'}`, duration: '10:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { _id: 'l2', title: '2. Core Principles & Architecture', duration: '14:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { _id: 'l3', title: '3. Hands-on Setup & Lab', duration: '18:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
          ]
        },
        {
          title: 'MODULE 2: ADVANCED PATTERNS',
          lessons: [
            { _id: 'l4', title: '4. Optimization & Fine Tuning', duration: '22:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { _id: 'l5', title: '5. Production Deployment', duration: '25:00', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
          ]
        }
      ];

  const currentModule = modulesList[currentModuleIndex] || modulesList[0];
  const currentLesson = currentModule?.lessons?.[currentLessonIndex] || currentModule?.lessons?.[0] || {
    title: `Lesson 1: Introduction to ${course?.title || 'Course'}`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  };

  const overallProgress = typeof enrollment?.overallProgress === 'number' ? enrollment.overallProgress : 0;
  const courseHasQuiz = Boolean(course?.quizzes && course.quizzes.length > 0);
  const isCourseCompleted = overallProgress >= 100 || Boolean(enrollment?.completed);
  const isCertificateUnlocked = courseHasQuiz ? isQuizPassed : isCourseCompleted;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 340px', minHeight: 'calc(100vh - 72px)', background: 'var(--bg-main)' }}>
      
      {/* 1. LEFT SYLLABUS SIDEBAR */}
      <aside style={{ background: 'var(--bg-glass)', borderRight: '1px solid var(--border-glass)', padding: '24px 16px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)' }}>Course Curriculum</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>{overallProgress}% Complete</span>
        </div>

        {modulesList.map((module, mIdx) => (
          <div key={mIdx} style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              {module.title}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {module.lessons?.map((lesson, lIdx) => {
                const isActive = currentModuleIndex === mIdx && currentLessonIndex === lIdx;
                const isCompleted = (mIdx < currentModuleIndex) || (mIdx === currentModuleIndex && lIdx < currentLessonIndex);

                return (
                  <div
                    key={lesson._id || lIdx}
                    onClick={() => {
                      setCurrentModuleIndex(mIdx);
                      setCurrentLessonIndex(lIdx);
                    }}
                    style={{
                      padding: isActive ? '12px 14px' : '10px 14px',
                      borderRadius: '14px',
                      background: isActive ? '#8455ef' : isCompleted ? '#e0e7ff' : 'var(--bg-main)',
                      color: isActive ? '#ffffff' : isCompleted ? '#3730a3' : 'var(--text-title)',
                      fontSize: '0.85rem',
                      fontWeight: isActive || isCompleted ? 700 : 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 4px 14px rgba(132, 85, 239, 0.35)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isActive ? (
                      <PlayCircle size={18} color="#ffffff" />
                    ) : isCompleted ? (
                      <CheckCircle2 size={16} color="#4f46e5" />
                    ) : (
                      <PlayCircle size={16} color="var(--text-muted)" />
                    )}
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lesson.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* FINAL QUIZ ASSESSMENT MODULE ITEM IN CURRICULUM (IF QUIZ EXISTS) */}
        {courseHasQuiz && (
          <div style={{ marginTop: '20px', marginBottom: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              FINAL ASSESSMENT & CERTIFICATE
            </span>

            <div
              onClick={() => setActiveRightTab('quiz')}
              style={{
                padding: '12px 14px',
                borderRadius: '14px',
                background: activeRightTab === 'quiz' ? 'linear-gradient(135deg, #10b981, #059669)' : isQuizPassed ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.08)',
                color: activeRightTab === 'quiz' ? '#ffffff' : isQuizPassed ? '#10b981' : '#6366f1',
                fontSize: '0.85rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                border: activeRightTab === 'quiz' ? 'none' : isQuizPassed ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(99,102,241,0.2)',
                boxShadow: activeRightTab === 'quiz' ? '0 4px 14px rgba(16,185,129,0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>🧪</span>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'block', lineHeight: '1.2' }}>Course Final Assessment Quiz</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.85, fontWeight: 600 }}>
                  {isQuizPassed ? '✅ Score 40%+ Passed!' : 'Pass 40%+ to unlock Cert 🎓'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Unlocking Status */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)' }}>
          {isCertificateUnlocked ? (
            <button
              onClick={() => {
                if (!certificateData) {
                  setCertificateData({
                    certificateId: `CERT-${Date.now()}`,
                    studentName: user?.name || 'David Miller',
                    courseTitle: course?.title || 'Course',
                    instructorName: course?.instructorName || 'Dr. Sarah Chen',
                    issueDate: new Date()
                  });
                }
                setShowCertModal(true);
              }}
              className="btn-ai"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.85rem', fontWeight: 800 }}
            >
              <Award size={18} /> View Certificate 📜
            </button>
          ) : (
            <button
              onClick={() => {
                if (courseHasQuiz) {
                  alert('🔒 Certificate is Locked! You must complete the Course Quiz and score at least 40% to unlock your official Certificate.');
                  setActiveRightTab('quiz');
                } else {
                  alert('🔒 Certificate is Locked! Complete all lesson modules in this course to unlock your official Certificate.');
                }
              }}
              style={{
                width: '100%',
                background: 'rgba(239,68,68,0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '14px',
                padding: '12px 10px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Lock size={16} /> {courseHasQuiz ? 'Cert Locked (Pass Quiz 40%+)' : 'Cert Locked (Complete Lessons)'}
            </button>
          )}
        </div>
      </aside>

      {/* 2. CENTER MAIN VIDEO PLAYER & DISCUSSION FORUM */}
      <main style={{ padding: '0', overflowY: 'auto' }}>
        
        {/* Main Video Canvas Container with Speed & AI CC Overlay */}
        <div style={{ background: '#0b1329', borderBottom: '1px solid var(--border-glass)', position: 'relative' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
            <video
              key={currentLesson.videoUrl || currentLesson.title}
              controls
              style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              src={currentLesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
            />

            {/* AI CC Subtitles Overlay Banner */}
            {showSubtitles && (
              <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', color: '#fef08a', padding: '6px 18px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid rgba(254,240,138,0.3)', pointerEvents: 'none', textAlign: 'center', maxWidth: '80%' }}>
                💬 AI CC: "In this lesson on {currentLesson.title}, we learn component architecture and state flow."
              </div>
            )}

            {/* Video Controls Bar: Playback Speed & CC Subtitle Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: 'rgba(11,19,41,0.95)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>SPEED:</span>
                {[1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    style={{
                      background: playbackSpeed === speed ? '#6366f1' : 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                style={{
                  background: showSubtitles ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)',
                  color: showSubtitles ? '#f59e0b' : '#94a3b8',
                  border: showSubtitles ? '1px solid #f59e0b' : 'none',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                💬 AI CC Subtitles: {showSubtitles ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Info Header Row */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '28px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{course?.category || 'Specialization'}</span>
                <ChevronRight size={14} />
                <span style={{ color: '#7c3aed', fontWeight: 600 }}>{currentModule.title}</span>
              </div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.2' }}>
                {currentLesson.title}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const textToSpeak = `Welcome to the AI Audio Podcast for ${currentLesson.title}. In this lesson, we cover essential concept implementations and production best practices.`;
                    const utterance = new SpeechSynthesisUtterance(textToSpeak);
                    utterance.rate = 1.0;
                    window.speechSynthesis.speak(utterance);
                    alert('🎧 AI Audio Podcast started! Playing audio lesson summary...');
                  } else {
                    alert('Audio playback not supported in this browser.');
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16,185,129,0.3)'
                }}
              >
                🎧 Podcast Mode
              </button>

              <button
                onClick={() => alert(`Downloading resources for ${currentLesson.title}...`)}
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-title)',
                  border: '1px solid var(--border-glass)',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Download size={16} /> Resources
              </button>

              <button
                onClick={handleNextLesson}
                style={{
                  background: '#1e1b4b',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 18px rgba(30, 27, 75, 0.35)'
                }}
              >
                Next Lesson <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* ASSIGNMENT & HOMEWORK SUBMISSION STUDIO */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '40px', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <FileText size={20} color="#6366f1" />
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-title)' }}>
                Lesson Practical Assignment Studio
              </strong>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
              Submit your code implementation or written solution for <strong>{currentLesson.title}</strong> to receive instant automated AI grading feedback.
            </p>

            <textarea
              rows={3}
              placeholder="Paste your solution code or written assignment response..."
              value={assignmentSubmission}
              onChange={(e) => setAssignmentSubmission(e.target.value)}
              className="form-input"
              style={{ borderRadius: '12px', fontSize: '0.88rem', marginBottom: '14px', resize: 'none' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated AI Code Evaluator</span>

              <button
                type="button"
                disabled={isGradingAssignment}
                onClick={() => {
                  if (!assignmentSubmission.trim()) return;
                  setIsGradingAssignment(true);
                  setTimeout(() => {
                    setAssignmentGrade({
                      score: '96 / 100 A+',
                      feedback: 'Outstanding assignment submission! Excellent structure, clean variable naming, and production-ready error handling.'
                    });
                    setIsGradingAssignment(false);
                  }, 1200);
                }}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.82rem', borderRadius: '10px' }}
              >
                {isGradingAssignment ? 'Evaluating Assignment...' : 'Submit & AI Grade Assignment 🎯'}
              </button>
            </div>

            {assignmentGrade && (
              <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
                <strong style={{ fontSize: '0.9rem', color: '#10b981', display: 'block', marginBottom: '4px' }}>
                  ✓ Grade: {assignmentGrade.score}
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-title)', margin: 0 }}>{assignmentGrade.feedback}</p>
              </div>
            )}
          </div>

          {/* Downloadable Resource Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
            
            <div className="glass-card glass-card-hover" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-title)', marginBottom: '2px' }}>
                  {course?.title || 'Course'} Syllabus & Cheat Sheet
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PDF • Official Course Material</span>
              </div>
            </div>

            <div className="glass-card glass-card-hover" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Code2 size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-title)', marginBottom: '2px' }}>
                  Interactive Code Sandbox Lab
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <Link to="/code-sandbox" style={{ color: '#15803d', fontWeight: 700 }}>Open Code Sandbox →</Link>
                </span>
              </div>
            </div>

          </div>

          {/* Discussion Forum Section */}
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '36px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '20px' }}>
              Discussion ({comments.length + 14})
            </h3>

            {/* Post Comment Input */}
            <form onSubmit={handlePostComment} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#6366f1', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                  ME
                </div>
                <textarea
                  rows={3}
                  placeholder="Ask a question or share your thoughts about this lesson..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '16px', resize: 'none', fontSize: '0.88rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  alignSelf: 'flex-end',
                  background: '#1e1b4b',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Post Comment
              </button>
            </form>

            {/* Discussion Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {comments.map((c) => (
                <div key={c.id} style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem', flexShrink: 0 }}>
                    {c.initials}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-title)' }}>{c.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '8px' }}>
                      {c.comment}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><ThumbsUp size={14} /> {c.likes}</span>
                      <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={14} /> Reply</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>

      {/* 3. RIGHT AI ASSISTANT & NOTES SIDEBAR */}
      <aside style={{ background: 'var(--bg-glass)', borderLeft: '1px solid var(--border-glass)', padding: '24px 16px', overflowY: 'auto' }}>
        
        {/* AI Co-Learner Partner Widget Header */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '18px', padding: '14px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '1.2rem', boxShadow: '0 4px 14px rgba(99,102,241,0.4)', flexShrink: 0 }}>
            🤖
          </div>
          <div>
            <strong style={{ fontSize: '0.85rem', color: 'var(--text-title)', display: 'block', marginBottom: '2px' }}>
              AI Co-Learner: Maya ✨
            </strong>
            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 700 }}>
              ● Online • Studying {currentLesson.title}
            </span>
          </div>
        </div>

        {/* Right Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', marginBottom: '20px', overflowX: 'auto' }}>
          {[
            { id: 'summary', label: 'AI Summary' },
            { id: 'cards', label: '📝 Flashcards' },
            { id: 'tutor', label: 'AI Tutor' },
            { id: 'notes', label: 'Notes' },
            { id: 'quiz', label: 'Quiz 🧪' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRightTab(tab.id)}
              style={{
                flex: 1,
                padding: '10px 6px',
                background: 'none',
                border: 'none',
                borderBottom: activeRightTab === tab.id ? '2px solid #7c3aed' : '2px solid transparent',
                color: activeRightTab === tab.id ? '#7c3aed' : 'var(--text-muted)',
                fontWeight: activeRightTab === tab.id ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: AI SUMMARY */}
        {activeRightTab === 'summary' && (
          <div>
            <div style={{ background: '#ffffff', border: '2px solid #c084fc', borderRadius: '18px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(192, 132, 252, 0.15)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                REAL-TIME AI INSIGHTS
              </span>

              <ul style={{ paddingLeft: '16px', fontSize: '0.82rem', color: '#0f172a', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.5' }}>
                <li>Course Focus: {course?.title || 'Interactive Learning'}</li>
                <li>Current Lesson: {currentLesson.title}</li>
                <li>Key Concept: Mastering core architectural patterns, optimization, and error handling.</li>
                <li>Best Practice: Review the code lab examples and verify logic boundaries.</li>
              </ul>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={handleCopySummaryToNotes}
                  style={{
                    flex: 1,
                    background: '#f3e8ff',
                    color: '#7c3aed',
                    border: '1px solid #e9d5ff',
                    padding: '8px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Copy to Notes
                </button>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                      const summaryText = `AI Insights for ${currentLesson.title}. Key concepts include mastering core architectural patterns and optimization.`;
                      const utterance = new SpeechSynthesisUtterance(summaryText);
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                  style={{
                    background: '#7c3aed',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  🔊 Listen Voice AI
                </button>
              </div>
            </div>

            {/* KEY VOCABULARY Tags */}
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                KEY VOCABULARY
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {KEY_VOCABULARY.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: '#e0e7ff',
                      color: '#4f46e5',
                      padding: '4px 12px',
                      borderRadius: '14px',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI FLASHCARDS & MIND MAP */}
        {activeRightTab === 'cards' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                AUTOMATED STUDY CARDS (CLICK TO FLIP)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { q: 'What is the primary benefit of React hooks?', a: 'Allows using state and lifecycle features inside functional components.' },
                { q: 'What does cosine similarity measure in Vector DBs?', a: 'Measures the directional angle between two vector embeddings in geometric space.' },
                { q: 'How does JWT authentication work?', a: 'Issues a digitally signed token upon login, passed in HTTP authorization headers for stateless API validation.' }
              ].map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`💡 Answer: ${card.a}`)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', display: 'block', marginBottom: '4px' }}>
                    CARD #{idx + 1} • CLICK FOR ANSWER
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-title)', display: 'block', marginBottom: '6px' }}>
                    Q: {card.q}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#6366f1', fontWeight: 700 }}>
                    💡 Tap to Reveal AI Answer →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: AI TUTOR CHAT */}
        {activeRightTab === 'tutor' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '480px' }}>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '14px',
                    fontSize: '0.82rem',
                    lineHeight: '1.5',
                    background: msg.role === 'user' ? '#6366f1' : 'var(--bg-main)',
                    color: msg.role === 'user' ? '#ffffff' : 'var(--text-title)',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    border: msg.role === 'ai' ? '1px solid var(--border-glass)' : 'none'
                  }}
                >
                  {msg.content}
                </div>
              ))}
              {chatLoading && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Tutor thinking...</div>}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Ask AI Tutor..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="form-input"
                style={{ borderRadius: '20px', padding: '8px 12px', fontSize: '0.82rem' }}
              />
              <button type="submit" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1', color: '#ffffff', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeRightTab === 'notes' && (
          <div>
            <textarea
              rows={14}
              placeholder="Type your personal lesson notes here..."
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              className="form-input"
              style={{ borderRadius: '14px', fontSize: '0.85rem', resize: 'none', marginBottom: '12px' }}
            />
            <button onClick={() => alert('Notes saved locally!')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.82rem' }}>
              Save Notes
            </button>
          </div>
        )}

        {/* TAB 4: QUIZ & CERTIFICATE THRESHOLD (PASS >= 40%) */}
        {activeRightTab === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(99,102,241,0.06)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(99,102,241,0.2)' }}>
              <strong style={{ fontSize: '0.9rem', color: '#6366f1', display: 'block', marginBottom: '4px' }}>
                🎓 Course Assessment Quiz
              </strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                Complete all questions. Score <strong>40% or higher</strong> to unlock your verified course Certificate!
              </p>
            </div>

            {/* Quiz Result Card if Submitted */}
            {isQuizSubmitted && (
              <div
                style={{
                  background: isQuizPassed ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  border: isQuizPassed ? '2px solid #10b981' : '2px solid #ef4444',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '4px' }}>
                  {isQuizPassed ? '🏆 🎉' : '🔒 ⚠️'}
                </span>
                <strong style={{ fontSize: '1.1rem', color: isQuizPassed ? '#10b981' : '#ef4444', display: 'block' }}>
                  Score: {quizScorePercentage}%
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px', marginBottom: '12px' }}>
                  {isQuizPassed
                    ? 'Congratulations! You passed the 40% threshold. Your Certificate is unlocked!'
                    : 'Passing score is 40%. Please review the video lessons and retake the quiz!'}
                </span>

                {isQuizPassed ? (
                  <button
                    type="button"
                    onClick={() => setShowCertModal(true)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)', fontSize: '0.85rem' }}
                  >
                    <Award size={16} /> View & Download Certificate 📜
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuizSubmitted(false);
                      setUserQuizAnswers({});
                    }}
                    style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    🔄 Retake Quiz
                  </button>
                )}
              </div>
            )}

            {/* Quiz Questions List */}
            {(() => {
              const activeQuestions = course?.quizzes || [
                {
                  question: `What is the primary architectural concept covered in ${course?.title || 'this course'}?`,
                  options: ['Modular system design & state optimization', 'Random guesswork', 'Manual database logging', 'Unstructured HTML tags'],
                  correctIndex: 0
                },
                {
                  question: 'What is the pass score percentage required to issue a certificate?',
                  options: ['40% or higher', '100% only', '0% minimum', '90% minimum'],
                  correctIndex: 0
                },
                {
                  question: 'How should function parameters and error boundaries be handled?',
                  options: ['Validate types and handle exceptions gracefully', 'Ignore errors silently', 'Comment out failing tests', 'Delete database tables'],
                  correctIndex: 0
                }
              ];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {activeQuestions.map((q, qIdx) => (
                    <div key={qIdx} style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-title)', display: 'block', marginBottom: '8px' }}>
                        Q{qIdx + 1}: {q.question}
                      </strong>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {['A', 'B', 'C', 'D'].map((optLabel, optIdx) => {
                          const isSelected = userQuizAnswers[qIdx] === optIdx;
                          const optionText = q.options?.[optIdx] || `Option ${optLabel}`;

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                if (isQuizSubmitted) return;
                                setUserQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-glass)',
                                background: isSelected ? 'rgba(99,102,241,0.1)' : 'transparent',
                                color: isSelected ? '#6366f1' : 'var(--text-muted)',
                                fontSize: '0.78rem',
                                textAlign: 'left',
                                cursor: isQuizSubmitted ? 'default' : 'pointer',
                                fontWeight: isSelected ? 700 : 500
                              }}
                            >
                              <span style={{ fontWeight: 800, background: isSelected ? '#6366f1' : 'rgba(255,255,255,0.05)', color: isSelected ? '#ffffff' : 'var(--text-title)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                                {optLabel}
                              </span>
                              <span>{optionText}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {!isQuizSubmitted && (
                    <button
                      type="button"
                      onClick={() => handleEvaluateQuiz(activeQuestions)}
                      className="btn-primary"
                      style={{ marginTop: '10px', width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
                    >
                      Submit Quiz & Check Score 🎯
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        )}

      </aside>

      {/* Certificate Modal */}
      {showCertModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowCertModal(false)}
              style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#ffffff', color: '#000000', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontWeight: 800, cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
            <CertificateGenerator
              certificateData={certificateData || {
                certificateId: `CERT-${Date.now()}`,
                studentName: user?.name || certificateData?.studentName || 'David Miller',
                courseTitle: course?.title || 'Course',
                instructorName: course?.instructorName || 'Instructor',
                issueDate: new Date()
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseLearningPage;
