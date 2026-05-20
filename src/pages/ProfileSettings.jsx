import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useProfile } from '../services/profile';
import { 
  User, BookOpen, Cpu, Briefcase, FolderGit, Award, 
  Save, RotateCcw, Download, Upload, Plus, Trash2, ArrowUp, ArrowDown 
} from 'lucide-react';

const ProfileSettings = () => {
  const { profile, updateProfile, resetProfile } = useProfile();
  const [localProfile, setLocalProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [importText, setImportText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // Initialize local state once profile loads
  useEffect(() => {
    if (profile && !localProfile) {
      setLocalProfile(JSON.parse(JSON.stringify(profile)));
    }
  }, [profile]);

  if (!localProfile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading profile data...</p>
      </div>
    );
  }

  // Input handlers
  const handlePersonalInfoChange = (field, value) => {
    setLocalProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleEducationChange = (field, value) => {
    setLocalProfile(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value
      }
    }));
  };

  const handleSkillsChange = (field, value) => {
    setLocalProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value
      }
    }));
  };

  // EXPERIENCE CRUD Operations
  const handleAddExperience = () => {
    const newExp = {
      role: 'New Role',
      company: 'New Company',
      location: 'City, ST',
      duration: 'Date - Present',
      points: ['Achieved X by performing Y measured by Z.']
    };
    setLocalProfile(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
  };

  const handleUpdateExperience = (index, field, value) => {
    setLocalProfile(prev => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const handleDeleteExperience = (index) => {
    setLocalProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== index)
    }));
  };

  const handleExpPointChange = (expIdx, pointIdx, val) => {
    setLocalProfile(prev => {
      const updated = [...prev.experience];
      const points = [...updated[expIdx].points];
      points[pointIdx] = val;
      updated[expIdx] = { ...updated[expIdx], points };
      return { ...prev, experience: updated };
    });
  };

  const handleAddExpPoint = (expIdx) => {
    setLocalProfile(prev => {
      const updated = [...prev.experience];
      const points = [...updated[expIdx].points, 'New bullet point details...'];
      updated[expIdx] = { ...updated[expIdx], points };
      return { ...prev, experience: updated };
    });
  };

  const handleDeleteExpPoint = (expIdx, pointIdx) => {
    setLocalProfile(prev => {
      const updated = [...prev.experience];
      const points = updated[expIdx].points.filter((_, idx) => idx !== pointIdx);
      updated[expIdx] = { ...updated[expIdx], points };
      return { ...prev, experience: updated };
    });
  };

  // PROJECTS CRUD Operations
  const handleAddProject = () => {
    const newProj = {
      name: 'New Project Title',
      tech: 'React, Node.js, Gemini API',
      year: new Date().getFullYear().toString(),
      points: ['Implemented core algorithms to increase throughput by A%.']
    };
    setLocalProfile(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const handleUpdateProject = (index, field, value) => {
    setLocalProfile(prev => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProject = (index) => {
    setLocalProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== index)
    }));
  };

  const handleProjPointChange = (projIdx, pointIdx, val) => {
    setLocalProfile(prev => {
      const updated = [...prev.projects];
      const points = [...updated[projIdx].points];
      points[pointIdx] = val;
      updated[projIdx] = { ...updated[projIdx], points };
      return { ...prev, projects: updated };
    });
  };

  const handleAddProjPoint = (projIdx) => {
    setLocalProfile(prev => {
      const updated = [...prev.projects];
      const points = [...updated[projIdx].points, 'New project milestone detail...'];
      updated[projIdx] = { ...updated[projIdx], points };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProjPoint = (projIdx, pointIdx) => {
    setLocalProfile(prev => {
      const updated = [...prev.projects];
      const points = updated[projIdx].points.filter((_, idx) => idx !== pointIdx);
      updated[projIdx] = { ...updated[projIdx], points };
      return { ...prev, projects: updated };
    });
  };

  // AWARDS & CERTS CRUD
  const handleAddAward = () => {
    setLocalProfile(prev => ({
      ...prev,
      awards: [...(prev.awards || []), 'New Award / Recognition Title']
    }));
  };

  const handleUpdateAward = (index, val) => {
    setLocalProfile(prev => {
      const updated = [...(prev.awards || [])];
      updated[index] = val;
      return { ...prev, awards: updated };
    });
  };

  const handleDeleteAward = (index) => {
    setLocalProfile(prev => ({
      ...prev,
      awards: (prev.awards || []).filter((_, idx) => idx !== index)
    }));
  };

  const handleAddCert = () => {
    setLocalProfile(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), 'New Professional Certification Title']
    }));
  };

  const handleUpdateCert = (index, val) => {
    setLocalProfile(prev => {
      const updated = [...(prev.certifications || [])];
      updated[index] = val;
      return { ...prev, certifications: updated };
    });
  };

  const handleDeleteCert = (index) => {
    setLocalProfile(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, idx) => idx !== index)
    }));
  };

  // SAVE & EXPORT & IMPORT ACTIONS
  const handleSave = () => {
    updateProfile(localProfile);
    toast.success("Profile saved successfully!");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore default template values? All local changes will be lost.")) {
      const res = resetProfile();
      setLocalProfile(JSON.parse(JSON.stringify(res)));
      toast.success("Profile restored to default template!");
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localProfile, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `careerflow_profile_${localProfile.personalInfo.name.toLowerCase().replace(/\s+/g, '_')}.json`);
    dlAnchorElem.click();
    toast.success("JSON exported successfully!");
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed.personalInfo || !parsed.education || !parsed.skills) {
        throw new Error("Invalid structure. Check required fields.");
      }
      setLocalProfile(parsed);
      setShowImportModal(false);
      setImportText('');
      toast.success("JSON Configuration imported successfully! (Click Save to persist changes)");
    } catch (e) {
      toast.error("Import failed. Make sure the text is valid JSON with required schema structures.");
    }
  };

  const tabs = [
    { id: 'personal', label: 'Basic Info', icon: <User size={18} /> },
    { id: 'education', label: 'Education', icon: <BookOpen size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Cpu size={18} /> },
    { id: 'experience', label: 'Work History', icon: <Briefcase size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit size={18} /> },
    { id: 'extras', label: 'Certs & Awards', icon: <Award size={18} /> }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', height: 'calc(100vh - 4.5rem)' }}>
      {/* Sidebar with Tabs & Core Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', fontWeight: '700', color: 'var(--text-primary)' }}>Profile Editor</h2>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === tab.id ? 'var(--bg-tertiary)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeTab === tab.id ? 'inset 0 0 8px rgba(6, 182, 212, 0.1)' : 'none'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <button className="btn btn-primary" onClick={handleSave} style={{ width: '100%' }}>
            <Save size={16} /> Save Profile
          </button>
          <button className="btn btn-secondary" onClick={handleExport} style={{ width: '100%' }}>
            <Download size={16} /> Export JSON
          </button>
          <button className="btn btn-secondary" onClick={() => setShowImportModal(true)} style={{ width: '100%' }}>
            <Upload size={16} /> Import JSON
          </button>
          <button className="btn btn-secondary" onClick={handleReset} style={{ width: '100%', color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <RotateCcw size={16} /> Reset Default
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="card" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        
        {/* PERSONAL INFO TAB */}
        {activeTab === 'personal' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Basic & Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Location / Address</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  placeholder="e.g. Austin, TX"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input"
                  value={localProfile.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="e.g. john@email.com"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="e.g. 555-0199"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">LinkedIn Link</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">GitHub Link</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Professional Bio Summary</label>
              <textarea
                className="textarea"
                style={{ minHeight: '140px', lineHeight: '1.5' }}
                value={localProfile.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                placeholder="Write an impactful first-person elevator summary describing your strengths and goals..."
              />
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Academic Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">University / College</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.education.university}
                  onChange={(e) => handleEducationChange('university', e.target.value)}
                  placeholder="e.g. Stanford University"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Location</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.education.location}
                  onChange={(e) => handleEducationChange('location', e.target.value)}
                  placeholder="e.g. Stanford, CA"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Degree & Major</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.education.degree}
                  onChange={(e) => handleEducationChange('degree', e.target.value)}
                  placeholder="e.g. BS in Computer Science"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Cumulative GPA</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.education.gpa}
                  onChange={(e) => handleEducationChange('gpa', e.target.value)}
                  placeholder="e.g. 3.9/4.0"
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label">Graduation Date</label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.education.graduationDate}
                  onChange={(e) => handleEducationChange('graduationDate', e.target.value)}
                  placeholder="e.g. June 2026"
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Academic Honors & Societies</label>
              <textarea
                className="textarea"
                style={{ minHeight: '80px' }}
                value={localProfile.education.honors}
                onChange={(e) => handleEducationChange('honors', e.target.value)}
                placeholder="e.g. Honors College, IEEE, Tau Beta Pi..."
              />
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Core Technical Skills</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '-0.5rem 0 0.5rem 0' }}>
              Add multiple items separated by commas. These skills populate the dashboard summary and tailor AI generators.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Artificial Intelligence & GenAI</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>comma separated</span>
                </label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.skills.aiGenAi || ''}
                  onChange={(e) => handleSkillsChange('aiGenAi', e.target.value)}
                  placeholder="LLMs, RAG, Prompt Engineering, LangChain..."
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Data Engineering & Analytics</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>comma separated</span>
                </label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.skills.dataEngineering || ''}
                  onChange={(e) => handleSkillsChange('dataEngineering', e.target.value)}
                  placeholder="SQL, Pandas, ETL Pipelines, Scikit-learn..."
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Programming Languages</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>comma separated</span>
                </label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.skills.languages || ''}
                  onChange={(e) => handleSkillsChange('languages', e.target.value)}
                  placeholder="Python, C++, JavaScript, TypeScript..."
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Cloud Platforms & Web Development</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>comma separated</span>
                </label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.skills.cloudWeb || ''}
                  onChange={(e) => handleSkillsChange('cloudWeb', e.target.value)}
                  placeholder="AWS, Azure, Docker, React, Next.js, Node..."
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Hardware & Embedded Engineering</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>comma separated</span>
                </label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.skills.hardware || ''}
                  onChange={(e) => handleSkillsChange('hardware', e.target.value)}
                  placeholder="RISC-V, Embedded C, RTL Design, PCB, Verilog..."
                />
              </div>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Professional Strategy & Leadership</span>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>comma separated</span>
                </label>
                <input
                  type="text"
                  className="input"
                  value={localProfile.skills.softSkills || ''}
                  onChange={(e) => handleSkillsChange('softSkills', e.target.value)}
                  placeholder="Agile Methodologies, Product Strategy, Public Speaking..."
                />
              </div>
            </div>
          </div>
        )}

        {/* WORK HISTORY TAB */}
        {activeTab === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Professional Experience</h3>
              <button className="btn btn-secondary" onClick={handleAddExperience} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                <Plus size={14} /> Add Role
              </button>
            </div>

            {localProfile.experience.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: '2rem 0' }}>No experience listed. Click "Add Role" to add one.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {localProfile.experience.map((exp, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem', position: 'relative', background: 'var(--bg-secondary)' }}>
                    <button 
                      onClick={() => handleDeleteExperience(idx)}
                      style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', color: 'var(--error)', border: 'none', cursor: 'pointer' }}
                      title="Delete experience block"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', width: '92%' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Role Title</label>
                        <input
                          type="text"
                          className="input"
                          value={exp.role}
                          onChange={(e) => handleUpdateExperience(idx, 'role', e.target.value)}
                          placeholder="e.g. Software Engineer Intern"
                        />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Company</label>
                        <input
                          type="text"
                          className="input"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                          placeholder="e.g. Google"
                        />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Location</label>
                        <input
                          type="text"
                          className="input"
                          value={exp.location}
                          onChange={(e) => handleUpdateExperience(idx, 'location', e.target.value)}
                          placeholder="e.g. Mountain View, CA"
                        />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Duration</label>
                        <input
                          type="text"
                          className="input"
                          value={exp.duration}
                          onChange={(e) => handleUpdateExperience(idx, 'duration', e.target.value)}
                          placeholder="e.g. May 2025 - August 2025"
                        />
                      </div>
                    </div>

                    {/* Bullet Points list */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className="label" style={{ margin: 0 }}>Achievement Bullet Points</label>
                        <button className="btn btn-secondary" onClick={() => handleAddExpPoint(idx)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                          <Plus size={12} /> Bullet
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {exp.points.map((pt, ptIdx) => (
                          <div key={ptIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              className="input"
                              value={pt}
                              onChange={(e) => handleExpPointChange(idx, ptIdx, e.target.value)}
                              style={{ flex: 1, fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}
                            />
                            <button
                              onClick={() => handleDeleteExpPoint(idx, ptIdx)}
                              style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}
                              title="Delete point"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Key Projects</h3>
              <button className="btn btn-secondary" onClick={handleAddProject} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                <Plus size={14} /> Add Project
              </button>
            </div>

            {localProfile.projects.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', margin: '2rem 0' }}>No projects listed. Click "Add Project" to add one.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {localProfile.projects.map((proj, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem', position: 'relative', background: 'var(--bg-secondary)' }}>
                    <button 
                      onClick={() => handleDeleteProject(idx)}
                      style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', color: 'var(--error)', border: 'none', cursor: 'pointer' }}
                      title="Delete project block"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', width: '92%' }}>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Project Title</label>
                        <input
                          type="text"
                          className="input"
                          value={proj.name}
                          onChange={(e) => handleUpdateProject(idx, 'name', e.target.value)}
                          placeholder="e.g. Debris Detection dam AI"
                        />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Tech Stack Keywords</label>
                        <input
                          type="text"
                          className="input"
                          value={proj.tech}
                          onChange={(e) => handleUpdateProject(idx, 'tech', e.target.value)}
                          placeholder="e.g. React 19, Node.js, GCP"
                        />
                      </div>
                      <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">Year</label>
                        <input
                          type="text"
                          className="input"
                          value={proj.year}
                          onChange={(e) => handleUpdateProject(idx, 'year', e.target.value)}
                          placeholder="e.g. 2026"
                        />
                      </div>
                    </div>

                    {/* Bullet Points list */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className="label" style={{ margin: 0 }}>Project Detail Bullets</label>
                        <button className="btn btn-secondary" onClick={() => handleAddProjPoint(idx)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                          <Plus size={12} /> Bullet
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {proj.points.map((pt, ptIdx) => (
                          <div key={ptIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              className="input"
                              value={pt}
                              onChange={(e) => handleProjPointChange(idx, ptIdx, e.target.value)}
                              style={{ flex: 1, fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}
                            />
                            <button
                              onClick={() => handleDeleteProjPoint(idx, ptIdx)}
                              style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}
                              title="Delete point"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CERTS & AWARDS TAB */}
        {activeTab === 'extras' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Certifications Card */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Certifications</h3>
                <button className="btn btn-secondary" onClick={handleAddCert} style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}>
                  <Plus size={14} /> Add
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(localProfile.certifications || []).map((cert, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="input"
                      value={cert}
                      onChange={(e) => handleUpdateCert(idx, e.target.value)}
                      style={{ fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}
                    />
                    <button
                      onClick={() => handleDeleteCert(idx)}
                      style={{ background: 'transparent', color: 'var(--error)', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {(localProfile.certifications || []).length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>No certifications added yet.</p>
                )}
              </div>
            </div>

            {/* Awards Card */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Honors & Awards</h3>
                <button className="btn btn-secondary" onClick={handleAddAward} style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}>
                  <Plus size={14} /> Add
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(localProfile.awards || []).map((awd, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="input"
                      value={awd}
                      onChange={(e) => handleUpdateAward(idx, e.target.value)}
                      style={{ fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}
                    />
                    <button
                      onClick={() => handleDeleteAward(idx)}
                      style={{ background: 'transparent', color: 'var(--error)', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {(localProfile.awards || []).length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>No awards added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* JSON Import Modal */}
      {showImportModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100
        }}>
          <div className="card" style={{ width: '500px', maxWidth: '90%', padding: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Import Profile JSON Configuration</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.4' }}>
              Paste raw JSON of your profile matching the default schema. Ensure `personalInfo`, `education`, and `skills` objects exist.
            </p>
            <textarea
              className="textarea"
              style={{ minHeight: '220px', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre', overflow: 'auto' }}
              placeholder={`{\n  "personalInfo": {\n    "name": "Jane Doe",\n    ...\n  },\n  "education": { ... },\n  "skills": { ... }\n}`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={() => { setShowImportModal(false); setImportText(''); }} style={{ flex: 1 }}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleImport} style={{ flex: 1 }} disabled={!importText.trim()}>
                Import Config
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
