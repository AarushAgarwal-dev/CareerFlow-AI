import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { generateResumeLatex, reviseResumeLatex } from '../services/gemini';
import { useProfile } from '../services/profile';
import resumeTemplate from '../data/resumeTemplate.tex?raw';
import { Copy, Download, RefreshCw, Check, Edit3 } from 'lucide-react';

const ResumeBuilder = () => {
    const { profile } = useProfile();
    const [jobDescription, setJobDescription] = useState('');
    const [generatedLatex, setGeneratedLatex] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Revision state
    const [revisionMode, setRevisionMode] = useState(false);
    const [revisionInstructions, setRevisionInstructions] = useState('');

    useEffect(() => {
        if (!generatedLatex) {
            setGeneratedLatex(resumeTemplate);
        }
    }, []);

    const handleGenerate = async () => {
        if (!jobDescription.trim()) return;
        setLoading(true);
        setRevisionMode(false); // Reset revision mode on new generation
        try {
            const result = await generateResumeLatex(jobDescription, profile, resumeTemplate);
            setGeneratedLatex(result);
            toast.success("Resume generated successfully!");
        } catch (error) {
            console.error("Error generating resume:", error);
            toast.error("Failed to generate resume. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const handleRevise = async () => {
        if (!revisionInstructions.trim()) return;
        setLoading(true);
        try {
            const result = await reviseResumeLatex(generatedLatex, revisionInstructions, profile);
            setGeneratedLatex(result);
            setRevisionInstructions(''); // Clear instructions after success
            setRevisionMode(false); // Exit revision mode
            toast.success("Resume revised successfully!");
        } catch (error) {
            console.error("Error revising resume:", error);
            toast.error("Failed to revise resume. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLatex);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadLatex = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedLatex], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "resume.tex";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 4rem)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <header className="page-header">
                    <h1 className="page-title">Resume Builder</h1>
                    <p className="page-subtitle">Tailor or revise your LaTeX resume.</p>
                </header>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Toggle between Generate and Revise */}
                    <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                        <button
                            className={`btn ${!revisionMode ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setRevisionMode(false)}
                            style={{ flex: 1 }}
                        >
                            New Generation
                        </button>
                        <button
                            className={`btn ${revisionMode ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setRevisionMode(true)}
                            style={{ flex: 1 }}
                        >
                            Revise Current
                        </button>
                    </div>

                    {!revisionMode ? (
                        <>
                            <label className="label">Job Description</label>
                            <textarea
                                className="textarea"
                                style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}
                                placeholder="Paste the job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleGenerate}
                                disabled={loading || !jobDescription.trim()}
                            >
                                {loading ? <RefreshCw className="spin" size={20} /> : <RefreshCw size={20} />}
                                {loading ? 'Generating...' : 'Tailor Resume'}
                            </button>
                        </>
                    ) : (
                        <>
                            <label className="label">Revision Instructions</label>
                            <textarea
                                className="textarea"
                                style={{ flex: 1, fontFamily: 'sans-serif', fontSize: '1rem' }}
                                placeholder="e.g., 'Make the summary shorter', 'Add more emphasis on Python skills', 'Fix the date formatting'..."
                                value={revisionInstructions}
                                onChange={(e) => setRevisionInstructions(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleRevise}
                                disabled={loading || !revisionInstructions.trim()}
                            >
                                {loading ? <RefreshCw className="spin" size={20} /> : <Edit3 size={20} />}
                                {loading ? 'Revising...' : 'Apply Revision'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>LaTeX Output</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-secondary" onClick={copyToClipboard} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy Code'}
                        </button>
                        <button className="btn btn-secondary" onClick={downloadLatex} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            <Download size={16} /> Download .tex
                        </button>
                    </div>
                </div>

                <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex' }}>
                    <textarea
                        readOnly
                        value={generatedLatex}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            padding: '1.5rem',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            resize: 'none'
                        }}
                    />
                </div>
            </div>
            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default ResumeBuilder;
