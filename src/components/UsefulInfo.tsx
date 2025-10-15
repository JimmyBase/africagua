import React from 'react';
import { Car, Bus, Stethoscope, Phone, Clock, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const UsefulInfo = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 relative" id="info">
      <div className="absolute inset-0 z-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/Fuerteventura_from_space.jpg?alt=media&token=74c5f84d-92a0-442f-993f-13e914d18276"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">{t('useful_info.title')}</h2>

        <div className="flex justify-center mb-16">
          <div className="relative max-w-full rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/promocode%2FPROMOCODE%20AFRICAGUA.jpg?alt=media&token=7832ce7e-24ea-4a99-9a35-f20a4f4402e1"
              alt="Promocodes Africagua - Hoteles recomendados en Fuerteventura"
              className="w-full h-auto"
            />
            {/* Left half - Hoteles Elba */}
            <a
              href="https://www.hoteleselba.com/es"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-0 left-0 w-1/2 h-full z-10 cursor-pointer"
              aria-label="Enlace a Hoteles Elba"
              title="Visitar Hoteles Elba"
            />
            {/* Right half - Hoteles Barceló */}
            <a
              href="https://www.barcelo.com/es-es/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-0 right-0 w-1/2 h-full z-10 cursor-pointer"
              aria-label="Enlace a Hoteles Barceló"
              title="Visitar Hoteles Barceló"
            />
          </div>
        </div>

        <div className="modern-grid">
          {/* Taxis */}
          <div className="modern-card p-8">
            <div className="modern-icon-container">
              <Car className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('useful_info.taxis.title')}</h3>
            <div className="space-y-6">
              {t('useful_info.taxis.items', { returnObjects: true }).map((taxi, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium text-gray-900">{taxi.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${taxi.phone}`} className="hover:text-teal-600">{taxi.phone}</a>
                  </div>
                  <p className="text-sm text-gray-600">{taxi.info}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buses */}
          <div className="modern-card p-8">
            <div className="modern-icon-container">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('useful_info.buses.title')}</h3>
            <div className="space-y-6">
              {t('useful_info.buses.items', { returnObjects: true }).map((bus, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium text-gray-900">{bus.line}</h4>
                  <p className="text-sm text-gray-600 mb-1">{bus.route}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{bus.frequency}</span>
                  </div>
                  <a 
                    href="https://tiadhe.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{t('useful_info.buses.schedules')}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital */}
          <div className="modern-card p-8">
            <div className="modern-icon-container">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('useful_info.hospital.title')}</h3>
            <div>
              <h4 className="font-medium text-gray-900">{t('useful_info.hospital.name')}</h4>
              <p className="text-sm text-gray-600 mb-4">{t('useful_info.hospital.address')}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${t('useful_info.hospital.phone')}`} className="hover:text-teal-600">
                    {t('useful_info.hospital.phone')}
                  </a>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>{t('useful_info.hospital.emergency')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsefulInfo;