import React, { useEffect, useState } from 'react';
import api from './lib/api';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero3D from './components/Hero3D';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import UseCases from './components/UseCases';
import BotDemo from './components/BotDemo';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';
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
    api.get('/content/hero')
      .then(res => setContent(prev => ({ ...prev, hero: res.data })))
      .catch(err => console.error(err));
  }, []);

  return (
    <ContentContext.Provider value={content}>
      <div className="theme-bg theme-text min-h-screen transition-colors duration-300">
        <Navbar />
        <Hero3D />
        <HeroSection />
        <HowItWorks />
        <Features />
        <UseCases />
        <BotDemo />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <Footer />
        <FloatingCTA />
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
