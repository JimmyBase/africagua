import React from 'react';
import { Droplets, Wind, Globe2, LineChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 relative" id="about">
      <div className="absolute inset-0 z-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/BUSINESS%20CONTACT.jpg?alt=media&token=d79c931a-c995-46ef-a675-ce9be9652e90"
          alt="Africagua International Water and Renewable Energy Forum - Business Networking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="section-title">{t('about.title')}</h1>
        
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="bg-white p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.event_section.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {t('about.event_section.description')}
            </p>
          </div>

          <div className="bg-white p-10 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              {t('about.mission.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t('about.objectives', { returnObjects: true }).slice(0, 3).map((objective, index) => (
            <div 
              key={index} 
              className="modern-card p-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="modern-icon-container">
                {getIcon(index)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {objective.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {objective.description}
              </p>
            </div>
          ))}
          <div className="md:col-span-2 lg:col-span-3 flex justify-center">
            <div 
              className="modern-card p-8 max-w-xl w-full"
              style={{ animationDelay: '300ms' }}
            >
              <div className="modern-icon-container mx-auto">
                {getIcon(3)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {t('about.objectives.3.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {t('about.objectives.3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const getIcon = (index: number) => {
  const iconClass = "w-6 h-6 text-white";
  switch (index % 4) {
    case 0:
      return <Droplets className={iconClass} />;
    case 1:
      return <Wind className={iconClass} />;
    case 2:
      return <Globe2 className={iconClass} />;
    case 3:
      return <LineChart className={iconClass} />;
  }
};

export default AboutSection;