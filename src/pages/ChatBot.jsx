import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { chatWithExperience } from '../services/gemini';
import { useProfile } from '../services/profile';
import { Send, User, Bot, RefreshCw } from 'lucide-react';

const ChatBot = () => {
    const { profile } = useProfile();
    const [messages, setMessages] = useState([
        { role: 'model', text: `Hi ${profile.personalInfo.name.split(' ')[0]}! I'm your career assistant. I know everything about your experience. Ask me anything!` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Convert messages to history format for Gemini
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const responseText = await chatWithExperience(history, input, profile);
            const botMessage = { role: 'model', text: responseText };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error chatting:", error);
            toast.error("Failed to send message. Check your API key.");
            const errorMessage = { role: 'model', text: "Sorry, I encountered an error. Please check your API key." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <header className="page-header">
                <h1 className="page-title">Career Chat</h1>
                <p className="page-subtitle">Brainstorm ideas, practice interviews, or query your experience.</p>
            </header>

            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            gap: '1rem',
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%'
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

                            <div style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                color: msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)',
                                fontWeight: msg.role === 'user' ? '600' : '400',
                                borderTopLeftRadius: msg.role === 'model' ? '2px' : '12px',
                                borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                                lineHeight: '1.5',
                                // ReactMarkdown handles newlines, but we need to ensure container allows it
                                overflowWrap: 'break-word'
                            }}>
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

                <form onSubmit={handleSend} style={{
                    padding: '1rem',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '1rem',
                    background: 'var(--bg-secondary)'
                }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        style={{ borderRadius: '100px', paddingLeft: '1.5rem' }}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !input.trim()}
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

export default ChatBot;
