import React from 'react';
import { MapPin, Sun, Shield, TrendingUp, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocationSection = () => {
  const { t } = useTranslation();
  const venue = t('location.venue', { returnObjects: true });

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50" id="location">
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t('location.title')}</h2>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="modern-icon-container flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{venue.title}</h3>
                  <p className="text-xl font-semibold text-teal-600 mb-2">{venue.name}</p>
                  <p className="text-gray-600 mb-4">{venue.address}</p>
                  <a
                    href="https://maps.app.goo.gl/3qrMjsbEUPfSAHa57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {venue.viewOnMaps}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.699!2d-13.863879!3d28.390160!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDIzJzI0LjYiTiAxM8KwNTEnNTAuMCJX!5e0!3m2!1sen!2ses!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
                title="Hotel Sheraton Fuerteventura Location"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
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