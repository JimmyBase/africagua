import React from 'react';
import { MapPin, Sun, Shield, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50" id="location">
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-16">{t('location.title')}</h2>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('location.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {t('location.advantages', { returnObjects: true }).map((advantage, index) => (
            <div
              key={index}
              className="modern-card p-8 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="modern-icon-container mx-auto mb-6">
                {getIcon(index)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
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