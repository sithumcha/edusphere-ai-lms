import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Hand,
  MessageSquare,
  Users,
  Send,
  ArrowLeft,
  Sparkles,
  Share2,
  PhoneOff,
  Award,
  BarChart3,
  Monitor,
  PenTool,
  ThumbsUp,
  Heart,
  Flame,
  Lightbulb,
  CheckCircle2,
  Radio
} from 'lucide-react';

const CHAT_ROOM_MESSAGES = [
  { id: 1, sender: 'Dr. Sarah Chen (Host)', text: 'Welcome everyone to today’s Live Webinar on Generative AI Architectures!', time: '10:00 AM' },
  { id: 2, sender: 'Alex Johnson', text: 'Excited for the live demonstration of Transformer attention layers!', time: '10:01 AM' },
  { id: 3, sender: 'Elena Rostova', text: 'Will the recorded stream be available on our Student Dashboard later?', time: '10:02 AM' },
  { id: 4, sender: 'AI Co-Pilot Bot 🤖', text: '💡 Live AI Summary: Dr. Sarah is currently explaining Positional Encoding in Transformer models.', time: '10:03 AM' }
];

const LIVE_POLL = {
  question: 'Which Vector DB index offers the fastest approximate nearest neighbor search?',
  options: [
    { text: 'HNSW (Hierarchical Navigable Small World)', votes: 68 },
    { text: 'Flat L2 Index', votes: 12 },
    { text: 'IVFFlat Index', votes: 20 }
  ]
};

