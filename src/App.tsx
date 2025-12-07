import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import LocationSection from './components/LocationSection';
import B2BMeetings from './components/B2BMeetings';
import NewsSection from './components/NewsSection';
import HistoricalSection from './components/HistoricalSection';
import Sponsors from './components/Sponsors';
import UsefulInfo from './components/UsefulInfo';
import ContactSection from './components/ContactSection';
import AdminNewsPanel from './components/AdminNewsPanel';
import StartupCompetition from './components/StartupCompetition';
import ParticipantsGallery from './components/ParticipantsGallery';
import CookieConsent from './components/CookieConsent';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import LegalNotice from './components/LegalNotice';
import ProgramPage from './components/ProgramPage';
import ProfileModal from './components/ProfileModal';
import Avatar from './components/Avatar';
import ThankYouCarousel from './components/ThankYouCarousel';

function MainContent() {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleAdminClick = () => {
    const password = prompt('Introduce la clave de administrador:');
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdminPanelOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="relative z-10">
        <Hero />
        <div className="section-bg energy-pulse">
          <ThankYouCarousel />
        </div>
        <div className="section-bg water-effect">
          <AboutSection />
        </div>
        <div className="section-bg solar-shimmer">
          <HistoricalSection />
        </div>
        <div className="section-bg solar-shimmer">
          <LocationSection />
        </div>
        <div className="section-bg wind-rotate">
          <B2BMeetings />
        </div>
        <div className="section-bg energy-pulse">
          <NewsSection onAdminClick={handleAdminClick} />
        </div>
        <div className="section-bg wind-rotate">
          <Sponsors />
        </div>
        <div className="section-bg water-effect">
          <ParticipantsGallery />
        </div>
        <div className="section-bg solar-shimmer">
          <UsefulInfo />
        </div>
        <div className="section-bg water-effect">
          <ContactSection />
        </div>

        {/* Footer */}
        <footer className="bg-white py-6 sm:py-8 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Logos */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-6 sm:mb-8">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
                alt="Africagua Logo"
                className="h-12 sm:h-16 w-auto"
              />
              <a href="https://www.camaradefuerteventura.org" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/logo-camara-fuerteventura-email.png?alt=media&token=64a09d59-abce-4a3e-96fa-88aca412d19c"
                  alt="Cámara de Comercio de Fuerteventura"
                  className="h-12 sm:h-16 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            
            {/* Credit line and Policy Links */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-500 px-2">
                <span>Página web diseñada por Jean Michel Jimmy Tordeur (J.M Tordeur) - Ingeniero Informático de la Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura</span>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="transition-transform hover:scale-110"
                  aria-label="Ver perfil profesional de Jean Michel Jimmy Tordeur"
                >
                  <Avatar
                    src="/moi.png"
                    alt="Jean Michel Jimmy Tordeur - Ingeniero Informático Desarrollador Web Fuerteventura"
                    name="Jean Michel Jimmy Tordeur"
                    size="medium"
                    className="cursor-pointer"
                  />
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-2">
                <button 
                  onClick={() => setIsCookiePolicyOpen(true)}
                  className="text-teal-600 hover:text-teal-700 transition-colors py-1"
                >
                  Política de cookies
                </button>
                <button 
                  onClick={() => setIsPrivacyPolicyOpen(true)}
                  className="text-teal-600 hover:text-teal-700 transition-colors py-1"
                >
                  Política de privacidad
                </button>
                <button 
                  onClick={() => setIsLegalNoticeOpen(true)}
                  className="text-teal-600 hover:text-teal-700 transition-colors py-1"
                >
                  Aviso legal
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <AdminNewsPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)} 
      />
      
      <CookieConsent onOpenCookiePolicy={() => setIsCookiePolicyOpen(true)} />
      
      <CookiePolicy 
        isOpen={isCookiePolicyOpen}
        onClose={() => setIsCookiePolicyOpen(false)}
      />

      <PrivacyPolicy
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      <LegalNotice
        isOpen={isLegalNoticeOpen}
        onClose={() => setIsLegalNoticeOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/startup-competition" element={<StartupCompetition />} />
          <Route path="/program" element={<ProgramPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;