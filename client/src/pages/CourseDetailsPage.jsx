import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import {
  PlayCircle,
  Star,
  Sparkles,
  User,
  BookOpen,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);

        if (user && res.data.enrolledStudents) {
          const enrolled = res.data.enrolledStudents.some(
            (sId) => sId.toString() === user._id || sId._id === user._id
          );
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        console.error('Failed to load course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, user]);

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isEnrolled) {
      navigate(`/learn/${id}`);
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  if (loading) return <Loader text="Loading course syllabus & details..." />;
  if (!course) return <div style={{ padding: '60px', textAlign: 'center' }}>Course not found.</div>;

  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Top Hero Card */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '30px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '36px', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-primary">{course.category}</span>
            <span className="badge badge-amber" style={{ textTransform: 'capitalize' }}>{course.level}</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '14px', color: 'var(--text-title)' }}>{course.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
            {course.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={18} color="var(--primary)" />
              <span>Instructor: <strong style={{ color: 'var(--text-title)' }}>{course.instructorName}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
              <Star size={18} fill="#f59e0b" color="#f59e0b" /> {course.averageRating} ({course.totalReviews} Reviews)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PlayCircle size={18} color="var(--accent-cyan)" />
              <span>{totalLessons} Video Lessons</span>
            </div>
          </div>
        </div>

        {/* Course Purchase Card */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <img
            src={course.thumbnail}
            alt={course.title}
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
          />

          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '16px' }}>
            {course.price === 0 ? <span style={{ color: 'var(--accent-emerald)' }}>FREE</span> : `$${course.price}`}
          </div>

          <button onClick={handleEnrollClick} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1.05rem', marginBottom: '12px' }}>
            {isEnrolled ? (
              <><PlayCircle size={20} /> Go to Learning Hub</>
            ) : (
              <><Sparkles size={20} /> {course.price === 0 ? 'Enroll Now for Free' : 'Buy Course & Start Learning'}</>
            )}
          </button>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span>✓ Full lifetime access</span>
            <span>✓ AI Tutor Chatbot support included</span>
            <span>✓ Verifiable Certificate on completion</span>
          </div>
        </div>
      </div>

      {/* Syllabus & Course Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        
        {/* Left Side: Syllabus Modules */}
        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-title)' }}>
            <BookOpen size={20} color="var(--primary)" /> Course Curriculum & Modules
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {course.modules?.map((mod, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '20px' }}>
                <div
                  onClick={() => setActiveModuleIndex(activeModuleIndex === idx ? -1 : idx)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-title)' }}>{mod.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{mod.lessons?.length || 0} lessons</span>
                    {activeModuleIndex === idx ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </div>
                </div>

                {activeModuleIndex === idx && (
                  <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {mod.lessons?.map((lesson, lIdx) => (
                      <div key={lIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'var(--bg-main)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <PlayCircle size={16} color="var(--accent-cyan)" />
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-title)' }}>{lesson.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lesson.duration}</span>
                          {!isEnrolled && <Lock size={14} color="var(--text-muted)" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Student Reviews Section */}
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-title)' }}>
              <Star size={20} fill="#f59e0b" color="#f59e0b" /> Student Reviews & Feedback
            </h2>

            {course.ratings?.length === 0 ? (
              <div className="glass-card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No reviews yet for this course. Be the first student to review!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {course.ratings?.map((rev, rIdx) => (
                  <div key={rIdx} className="glass-card" style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                          {rev.userName ? rev.userName[0] : 'U'}
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-title)' }}>{rev.userName}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{rev.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Instructor Profile */}
        <div>
          <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--text-title)' }}>Instructor Profile</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700 }}>
                {course.instructorName ? course.instructorName[0] : 'I'}
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'block', color: 'var(--text-title)' }}>{course.instructorName}</span>
                <span className="badge badge-primary">Verified Instructor</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Specialized educator focusing on full-stack web applications and AI RAG integration.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: 'var(--primary-light)', border: '1px solid var(--primary-glow)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
              <Sparkles size={18} /> RAG AI Tutor Enabled
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Ask questions directly to the AI Tutor during video lessons. The AI reads course context to provide precise explanations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetailsPage;
