import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <div className="glass-card" style={{ padding: '60px 40px', maxWidth: '500px', width: '100%' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 800 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          The requested route does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
          <ArrowLeft size={18} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
