import React from 'react';
import { Sparkles } from 'lucide-react';

const Loader = ({ text = 'Loading AI content...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', width: '100%', gap: '16px' }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)',
        animation: 'pulseGlow 1.8s infinite ease-in-out'
      }}>
        <Sparkles size={28} color="#ffffff" />
      </div>
      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>{text}</span>
    </div>
  );
};

export default Loader;
