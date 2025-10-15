import React from 'react';
import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const B2BMeetings = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 relative" id="b2b">
      <div className="absolute inset-0 z-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.appspot.com/o/NIGA2.jpg?alt=media&token=412dab56-67fb-4cb7-aec4-55a87f8664fd"
          alt="Africagua B2B Meetings - Networking internacional para el sector de agua y energías renovables en Fuerteventura"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">{t('b2b.title')}</h2>
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-700 leading-relaxed text-justify">
            {t('b2b.description')}
          </p>
          
          {/* Prominent B2B Registration Button */}
          <div className="mt-12">
            <a
              href="https://www.b2match.com/e/africagua-2025-water-and-renewable"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-africagua-dark-teal text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-africagua-dark-teal-darker transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
              title="Inscribirse en las Reuniones B2B de Africagua 2025"
            >
              <Users className="w-7 h-7" />
              {t('b2b_registration.button')}
            </a>
            <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
              Plataforma especializada para programar reuniones B2B durante Africagua 2025
            </p>
          </div>
        </div>

        <div className="bg-white p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('b2b.participation.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {t('b2b.participation.steps', { returnObjects: true }).slice(0, 3).map((step, index) => (
              <div 
                key={index} 
                className="modern-card p-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="modern-icon-container mx-auto">
                  <div className="text-2xl font-bold">{index + 1}</div>
                </div>
                <p className="text-gray-700 text-justify">{step}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t('b2b.participation.steps', { returnObjects: true }).slice(3).map((step, index) => (
              <div 
                key={index + 3} 
                className="modern-card p-8"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="modern-icon-container mx-auto">
                  <div className="text-2xl font-bold">{index + 4}</div>
                </div>
                <p className="text-gray-700 text-justify">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BMeetings;