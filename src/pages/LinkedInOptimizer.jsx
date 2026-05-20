import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { optimizeLinkedInProfile } from '../services/gemini';
import { useProfile } from '../services/profile';
import { Copy, RefreshCw, Check, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const LinkedInOptimizer = () => {
    const { profile } = useProfile();
    const [targetRole, setTargetRole] = useState('');
    const [optimizedContent, setOptimizedContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleOptimize = async () => {
        if (!targetRole.trim()) return;
        setLoading(true);
        try {
            const result = await optimizeLinkedInProfile(targetRole, profile);
            setOptimizedContent(result);
            toast.success("Profile optimized!");
        } catch (error) {
            console.error("Error optimizing profile:", error);
            toast.error("Failed to optimize profile. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(optimizedContent);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 4rem)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <header className="page-header">
                    <h1 className="page-title">LinkedIn Optimizer</h1>
                    <p className="page-subtitle">Revamp your profile to attract recruiters for your target role.</p>
                </header>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label className="label">Target Role / Goal</label>
                    <textarea
                        className="textarea"
                        style={{ flex: 1, marginBottom: '1rem' }}
                        placeholder="e.g., Senior Frontend Engineer at a Tech Startup, or Data Scientist in Fintech..."
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleOptimize}
                        disabled={loading || !targetRole.trim()}
                    >
                        {loading ? <RefreshCw className="spin" size={20} /> : <Linkedin size={20} />}
                        {loading ? 'Optimizing...' : 'Optimize Profile'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Optimized Content</h2>
                    {optimizedContent && (
                        <button className="btn btn-secondary" onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy Text'}
                        </button>
                    )}
                </div>

                <div className="card" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', lineHeight: '1.6' }}>
                    {optimizedContent ? (
                        <div className="markdown-content">
                            <ReactMarkdown>{optimizedContent}</ReactMarkdown>
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Your optimized profile will appear here...
                        </div>
                    )}
                </div>
            </div>
            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .markdown-content p { margin-bottom: 0.75rem; line-height: 1.6; }
        .markdown-content h1, .markdown-content h2, .markdown-content h3 { color: var(--accent-primary); margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: 700; }
        .markdown-content h1 { font-size: 1.4rem; }
        .markdown-content h2 { font-size: 1.2rem; }
        .markdown-content h3 { font-size: 1.05rem; }
        .markdown-content ul, .markdown-content ol { margin-left: 1.5rem; margin-bottom: 0.75rem; }
        .markdown-content li { margin-bottom: 0.35rem; }
        .markdown-content strong { color: var(--accent-secondary); font-weight: 700; }
      `}</style>
        </div>
    );
};

export default LinkedInOptimizer;
