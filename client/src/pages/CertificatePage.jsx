import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, ShieldCheck, Download, Printer, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CertificatePage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Top Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link to="/dashboard/student" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
            <ArrowLeft size={18} /> Back to Student Dashboard
          </Link>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handlePrint} className="btn-secondary">
              <Printer size={16} /> Print / Save PDF
            </button>
            <button onClick={() => alert('Certificate downloaded as PDF!')} className="btn-primary">
              <Download size={16} /> Download Certificate
            </button>
          </div>
        </div>

        {/* CERTIFICATE ARTBOARD (PRINTABLE AREA) */}
        <div
          id="certificate-print"
          className="glass-card"
          style={{
            padding: '60px 48px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            border: '8px double #1f108e',
            boxShadow: '0 20px 50px rgba(31, 16, 142, 0.12)',
            position: 'relative',
            color: '#0b1c30',
            textAlign: 'center'
          }}
        >
          {/* Watermark Logo */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, pointerEvents: 'none' }}>
            <Award size={400} color="#1f108e" />
          </div>

          {/* Header */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(132, 85, 239, 0.1)', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <Sparkles size={16} color="#6b38d4" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6b38d4', letterSpacing: '1px', textTransform: 'uppercase' }}>
              EDUSPHERE AI VERIFIED CREDENTIAL
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f108e', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Certificate of Completion
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#464553', marginBottom: '32px' }}>
            This official credential confirms that
          </p>

          {/* Recipient Name */}
          <div style={{ borderBottom: '2px solid #8455ef', display: 'inline-block', padding: '0 40px 10px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0b1c30', fontFamily: 'serif' }}>
              {user?.name || 'Alex Johnson'}
            </h2>
          </div>

          <p style={{ fontSize: '1rem', color: '#464553', maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.6' }}>
            has successfully completed all lectures, hands-on lab projects, and AI assessments for the course:
          </p>

          {/* Course Name */}
          <div style={{ background: '#e5eeff', padding: '16px 28px', borderRadius: '16px', display: 'inline-block', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1f108e' }}>
              Mastering Generative AI & Deep Neural Networks
            </h3>
          </div>

          {/* Signatures & Verification Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px solid #c8c4d5' }}>
            
            {/* Signature 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'cursive', fontSize: '1.5rem', color: '#1f108e', marginBottom: '4px' }}>Dr. Sarah Chen</div>
              <div style={{ borderTop: '1px solid #777584', paddingTop: '4px', fontSize: '0.78rem', color: '#777584', fontWeight: 700 }}>
                Lead Instructor & AI Scientist
              </div>
            </div>

            {/* Shield Seal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #1f108e 0%, #6b38d4 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', boxShadow: '0 4px 12px rgba(31, 16, 142, 0.3)' }}>
                <ShieldCheck size={36} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1f108e', letterSpacing: '0.5px' }}>OFFICIAL SEAL</span>
            </div>

            {/* Verification Code & QR */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: '#ffffff', border: '1px solid #c8c4d5', borderRadius: '8px', padding: '8px', display: 'inline-block', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1f108e', letterSpacing: '1px' }}>ID: EDS-2026-9842</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#777584', fontWeight: 700 }}>
                Verified on October 24, 2026
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CertificatePage;
