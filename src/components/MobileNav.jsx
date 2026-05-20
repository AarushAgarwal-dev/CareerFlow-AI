import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Mail, MessageSquare, Send, Play, Linkedin, Briefcase, Settings, Compass } from 'lucide-react';

const MobileNav = () => {
    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            zIndex: 50,
            boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.3)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none', // Hide scrollbar for clean look
            msOverflowStyle: 'none'
        }} className="mobile-nav">
            <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Home" />
            <NavItem to="/resume" icon={<FileText size={18} />} label="Resume" />
            <NavItem to="/cover-letter" icon={<Mail size={18} />} label="Cover" />
            <NavItem to="/outreach" icon={<Send size={18} />} label="Outreach" />
            <NavItem to="/tracker" icon={<Briefcase size={18} />} label="Tracker" />
            <NavItem to="/interview" icon={<Play size={18} />} label="Prep" />
            <NavItem to="/linkedin" icon={<Linkedin size={18} />} label="LinkedIn" />
            <NavItem to="/roadmap" icon={<Compass size={18} />} label="Roadmap" />
            <NavItem to="/chat" icon={<MessageSquare size={18} />} label="Chat" />
            <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
        </nav>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem',
            borderRadius: '8px',
            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.7rem',
            fontWeight: isActive ? '600' : '500',
            transition: 'all 0.2s',
            minWidth: '48px' // Ensure touch target size
        })}
    >
        {icon}
        <span style={{ display: 'none' }}>{label}</span> {/* Hide label on very small screens if needed, or keep it */}
    </NavLink>
);

export default MobileNav;
