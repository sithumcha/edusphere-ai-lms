import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  Search,
  Bell,
  Globe,
  Sun,
  Moon,
  LogOut,
  User,
  LayoutDashboard,
  X
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '🎉 AI Quiz Passed', desc: 'You scored 95% on Neural Networks quiz!' },
    { id: 2, title: '📜 Certificate Ready', desc: 'Your Generative AI certificate is ready for download.' },
    { id: 3, title: '💬 Discussion Reply', desc: 'Dr. Sarah Chen replied to your backpropagation question.' }
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'instructor') return '/dashboard/instructor';
    return '/dashboard/student';
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: 'var(--bg-glass)', borderBottom: '1px solid var(--border-glass)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand & Main Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)', letterSpacing: '-0.5px' }}>
              EduSphere <span style={{ color: 'var(--primary)' }}>AI</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link
              to="/"
              style={{
                color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                borderBottom: location.pathname === '/' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '4px'
              }}
            >
              Home
            </Link>
            <Link
              to="/courses"
              style={{
                color: location.pathname === '/courses' ? 'var(--primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                borderBottom: location.pathname === '/courses' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '4px'
              }}
            >
              Browse Courses
            </Link>
            {isAuthenticated && (
              <Link
                to={getDashboardPath()}
                style={{
                  color: location.pathname.startsWith('/dashboard') ? 'var(--primary)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                My Learning
              </Link>
            )}
            <Link
              to="/resources"
              style={{
                color: location.pathname === '/resources' ? 'var(--primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                borderBottom: location.pathname === '/resources' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '4px'
              }}
            >
              Resources
            </Link>
          </nav>
        </div>

        {/* Search Bar & Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '220px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '34px', paddingRight: '12px', borderRadius: '20px', height: '38px', fontSize: '0.82rem', background: 'var(--bg-main)' }}
            />
          </form>

          {/* Bell Icon & Notification Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative' }}
              title="Notifications"
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span style={{ position: 'absolute', top: '-3px', right: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: '#ba1a1a' }} />
              )}
            </button>

            {showNotifications && (
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  width: '320px',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  zIndex: 100,
                  background: 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-title)' }}>Notifications</strong>
                    <span className="badge badge-primary">{notifications.length} New</span>
                  </div>
                  {notifications.length > 0 && (
                    <button onClick={handleClearAll} style={{ background: 'none', border: 'none', color: '#ba1a1a', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                      Clear All
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      No notifications right now 🎉
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div key={item.id} style={{ fontSize: '0.78rem', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <strong style={{ display: 'block', color: 'var(--text-title)', marginBottom: '2px' }}>{item.title}</strong>
                          <span style={{ color: 'var(--text-muted)', lineHeight: '1.4', display: 'block' }}>{item.desc}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveNotification(item.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px', marginLeft: '6px' }}
                          title="Dismiss notification"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher Sun/Moon */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{ background: 'none', border: 'none', color: isDark ? '#fde047' : '#6366f1', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={user.name}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid var(--primary)', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-title)' }}>{user.name}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                title="Logout"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                fontWeight: 700,
                fontSize: '0.88rem',
                boxShadow: '0 4px 12px rgba(30, 27, 75, 0.3)'
              }}
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
