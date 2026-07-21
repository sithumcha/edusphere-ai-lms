import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
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
  ShoppingCart,
  TrendingUp,
  Brain,
  Globe,
  MessageSquare,
  Mail,
  Zap,
  BarChart2
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Tech', courses: '1,200+ Courses', icon: <Terminal size={32} /> },
  { name: 'Business', courses: '850+ Courses', icon: <Briefcase size={32} /> },
  { name: 'Arts', courses: '420+ Courses', icon: <Palette size={32} /> },
  { name: 'Science', courses: '310+ Courses', icon: <FlaskConical size={32} /> }
];

const FEATURED_COURSES = [
  {
    _id: '1',
    title: 'Advanced Machine Learning',
    category: 'TECHNOLOGY',
    rating: '4.9 (2k+)',
    duration: '45h 20m',
    level: 'Advanced',
    price: '$89.99',
    badge: 'Best Seller',
    badgeBg: '#8455ef',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: '2',
    title: 'Digital Marketing Mastery',
    category: 'BUSINESS',
    rating: '4.8 (1.5k)',
    duration: '32h 15m',
    level: 'Intermediate',
    price: '$59.99',
    badge: 'AI Enhanced',
    badgeBg: '#1f108e',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: '3',
    title: 'UI/UX Design Systems',
    category: 'DESIGN',
    rating: '4.7 (800)',
    duration: '28h 00m',
    level: 'Beginner',
    price: '$49.99',
    badge: null,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dbCourses, setDbCourses] = useState([]);

  useEffect(() => {
    const fetchHomeCourses = async () => {
      try {
        const res = await api.get('/courses?limit=3');
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

  const displayCourses = dbCourses.length >= 3 ? dbCourses : FEATURED_COURSES;

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Tag Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(132, 85, 239, 0.1)', border: '1px solid rgba(132, 85, 239, 0.2)', padding: '6px 16px', borderRadius: '30px', width: 'fit-content' }}>
              <Sparkles size={16} color="#8455ef" />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8455ef', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Revolutionizing Education
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: '3.6rem', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: '1.15', color: 'var(--text-title)' }}>
              Master Any Skill with your <span style={{ background: 'linear-gradient(135deg, #1f108e 0%, #8455ef 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Tutor</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '540px' }}>
              Personalized learning paths, 24/7 intelligent assistance, and interactive curriculum designed by world-class experts and powered by advanced AI.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', paddingTop: '12px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '16px', padding: '8px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <Search size={20} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-title)', paddingLeft: '12px', fontSize: '0.95rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#1f108e',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0 36px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(31, 16, 142, 0.35)',
                  transition: 'transform 0.2s'
                }}
              >
                Get Started
              </button>
            </form>

            {/* Social Proof Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
              <div style={{ display: 'flex' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Student" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid var(--bg-main)' }} />
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100" alt="Student" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid var(--bg-main)', marginLeft: '-10px' }} />
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Student" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid var(--bg-main)', marginLeft: '-10px' }} />
              </div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-title)' }}>1M+ Students</strong> are already learning
              </span>
            </div>

          </div>

          {/* Hero Right Image & Floating AI Badge */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '8px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(132, 85, 239, 0.2)', border: '1px solid rgba(132, 85, 239, 0.3)' }}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                alt="AI Workspace Student"
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '18px' }}
              />
            </div>

            {/* Floating AI Analysis Badge */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                padding: '14px 20px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)'
              }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#8455ef', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Brain size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI ANALYSIS</span>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-title)' }}>98% Progress Match</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. EXPLORE TOP CATEGORIES */}
      <section style={{ padding: '64px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '40px' }}>Explore Top Categories</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="glass-card glass-card-hover"
                style={{ padding: '36px 24px', borderRadius: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(31, 16, 142, 0.1)', color: '#1f108e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.courses}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '6px' }}>Featured Courses</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Hand-picked by our AI curriculum experts</p>
            </div>
            <Link to="/courses" style={{ color: '#1f108e', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All Courses <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {displayCourses.map((course, idx) => {
              const staticSample = FEATURED_COURSES[idx % 3];
              const badge = course.badge || staticSample.badge;
              const badgeBg = staticSample.badgeBg;
              const price = course.price ? (typeof course.price === 'number' ? `$${course.price}` : course.price) : staticSample.price;

              return (
                <div key={course._id || idx} className="glass-card glass-card-hover" style={{ borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '190px' }}>
                    <img src={course.thumbnail || staticSample.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {badge && (
                      <span style={{ position: 'absolute', top: '16px', left: '16px', background: badgeBg, color: '#ffffff', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {badge}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8455ef', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          {course.category || staticSample.category}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)' }}>
                          <Star size={15} fill="#f59e0b" color="#f59e0b" />
                          <span>{course.rating || staticSample.rating}</span>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-title)', marginBottom: '12px', lineHeight: '1.35' }}>
                        {course.title}
                      </h3>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={15} /> {course.duration || staticSample.duration}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <BarChart2 size={15} /> {course.level || staticSample.level}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                      <strong style={{ fontSize: '1.3rem', color: 'var(--text-title)' }}>{price}</strong>
                      <Link
                        to={`/courses/${course._id}`}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--border-glass)', color: 'var(--text-title)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                      >
                        <ShoppingCart size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TRUST SIGNALS & STATS SECTION */}
      <section style={{ background: '#0b1c30', color: '#ffffff', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e9ddff', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '8px' }}>
            World-Class Recognition
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '40px' }}>
            Trusted by the best teams
          </h2>

          {/* Company Logos */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.6, fontWeight: 800, fontSize: '1.1rem', fontStyle: 'italic', letterSpacing: '1px', marginBottom: '64px' }}>
            <span>TECHGIANT</span>
            <span>FUTURECORE</span>
            <span>INNOVATE.AI</span>
            <span>SOFTSTREAM</span>
            <span>GLOBALLEARN</span>
          </div>

          {/* Stat Counters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 800, color: '#e9ddff', marginBottom: '4px' }}>1M+</p>
              <p style={{ fontSize: '0.9rem', color: '#c8c4d5' }}>Active Students</p>
            </div>

            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 800, color: '#e9ddff', marginBottom: '4px' }}>50k+</p>
              <p style={{ fontSize: '0.9rem', color: '#c8c4d5' }}>Online Courses</p>
            </div>

            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 800, color: '#e9ddff', marginBottom: '4px' }}>150+</p>
              <p style={{ fontSize: '0.9rem', color: '#c8c4d5' }}>Countries Reached</p>
            </div>

            <div>
              <p style={{ fontSize: '3.2rem', fontWeight: 800, color: '#e9ddff', marginBottom: '4px' }}>95%</p>
              <p style={{ fontSize: '0.9rem', color: '#c8c4d5' }}>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '48px', color: 'var(--text-title)' }}>
            Student Experiences
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
            <div className="glass-card" style={{ padding: '36px', borderRadius: '24px', borderLeft: '5px solid #1f108e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120" alt="Sarah Johnson" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-title)' }}>Sarah Johnson</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Senior Data Scientist at TechGiant</span>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65', fontStyle: 'italic' }}>
                "EduSphere AI completely changed how I approach learning. The AI tutor understood exactly where I was struggling with ML concepts and provided the perfect resources to bridge my gaps."
              </p>
            </div>

            <div className="glass-card" style={{ padding: '36px', borderRadius: '24px', borderLeft: '5px solid #8455ef' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120" alt="Mark Chen" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-title)' }}>Mark Chen</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Freelance Digital Marketer</span>
                </div>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65', fontStyle: 'italic' }}>
                "The personalized learning path for Digital Marketing was incredibly efficient. I saved months of study time by focusing only on what I didn't know yet."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FLOATING AI TUTOR ACTION BUTTON */}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 50 }}>
        <button
          onClick={() => alert('Ask AI Tutor: How can I help you learn today?')}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#8455ef',
            color: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(132, 85, 239, 0.5)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          className="pulse-glow"
        >
          <Brain size={28} />
        </button>
      </div>

    </div>
  );
};

export default Home;
