import React, { useState, useEffect } from 'react';
import { Plus, MoreHorizontal, Trash2, ExternalLink, Briefcase, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';

const COLUMNS = [
    { id: 'to_apply', title: 'To Apply', icon: <Briefcase size={18} />, color: 'var(--text-secondary)' },
    { id: 'applied', title: 'Applied', icon: <Clock size={18} />, color: 'var(--accent-primary)' },
    { id: 'interview', title: 'Interview', icon: <Calendar size={18} />, color: '#a78bfa' },
    { id: 'offer', title: 'Offer', icon: <CheckCircle size={18} />, color: 'var(--success)' },
    { id: 'rejected', title: 'Rejected', icon: <XCircle size={18} />, color: 'var(--error)' }
];

const AnalyticsCard = ({ title, value, subtitle, color, progress }) => (
    <div className="card" style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderLeft: `4px solid ${color}`,
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden'
    }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
        </span>
        <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1' }}>
            {value}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            {subtitle}
        </span>
        
        <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '100px',
            marginTop: '0.5rem',
            overflow: 'hidden'
        }}>
            <div style={{
                width: `${progress}%`,
                height: '100%',
                background: color,
                borderRadius: '100px',
                transition: 'width 0.5s ease-in-out',
                boxShadow: `0 0 8px ${color}`
            }}></div>
        </div>
    </div>
);

const JobTracker = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newJob, setNewJob] = useState({ company: '', role: '', link: '', status: 'to_apply' });

    useEffect(() => {
        const savedJobs = localStorage.getItem('career_companion_jobs');
        if (savedJobs) {
            setJobs(JSON.parse(savedJobs));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('career_companion_jobs', JSON.stringify(jobs));
    }, [jobs]);

    const addJob = (e) => {
        e.preventDefault();
        if (!newJob.company || !newJob.role) return;
        setJobs([...jobs, { ...newJob, id: Date.now() }]);
        setNewJob({ company: '', role: '', link: '', status: 'to_apply' });
        setIsModalOpen(false);
    };

    const deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    const moveJob = (id, newStatus) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
    };

    // Calculate Analytics Metrics
    const totalApplied = jobs.filter(j => j.status !== 'to_apply').length;
    const activePipeline = jobs.filter(j => j.status === 'applied' || j.status === 'interview').length;
    const interviewRate = totalApplied > 0 
        ? Math.round((jobs.filter(j => j.status === 'interview' || j.status === 'offer').length / totalApplied) * 100) 
        : 0;
    const offerRate = totalApplied > 0 
        ? Math.round((jobs.filter(j => j.status === 'offer').length / totalApplied) * 100) 
        : 0;

    return (
        <div>
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="page-title">Job Tracker</h1>
                    <p className="page-subtitle">Manage your job applications and interview pipeline.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> Add Job
                </button>
            </header>

            {/* Pipeline Analytics Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem'
            }}>
                <AnalyticsCard
                    title="Total Applications"
                    value={totalApplied}
                    subtitle="Jobs outside wishlist"
                    color="var(--accent-primary)"
                    progress={totalApplied > 0 ? 100 : 0}
                />
                <AnalyticsCard
                    title="Active Pipeline"
                    value={activePipeline}
                    subtitle="Applied & Interviews"
                    color="#a78bfa"
                    progress={totalApplied > 0 ? Math.round((activePipeline / totalApplied) * 100) : 0}
                />
                <AnalyticsCard
                    title="Interview Rate"
                    value={`${interviewRate}%`}
                    subtitle="Conversion to interview"
                    color="#f472b6"
                    progress={interviewRate}
                />
                <AnalyticsCard
                    title="Offers Received"
                    value={jobs.filter(j => j.status === 'offer').length}
                    subtitle={`Offer Rate: ${offerRate}%`}
                    color="var(--success)"
                    progress={offerRate}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '1rem'
            }}>
                {COLUMNS.map(col => (
                    <div key={col.id} style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        padding: '1rem',
                        minHeight: '500px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            color: col.color,
                            fontWeight: '600'
                        }}>
                            {col.icon}
                            <span>{col.title}</span>
                            <span style={{
                                marginLeft: 'auto',
                                background: 'var(--bg-tertiary)',
                                padding: '0.1rem 0.5rem',
                                borderRadius: '100px',
                                fontSize: '0.75rem',
                                color: 'var(--text-primary)'
                            }}>
                                {jobs.filter(j => j.status === col.id).length}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {jobs.filter(job => job.status === col.id).map(job => (
                                <div key={job.id} className="card" style={{ padding: '1rem', cursor: 'grab' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0, fontWeight: '600' }}>{job.role}</h4>
                                        <button onClick={() => deleteJob(job.id)} style={{ background: 'transparent', color: 'var(--text-secondary)', padding: 0 }}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{job.company}</p>

                                    {job.link && (
                                        <a href={job.link} target="_blank" rel="noopener noreferrer" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            fontSize: '0.8rem',
                                            color: 'var(--accent-primary)',
                                            marginBottom: '0.75rem'
                                        }}>
                                            View Posting <ExternalLink size={12} />
                                        </a>
                                    )}

                                    <select
                                        value={job.status}
                                        onChange={(e) => moveJob(job.id, e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.25rem',
                                            borderRadius: '4px',
                                            background: 'var(--bg-primary)',
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        {COLUMNS.map(c => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100
                }}>
                    <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
                        <h2 style={{ marginTop: 0 }}>Add New Job</h2>
                        <form onSubmit={addJob}>
                            <div className="input-group">
                                <label className="label">Company</label>
                                <input
                                    className="input"
                                    value={newJob.company}
                                    onChange={e => setNewJob({ ...newJob, company: e.target.value })}
                                    placeholder="e.g. Google"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label">Role</label>
                                <input
                                    className="input"
                                    value={newJob.role}
                                    onChange={e => setNewJob({ ...newJob, role: e.target.value })}
                                    placeholder="e.g. Frontend Engineer"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="label">Job Link (Optional)</label>
                                <input
                                    className="input"
                                    value={newJob.link}
                                    onChange={e => setNewJob({ ...newJob, link: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    Add Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobTracker;
