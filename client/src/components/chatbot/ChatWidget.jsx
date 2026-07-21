import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { Sparkles, Send, Bot, User, X, Minimize2, Maximize2, RefreshCw } from 'lucide-react';

const ChatWidget = ({ courseId, lessonId, courseTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: `Hi there! I am your AI Tutor chatbot for "${courseTitle || 'this course'}". Ask me anything about the lesson content or transcript context!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');

    // Append user message immediately
    setMessages((prev) => [...prev, { role: 'user', content: userMsg, timestamp: new Date() }]);
    setLoading(true);

    try {
      const res = await api.post('/ai/chatbot', {
        courseId,
        lessonId,
        message: userMsg
      });

      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: res.data.content, timestamp: new Date() }
      ]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content: 'Sorry, I encountered a temporary connection issue. Please try asking again!',
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
      {/* Floating Toggle Circle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pulse-glow"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(236, 72, 153, 0.5)',
            transition: 'transform 0.2s'
          }}
          title="Open AI Chatbot Tutor"
        >
          <Sparkles size={28} />
        </button>
      )}

      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div
          className="glass-card"
          style={{
            width: '380px',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            border: '1px solid rgba(236, 72, 153, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
            overflow: 'hidden'
          }}
        >
          {/* Chat Window Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#ffffff' }}>AI Chatbot Tutor</h4>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>RAG Context Active</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(11, 15, 25, 0.8)' }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {msg.role === 'ai' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={16} color="#ffffff" />
                  </div>
                )}

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(26, 34, 53, 0.9)',
                    color: '#ffffff',
                    border: msg.role === 'ai' ? '1px solid var(--border-glass)' : 'none',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <RefreshCw size={14} className="pulse-glow" /> AI Tutor is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div style={{ padding: '8px 16px', background: 'rgba(18, 24, 38, 0.9)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            <button
              onClick={() => setInput('Can you summarize key points of this lesson?')}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '4px 10px', fontSize: '0.72rem', color: 'var(--text-muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              ⚡ Summarize Lesson
            </button>
            <button
              onClick={() => setInput('Give me a quick real-world example.')}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '4px 10px', fontSize: '0.72rem', color: 'var(--text-muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              💡 Give Example
            </button>
          </div>

          {/* Input Footer Form */}
          <form onSubmit={handleSend} style={{ padding: '12px 16px', background: 'rgba(11, 15, 25, 0.95)', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Ask AI Tutor a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="form-input"
              style={{ borderRadius: '20px', padding: '10px 14px', fontSize: '0.85rem' }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
