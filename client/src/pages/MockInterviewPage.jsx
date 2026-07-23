import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import {
  Mic,
  Sparkles,
  Award,
  CheckCircle2,
  Play,
  RotateCcw,
  MessageSquare,
  BarChart,
  Brain,
  HelpCircle
} from 'lucide-react';

const INTERVIEW_TOPICS = [
  { id: 'webdev', name: 'Full-Stack Web Development', icon: '💻', count: '10 Questions' },
  { id: 'python', name: 'Python & Data Engineering', icon: '🐍', count: '8 Questions' },
  { id: 'ai', name: 'AI & Machine Learning Concepts', icon: '🤖', count: '12 Questions' },
  { id: 'uiux', name: 'UI/UX Design Systems', icon: '🎨', count: '6 Questions' }
];

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: 'How do you optimize state management and re-rendering performance in modern React applications?',
    aiHint: 'Mention useMemo, useCallback, React.memo, and keeping state localized rather than lifting unnecessarily.'
  },
  {
    id: 2,
    question: 'Explain the difference between SQL relational databases and NoSQL document databases like MongoDB.',
    aiHint: 'Discuss ACID compliance, schema rigidity, horizontal scaling, and JSON-like document structures.'
  },
  {
    id: 3,
    question: 'What is Prompt Engineering and how do context windows impact generative AI responses?',
    aiHint: 'Mention system instructions, few-shot prompting, token limits, and context truncation.'
  }
];

const MockInterviewPage = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [selectedTopic, setSelectedTopic] = useState(INTERVIEW_TOPICS[0]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const currentQ = SAMPLE_QUESTIONS[currentQIndex];

  const handleSimulateVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setAnswerInput('I would optimize React performance using React.memo for pure components, useMemo for heavy calculations, and useCallback for callback props to prevent unnecessary child re-renders.');
      showToast('🎙️ Voice recording transcribed by AI!', 'success');
    } else {
      setIsRecording(true);
      showToast('🎙️ Voice recording started... Speak your answer.', 'info');
    }
  };

  const handleEvaluateAnswer = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) {
      showToast('Please type or record your answer first.', 'error');
      return;
    }

    setIsEvaluating(true);
    showToast('🤖 AI is evaluating your technical answer...', 'info');

    setTimeout(() => {
      setEvaluationResult({
        score: '92%',
        feedback: 'Excellent answer! You correctly identified memoization hooks (useMemo, useCallback) and component-level memoization. To make your response even stronger, mention Virtual DOM diffing.',
        strengths: ['Clear terminology', 'Accurate hook usage', 'Performance awareness'],
        suggestion: 'Add an example of React 19 automatic compiler optimization.'
      });
      setIsEvaluating(false);
      showToast('🎉 Interview answer evaluated!', 'success');
    }, 1400);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setAnswerInput('');
      setEvaluationResult(null);
    } else {
      showToast('🏆 Mock Interview Session Completed!', 'success');
    }
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '50px 24px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* HEADER BANNER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            <Brain size={16} /> AI Voice & Technical Interview Simulator
          </span>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>
            AI Mock Interview Studio 📝🎙️
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Practice technical interview questions with real-time AI voice transcription, score feedback, and personalized improvement tips.
          </p>
        </div>

        {/* TOPIC SELECTOR TABS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }}>
          {INTERVIEW_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setCurrentQIndex(0);
                  setAnswerInput('');
                  setEvaluationResult(null);
                }}
                className="glass-card"
                style={{
                  padding: '18px',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-glass)',
                  background: isSelected ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
                  boxShadow: isSelected ? '0 6px 20px rgba(99,102,241,0.2)' : 'none'
                }}
              >
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '6px' }}>{topic.icon}</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-title)', display: 'block', marginBottom: '4px' }}>
                  {topic.name}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{topic.count}</span>
              </div>
            );
          })}
        </div>

        {/* INTERVIEW CARD */}
        <div className="glass-card" style={{ padding: '36px', borderRadius: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
                QUESTION {currentQIndex + 1} OF {SAMPLE_QUESTIONS.length}
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-title)', marginTop: '4px' }}>
                {currentQ.question}
              </h2>
            </div>
            <span style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800 }}>
              Technical Round
            </span>
          </div>

          {/* AI HINT */}
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '14px 18px', borderRadius: '14px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              💡 AI Key Concepts Hint:
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: '1.5' }}>
              {currentQ.aiHint}
            </p>
          </div>

          {/* ANSWER INPUT & VOICE TRANSCRIPTION */}
          <form onSubmit={handleEvaluateAnswer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label">Your Technical Answer</label>

                <button
                  type="button"
                  onClick={handleSimulateVoiceRecording}
                  style={{
                    background: isRecording ? '#ef4444' : 'rgba(99,102,241,0.15)',
                    color: isRecording ? '#ffffff' : '#6366f1',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Mic size={14} /> {isRecording ? '🔴 Recording... Click to Stop' : '🎙️ Record Voice Answer'}
                </button>
              </div>

              <textarea
                rows={5}
                placeholder="Type or record your response here..."
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                className="form-input"
                style={{ borderRadius: '16px', fontSize: '0.9rem', resize: 'none', padding: '16px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={isEvaluating}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.95rem', borderRadius: '14px' }}
              >
                {isEvaluating ? 'AI Evaluating...' : 'Evaluate Answer with AI ✨'}
              </button>
            </div>
          </form>

          {/* EVALUATION FEEDBACK RESULT */}
          {evaluationResult && (
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.3rem' }}>
                  {evaluationResult.score}
                </div>
                <div>
                  <strong style={{ fontSize: '1.1rem', color: '#10b981', display: 'block' }}>AI Score: Passed!</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Great technical clarity and explanation.</span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-title)', lineHeight: '1.6', background: 'var(--bg-main)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                {evaluationResult.feedback}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {evaluationResult.strengths.map((str, sIdx) => (
                    <span key={sIdx} style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                      ✓ {str}
                    </span>
                  ))}
                </div>

                <button onClick={handleNextQuestion} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  Next Question →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default MockInterviewPage;
