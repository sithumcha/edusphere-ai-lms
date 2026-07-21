import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Figma,
  FileSpreadsheet,
  Award,
  ArrowRight,
  Filter,
  Brain,
  MessageSquare
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'AI & Machine Learning',
  'Cheat Sheets',
  'Developer Docs',
  'Jupyter Notebooks',
  'Research Papers',
  'Design Templates'
];

const RESOURCES_LIST = [
  {
    id: 'r1',
    title: 'Neural Networks & Deep Learning Cheat Sheet',
    category: 'Cheat Sheets',
    type: 'PDF',
    size: '4.2 MB',
    downloads: '18.4k',
    desc: 'Comprehensive visual summary of CNNs, RNNs, LSTMs, Transformers, activation functions, and gradient descent formulas.',
    icon: <FileText size={24} color="#be123c" />,
    iconBg: '#ffe4e6',
    actionText: 'Download PDF',
    link: '#'
  },
  {
    id: 'r2',
    title: 'Python PyTorch & Transformer Architecture Lab',
    category: 'Jupyter Notebooks',
    type: 'Notebook',
    size: 'Google Colab',
    downloads: '14.2k',
    desc: 'Interactive Jupyter notebook demonstrating multi-head self-attention mechanisms and training custom LLMs from scratch.',
    icon: <Code2 size={24} color="#15803d" />,
    iconBg: '#dcfce7',
    actionText: 'Launch in Colab',
    link: '#'
  },
  {
    id: 'r3',
    title: 'AI Ethics & Bias Mitigation Guidelines (2026)',
    category: 'Research Papers',
    type: 'Guide',
    size: '18 Pages',
    downloads: '9.8k',
    desc: 'Frameworks and algorithmic fairness metrics for identifying hallucinations, bias, and security vulnerabilities in GenAI applications.',
    icon: <Brain size={24} color="#7c3aed" />,
    iconBg: '#f3e8ff',
    actionText: 'Read Guide',
    link: '#'
  },
  {
    id: 'r4',
    title: 'EduSphere UI/UX Design System for AI Products',
    category: 'Design Templates',
    type: 'Figma Kit',
    size: '28 MB',
    downloads: '22.1k',
    desc: 'Figma design kit featuring glassmorphism cards, glowing AI badges, chatbot widgets, and accessible high-contrast dark/light tokens.',
    icon: <Figma size={24} color="#6366f1" />,
    iconBg: '#e0e7ff',
    actionText: 'Duplicate Figma Kit',
    link: '#'
  },
  {
    id: 'r5',
    title: 'Attention Is All You Need (Annotated & Explained)',
    category: 'Research Papers',
    type: 'Paper',
    size: 'PDF',
    downloads: '31.5k',
    desc: 'The foundational Vaswani et al. Transformer paper annotated line-by-line with code implementations in PyTorch and Jax.',
    icon: <BookOpen size={24} color="#0891b2" />,
    iconBg: '#cff4fc',
    actionText: 'Read Paper',
    link: '#'
  },
  {
    id: 'r6',
    title: 'Full-Stack RAG & Vector Database Cookbook',
    category: 'Developer Docs',
    type: 'GitHub Repo',
    size: 'Code Sample',
    downloads: '16.9k',
    desc: 'Production-ready boilerplate for building Retrieval-Augmented Generation apps with LangChain, Pinecone, and Gemini API.',
    icon: <Github size={24} color="#1f108e" />,
    iconBg: '#e5eeff',
    actionText: 'View on GitHub',
    link: '#'
  }
];

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES_LIST.filter((res) => {
    const matchesCat = activeCategory === 'All' || res.category === activeCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', padding: '60px 0 96px' }}>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(132, 85, 239, 0.1)', border: '1px solid rgba(132, 85, 239, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <Sparkles size={16} color="#8455ef" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8455ef', letterSpacing: '1px', textTransform: 'uppercase' }}>
              EduSphere Knowledge Hub
            </span>
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-title)', letterSpacing: '-1px', marginBottom: '16px', lineHeight: '1.2' }}>
            Free Learning Resources & AI Toolkits
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '32px' }}>
            Explore free AI cheat sheets, Jupyter notebooks, developer cookbooks, study guides, and research papers curated by world-class educators.
          </p>

          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '10px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={20} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search resources, cheat sheets, or notebooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-title)', paddingLeft: '14px', fontSize: '0.95rem' }}
            />
          </div>
        </div>

        {/* FEATURED SPOTLIGHT RESOURCE CARD */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderRadius: '24px',
            marginBottom: '48px',
            background: 'linear-gradient(135deg, rgba(31, 16, 142, 0.05) 0%, rgba(132, 85, 239, 0.08) 100%)',
            border: '1px solid rgba(132, 85, 239, 0.3)',
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '36px',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>FEATURED HANDBOOK 2026</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '12px' }}>
              Generative AI & LLM Architecture Handbook
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              A 60-page comprehensive guide covering Transformer internals, Retrieval-Augmented Generation (RAG) architecture, Vector Database optimization, and prompt engineering best practices.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => alert('Downloading Generative AI & LLM Handbook PDF (14.8 MB)...')}
                className="btn-ai"
                style={{ padding: '12px 24px' }}
              >
                <Download size={18} /> Download Free PDF (14.8 MB)
              </button>
              <button
                onClick={() => alert('Opening Interactive Handbook Viewer...')}
                className="btn-secondary"
              >
                Read Online <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-glass)', textAlign: 'center' }}>
            <FileSpreadsheet size={48} color="#8455ef" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '4px' }}>100% Free Access</h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>42,500+ Downloads this month</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '36px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-glass)',
                background: activeCategory === cat ? '#6b38d4' : 'var(--bg-card)',
                color: activeCategory === cat ? '#ffffff' : 'var(--text-title)',
                fontWeight: activeCategory === cat ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whitespace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RESOURCE CARDS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '64px' }}>
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="glass-card glass-card-hover"
              style={{ padding: '28px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: res.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {res.icon}
                  </div>
                  <span className="badge badge-primary">{res.type}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '10px', lineHeight: '1.35' }}>
                  {res.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.55', marginBottom: '20px' }}>
                  {res.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                  <span>Size: <strong>{res.size}</strong></span>
                  <span><strong>{res.downloads}</strong> Downloads</span>
                </div>

                <button
                  onClick={() => alert(`Accessing resource: ${res.title}`)}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '12px' }}
                >
                  {res.actionText} <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COMMUNITY & STUDY ASSISTANT CTA BOX */}
        <div
          className="glass-card"
          style={{
            padding: '40px',
            borderRadius: '24px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1f108e 0%, #6b38d4 100%)',
            color: '#ffffff'
          }}
        >
          <Sparkles size={36} color="#e9ddff" style={{ marginBottom: '12px' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            Need Personalized AI Study Assistance?
          </h2>
          <p style={{ fontSize: '1rem', color: '#e2dfff', maxWidth: '640px', margin: '0 auto 28px', lineHeight: '1.6' }}>
            Ask our 24/7 AI Tutor to summarize complex research papers or generate custom practice exercises for any topic.
          </p>

          <Link
            to="/dashboard/student"
            style={{
              background: '#ffffff',
              color: '#1f108e',
              padding: '12px 32px',
              borderRadius: '20px',
              fontWeight: 800,
              fontSize: '0.95rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}
          >
            Launch AI Tutor Assistant <ArrowRight size={18} />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ResourcesPage;