const VirtualClassroomPage = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState('speaker'); // 'speaker' | 'screenshare' | 'whiteboard'
  const [activeRightTab, setActiveRightTab] = useState('chat'); // 'chat' | 'copilot' | 'poll'

  const [chatMessages, setChatMessages] = useState(CHAT_ROOM_MESSAGES);
  const [inputMsg, setInputMsg] = useState('');

  // Reactions Burst State
  const [reactions, setReactions] = useState([]);

  // Poll Vote State
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [hasVotedPoll, setHasVotedPoll] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'You (Student)', text: inputMsg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputMsg('');
  };

  const handleTriggerReaction = (emoji) => {
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  return (
    <div style={{ background: '#070a12', color: '#ffffff', minHeight: '100vh', padding: '20px', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/dashboard/student" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
              <ArrowLeft size={18} /> Leave Studio
            </Link>
            <div style={{ width: '1px', height: '20px', background: '#334155' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '4px 12px', borderRadius: '20px' }}>
              <Radio size={14} color="#ef4444" className="animate-pulse" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.5px' }}>LIVE WEBINAR</span>
            </div>

            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Live Masterclass: Generative AI & Vector DBs
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* View Mode Switches */}
            <div style={{ display: 'flex', background: '#0f172a', padding: '4px', borderRadius: '12px', border: '1px solid #1e293b' }}>
              {[
                { id: 'speaker', label: '🎥 Speaker', icon: <Video size={14} /> },
                { id: 'screenshare', label: '🖥️ Screen Share', icon: <Monitor size={14} /> },
                { id: 'whiteboard', label: '🎨 Whiteboard', icon: <PenTool size={14} /> }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveViewMode(mode.id)}
                  style={{
                    background: activeViewMode === mode.id ? '#6366f1' : 'transparent',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {mode.icon} {mode.label}
                </button>
              ))}
            </div>

            <span style={{ fontSize: '0.85rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="#10b981" /> 148 Live
            </span>
          </div>
        </div>

        {/* VIRTUAL CLASSROOM MAIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', height: 'calc(100vh - 130px)' }}>
          
          {/* LEFT VIDEO CANVAS / SCREEN SHARE / WHITEBOARD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            
            <div style={{ flex: 1, background: '#000000', borderRadius: '24px', overflow: 'hidden', position: 'relative', border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              
              {/* Floating Reaction Emojis Burst Overlay */}
              {reactions.map((r) => (
                <div
                  key={r.id}
                  style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: `${r.left}%`,
                    fontSize: '2rem',
                    pointerEvents: 'none',
                    animation: 'floatUp 2s ease-out forwards',
                    zIndex: 10
                  }}
                >
                  {r.emoji}
                </div>
              ))}

              {activeViewMode === 'speaker' && (
                <video
                  controls
                  autoPlay
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                />
              )}

              {activeViewMode === 'screenshare' && (
                <div style={{ width: '100%', height: '100%', background: '#0b1329', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                  <Monitor size={64} color="#6366f1" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Dr. Sarah Chen is Sharing Slide Deck</h3>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '480px', marginTop: '8px' }}>
                    Topic: High-Performance Vector Embeddings in Qdrant & Pinecone Databases.
                  </p>
                </div>
              )}

              {activeViewMode === 'whiteboard' && (
                <div style={{ width: '100%', height: '100%', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #334155' }}>
                  <PenTool size={56} color="#10b981" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>Live Interactive Whiteboard Canvas</h3>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Real-time diagramming by Dr. Sarah Chen & Students</p>
                </div>
              )}

              {/* Host Overlay Chip */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>Dr. Sarah Chen (Host Stream)</span>
              </div>
            </div>

            {/* Bottom Stream Controls Bar & Reaction Buttons */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '12px 24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              {/* Reaction Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {['👏', '❤️', '🔥', '💡', '🚀'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleTriggerReaction(emoji)}
                    style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '10px', padding: '6px 10px', fontSize: '1.1rem', cursor: 'pointer' }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Media Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: isMicOn ? '#10b981' : '#334155',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    cursor: 'pointer'
                  }}
                  title="Toggle Microphone"
                >
                  {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: isVideoOn ? '#6366f1' : '#334155',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    cursor: 'pointer'
                  }}
                  title="Toggle Camera"
                >
                  {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                </button>

                <button
                  onClick={() => {
                    setHandRaised(!handRaised);
                    if (!handRaised) alert('Hand raised! Dr. Sarah Chen has been notified.');
                  }}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: handRaised ? '#f59e0b' : '#334155',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    cursor: 'pointer'
                  }}
                  title="Raise Hand"
                >
                  <Hand size={20} />
                </button>

                <Link
                  to="/dashboard/student"
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '30px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <PhoneOff size={18} /> Leave Class
                </Link>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR: LIVE CHAT, AI CO-PILOT, AND LIVE POLLS */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            
            <div>
              {/* Right Sidebar Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', marginBottom: '16px', paddingBottom: '10px', gap: '8px' }}>
                {[
                  { id: 'chat', label: '💬 Chat', count: chatMessages.length },
                  { id: 'copilot', label: '🤖 AI Co-Pilot', count: 'Live' },
                  { id: 'poll', label: '📊 Polls', count: '1 Active' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRightTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      background: activeRightTab === tab.id ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                      color: activeRightTab === tab.id ? '#6366f1' : '#94a3b8',
                      border: activeRightTab === tab.id ? '1px solid rgba(99, 102, 241, 0.4)' : 'none',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: LIVE CHAT */}
              {activeRightTab === 'chat' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '440px', overflowY: 'auto' }}>
                  {chatMessages.map((msg) => (
                    <div key={msg.id} style={{ background: '#1e293b', padding: '10px 14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                        <strong style={{ color: msg.sender.includes('Host') ? '#ec4899' : msg.sender.includes('AI') ? '#10b981' : '#818cf8' }}>
                          {msg.sender}
                        </strong>
                        <span style={{ color: '#64748b' }}>{msg.time}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#e2e8f0', margin: 0, lineHeight: '1.45' }}>{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: AI CO-PILOT TRANSCRIPTION & NOTES */}
              {activeRightTab === 'copilot' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '14px', borderRadius: '14px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <Sparkles size={16} /> AI Live Transcript
                    </strong>
                    <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                      "Vector embeddings map high-dimensional semantic data into geometric space, enabling cosine similarity queries."
                    </p>
                  </div>

                  <div style={{ background: '#1e293b', padding: '14px', borderRadius: '14px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#10b981', display: 'block', marginBottom: '6px' }}>
                      📌 Auto Takeaway #1
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Use HNSW indexing for sub-millisecond vector retrieval.</span>
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE MCQ POLL */}
              {activeRightTab === 'poll' && (
                <div style={{ background: '#1e293b', padding: '16px', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block', marginBottom: '10px' }}>
                    📊 {LIVE_POLL.question}
                  </strong>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {LIVE_POLL.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedPollOption(idx);
                          setHasVotedPoll(true);
                        }}
                        style={{
                          background: selectedPollOption === idx ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                          color: '#ffffff',
                          border: selectedPollOption === idx ? '1px solid #10b981' : '1px solid transparent',
                          padding: '10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        {opt.text} {hasVotedPoll && `(${opt.votes + (selectedPollOption === idx ? 1 : 0)} votes)`}
                      </button>
                    ))}
                  </div>

                  {hasVotedPoll && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'block', marginTop: '10px', textAlign: 'center' }}>
                      ✓ Vote Recorded Live!
                    </span>
                  )}
                </div>
              )}

            </div>

            {/* Post Message Input (Chat Tab Only) */}
            {activeRightTab === 'chat' && (
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', borderTop: '1px solid #1e293b', paddingTop: '14px' }}>
                <input
                  type="text"
                  placeholder="Ask a question in live chat..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  style={{ flex: 1, background: '#1e293b', border: 'none', borderRadius: '12px', padding: '10px 14px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                />
                <button type="submit" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#6366f1', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Send size={16} />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default VirtualClassroomPage;
