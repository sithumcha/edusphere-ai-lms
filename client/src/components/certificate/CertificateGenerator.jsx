import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Award, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CertificateGenerator = ({ certificateData }) => {
  const certRef = useRef(null);
  const { user } = useAuth();

  const downloadPDF = async () => {
    if (!certRef.current) return;
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`CogniLearn-Certificate-${certificateData?.certificateId || 'Download'}.pdf`);
    } catch (err) {
      console.error('PDF download error:', err);
    }
  };

  if (!certificateData) return null;

  const studentNameDisplay = certificateData.studentName && certificateData.studentName !== 'User' && certificateData.studentName !== 'Student'
    ? certificateData.studentName
    : (user?.name || 'David Miller');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Certificate Render Frame */}
      <div
        ref={certRef}
        style={{
          width: '800px',
          height: '560px',
          padding: '40px',
          background: 'linear-gradient(135deg, #0b0f19 0%, #171d2d 100%)',
          border: '12px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#ffffff',
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        {/* Certificate Decorative Accents */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>Cogni<span style={{ color: '#818cf8' }}>Learn AI</span></span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Certificate ID</span>
            <strong style={{ fontSize: '0.85rem', color: '#6ee7b7' }}>{certificateData.certificateId}</strong>
          </div>
        </div>

        {/* Certificate Center Content */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <span style={{ fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#a5b4fc', fontWeight: 700 }}>
            CERTIFICATE OF COMPLETION
          </span>
          <h2 style={{ fontSize: '2.5rem', margin: '14px 0', color: '#ffffff', fontWeight: 800 }}>
            {studentNameDisplay}
          </h2>
          <p style={{ fontSize: '1rem', color: '#9ca3af', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            has successfully fulfilled all curriculum requirements, video modules, AI assessment quizzes, and practical code exercises for:
          </p>
          <h3 style={{ fontSize: '1.8rem', color: '#38bdf8', margin: '16px 0', fontWeight: 700 }}>
            "{certificateData.courseTitle}"
          </h3>
        </div>

        {/* Certificate Footer Signature Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Instructor</span>
            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{certificateData.instructorName || 'LMS Instructor'}</strong>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Award size={36} color="#fde047" />
            <span style={{ fontSize: '0.65rem', color: '#6ee7b7', fontWeight: 800 }}>VERIFIED ACADEMIC CREDENTIAL</span>
          </div>

          {/* QR Code Verification Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=VERIFIED-CERT-${certificateData.certificateId || '1001'}`}
              alt="QR Code Verification"
              style={{ width: '60px', height: '60px', borderRadius: '8px', border: '2px solid #818cf8', background: '#ffffff', padding: '2px' }}
            />
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block' }}>Verification QR</span>
              <strong style={{ fontSize: '0.75rem', color: '#818cf8' }}>Scan to Verify 📲</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block' }}>Date Issued</span>
            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{new Date(certificateData.issueDate || Date.now()).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>

      {/* Action Buttons: PDF Download & Print */}
      <div style={{ display: 'flex', gap: '14px' }}>
        <button
          onClick={downloadPDF}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #10b981, #059669)' }}
        >
          <Download size={18} /> Download High-Res PDF Certificate 📜
        </button>

        <button
          onClick={() => window.print()}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🖨️ Print Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
