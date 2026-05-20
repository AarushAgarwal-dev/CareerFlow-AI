import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, MessageSquare, Send, ArrowRight, Play, Linkedin, Briefcase } from 'lucide-react';
import { useProfile } from '../services/profile';

const Dashboard = () => {
    const { profile } = useProfile();

    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Welcome back, {profile.personalInfo.name.split(' ')[0]}</h1>
                <p className="page-subtitle">Ready to accelerate your career? Select a tool to get started.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <ToolCard
                    to="/resume"
                    icon={<FileText size={32} color="var(--accent-primary)" />}
                    title="Resume Builder"
                    description="Tailor your LaTeX resume for specific job descriptions instantly."
                />
                <ToolCard
                    to="/cover-letter"
                    icon={<Mail size={32} color="#f472b6" />}
                    title="Cover Letter Generator"
                    description="Write compelling, personalized cover letters in seconds."
                />
                <ToolCard
                    to="/outreach"
                    icon={<Send size={32} color="#4ade80" />}
                    title="Cold Outreach"
                    description="Generate effective cold DMs for LinkedIn or Email."
                />
                <ToolCard
                    to="/interview"
                    icon={<Play size={32} color="#a78bfa" />}
                    title="Interview Prep"
                    description="Practice mock interviews with AI feedback."
                />
                <ToolCard
                    to="/tracker"
                    icon={<Briefcase size={32} color="#f97316" />}
                    title="Job Tracker"
                    description="Manage your applications and interview pipeline."
                />
                <ToolCard
                    to="/linkedin"
                    icon={<Linkedin size={32} color="#0ea5e9" />}
                    title="LinkedIn Optimizer"
                    description="Revamp your profile to attract recruiters."
                />
                <ToolCard
                    to="/chat"
                    icon={<MessageSquare size={32} color="#fbbf24" />}
                    title="Career Chat"
                    description="Chat with your AI assistant about your experience and goals."
                />
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Profile Summary</h2>
                <div className="card">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <div>
                            <h3 className="label">Education</h3>
                            <p style={{ fontWeight: '600' }}>{profile.education?.university || 'Not specified'}</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{profile.education?.degree || 'Not specified'}</p>
                        </div>
                        <div>
                            <h3 className="label">Latest Role</h3>
                            <p style={{ fontWeight: '600' }}>{profile.experience && profile.experience[0] ? profile.experience[0].role : 'Not specified'}</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{profile.experience && profile.experience[0] ? profile.experience[0].company : 'Not specified'}</p>
                        </div>
                        <div>
                            <h3 className="label">Key Skills</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {(profile.skills?.aiGenAi ? profile.skills.aiGenAi.split(',').slice(0, 3) : []).map((skill, i) => (
                                    <span key={i} style={{
                                        background: 'rgba(6, 182, 212, 0.1)',
                                        color: 'var(--accent-primary)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '100px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}>
                                        {skill.trim()}
                                    </span>
                                ))}
                                {(!profile.skills?.aiGenAi || profile.skills.aiGenAi.trim() === '') && (
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                        No skills added
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToolCard = ({ to, icon, title, description }) => (
    <Link to={to} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem 0', flex: 1, lineHeight: '1.5' }}>{description}</p>
        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
            Launch Tool <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
        </div>
    </Link>
);

export default Dashboard;
