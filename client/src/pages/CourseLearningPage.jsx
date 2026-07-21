import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/common/Loader';
import CertificateGenerator from '../components/certificate/CertificateGenerator';
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
    comment: 'Could someone clarify the difference between the activation function at the hidden layer vs the output layer for multi-class classification?',
    likes: 12
  }
];

const KEY_VOCABULARY = ['Perceptron', 'ReLU', 'Gradient', 'Sigmoid'];

const CourseLearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(3); // Lesson 4: Intro to Neural Networks
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

  // Student Notes State
  const [notesText, setNotesText] = useState('');

  // Certificate Modal State
  const [certificateData, setCertificateData] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);

  const fetchLearningData = async () => {
    try {
      const courseRes = await api.get(`/courses/${courseId}`);
      setCourse(courseRes.data);

      const enrollRes = await api.get('/enrollments/my-courses');
      const foundEnroll = enrollRes.data.find(
        (e) => (e.courseId?._id || e.courseId) === courseId
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

    setComments([
      ...comments,
      {
        id: Date.now(),
        initials: 'ME',
        name: 'You',
        time: 'Just now',
        comment: newComment.trim(),
        likes: 0
      }
    ]);
    setNewComment('');
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

  const handleCopySummaryToNotes = () => {
    const summaryBullets = `• Neural networks are inspired by the biological structure of the brain but operate on statistical weights.\n• Key components: Input Layer, Hidden Layers, and Output Layer.\n• Activation functions introduce non-linearity, allowing the model to learn complex patterns.\n• Weights and biases are adjusted during training through optimization.`;
    setNotesText((prev) => (prev ? `${prev}\n\n${summaryBullets}` : summaryBullets));
    setActiveRightTab('notes');
  };

  if (loading) return <Loader text="Loading EduSphere AI Learning Portal..." />;

  const currentModule = course?.modules?.[currentModuleIndex] || { title: 'MODULE 1: FOUNDATIONS' };
  const currentLesson = currentModule?.lessons?.[currentLessonIndex] || {
    title: 'Lesson 4: Introduction to Neural Networks',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 340px', minHeight: 'calc(100vh - 72px)', background: 'var(--bg-main)' }}>
      
      {/* 1. LEFT SYLLABUS SIDEBAR (Course Curriculum - Matching Screenshot) */}
      <aside style={{ background: 'var(--bg-glass)', borderRight: '1px solid var(--border-glass)', padding: '24px 16px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-title)' }}>Course Curriculum</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>46% Complete</span>
        </div>

        {/* MODULE 1 */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            MODULE 1: FOUNDATIONS
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Lesson 1 (Completed) */}
            <div style={{ padding: '10px 14px', borderRadius: '14px', background: '#e0e7ff', color: '#3730a3', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="#4f46e5" />
              <span>1. Welcome to AI Mastery</span>
            </div>

            {/* Lesson 2 (Completed) */}
            <div style={{ padding: '10px 14px', borderRadius: '14px', background: '#e0e7ff', color: '#3730a3', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="#4f46e5" />
              <span>2. History of Deep Learning</span>
            </div>

            {/* Lesson 3 (Completed) */}
            <div style={{ padding: '10px 14px', borderRadius: '14px', background: '#e0e7ff', color: '#3730a3', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} color="#4f46e5" />
              <span>3. Linear Algebra Essentials</span>
            </div>

            {/* Lesson 4 (Active Current Lesson - Solid Purple Pill) */}
            <div style={{ padding: '12px 14px', borderRadius: '14px', background: '#8455ef', color: '#ffffff', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(132, 85, 239, 0.35)' }}>
              <PlayCircle size={18} color="#ffffff" />
              <span>4. Intro to Neural Networks</span>
            </div>
          </div>
        </div>

        {/* MODULE 2 */}
        <div>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
            MODULE 2: ARCHITECTURES
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px 14px', borderRadius: '14px', background: 'var(--bg-main)', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={15} color="var(--text-muted)" />
              <span>5. Forward Propagation</span>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: '14px', background: 'var(--bg-main)', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={15} color="var(--text-muted)" />
              <span>6. Backpropagation & Calculus</span>
            </div>
          </div>
        </div>

        {enrollment?.certificateIssued && (
          <button
            onClick={() => setShowCertModal(true)}
            className="btn-ai"
            style={{ marginTop: '30px', width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.82rem' }}
          >
            <Award size={16} /> View Certificate
          </button>
        )}
      </aside>

      {/* 2. CENTER MAIN VIDEO PLAYER & DISCUSSION FORUM */}
      <main style={{ padding: '0', overflowY: 'auto' }}>
        
        {/* Main Video Canvas Container */}
        <div style={{ background: '#0b1329', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <video
              key={currentLesson.videoUrl}
              controls
              style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              src={currentLesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
            />
          </div>
        </div>

        {/* Lesson Info Header Row */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '28px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Deep Learning Specialization</span>
                <ChevronRight size={14} />
                <span style={{ color: '#7c3aed', fontWeight: 600 }}>Module 1</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.2' }}>
                Lesson 4: Introduction to Neural Networks
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => alert('Downloading lesson PDF resources...')}
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
                onClick={() => alert('Proceeding to Lesson 5: Forward Propagation')}
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

          {/* Downloadable Resource Cards (2 Cards - Matching Screenshot) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
            
            {/* Resource Card 1: Neural Architecture Cheat Sheet */}
            <div className="glass-card glass-card-hover" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ffe4e6', color: '#be123c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-title)', marginBottom: '2px' }}>
                  Neural Architecture Cheat Sheet
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>PDF, 4.2 MB • Updated 2 days ago</span>
              </div>
            </div>

            {/* Resource Card 2: Python Implementation (Lab 1) */}
            <div className="glass-card glass-card-hover" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '18px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Code2 size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-title)', marginBottom: '2px' }}>
                  Python Implementation (Lab 1)
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Jupyter Notebook • Colab Link</span>
              </div>
            </div>

          </div>

          {/* Discussion Forum Section (Matching Screenshot) */}
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '36px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '20px' }}>
              Discussion (24)
            </h3>

            {/* Post Comment Input */}
            <form onSubmit={handlePostComment} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#6366f1', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                  ME
                </div>
                <textarea
                  rows={3}
                  placeholder="Ask a question or share your thoughts..."
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

      {/* 3. RIGHT AI ASSISTANT & NOTES SIDEBAR (Matching Screenshot) */}
      <aside style={{ background: 'var(--bg-glass)', borderLeft: '1px solid var(--border-glass)', padding: '24px 16px', overflowY: 'auto' }}>
        
        {/* Right Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', marginBottom: '20px' }}>
          {[
            { id: 'summary', label: 'AI Summary' },
            { id: 'tutor', label: 'AI Tutor' },
            { id: 'notes', label: 'Notes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRightTab(tab.id)}
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'none',
                border: 'none',
                borderBottom: activeRightTab === tab.id ? '2px solid #7c3aed' : '2px solid transparent',
                color: activeRightTab === tab.id ? '#7c3aed' : 'var(--text-muted)',
                fontWeight: activeRightTab === tab.id ? 800 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: AI SUMMARY */}
        {activeRightTab === 'summary' && (
          <div>
            {/* REAL-TIME INSIGHTS Box (Violet Bordered Card) */}
            <div style={{ background: '#ffffff', border: '2px solid #c084fc', borderRadius: '18px', padding: '20px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(192, 132, 252, 0.15)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                REAL-TIME INSIGHTS
              </span>

              <ul style={{ paddingLeft: '16px', fontSize: '0.82rem', color: '#0f172a', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.5' }}>
                <li>Neural networks are inspired by the biological structure of the brain but operate on statistical weights.</li>
                <li>Key components: Input Layer, Hidden Layers, and Output Layer.</li>
                <li>Activation functions introduce non-linearity, allowing the model to learn complex patterns.</li>
                <li>Weights and biases are adjusted during training through a process called optimization.</li>
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
                      const summaryText = "Neural networks are inspired by the biological structure of the brain. Key components include Input Layer, Hidden Layers, and Output Layer.";
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
                studentName: 'Student',
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
