import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle, ShieldCheck, GraduationCap } from 'lucide-react';

const RegisterForm = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'instructor' ? 'instructor' : 'student';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await register(name, email, password, role);
      if (user.role === 'instructor') navigate('/dashboard/instructor');
      else navigate('/dashboard/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '36px', width: '100%', maxWidth: '460px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Create Your Account</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Join CogniLearn AI to experience AI-powered personalized education</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#fda4af', fontSize: '0.85rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Role Selection Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setRole('student')}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: role === 'student' ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
            background: role === 'student' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(11, 15, 25, 0.5)',
            color: role === 'student' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <GraduationCap size={18} color={role === 'student' ? '#a5b4fc' : 'var(--text-muted)'} />
          Student Account
        </button>

        <button
          type="button"
          onClick={() => setRole('instructor')}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: role === 'instructor' ? '2px solid var(--secondary)' : '1px solid var(--border-glass)',
            background: role === 'instructor' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(11, 15, 25, 0.5)',
            color: role === 'instructor' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <ShieldCheck size={18} color={role === 'instructor' ? '#c084fc' : 'var(--text-muted)'} />
          Instructor Account
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="form-label">Full Name</label>
          <div style={{ position: 'relative' }}>
            <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="form-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              className="form-input"
              style={{ paddingLeft: '42px' }}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
          {loading ? 'Creating Account...' : <><UserPlus size={18} /> Register as {role === 'instructor' ? 'Instructor' : 'Student'}</>}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
          Log In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
