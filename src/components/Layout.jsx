import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Mail, MessageSquare, Send, Play, Linkedin, Briefcase, Settings, Compass } from 'lucide-react';
import { checkApiKey } from '../services/gemini';
import MobileNav from './MobileNav';

const Layout = ({ children }) => {
    const hasApiKey = checkApiKey();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar - Desktop only */}
            <aside className="sidebar" style={{
                width: '260px',
                backgroundColor: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-color)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 10
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--accent-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <LayoutDashboard size={24} />
                    </div>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CareerFlow AI</h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
                    <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <NavItem to="/resume" icon={<FileText size={18} />} label="Resume Builder" />
                    <NavItem to="/cover-letter" icon={<Mail size={18} />} label="Cover Letter" />
                    <NavItem to="/outreach" icon={<Send size={18} />} label="Cold Outreach" />
                    <NavItem to="/interview" icon={<Play size={18} />} label="Interview Prep" />
                    <NavItem to="/tracker" icon={<Briefcase size={18} />} label="Job Tracker" />
                    <NavItem to="/linkedin" icon={<Linkedin size={18} />} label="LinkedIn Optimizer" />
                    <NavItem to="/roadmap" icon={<Compass size={18} />} label="Career Roadmap" />
                    <NavItem to="/chat" icon={<MessageSquare size={18} />} label="Career Chat" />
                    <NavItem to="/settings" icon={<Settings size={18} />} label="Profile Editor" />
                </nav>

                {!hasApiKey && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'rgba(248, 113, 113, 0.1)',
                        border: '1px solid var(--error)',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: 'var(--error)'
                    }}>
                        <strong>Missing API Key</strong>
                        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>
                            Please add VITE_GEMINI_API_KEY to your .env file.
                        </p>
                    </div>
                )}
            </aside>

            {/* Mobile Navigation - Mobile only */}
            <MobileNav />

            {/* Main Content */}
            <main className="main-content" style={{
                flex: 1,
                marginLeft: '260px',
                padding: '2rem',
                maxWidth: '100%'
            }}>
                <div className="container animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            color: isActive ? 'white' : 'var(--text-secondary)',
            backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
            fontWeight: isActive ? '600' : '500',
            transition: 'all 0.2s'
        })}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export default Layout;
