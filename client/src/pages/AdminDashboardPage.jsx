import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import {
  School,
  LayoutDashboard,
  Users,
  ShieldCheck,
  BarChart3,
  Brain,
  Settings,
  Bolt,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Download,
  Sparkles,
  Server,
  TrendingUp,
  DollarSign,
  Eye,
  X,
  Code,
  Palette,
  CheckCircle,
  Ban,
  UserCheck,
  Key,
  Shield,
  Activity,
  Cpu,
  HardDrive
} from 'lucide-react';

const RECENT_SIGNUPS = [
  { name: 'Julian Vane', role: 'Student', time: '12m ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { name: 'Helena Frost', role: 'Instructor', time: '45m ago', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' },
  { name: 'Marco Rossi', role: 'Student', time: '1h ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Dr. Silas Vance', role: 'Expert Reviewer', time: '3h ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
];

const INITIAL_APPROVAL_QUEUE = [
  {
    id: 'c1',
    courseName: 'Advanced Neural Architectures',
    instructor: 'Dr. Alan Turing',
    submitted: '2h ago',
    status: 'In Review',
    iconBg: '#e0e7ff',
    iconColor: '#6366f1'
  },
  {
    id: 'c2',
    courseName: 'AI for Digital Artists',
    instructor: 'Sarah Jenkins',
    submitted: '5h ago',
    status: 'Pending',
    iconBg: '#cff4fc',
    iconColor: '#06b6d4'
  },
  {
    id: 'c3',
    courseName: 'Cognitive Science Essentials',
    instructor: 'Prof. Marcus Bloom',
    submitted: 'Yesterday',
    status: 'In Review',
    iconBg: '#f3e8ff',
    iconColor: '#7c3aed'
  }
];

const ALL_USERS_LIST = [
  { id: 'u1', name: 'Alex Vance', email: 'admin@lms.com', role: 'admin', status: 'Active', joined: 'Jan 2025', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { id: 'u2', name: 'Dr. Sarah Connor', email: 'instructor@lms.com', role: 'instructor', status: 'Active', joined: 'Feb 2025', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' },
  { id: 'u3', name: 'David Miller', email: 'student@lms.com', role: 'student', status: 'Active', joined: 'Mar 2025', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100' },
  { id: 'u4', name: 'Julian Vane', email: 'julian@example.com', role: 'student', status: 'Active', joined: 'Today', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
];

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchLogs, setSearchLogs] = useState('');
  const [reportNotification, setReportNotification] = useState('');
  
  // Data States
  const [approvalQueue, setApprovalQueue] = useState(INITIAL_APPROVAL_QUEUE);
  const [usersList, setUsersList] = useState(ALL_USERS_LIST);

  // Settings State
  const [adminName, setAdminName] = useState(user?.name || 'Admin Sarah');
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSyD...****************');
  const [settingsMsg, setSettingsMsg] = useState('');

  const fetchAdminData = async () => {
    try {
      const [dashRes, usersRes] = await Promise.all([
        api.get('/dashboard/admin'),
        api.get('/admin/users')
      ]);
      setStats(dashRes.data);
      if (usersRes.data && usersRes.data.length > 0) {
        setUsersList(usersRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAiReport = () => {
    setReportNotification('EduSphere AI is compiling system metrics and predicted trends. Your report will be ready in 30 seconds.');
    setTimeout(() => setReportNotification(''), 6000);
  };

  const handleExportLogs = () => {
    alert('System infrastructure logs exported successfully as CSV!');
  };

  const handleApproveCourse = (courseId) => {
    setApprovalQueue(prev => prev.filter(c => c.id !== courseId));
    alert('Course approved and published to student catalog!');
  };

  const handleToggleUserBlock = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId || u._id === userId) {
        const newStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettingsMsg('Admin system settings saved successfully!');
    setTimeout(() => setSettingsMsg(''), 4000);
  };

  if (loading) return <Loader text="Loading EduSphere Pro Admin System..." />;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 72px)', overflow: 'hidden', background: 'var(--bg-main)' }}>
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside style={{ width: '280px', flexShrink: 0, background: 'var(--bg-glass)', borderRight: '1px solid var(--border-glass)', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Logo Header (Fixed to Admin Portal) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border-glass)', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#3730a3', color: '#ffffff', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <School size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.2' }}>EduSphere Pro</h1>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Admin Portal</p>
            </div>
          </div>

          {/* Nav Items (Dashboard, Users, Course Approval, Analytics, AI Insights, Settings) */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { name: 'Users', icon: <Users size={18} /> },
              { name: 'Course Approval', icon: <ShieldCheck size={18} /> },
              { name: 'Analytics', icon: <BarChart3 size={18} /> },
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
            onClick={() => alert('Launching RAG AI System Assistant...')}
            style={{
              width: '100%',
              background: '#1f108e',
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

      {/* 2. MAIN CONTENT CONTAINER */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '64px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-glass)', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search system logs..."
              value={searchLogs}
              onChange={(e) => setSearchLogs(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', height: '38px', borderRadius: '20px', fontSize: '0.85rem', background: 'var(--bg-main)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color="var(--text-muted)" />
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: '#ba1a1a' }} />
            </div>
            <HelpCircle size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            <div style={{ width: '1px', height: '24px', background: 'var(--border-glass)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '0.88rem', display: 'block', color: 'var(--text-title)' }}>{user?.name || 'Admin Sarah'}</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>System Overseer</span>
              </div>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120'}
                alt="Admin"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6b38d4' }}
              />
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Scroll Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {reportNotification && (
            <div style={{ background: '#f3e8ff', border: '1px solid #c8c4d5', color: '#6b38d4', borderRadius: '12px', padding: '14px 20px', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
              {reportNotification}
            </div>
          )}

          {/* TAB 1: SYSTEM OVERVIEW DASHBOARD */}
          {activeTab === 'Dashboard' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)' }}>System Overview</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>Real-time status of EduSphere AI infrastructure.</p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleExportLogs} className="btn-secondary">
                    <Download size={16} /> Export Logs
                  </button>

                  <button onClick={handleAiReport} className="btn-ai">
                    <Sparkles size={16} /> AI Report Generation
                  </button>
                </div>
              </div>

              {/* BENTO GRID STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '20px' }}>
                <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '150px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#004a57', color: '#26c0de', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Server size={20} />
                    </div>
                    <span className="badge badge-emerald">Healthy</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Platform Courses</span>
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-title)', fontWeight: 800 }}>
                      {stats?.totalCourses ?? 5} Courses
                    </h3>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '150px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#3730a3', color: '#a9a7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrendingUp size={20} />
                    </div>
                    <span style={{ fontWeight: 800, color: '#6b38d4', fontSize: '0.85rem' }}>Live</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Registered Users</span>
                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-title)', fontWeight: 800 }}>
                      {stats?.totalUsers ?? usersList.length} Users
                    </h3>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '150px', border: '1px solid rgba(132, 85, 239, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#8455ef', color: '#fffbff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={20} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6b38d4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Platform Revenue</span>
                      <h3 style={{ fontSize: '1.6rem', color: 'var(--text-title)', fontWeight: 800 }}>
                        ${stats?.totalPlatformRevenue ? stats.totalPlatformRevenue.toLocaleString() : '0.00'}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <div style={{ height: '5px', width: '100%', background: 'rgba(200, 196, 213, 0.3)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                      <div style={{ width: '100%', height: '100%', background: '#6b38d4' }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time database metrics</span>
                  </div>
                </div>
              </div>

              {/* TABLES SECTION */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
                <section className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShieldCheck size={22} color="#6b38d4" />
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-title)' }}>Course Approval Queue</h3>
                    </div>
                    <span onClick={() => setActiveTab('Course Approval')} style={{ color: '#1f108e', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>View All</span>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                          <th style={{ padding: '10px', textTransform: 'uppercase' }}>Course Name</th>
                          <th style={{ padding: '10px', textTransform: 'uppercase' }}>Instructor</th>
                          <th style={{ padding: '10px', textTransform: 'uppercase' }}>Submitted</th>
                          <th style={{ padding: '10px', textTransform: 'uppercase' }}>Status</th>
                          <th style={{ padding: '10px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvalQueue.map((row) => (
                          <tr key={row.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                            <td style={{ padding: '14px 10px', fontWeight: 700, color: 'var(--text-title)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: row.iconBg, color: row.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Code size={18} />
                                </div>
                                <span>{row.courseName}</span>
                              </div>
                            </td>
                            <td style={{ padding: '14px 10px', color: 'var(--text-muted)' }}>{row.instructor}</td>
                            <td style={{ padding: '14px 10px', color: 'var(--text-muted)' }}>{row.submitted}</td>
                            <td style={{ padding: '14px 10px' }}>
                              <span className={row.status === 'Pending' ? 'badge badge-amber' : 'badge badge-primary'}>
                                {row.status}
                              </span>
                            </td>
                            <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                              <button onClick={() => handleApproveCourse(row.id)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', padding: '6px' }} title="Approve">
                                <CheckCircle size={18} />
                              </button>
                              <button style={{ background: 'none', border: 'none', color: '#ba1a1a', cursor: 'pointer', padding: '6px' }} title="Reject">
                                <X size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-glass)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={20} color="#1f108e" />
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)' }}>Recent Signups</h3>
                      </div>
                      <span onClick={() => setActiveTab('Users')} style={{ color: '#1f108e', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>View All</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                      {RECENT_SIGNUPS.map((u, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'var(--bg-main)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={u.avatar} alt={u.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ fontSize: '0.88rem', display: 'block', color: 'var(--text-title)' }}>{u.name}</strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.role}</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(132, 85, 239, 0.08)', borderRadius: '10px', padding: '12px', textAlign: 'center', border: '1px solid rgba(132, 85, 239, 0.2)' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6b38d4' }}>
                      AI Tip: 85% of users completed onboarding today.
                    </span>
                  </div>
                </section>
              </div>
            </>
          )}

          {/* TAB 2: USERS MANAGEMENT */}
          {activeTab === 'Users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)' }}>User Account Management</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>View all students, instructors, and system administrators.</p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <th style={{ padding: '12px' }}>USER</th>
                      <th style={{ padding: '12px' }}>EMAIL</th>
                      <th style={{ padding: '12px' }}>ROLE</th>
                      <th style={{ padding: '12px' }}>STATUS</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.id || u._id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        <td style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} alt={u.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                          <strong style={{ color: 'var(--text-title)' }}>{u.name}</strong>
                        </td>
                        <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{u.email}</td>
                        <td style={{ padding: '16px 12px' }}>
                          <span className="badge badge-primary" style={{ textTransform: 'uppercase' }}>{u.role}</span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <span className={u.status === 'Blocked' ? 'badge badge-rose' : 'badge badge-emerald'}>{u.status || 'Active'}</span>
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                          <button onClick={() => handleToggleUserBlock(u.id || u._id)} style={{ background: 'none', border: 'none', color: u.status === 'Blocked' ? '#059669' : '#ba1a1a', cursor: 'pointer', fontWeight: 700 }}>
                            {u.status === 'Blocked' ? 'Unblock User' : 'Block User'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COURSE APPROVAL QUEUE */}
          {activeTab === 'Course Approval' && (
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>Course Approval Queue</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>Review and approve submitted courses from instructors before they go live.</p>

              <div className="glass-card" style={{ padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <th style={{ padding: '12px' }}>COURSE TITLE</th>
                      <th style={{ padding: '12px' }}>INSTRUCTOR</th>
                      <th style={{ padding: '12px' }}>SUBMITTED DATE</th>
                      <th style={{ padding: '12px' }}>STATUS</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>DECISION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalQueue.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        <td style={{ padding: '16px 12px', fontWeight: 700, color: 'var(--text-title)' }}>{c.courseName}</td>
                        <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{c.instructor}</td>
                        <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{c.submitted}</td>
                        <td style={{ padding: '16px 12px' }}><span className="badge badge-amber">{c.status}</span></td>
                        <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                          <button onClick={() => handleApproveCourse(c.id)} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem', marginRight: '8px' }}>
                            Approve
                          </button>
                          <button style={{ background: 'none', border: 'none', color: '#ba1a1a', fontWeight: 700, cursor: 'pointer' }}>
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>System Infrastructure Analytics</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>Server load, database query performance, and user traffic graphs.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800 }}>CPU UTILIZATION</span>
                  <h2 style={{ fontSize: '1.8rem', color: '#1f108e' }}>18.4%</h2>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800 }}>MEMORY ALLOCATION</span>
                  <h2 style={{ fontSize: '1.8rem', color: '#6b38d4' }}>42.1%</h2>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800 }}>API LATENCY (AVG)</span>
                  <h2 style={{ fontSize: '1.8rem', color: '#059669' }}>142 ms</h2>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI INSIGHTS */}
          {activeTab === 'AI Insights' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <Brain size={28} color="#7c3aed" />
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)' }}>AI Platform Diagnostics</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '12px' }}>Gemini AI Model Performance</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>API Call Health: <strong>100% Operational</strong> | Token Consumption: 1.2M tokens today.</p>
                  <button onClick={handleAiReport} className="btn-ai" style={{ width: '100%', justifyCenter: 'center' }}>
                    <Sparkles size={16} /> Re-run AI Diagnostics
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'Settings' && (
            <div style={{ maxWidth: '640px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>Admin Infrastructure Settings</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>Configure API keys, system overseer details, and security policies.</p>

              {settingsMsg && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#15803d', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontWeight: 700 }}>
                  {settingsMsg}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="form-label">Admin Name</label>
                  <input type="text" className="form-input" value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
                </div>

                <div>
                  <label className="form-label">Google Gemini API Key</label>
                  <input type="text" className="form-input" value={geminiApiKey} onChange={(e) => setGeminiApiKey(e.target.value)} required />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Save Infrastructure Settings
                </button>
              </form>
            </div>
          )}

          <footer style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <p>© 2026 EduSphere AI. Empowering deep learning.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </footer>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboardPage;
