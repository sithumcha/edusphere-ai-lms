import React from 'react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle, BookOpen, ShieldCheck } from 'lucide-react';

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    thumbnail,
    instructorName,
    category,
    level,
    price,
    averageRating = 4.8,
    totalReviews = 0,
    modules = []
  } = course;

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

  return (
    <div className="glass-card glass-card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '18px' }}>
      {/* Thumbnail Banner */}
      <div style={{ position: 'relative', height: '195px', width: '100%', overflow: 'hidden' }}>
        <img
          src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)' }} />

        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span className="badge badge-primary">{category}</span>
          <span className="badge badge-amber" style={{ textTransform: 'capitalize' }}>{level}</span>
        </div>

        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
          <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '4px 12px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)' }}>
            {price === 0 ? 'FREE' : `$${price}`}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', lineHeight: '1.35', color: 'var(--text-title)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            By <span style={{ color: 'var(--text-title)', fontWeight: 600 }}>{instructorName || 'Instructor'}</span>
            <ShieldCheck size={14} color="var(--accent-cyan)" />
          </p>
        </div>

        <div>
          {/* Metadata Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PlayCircle size={16} color="var(--primary)" /> {totalLessons} Lessons
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
              <Star size={15} fill="#f59e0b" color="#f59e0b" /> {averageRating} ({totalReviews})
            </span>
          </div>

          <Link
            to={`/courses/${_id}`}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.9rem' }}
          >
            <BookOpen size={16} /> View Course Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
