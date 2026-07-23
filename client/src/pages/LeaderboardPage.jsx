import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Flame, Zap, Trophy, ShieldCheck, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Sarah Connor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', xp: '3,450 XP', streak: '14 Days 🔥', certs: 6, badge: '👑 Global Champion' },
  { rank: 2, name: 'David Miller (You)', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', xp: '2,840 XP', streak: '5 Days 🔥', certs: 4, badge: '⚡ Top 5% Learner' },
  { rank: 3, name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', avatarBg: '#6366f1', xp: '2,420 XP', streak: '8 Days 🔥', certs: 3, badge: '🐍 Python Pro' },
  { rank: 4, name: 'Marcus Brody', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', xp: '2,150 XP', streak: '4 Days 🔥', certs: 3, badge: '🎨 UX Expert' },
  { rank: 5, name: 'Aaliyah Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', xp: '1,980 XP', streak: '6 Days 🔥', certs: 2, badge: '🤖 AI Scholar' }
];

const LeaderboardPage = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '50px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,179,8,0.15))',
              color: '#f59e0b',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              border: '1px solid rgba(245,158,11,0.3)'
            }}
          >
            <Trophy size={16} /> Global Student Hall of Fame
          </span>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>
            EduSphere Global Leaderboard 🏆
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Compete with students worldwide by completing video modules, passing quizzes, and earning XP points daily!
          </p>
        </div>

        {/* TOP 3 PODIUM */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px', alignItems: 'flex-end' }}>
          {/* Rank 2 */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', textAlign: 'center', border: '2px solid rgba(99,102,241,0.4)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#6366f1', color: '#ffffff', padding: '4px 14px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800 }}>
              🥈 2nd Place
            </span>
            <img src={LEADERBOARD_STUDENTS[1].avatar} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '12px auto 10px', border: '3px solid #6366f1' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '2px' }}>{LEADERBOARD_STUDENTS[1].name}</h3>
            <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 800, display: 'block', marginBottom: '8px' }}>{LEADERBOARD_STUDENTS[1].xp}</span>
            <span className="badge badge-primary">{LEADERBOARD_STUDENTS[1].badge}</span>
          </div>

          {/* Rank 1 */}
          <div className="glass-card" style={{ padding: '32px 24px', borderRadius: '24px', textAlign: 'center', border: '2px solid #f59e0b', background: 'rgba(245,158,11,0.06)', position: 'relative', transform: 'translateY(-10px)' }}>
            <span style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#ffffff', padding: '6px 18px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 900 }}>
              👑 1st Champion
            </span>
            <img src={LEADERBOARD_STUDENTS[0].avatar} alt="" style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', margin: '14px auto 10px', border: '4px solid #f59e0b' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '2px' }}>{LEADERBOARD_STUDENTS[0].name}</h3>
            <span style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 900, display: 'block', marginBottom: '8px' }}>{LEADERBOARD_STUDENTS[0].xp}</span>
            <span className="badge badge-warning">{LEADERBOARD_STUDENTS[0].badge}</span>
          </div>

          {/* Rank 3 */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', textAlign: 'center', border: '2px solid rgba(16,185,129,0.4)', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#ffffff', padding: '4px 14px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800 }}>
              🥉 3rd Place
            </span>
            <img src={LEADERBOARD_STUDENTS[2].avatar} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '12px auto 10px', border: '3px solid #10b981' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '2px' }}>{LEADERBOARD_STUDENTS[2].name}</h3>
            <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 800, display: 'block', marginBottom: '8px' }}>{LEADERBOARD_STUDENTS[2].xp}</span>
            <span className="badge badge-success">{LEADERBOARD_STUDENTS[2].badge}</span>
          </div>
        </div>

        {/* FULL LEADERBOARD TABLE */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {LEADERBOARD_STUDENTS.map((st) => (
              <div
                key={st.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  background: st.rank === 2 ? 'rgba(99,102,241,0.12)' : 'var(--bg-main)',
                  border: st.rank === 2 ? '1px solid #6366f1' : '1px solid var(--border-glass)'
                }}
              >
                <strong style={{ fontSize: '1.1rem', width: '30px', color: st.rank <= 3 ? '#f59e0b' : 'var(--text-muted)' }}>
                  #{st.rank}
                </strong>
                <img src={st.avatar} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-title)', display: 'block' }}>{st.name}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{st.certs} Certificates Earned</span>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: 700 }}>{st.streak}</span>
                  <strong style={{ fontSize: '1rem', color: '#f59e0b' }}>{st.xp}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;
