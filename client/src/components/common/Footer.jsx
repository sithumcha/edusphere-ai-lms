import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  MessageSquare,
  Share2,
  Lock,
  ShieldCheck,
  CreditCard,
  Send,
  Sparkles,
  Compass,
  Mic,
  Award,
  Terminal,
  FileText
} from 'lucide-react';
import { useToast } from './Toast';

const Footer = () => {
  const { showToast } = useToast();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast('🎉 Subscribed successfully to EduSphere AI Newsletter!', 'success');
      setEmailInput('');
    }
  };

  return (
    <footer style={{ background: 'var(--bg-main)', color: 'var(--text-main)', borderTop: '1px solid var(--border-glass)', paddingTop: '70px', paddingBottom: '36px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* NEWSLETTER SUBSCRIBE BANNER */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '24px', padding: '32px 40px', marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#818cf8', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={16} /> STAY AHEAD IN TECH & AI
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-title)', margin: 0 }}>
              Subscribe to EduSphere AI Weekly Digest
            </h3>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flex: 1, maxWidth: '460px' }}>
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '14px', padding: '12px 18px', color: 'var(--text-title)', fontSize: '0.9rem', outline: 'none' }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '12px 24px', borderRadius: '14px', whiteSpace: 'nowrap', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Subscribe <Send size={16} />
            </button>
          </form>
        </div>

        {/* SITEMAP GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '36px', marginBottom: '56px' }}>
          
          {/* Brand Info */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-title)' }}>
                EduSphere <span style={{ color: 'var(--primary)' }}>AI</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', maxWidth: '300px', marginBottom: '20px' }}>
              Empowering deep learning through the synergy of human expertise and artificial intelligence.
            </p>

            <div style={{ display: 'flex', gap: '14px', color: 'var(--text-muted)' }}>
              <Globe size={18} style={{ cursor: 'pointer' }} />
              <Share2 size={18} style={{ cursor: 'pointer' }} />
              <MessageSquare size={18} style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Column 1: AI SUITE */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6366f1', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              AI SUITE
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/career-roadmap" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>AI Career Roadmap</Link></li>
              <li><Link to="/mock-interview" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>AI Mock Interview</Link></li>
              <li><Link to="/resume-builder" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>AI Resume Builder</Link></li>
              <li><Link to="/leaderboard" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Global Leaderboard</Link></li>
            </ul>
          </div>

          {/* Column 2: LABS & TOOLS */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              LABS & TOOLS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/code-sandbox" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Code Sandbox</Link></li>
              <li><Link to="/virtual-classroom" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Virtual Classroom</Link></li>
              <li><Link to="/how-to-use" style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'none' }}>How to Use ❓</Link></li>
              <li><Link to="/courses" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Course Catalog</Link></li>
            </ul>
          </div>

          {/* Column 3: TRUST & VERIFICATION */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              VERIFICATION
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><span style={{ color: 'var(--text-title)' }}>QR PDF Certs</span></li>
              <li><span style={{ color: 'var(--text-title)' }}>Stripe Gateway</span></li>
              <li><span style={{ color: 'var(--text-title)' }}>256-Bit SSL</span></li>
            </ul>
          </div>

          {/* Column 4: LEGAL */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ec4899', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              LEGAL
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#privacy" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#support" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Support Desk</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BADGES & COPYRIGHT BAR */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700 }}>
              <Lock size={14} /> 256-Bit SSL Encrypted
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6366f1', fontWeight: 700 }}>
              <CreditCard size={14} /> Stripe Secured Payment
            </span>
          </div>

          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} EduSphere AI Inc. All rights reserved. Built with Gemini AI.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
