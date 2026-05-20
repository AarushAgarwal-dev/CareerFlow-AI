import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { generateInterviewQuestions, evaluateInterviewAnswer } from '../services/gemini';
import { useProfile } from '../services/profile';
import { Play, Send, User, Bot, RefreshCw, CheckCircle } from 'lucide-react';

const InterviewPrep = () => {
    const { profile } = useProfile();
    const [jobDescription, setJobDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [chatHistory, setChatHistory] = useState([]); // { role, text, feedback? }
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const startInterview = async () => {
        if (!jobDescription.trim()) return;
        setLoading(true);
        try {
            const generatedQuestions = await generateInterviewQuestions(jobDescription, profile);
            setQuestions(generatedQuestions);
            setInterviewStarted(true);
            setChatHistory([
                { role: 'model', text: `Hello! I'm your interviewer today. Let's get started. \n\n${generatedQuestions[0]}` }
            ]);
            toast.success("Interview started!");
        } catch (error) {
            console.error("Error starting interview:", error);
            toast.error("Failed to start interview. Check your API key.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!userAnswer.trim()) return;

        const currentQuestion = questions[currentQuestionIndex];
        const answer = userAnswer;

        // Add user answer to chat
        setChatHistory(prev => [...prev, { role: 'user', text: answer }]);
        setUserAnswer('');
        setLoading(true);

        try {
            // Get feedback
            const feedback = await evaluateInterviewAnswer(currentQuestion, answer, profile);

            // Add feedback to chat
            setChatHistory(prev => [...prev, { role: 'feedback', text: feedback }]);

            // Move to next question or finish
            if (currentQuestionIndex < questions.length - 1) {
                const nextIndex = currentQuestionIndex + 1;
                setCurrentQuestionIndex(nextIndex);
                setTimeout(() => {
                    setChatHistory(prev => [...prev, { role: 'model', text: `Next Question: ${questions[nextIndex]}` }]);
                }, 1000);
            } else {
                setTimeout(() => {
                    setChatHistory(prev => [...prev, { role: 'model', text: "That concludes the interview! Great job practicing." }]);
                }, 1000);
            }

        } catch (error) {
            console.error("Error evaluating answer:", error);
            toast.error("Failed to evaluate answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!interviewStarted) {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <header className="page-header">
                    <h1 className="page-title">Interview Simulator</h1>
                    <p className="page-subtitle">Practice with AI-generated questions tailored to the job.</p>
                </header>

                <div className="card">
                    <label className="label">Paste Job Description</label>
                    <textarea
                        className="textarea"
                        style={{ minHeight: '200px', marginBottom: '1.5rem' }}
                        placeholder="Paste the job description here to generate relevant questions..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={startInterview}
                        disabled={loading || !jobDescription.trim()}
                        style={{ width: '100%' }}
                    >
                        {loading ? <RefreshCw className="spin" size={20} /> : <Play size={20} />}
                        {loading ? 'Generating Questions...' : 'Start Mock Interview'}
                    </button>
                </div>
                <style>{`
          .spin { animation: spin 1s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
            </div>
        );
    }

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <header className="page-header" style={{ marginBottom: '1rem' }}>
                <h1 className="page-title">Mock Interview</h1>
                <p className="page-subtitle">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </header>

            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {chatHistory.map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            gap: '1rem',
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: msg.role === 'feedback' ? '90%' : '80%'
                        }}>
                            {msg.role === 'model' && (
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Bot size={18} color="white" />
                                </div>
                            )}
                            {msg.role === 'feedback' && (
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <CheckCircle size={18} color="white" />
                                </div>
                            )}

                            <div style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: msg.role === 'user' ? 'var(--accent-primary)' : (msg.role === 'feedback' ? 'rgba(74, 222, 128, 0.1)' : 'var(--bg-tertiary)'),
                                color: msg.role === 'user' ? 'var(--bg-primary)' : (msg.role === 'feedback' ? 'var(--text-primary)' : 'var(--text-primary)'),
                                border: msg.role === 'feedback' ? '1px solid var(--success)' : 'none',
                                fontWeight: msg.role === 'user' ? '600' : '400',
                                borderTopLeftRadius: (msg.role === 'model' || msg.role === 'feedback') ? '2px' : '12px',
                                borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                                lineHeight: '1.5',
                                overflowWrap: 'break-word'
                            }}>
                                {msg.role === 'feedback' && <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--success)' }}>Feedback:</strong>}
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>

                            {msg.role === 'user' && (
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <User size={18} color="var(--bg-primary)" />
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', gap: '1rem', maxWidth: '80%' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Bot size={18} color="white" />
                            </div>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'var(--bg-tertiary)',
                                borderTopLeftRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span className="dot" style={{ animationDelay: '0s' }}></span>
                                <span className="dot" style={{ animationDelay: '0.2s' }}></span>
                                <span className="dot" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleAnswerSubmit} style={{
                    padding: '1rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '1rem',
                    background: 'var(--bg-secondary)'
                }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Type your answer..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={loading || currentQuestionIndex >= questions.length}
                        style={{ borderRadius: '100px', paddingLeft: '1.5rem' }}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !userAnswer.trim()}
                        style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}
                    >
                        {loading ? <RefreshCw className="spin" size={20} /> : <Send size={20} />}
                    </button>
                </form>
            </div>
            <style>{`
        .dot {
          width: 8px; height: 8px; background: var(--text-secondary); border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        /* Markdown Styles */
        .card p { margin-bottom: 0.5rem; }
        .card ul, .card ol { margin-left: 1.5rem; margin-bottom: 0.5rem; }
        .card li { margin-bottom: 0.25rem; }
        .card strong { font-weight: 700; color: var(--accent-secondary); }
      `}</style>
        </div>
    );
};

export default InterviewPrep;
