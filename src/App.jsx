import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import CoverLetterGen from './pages/CoverLetterGen';
import OutreachGen from './pages/OutreachGen';
import ChatBot from './pages/ChatBot';
import InterviewPrep from './pages/InterviewPrep';
import LinkedInOptimizer from './pages/LinkedInOptimizer';
import JobTracker from './pages/JobTracker';
import ProfileSettings from './pages/ProfileSettings';
import CareerRoadmap from './pages/CareerRoadmap';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/cover-letter" element={<CoverLetterGen />} />
          <Route path="/outreach" element={<OutreachGen />} />
          <Route path="/interview" element={<InterviewPrep />} />
          <Route path="/linkedin" element={<LinkedInOptimizer />} />
          <Route path="/tracker" element={<JobTracker />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/roadmap" element={<CareerRoadmap />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
