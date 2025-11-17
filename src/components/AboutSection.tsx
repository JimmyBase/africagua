import React from 'react';
import { Droplets, Wind, Globe2, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  const objectives = t('about.objectives', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="section-bg" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="card-elevated p-10">
            <h3 className="text-h3 mb-6">{t('about.event_section.title')}</h3>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              {t('about.event_section.description')}
            </p>
          </div>

          <div className="card-elevated p-10">
            <h3 className="text-h3 mb-6">{t('about.mission.title')}</h3>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              {t('about.mission.description')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((objective, index) => (
            <div key={index} className="card p-8 hover:border-ocean-300">
              <div className="icon-container mb-6">
                {getIcon(index)}
              </div>
              <h3 className="text-h4 mb-4">{objective.title}</h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                {objective.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getIcon = (index: number) => {
  const iconClass = "w-6 h-6";
  const icons = [
    <Droplets className={iconClass} key="droplets" />,
    <Wind className={iconClass} key="wind" />,
    <Globe2 className={iconClass} key="globe" />,
    <Target className={iconClass} key="target" />
  ];
  return icons[index % icons.length];
};

export default AboutSection;
