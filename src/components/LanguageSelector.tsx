import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { 
      code: 'es', 
      name: 'Español', 
      flagUrl: 'https://flagcdn.com/w40/es.png',
      flagAlt: 'Bandera de España'
    },
    { 
      code: 'en', 
      name: 'English', 
      flagUrl: 'https://flagcdn.com/w40/gb.png',
      flagAlt: 'Flag of United Kingdom'
    },
    { 
      code: 'fr', 
      name: 'Français', 
      flagUrl: 'https://flagcdn.com/w40/fr.png',
      flagAlt: 'Drapeau de la France'
    },
    { 
      code: 'it', 
      name: 'Italiano', 
      flagUrl: 'https://flagcdn.com/w40/it.png',
      flagAlt: 'Bandiera d\'Italia'
    },
    { 
      code: 'de', 
      name: 'Deutsch', 
      flagUrl: 'https://flagcdn.com/w40/de.png',
      flagAlt: 'Flagge von Deutschland'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button 
        className="flex items-center gap-2 text-gray-700 hover:text-teal-600 py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md"
        title={`Idioma actual: ${currentLanguage.name}`}
      >
        <div className="relative">
          <img 
            src={currentLanguage.flagUrl} 
            alt={currentLanguage.flagAlt}
            className="w-5 h-4 rounded-sm object-cover shadow-sm border border-gray-200"
            loading="lazy"
          />
        </div>
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      
      <div className="absolute right-0 mt-2 py-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-1 group-hover:translate-y-0">
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Globe className="w-3 h-3" />
            <span>Seleccionar idioma</span>
          </div>
        </div>
        
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                i18n.language === lang.code 
                  ? 'text-teal-600 font-medium bg-teal-50 border-r-2 border-teal-600' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              title={`Cambiar a ${lang.name}`}
            >
              <div className="flex-shrink-0">
                <img 
                  src={lang.flagUrl} 
                  alt={lang.flagAlt}
                  className="w-5 h-4 rounded-sm object-cover shadow-sm border border-gray-200"
                  loading="lazy"
                />
              </div>
              <span className="flex-1 text-left">{lang.name}</span>
              {i18n.language === lang.code && (
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="px-3 py-2 border-t border-gray-100">
          <div className="text-xs text-gray-400 text-center">
            Africagua disponible en {languages.length} idiomas
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;