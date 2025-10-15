import React from 'react';
import { MapPin, Sun, Shield, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50" id="location">
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t('location.title')}</h2>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/Fuerteventura_from_space.jpg?alt=media&token=74c5f84d-92a0-442f-993f-13e914d18276"
                alt="Fuerteventura desde el espacio - Ubicación de Africagua, foro internacional de agua y energías renovables"
                className="w-full h-[600px] object-cover transform transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <p className="text-xl text-gray-700 leading-relaxed">
                {t('location.description')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {t('location.advantages', { returnObjects: true }).map((advantage, index) => (
                <div 
                  key={index} 
                  className="modern-card p-8"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="modern-icon-container">
                    {getIcon(index)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const getIcon = (index: number) => {
  const iconClass = "w-6 h-6 text-white";
  switch (index) {
    case 0:
      return <MapPin className={iconClass} />;
    case 1:
      return <Sun className={iconClass} />;
    case 2:
      return <Shield className={iconClass} />;
    case 3:
      return <TrendingUp className={iconClass} />;
    default:
      return <MapPin className={iconClass} />;
  }
};

export default LocationSection;