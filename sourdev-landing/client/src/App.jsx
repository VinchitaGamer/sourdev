import React, { useEffect, useState } from 'react';
import api from './lib/api';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero3D from './components/Hero3D';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import PlanDetails from './pages/PlanDetails';
import LeadCapture from './pages/LeadCapture';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import ContentEditor from './pages/admin/ContentEditor';
import PricingManager from './pages/admin/PricingManager';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

// Site Content Context
export const ContentContext = React.createContext({});

function LandingPage() {
  const [content, setContent] = useState({});

  useEffect(() => {
    // Fetch initial content
    // Fetch initial content
    api.get('/content/hero')
      .then(res => setContent(prev => ({ ...prev, hero: res.data })))
      .catch(err => console.error(err));

    // Fetch detailed content would happen here
  }, []);

  return (
    <ContentContext.Provider value={content}>
      <div className="bg-black text-white min-h-screen">
        <Hero3D />
        <HeroSection />
        <Features />
        <Pricing />
        <ContactForm />
      </div>
    </ContentContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/empezar" element={<LeadCapture />} />
        <Route path="/plan/:id" element={<PlanDetails />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="pricing" element={<PricingManager />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
