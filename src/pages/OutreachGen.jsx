import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { generateColdDM } from '../services/gemini';
import { useProfile } from '../services/profile';
import { Copy, RefreshCw, Check, Send } from 'lucide-react';

const OutreachGen = () => {
    const { profile } = useProfile();
    const [recipientInfo, setRecipientInfo] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [tone, setTone] = useState('confident');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!recipientInfo.trim()) return;
        setLoading(true);
        try {
            const result = await generateColdDM(recipientInfo, jobDescription, profile, tone);
            setGeneratedMessage(result);
            toast.success("Message generated!");
        } catch (error) {
            console.error("Error generating message:", error);
            toast.error("Failed to generate message. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedMessage);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 4rem)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <header className="page-header">
                    <h1 className="page-title">Cold Outreach</h1>
                    <p className="page-subtitle">Craft the perfect cold DM for LinkedIn or Email.</p>
                </header>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label className="label">Recipient Info / Context</label>
                        <textarea
                            className="textarea"
                            style={{ minHeight: '80px' }}
                            placeholder="e.g., Jane Doe, Recruiter at Google. Looking for SWE interns. We both went to Purdue."
                            value={recipientInfo}
                            onChange={(e) => setRecipientInfo(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label className="label">Job Description (Optional)</label>
                        <textarea
                            className="textarea"
                            style={{ minHeight: '120px' }}
                            placeholder="Paste the job description if applicable..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Outreach Tone</label>
                        <select
                            className="select"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                        >
                            <option value="confident">Confident & Impactful (Professional)</option>
                            <option value="quirky">Warm & Charismatic (Stand out)</option>
                            <option value="technical">Technical & Precise (Engineering)</option>
                            <option value="passionate">Enthusiastic & Culture-driven (Mission-centric)</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={loading || !recipientInfo.trim()}
                        style={{ marginTop: '0.5rem' }}
                    >
                        {loading ? <RefreshCw className="spin" size={20} /> : <Send size={20} />}
                        {loading ? 'Drafting...' : 'Generate Message'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Generated Message</h2>
                    {generatedMessage && (
                        <button className="btn btn-secondary" onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy Text'}
                        </button>
                    )}
                </div>

                <div className="card" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {generatedMessage ? generatedMessage : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Your message will appear here...
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

export default OutreachGen;
