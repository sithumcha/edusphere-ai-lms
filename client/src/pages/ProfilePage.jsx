import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Sparkles, CheckCircle, Save, Key, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [skillsText, setSkillsText] = useState(user?.skills ? user.skills.join(', ') : '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const skillsArr = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
      await updateProfile({
        name,
        bio,
        avatar,
        skills: skillsArr,
        ...(password ? { password } : {})
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
      <div className="glass-card" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '24px' }}>
          <img
            src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid var(--primary)', objectFit: 'cover', boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
          />
          <div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{user?.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-primary">{user?.role}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user?.email}</span>
            </div>
          </div>
        </div>

        {message && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#6ee7b7' }}>
            <CheckCircle size={18} />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Avatar Image URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Bio / Profile Description</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Tell other students and instructors about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Skills & Interests (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="React, Gemini AI, Python, Machine Learning"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
            />
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', marginTop: '10px' }}>
            <label className="form-label">New Password (Leave blank to keep unchanged)</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
            <Save size={18} /> {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
