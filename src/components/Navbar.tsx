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
    isScrolled ? 'bg-white shadow-medium' : 'bg-white/95 backdrop-blur-sm'
  }`;

  const linkClasses = "text-neutral-700 hover:text-ocean-600 transition-colors duration-300 text-base font-medium px-4 py-2 rounded-lg hover:bg-neutral-50";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex-shrink-0 flex items-center"
            title="Africagua - Inicio"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
              alt="Logo Africagua"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            <a href="#about" onClick={handleClick} className={linkClasses}>
              {t('nav.about')}
            </a>
            <Link to="/program" className={linkClasses}>
              {t('nav.program')}
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
            <a href="#info" onClick={handleClick} className={linkClasses}>
              {t('nav.useful_info')}
            </a>
            <a href="#contact" onClick={handleClick} className={linkClasses}>
              {t('nav.contact')}
            </a>
            <Link to="/startup-competition" className={linkClasses}>
              Startup
            </Link>
            <div className="ml-4">
              <LanguageSelector />
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-700 hover:text-ocean-600 hover:bg-neutral-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-large border-t border-neutral-200">
          <div className="px-4 py-6 space-y-2">
            <a
              href="#about"
              onClick={handleClick}
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
            >
              {t('nav.about')}
            </a>
            <Link
              to="/program"
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.program')}
            </Link>
            <a
              href="#history"
              onClick={handleClick}
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
            >
              {t('nav.history')}
            </a>
            <a
              href="#b2b"
              onClick={handleClick}
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
            >
              {t('nav.b2b')}
            </a>
            <a
              href="#news"
              onClick={handleClick}
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
            >
              {t('nav.news')}
            </a>
            <a
              href="#info"
              onClick={handleClick}
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
            >
              {t('nav.useful_info')}
            </a>
            <a
              href="#contact"
              onClick={handleClick}
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
            >
              {t('nav.contact')}
            </a>
            <Link
              to="/startup-competition"
              className="block px-4 py-3 text-neutral-700 hover:text-ocean-600 hover:bg-neutral-50 rounded-lg font-medium transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Startup Competition
            </Link>
            <div className="px-4 py-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
