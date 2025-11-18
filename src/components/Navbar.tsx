import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome && e.currentTarget.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      window.location.href = '/' + e.currentTarget.getAttribute('href');
    }
    setIsOpen(false);
  };

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
  }`;

  const linkClasses = "text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm whitespace-nowrap px-3 py-2 rounded-lg hover:bg-gray-50/80";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Marquee */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center transform hover:scale-105 transition-transform duration-300"
             title="Africagua - Inicio"
            >
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
                alt="Logo Africagua - Foro Internacional de Agua y Energías Renovables"
                className="h-10 w-auto"
              />
            </Link>
            
            <div className="hidden lg:block">
              <div className="text-sm text-teal-600 font-medium whitespace-nowrap">
              
              </div>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#about" onClick={handleClick} className={linkClasses}>
              {t('nav.about')}
            </a>
            <Link to="/program" className={`${linkClasses} pulse-attention`}>
              Programa
            </Link>
            <a href="#history" onClick={handleClick} className={linkClasses}>
              {t('nav.history')}
            </a>
            <a href="#b2b" onClick={handleClick} className={linkClasses}>
              {t('nav.b2b')}
            </a>
            <a href="#news" onClick={handleClick} className={linkClasses}>
              {t('nav.news')}
            </a>
            <a href="#participants" onClick={handleClick} className={linkClasses}>
              Participantes
            </a>
            <a href="#info" onClick={handleClick} className={linkClasses}>
              {t('nav.useful_info')}
            </a>
            <a href="#contact" onClick={handleClick} className={linkClasses}>
              {t('nav.contact')}
            </a>
            <Link to="/startup-competition" className={linkClasses}>
              Startup Competition Africagua
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-lg border-t">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm text-teal-600 font-medium">
              Web en desarrollo, formularios inactivos e inscripciones cerradas de momento
            </div>
          </div>
          <div className="p-4 space-y-1">
            <a
              href="#about"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              {t('nav.about')}
            </a>
            <Link
              to="/program"
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300 pulse-attention"
              onClick={() => setIsOpen(false)}
            >
              Programa
            </Link>
            <a
              href="#history"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              {t('nav.history')}
            </a>
            <a
              href="#b2b"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              {t('nav.b2b')}
            </a>
            <a
              href="#news"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              {t('nav.news')}
            </a>
            <a
              href="#participants"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Participantes
            </a>
            <a
              href="#info"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              {t('nav.useful_info')}
            </a>
            <a
              href="#contact"
              onClick={handleClick}
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              {t('nav.contact')}
            </a>
            <Link
              to="/startup-competition"
              className="block px-4 py-3 text-gray-700 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Global Startup Competition
            </Link>
            <div className="px-4 py-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;