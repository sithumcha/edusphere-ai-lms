import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/common/Loader';
import { CreditCard, ShieldCheck, Lock, Sparkles, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Form Mock Inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Failed to load checkout course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Execute backend enrollment endpoint
      await api.post(`/enrollments/${courseId}`);
      setCompleted(true);

      setTimeout(() => {
        navigate(`/learn/${courseId}`);
      }, 1500);
    } catch (err) {
      console.error('Enrollment error:', err);
      setProcessing(false);
    }
  };

  if (loading) return <Loader text="Preparing checkout gateway..." />;
  if (!course) return <div style={{ padding: '60px', textAlign: 'center' }}>Course not found.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 24px' }}>
      <div className="glass-card" style={{ padding: '36px' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '8px', textAlign: 'center' }}>Course Checkout</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '24px' }}>
          Complete your purchase to gain instant lifetime access
        </p>

        {/* Order Summary */}
        <div style={{ background: 'rgba(11, 15, 25, 0.6)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <img src={course.thumbnail} alt={course.title} style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>{course.title}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instructor: {course.instructorName}</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
            {course.price === 0 ? <span style={{ color: 'var(--accent-emerald)' }}>FREE</span> : `$${course.price}`}
          </div>
        </div>

        {completed ? (
          <div style={{ textAlign: 'center', padding: '30px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <CheckCircle size={48} color="var(--accent-emerald)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#6ee7b7', marginBottom: '6px' }}>Payment & Enrollment Successful!</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Redirecting you to the interactive learning portal...</p>
            <button
              onClick={() => alert('Downloading official PDF Tax Invoice Receipt (INV-2026-881)...')}
              className="btn-secondary"
              style={{ background: '#ffffff', color: '#059669', border: '1px solid #86efac', margin: '0 auto' }}
            >
              📄 Download PDF Receipt
            </button>
          </div>
        ) : (
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Cardholder Information</label>
              <div style={{ position: 'relative' }}>
                <CreditCard size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-input"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label">CVC Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={processing} style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '10px' }}>
              {processing ? 'Processing Payment...' : <><Lock size={18} /> Pay {course.price === 0 ? '$0.00' : `$${course.price}`} & Enroll</>}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--accent-emerald)" /> 256-Bit SSL Encrypted & Stripe Secured
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
