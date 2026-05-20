import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { generateCareerRoadmap } from '../services/gemini';
import { useProfile } from '../services/profile';
import { Compass, Copy, Download, RefreshCw, Check, MapPin } from 'lucide-react';

const SUGGESTIONS = [
  "Senior Machine Learning Engineer",
  "Fintech Quant Developer",
  "Staff Frontend Architect",
  "Principal Solutions Architect",
  "Developer Relations Engineer"
];

const CareerRoadmap = () => {
  const { profile } = useProfile();
  const [dreamRole, setDreamRole] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!dreamRole.trim()) return;
    setLoading(true);
    try {
      const result = await generateCareerRoadmap(dreamRole, profile);
      setRoadmap(result);
      toast.success("AI Career Roadmap generated!");
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast.error("Failed to generate career roadmap. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!roadmap) return;
    navigator.clipboard.writeText(roadmap);
    setCopied(true);
    toast.success("Copied roadmap to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    if (!roadmap) return;
    const element = document.createElement("a");
    const file = new Blob([roadmap], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `career_roadmap_${dreamRole.toLowerCase().replace(/\s+/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    toast.success("Downloaded roadmap.md!");
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 4.5rem)' }}>
      {/* Left Pane - Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <header className="page-header">
          <h1 className="page-title">Career Roadmap Builder</h1>
          <p className="page-subtitle">Map out a custom learning and project roadmap to secure your dream role.</p>
        </header>

        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="label">Target Dream Role</label>
            <input
              type="text"
              className="input"
              value={dreamRole}
              onChange={(e) => setDreamRole(e.target.value)}
              placeholder="e.g. Staff Full-Stack Engineer at Stripe, or Quantitative Trader..."
              disabled={loading}
              style={{ marginBottom: '0.5rem' }}
            />
            
            {/* Suggestion Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => setDreamRole(sug)}
                  disabled={loading}
                  style={{
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '100px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.75rem',
                    color: 'var(--accent-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                    e.currentTarget.style.border = '1px solid var(--accent-primary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)';
                    e.currentTarget.style.border = '1px solid rgba(6, 182, 212, 0.2)';
                  }}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px dashed var(--border-color)', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
            <Compass size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Map Your Career Gap</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', lineHeight: '1.5', margin: 0 }}>
              Our career strategist evaluates your current technical credentials and shapes a highly customized month-by-month blueprint.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={loading || !dreamRole.trim()}
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {loading ? <RefreshCw className="spin" size={20} /> : <Compass size={20} />}
            {loading ? 'Mapping out career path...' : 'Generate AI Career Roadmap'}
          </button>
        </div>
      </div>

      {/* Right Pane - Blueprint Roadmap Output */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Your Career Blueprint</h2>
          {roadmap && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn btn-secondary" onClick={downloadMarkdown} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                <Download size={16} /> Download
              </button>
            </div>
          )}
        </div>

        <div className="card" style={{ flex: 1, padding: '1.75rem', overflowY: 'auto', lineHeight: '1.65' }}>
          {roadmap ? (
            <div className="roadmap-markdown">
              <ReactMarkdown>{roadmap}</ReactMarkdown>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <MapPin size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontStyle: 'italic', margin: 0 }}>Input a dream role on the left and start mapping your future...</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Markdown rendering styles */
        .roadmap-markdown p { margin-bottom: 0.85rem; line-height: 1.65; color: var(--text-secondary); }
        .roadmap-markdown h1, .roadmap-markdown h2, .roadmap-markdown h3, .roadmap-markdown h4 {
          color: var(--accent-primary);
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }
        .roadmap-markdown h1 { font-size: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; }
        .roadmap-markdown h2 { font-size: 1.3rem; }
        .roadmap-markdown h3 { font-size: 1.15rem; color: var(--accent-secondary); }
        .roadmap-markdown h4 { font-size: 1rem; }
        .roadmap-markdown ul, .roadmap-markdown ol { margin-left: 1.75rem; margin-bottom: 0.85rem; }
        .roadmap-markdown li { margin-bottom: 0.45rem; color: var(--text-secondary); }
        .roadmap-markdown strong { color: var(--text-primary); font-weight: 700; }
        
        /* Gap Analysis Table styles */
        .roadmap-markdown table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.9rem;
        }
        .roadmap-markdown th, .roadmap-markdown td {
          border: 1px solid var(--border-color);
          padding: 0.6rem 0.85rem;
          text-align: left;
        }
        .roadmap-markdown th {
          background-color: var(--bg-secondary);
          color: var(--accent-primary);
          font-weight: 600;
        }
        .roadmap-markdown tr:nth-of-type(even) td {
          background-color: rgba(255,255,255,0.02);
        }
      `}</style>
    </div>
  );
};

export default CareerRoadmap;
