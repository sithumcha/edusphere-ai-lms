import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/common/Loader';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  Star,
  Clock,
  ShoppingCart,
  Sparkles,
  ChevronDown,
  BookOpen,
  Filter
} from 'lucide-react';

const CATEGORIES = ['Computer Science', 'Data Science', 'Business', 'Design', 'Cloud Computing'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = ['0-2 Hours', '3-10 Hours', '11+ Hours'];

const FEATURED_AI_BANNER = {
  _id: 'banner-genai',
  title: 'Mastering Generative AI for Creative Professionals',
  category: 'AI ENHANCED',
  description: 'Learn to integrate LLMs and Stable Diffusion into your workflow for 10x productivity.',
  price: '$129.00',
  originalPrice: '$199.00',
  badge: 'Best Seller',
  thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
};

const SAMPLE_COURSES = [
  {
    _id: 'c1',
    title: 'Python for Financial Analysis & Algorithmic Trading',
    category: 'Data Science',
    rating: '4.8 (1,245)',
    price: '$84.99',
    duration: '12h 30m',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'c2',
    title: 'Advanced Design Systems: Scale Your UI Workflow',
    category: 'Design',
    rating: '4.9 (890)',
    price: '$94.99',
    duration: '8h 15m',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'c3',
    title: 'AWS Certified Solutions Architect Associate 2024',
    category: 'Cloud Computing',
    rating: '4.7 (3,412)',
    price: '$14.99',
    duration: '28h 45m',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'c4',
    title: 'Strategic MBA Essentials: Business Strategy & Execution',
    category: 'Business',
    rating: '4.6 (2,110)',
    price: '$119.00',
    duration: '15h 20m',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'
  }
];

const CoursesPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State (Default to all so all seeded courses show immediately)
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [priceType, setPriceType] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(false);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [sortBy, setSortBy] = useState('Most Popular');

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await api.get('/courses');
        setDbCourses(res.data || []);
      } catch (err) {
        console.error('Fetch catalog error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleLevelToggle = (lvl) => {
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  const handleDurationToggle = (dur) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
    );
  };

  const handleClearAll = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceType('all');
    setRatingFilter(false);
    setSelectedDurations([]);
  };

  // Filter dynamic DB courses
  const filteredCourses = dbCourses.filter((course) => {
    if (search.trim() && !course.title?.toLowerCase().includes(search.toLowerCase()) && !course.category?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
      return false;
    }
    if (selectedLevels.length > 0 && !selectedLevels.map(l => l.toLowerCase()).includes(course.level?.toLowerCase())) {
      return false;
    }
    if (priceType === 'free' && course.price > 0) return false;
    if (priceType === 'paid' && (course.price === 0 || !course.price)) return false;
    if (ratingFilter && (course.averageRating || 5) < 4.5) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>
            Explore 10,000+ Courses
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Elevate your skills with our curated, AI-enhanced learning paths.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
          <div style={{ position: 'relative' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{
                borderRadius: '20px',
                padding: '8px 36px 8px 16px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                appearance: 'none',
                fontWeight: 600
              }}
            >
              <option value="Most Popular">Most Popular</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Newest">Newest First</option>
              <option value="Price Low to High">Price: Low to High</option>
            </select>
            <ChevronDown size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }}>
        
        {/* LEFT FILTER SIDEBAR (Matching Stitch Screenshot) */}
        <aside className="glass-card" style={{ padding: '24px', height: 'fit-content', background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)' }}>Filters</h3>
            <button onClick={handleClearAll} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
              Clear all
            </button>
          </div>

          {/* SECTION 1: CATEGORY */}
          <div style={{ marginBottom: '22px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              CATEGORY
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CATEGORIES.map((cat) => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-title)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    style={{ accentColor: '#6366f1', width: '16px', height: '16px' }}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SECTION 2: LEVEL */}
          <div style={{ marginBottom: '22px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              LEVEL
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {LEVELS.map((lvl) => (
                <label key={lvl} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-title)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(lvl)}
                    onChange={() => handleLevelToggle(lvl)}
                    style={{ accentColor: '#6366f1', width: '16px', height: '16px' }}
                  />
                  <span>{lvl}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SECTION 3: PRICE */}
          <div style={{ marginBottom: '22px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              PRICE
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-title)', cursor: 'pointer' }}>
                <input type="radio" name="price" checked={priceType === 'free'} onChange={() => setPriceType('free')} style={{ accentColor: '#6366f1' }} />
                <span>Free</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-title)', cursor: 'pointer' }}>
                <input type="radio" name="price" checked={priceType === 'paid'} onChange={() => setPriceType('paid')} style={{ accentColor: '#6366f1' }} />
                <span>Paid</span>
              </label>
            </div>
          </div>

          {/* SECTION 4: RATING */}
          <div style={{ marginBottom: '22px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              RATING
            </span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-title)', cursor: 'pointer' }}>
              <input type="checkbox" checked={ratingFilter} onChange={(e) => setRatingFilter(e.target.checked)} style={{ accentColor: '#6366f1' }} />
              <span>4.5 <Star size={14} fill="#f59e0b" color="#f59e0b" style={{ display: 'inline' }} /> & up</span>
            </label>
          </div>

          {/* SECTION 5: DURATION */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              DURATION
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {DURATIONS.map((dur) => (
                <label key={dur} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-title)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(dur)}
                    onChange={() => handleDurationToggle(dur)}
                    style={{ accentColor: '#6366f1', width: '16px', height: '16px' }}
                  />
                  <span>{dur}</span>
                </label>
              ))}
            </div>
          </div>

          {/* BOTTOM PURPLE WIDGET: AI PATH FINDER */}
          <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)', color: '#ffffff', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
            <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}>AI Path Finder</strong>
            <p style={{ fontSize: '0.78rem', color: '#e0e7ff', lineHeight: '1.5', marginBottom: '14px' }}>
              Confused? Let our AI analyze your career goals and recommend the perfect path!
            </p>
            <button
              onClick={() => alert('AI Path Finder analyzing your goals... Launching AI Tutor assistant!')}
              style={{
                background: '#ffffff',
                color: '#6366f1',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '16px',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Analyze My Career
            </button>
          </div>

        </aside>

        {/* RIGHT MAIN CATALOG */}
        <main>
          
          {/* FEATURED AI BANNER CARD (Top 2-Column Wide Card from Screenshot) */}
          <div className="glass-card glass-card-hover" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', marginBottom: '28px', borderRadius: '20px' }}>
            <div style={{ position: 'relative', height: '260px' }}>
              <img src={FEATURED_AI_BANNER.thumbnail} alt={FEATURED_AI_BANNER.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#312e81', color: '#ffffff', padding: '4px 14px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 800 }}>
                {FEATURED_AI_BANNER.badge}
              </span>
            </div>

            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  {FEATURED_AI_BANNER.category}
                </span>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '10px', lineHeight: '1.35' }}>
                  {FEATURED_AI_BANNER.title}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {FEATURED_AI_BANNER.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '14px' }}>
                <div>
                  <strong style={{ fontSize: '1.3rem', color: '#6366f1', marginRight: '8px' }}>{FEATURED_AI_BANNER.price}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{FEATURED_AI_BANNER.originalPrice}</span>
                </div>

                <Link
                  to={`/courses/${FEATURED_AI_BANNER._id}`}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#1e1b4b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <ShoppingCart size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* 3-COLUMN COURSE CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => {
                const title = c.title;
                const category = c.category || 'General';
                const rating = c.averageRating ? `${c.averageRating} (${c.totalReviews || 12})` : '4.8 (10+)';
                const price = c.price === 0 ? 'Free' : (typeof c.price === 'number' ? `$${c.price}` : c.price || 'Free');
                const thumbnail = c.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';

                return (
                  <Link
                    key={c._id}
                    to={`/courses/${c._id}`}
                    className="glass-card glass-card-hover"
                    style={{
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '18px',
                      textDecoration: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img src={thumbnail} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                          {category}
                        </span>

                        <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-title)', fontWeight: 700, marginBottom: '14px' }}>
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                          <span>{rating}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--text-title)' }}>{price}</strong>
                        <span style={{ color: '#1f108e', fontWeight: 700, fontSize: '0.82rem' }}>
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="glass-card" style={{ padding: '36px', textAlign: 'center', gridColumn: '1 / -1', borderRadius: '20px' }}>
                <BookOpen size={36} color="#7c3aed" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>No Courses Found</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Try adjusting your search query or filters to find what you are looking for.
                </p>
                <button onClick={handleClearAll} className="btn-primary" style={{ margin: '0 auto' }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </main>

      </div>
    </div>
  );
};

export default CoursesPage;
