import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-glass)', paddingTop: '60px', paddingBottom: '30px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Sitemap Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '50px' }}>
          
          {/* Brand Info */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-title)' }}>
                EduSphere <span style={{ color: 'var(--primary)' }}>AI</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.65', maxWidth: '320px', marginBottom: '18px' }}>
              Empowering deep learning through the synergy of human expertise and artificial intelligence.
            </p>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)' }}>
              <Globe size={18} />
              <Share2 size={18} />
              <MessageSquare size={18} />
            </div>
          </div>

          {/* Column 1: PLATFORM */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              PLATFORM
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/courses" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Courses</Link></li>
              <li><a href="#aitutor" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>AI Tutor</a></li>
              <li><a href="#pricing" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Pricing</a></li>
              <li><a href="#enterprise" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Enterprise</a></li>
            </ul>
          </div>

          {/* Column 2: RESOURCES */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              RESOURCES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/how-to-use" style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'none' }}>How to Use ❓</Link></li>
              <li><Link to="/resources" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Resource Hub</Link></li>
              <li><Link to="/code-sandbox" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Code Sandbox</Link></li>
              <li><Link to="/virtual-classroom" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Virtual Classroom</Link></li>
            </ul>
          </div>

          {/* Column 3: LEGAL */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              LEGAL
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#privacy" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#support" style={{ color: 'var(--text-title)', textDecoration: 'none' }}>Contact Support</a></li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
