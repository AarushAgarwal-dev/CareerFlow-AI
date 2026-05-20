import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { generateCoverLetter } from '../services/gemini';
import { useProfile } from '../services/profile';
import { Copy, RefreshCw, Check, PenTool } from 'lucide-react';

const CoverLetterGen = () => {
    const { profile } = useProfile();
    const [jobDescription, setJobDescription] = useState('');
    const [tone, setTone] = useState('confident');
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!jobDescription.trim()) return;
        setLoading(true);
        try {
            const result = await generateCoverLetter(jobDescription, profile, tone);
            setGeneratedLetter(result);
            toast.success("Cover letter generated!");
        } catch (error) {
            console.error("Error generating cover letter:", error);
            toast.error("Failed to generate cover letter. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLetter);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 4rem)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <header className="page-header">
                    <h1 className="page-title">Cover Letter Generator</h1>
                    <p className="page-subtitle">Create a persuasive cover letter tailored to the role.</p>
                </header>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Job Description</label>
                        <textarea
                            className="textarea"
                            style={{ flex: 1, minHeight: '200px' }}
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Writing Tone</label>
                        <select
                            className="select"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                        >
                            <option value="confident">Confident & Professional (Recommended)</option>
                            <option value="quirky">Quirky & Charismatic (Stand Out)</option>
                            <option value="technical">Highly Technical & Structured (Engineering)</option>
                            <option value="passionate">Passionate & Mission-Driven (Culture-focused)</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={loading || !jobDescription.trim()}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {loading ? <RefreshCw className="spin" size={20} /> : <PenTool size={20} />}
                        {loading ? 'Writing...' : 'Generate Cover Letter'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Generated Letter</h2>
                    {generatedLetter && (
                        <button className="btn btn-secondary" onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy Text'}
                        </button>
                    )}
                </div>

                <div className="card" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {generatedLetter ? generatedLetter : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Your cover letter will appear here...
                        </div>
                    )}
                </div>
            </div>
            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default CoverLetterGen;
