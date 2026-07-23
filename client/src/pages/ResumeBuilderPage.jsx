import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { Award, Download, Sparkles, Briefcase, BookOpen, CheckCircle, Mail, MapPin, Globe, Phone } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ResumeBuilderPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const resumeRef = useRef(null);

  const downloadResumePDF = async () => {
    if (!resumeRef.current) return;
    showToast('Generating high-res PDF Resume...', 'info');

    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`Resume-${user?.name || 'Student'}.pdf`);
      showToast('🎉 Resume downloaded successfully!', 'success');
    } catch (err) {
      console.error('Resume PDF download error:', err);
      showToast('Failed to download resume PDF.', 'error');
    }
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '50px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* HEADER & ACTION BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
              AUTOMATED CREDENTIAL PORTFOLIO
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', margin: '4px 0 0' }}>
              AI Resume & Verified Portfolio 📄
            </h1>
          </div>

          <button onClick={downloadResumePDF} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.92rem' }}>
            <Download size={18} /> Download PDF Resume
          </button>
        </div>

        {/* RESUME TEMPLATE PAPER FRAME */}
        <div
          ref={resumeRef}
          style={{
            background: '#ffffff',
            color: '#1f2937',
            padding: '48px',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {/* HEADER ROW */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #6366f1', paddingBottom: '24px', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e1b4b', marginBottom: '4px' }}>
                {user?.name || 'David Miller'}
              </h2>
              <span style={{ fontSize: '1.05rem', color: '#4f46e5', fontWeight: 700 }}>
                Full-Stack AI Developer & Software Engineer
              </span>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.6' }}>
              <div>📧 {user?.email || 'david.miller@edusphere.ai'}</div>
              <div>🌐 github.com/davidmiller-ai</div>
              <div>📍 Colombo, Sri Lanka</div>
            </div>
          </div>

          {/* SUMMARY */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e1b4b', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '10px' }}>
              PROFESSIONAL SUMMARY
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6' }}>
              Results-driven Full-Stack AI Engineer with verified credentials in Python, Data Analytics, React, and Gemini AI Prompt Engineering. Experienced in building responsive web applications, deep learning neural networks, and REST APIs.
            </p>
          </div>

          {/* VERIFIED SKILLS */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e1b4b', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px' }}>
              VERIFIED TECHNICAL SKILLS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['React.js', 'Node.js', 'Python', 'Machine Learning', 'Gemini AI API', 'MongoDB', 'REST APIs', 'TypeScript', 'Tailwind CSS', 'Docker'].map((skill, idx) => (
                <span key={idx} style={{ background: '#e0e7ff', color: '#3730a3', padding: '6px 14px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 700 }}>
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* VERIFIED EDUSPHERE CERTIFICATES */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e1b4b', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '16px' }}>
              VERIFIED EDUSPHERE ACADEMIC CERTIFICATES
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#111827' }}>Python for Data Science & AI Prompt Engineering</strong>
                  <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800 }}>ID: CERT-88214 (Verified)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                  Completed 100% video modules, 12 practical labs, and passed the final AI quiz assessment with 95% score.
                </p>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #6366f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#111827' }}>Full-Stack Web Development with AI & React</strong>
                  <span style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 800 }}>ID: CERT-94102 (Verified)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                  Mastered React hooks, state optimization, REST APIs, and Gemini AI integration.
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '16px', fontSize: '0.78rem', color: '#9ca3af' }}>
            Verified Credential Report • EduSphere AI Learning Management System
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResumeBuilderPage;
