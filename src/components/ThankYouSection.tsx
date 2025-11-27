import React from 'react';
import { Heart, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ThankYouSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/AFRICAGUA 2025.jpg"
                alt="Equipo Africagua 2025"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent"></div>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Heart className="w-8 h-8 text-teal-600 animate-pulse" />
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {t('thankYou.title')}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed">
                {t('thankYou.message')}
              </p>

              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-teal-600">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('thankYou.future.title')}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t('thankYou.future.message')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-lg text-gray-600 italic">
                  {t('thankYou.signature')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-teal-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default ThankYouSection;
