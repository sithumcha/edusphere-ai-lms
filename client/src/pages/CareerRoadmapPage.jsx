import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Target,
  Award,
  Zap,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ROADMAP_PRESETS = [
  {
    role: 'Full-Stack AI Developer',
    icon: '🤖',
    desc: 'Master Frontend, Node.js Backend, Gemini AI Integration & Cloud Deployment',
    time: '6 Months',
    salary: '$110,000 / yr',
    steps: [
      { level: 'Phase 1: Foundations', title: 'HTML5, CSS3, Modern ES6+ JavaScript & React', duration: '4 Weeks', status: 'completed' },
      { level: 'Phase 2: Backend Architecture', title: 'Node.js, Express.js, MongoDB & REST APIs', duration: '6 Weeks', status: 'current' },
      { level: 'Phase 3: AI Model Integration', title: 'Google Gemini API, Prompt Engineering & Vector DBs', duration: '6 Weeks', status: 'upcoming' },
      { level: 'Phase 4: Full Stack Capstone', title: 'Deploy SaaS App with Auth, Stripe & Docker', duration: '8 Weeks', status: 'upcoming' }
    ]
  },
  {
    role: 'Data Scientist & ML Engineer',
    icon: '📊',
    desc: 'Python, Machine Learning Algorithms, Neural Networks & PyTorch',
    time: '8 Months',
    salary: '$125,000 / yr',
    steps: [
      { level: 'Phase 1: Math & Python', title: 'Python Fundamentals, NumPy, Pandas & Statistics', duration: '6 Weeks', status: 'completed' },
      { level: 'Phase 2: Supervised Learning', title: 'Scikit-Learn, Regression, Classification & Trees', duration: '6 Weeks', status: 'current' },
      { level: 'Phase 3: Deep Learning', title: 'Neural Networks, TensorFlow, Computer Vision & NLP', duration: '10 Weeks', status: 'upcoming' },
      { level: 'Phase 4: ML Ops', title: 'Model Deployment, Fast API & Monitoring Pipelines', duration: '6 Weeks', status: 'upcoming' }
    ]
  },
  {
    role: 'UI/UX Design Systems Architect',
    icon: '🎨',
    desc: 'Figma Systems, Dark Modes, Micro-Animations & Frontend Hand-Off',
    time: '4 Months',
    salary: '$95,000 / yr',
    steps: [
      { level: 'Phase 1: UX Research', title: 'User Personas, Wireframing & Usability Testing', duration: '4 Weeks', status: 'completed' },
      { level: 'Phase 2: Design Tokens', title: 'Atomic Design, Figma Components & Typography', duration: '4 Weeks', status: 'current' },
      { level: 'Phase 3: Interactive Motion', title: 'Prototyping, CSS Animations & Glassmorphism', duration: '4 Weeks', status: 'upcoming' },
      { level: 'Phase 4: System Handoff', title: 'React Tailwind / CSS Variables Handoff', duration: '4 Weeks', status: 'upcoming' }
    ]
  }
];

const CareerRoadmapPage = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [selectedRoadmap, setSelectedRoadmap] = useState(ROADMAP_PRESETS[0]);
  const [customGoal, setCustomGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCustomRoadmap = (e) => {
    e.preventDefault();
    if (!customGoal.trim()) return;

    setIsGenerating(true);
    showToast(`🤖 AI generating custom roadmap for "${customGoal}"...`, 'info');

    setTimeout(() => {
      setSelectedRoadmap({
        role: customGoal.trim(),
        icon: '🚀',
        desc: `AI-curated learning path specifically tailored for ${customGoal.trim()}`,
        time: '5 Months',
        salary: '$105,000 / yr',
        steps: [
          { level: 'Phase 1: Core Fundamentals', title: `Essential Skills for ${customGoal.trim()}`, duration: '4 Weeks', status: 'completed' },
          { level: 'Phase 2: Practical Projects', title: 'Hands-on Coding Labs & Interactive Challenges', duration: '6 Weeks', status: 'current' },
          { level: 'Phase 3: Advanced Optimization', title: 'AI Integration, Architecture & Production Best Practices', duration: '6 Weeks', status: 'upcoming' },
          { level: 'Phase 4: Portfolio Capstone', title: 'Building & Deploying Verified Capstone Project', duration: '4 Weeks', status: 'upcoming' }
        ]
      });
      setIsGenerating(false);
      showToast('🎉 Custom Career Roadmap Generated!', 'success');
      setCustomGoal('');
    }, 1200);
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '50px 24px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        
        {/* HERO BANNER */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
              color: '#6366f1',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              border: '1px solid rgba(99,102,241,0.3)'
            }}
          >
            <Sparkles size={16} /> AI Career & Skill Advisor
          </span>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Interactive AI Career Roadmaps 🗺️
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Discover step-by-step learning paths generated by AI. Track your milestone progress and master skills needed for high-demand tech careers.
          </p>
        </div>

        {/* CUSTOM AI GENERATOR INPUT */}
        <form onSubmit={handleGenerateCustomRoadmap} style={{ display: 'flex', gap: '14px', maxWidth: '680px', margin: '0 auto 48px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="e.g. Cyber Security Expert, DevOps Engineer, Mobile App Dev..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '20px', height: '52px', borderRadius: '16px', fontSize: '0.95rem', background: 'var(--bg-card)' }}
            />
          </div>
          <button
            type="submit"
            disabled={isGenerating}
            className="btn-primary"
            style={{ padding: '0 28px', height: '52px', fontSize: '0.95rem', borderRadius: '16px', flexShrink: 0 }}
          >
            {isGenerating ? 'Generating...' : 'Generate Roadmap ✨'}
          </button>
        </form>

        {/* PRESET ROLE SELECTOR CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {ROADMAP_PRESETS.map((preset, idx) => {
            const isSelected = selectedRoadmap.role === preset.role;
            return (
              <div
                key={idx}
                onClick={() => setSelectedRoadmap(preset)}
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-glass)',
                  background: isSelected ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(99,102,241,0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{preset.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', lineHeight: '1.2' }}>{preset.role}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Est. {preset.salary}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{preset.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ACTIVE ROADMAP TIMELINE */}
        <div className="glass-card" style={{ padding: '36px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid var(--border-glass)' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
                CURRENT ROADMAP
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-title)', margin: '4px 0 0' }}>
                {selectedRoadmap.icon} {selectedRoadmap.role}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>ESTIMATED TIME</span>
                <strong style={{ fontSize: '1rem', color: 'var(--text-title)' }}>{selectedRoadmap.time}</strong>
              </div>
              <Link to="/courses" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                Explore Related Courses <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* TIMELINE STEPS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedRoadmap.steps.map((step, sIdx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div
                  key={sIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: isCurrent ? 'rgba(99,102,241,0.08)' : 'var(--bg-main)',
                    border: isCurrent ? '1px solid #6366f1' : '1px solid var(--border-glass)'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: isCompleted ? '#10b981' : isCurrent ? '#6366f1' : 'var(--bg-card)',
                      color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      border: '2px solid var(--border-glass)'
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={20} /> : sIdx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isCurrent ? '#6366f1' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {step.level}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{step.duration}</span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '8px' }}>
                      {step.title}
                    </h4>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        background: isCompleted ? 'rgba(16,185,129,0.15)' : isCurrent ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
                        color: isCompleted ? '#10b981' : isCurrent ? '#6366f1' : 'var(--text-muted)'
                      }}
                    >
                      {isCompleted ? '✅ Milestone Completed' : isCurrent ? '🎯 In Progress Milestone' : '🔒 Next Milestone'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CareerRoadmapPage;
