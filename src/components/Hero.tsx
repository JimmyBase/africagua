import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, MapPin, Users, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="relative hidden md:block h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.jpg?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.mp4?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300 shadow-large">
                <Calendar className="w-8 h-8 text-ocean-600 mx-auto mb-3" />
                <div className="text-sm font-medium text-neutral-600 mb-1">
                  {t('hero.date_label')}
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  20-21 {t('hero.november')} 2025
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300 shadow-large">
                <MapPin className="w-8 h-8 text-ocean-600 mx-auto mb-3" />
                <div className="text-sm font-medium text-neutral-600 mb-1">
                  {t('hero.location_label')}
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  Fuerteventura, {t('hero.canary_islands')}
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300 shadow-large">
                <Users className="w-8 h-8 text-ocean-600 mx-auto mb-3" />
                <div className="text-sm font-medium text-neutral-600 mb-1">
                  {t('hero.attendees_label')}
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  500+ {t('hero.participants')}
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300 shadow-large">
                <Globe className="w-8 h-8 text-ocean-600 mx-auto mb-3" />
                <div className="text-sm font-medium text-neutral-600 mb-1">
                  {t('hero.countries_label')}
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  30+ {t('hero.countries')}
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="https://eventosccf.netlify.app/eventos/-OJJMdGgVrnpZVJJdFDL"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold text-lg px-10 py-5 rounded-lg shadow-coral hover:shadow-large transition-all duration-300 transform hover:scale-105"
              >
                <span>{t('hero.register')}</span>
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative md:hidden h-[70vh] overflow-hidden">
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.jpg?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1%20movil%20version.mp4?alt=media&token=bed9d732-863a-4c36-8ad8-0294cd613846"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>

        <div className="relative z-10 h-full flex flex-col justify-end p-6 pb-24">
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            {t('hero.title')}
          </h1>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <Calendar className="w-6 h-6 text-ocean-600 mb-2" />
              <div className="text-xs font-medium text-neutral-600">
                {t('hero.date_label')}
              </div>
              <div className="text-sm font-bold text-neutral-900">
                20-21 Nov 2025
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="w-6 h-6 text-ocean-600 mb-2" />
              <div className="text-xs font-medium text-neutral-600">
                {t('hero.location_label')}
              </div>
              <div className="text-sm font-bold text-neutral-900">
                Fuerteventura
              </div>
            </div>
          </div>

          <a
            href="https://eventosccf.netlify.app/eventos/-OJJMdGgVrnpZVJJdFDL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-semibold px-6 py-4 rounded-lg shadow-large transition-all duration-300"
          >
            <span>{t('hero.register')}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
