import React from 'react';
import { Star, Award, Globe as Globe2, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sponsors = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 relative" id="sponsors">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/BUSINESS%20CONTACT.jpg?alt=media&token=d79c931a-c995-46ef-a675-ce9be9652e90"
          alt="Networking empresarial en Africagua - Patrocinadores del foro internacional de agua y energías renovables"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">{t('sponsors.title')}</h2>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Star className="w-10 h-10 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Beneficios de Patrocinar Africagua</h2>
              </div>
              <div className="space-y-4">
                {t('sponsors.benefits.list', { returnObjects: true }).map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-teal-50/50 transition-colors"
                  >
                    <Award className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Sponsor Card */}
          <div className="space-y-8">
            {t('sponsors.why_sponsor', { returnObjects: true }).map((item, index) => (
              <div 
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {getIcon(index)}
                <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}

            {/* CTA Button */}
            <div className="text-center pt-4">
              <a
                href="mailto:info@africagua.com?subject=Interés en Patrocinio Africagua 2025"
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-full font-medium hover:bg-teal-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                title="Contactar para patrocinar Africagua 2025"
              >
                Patrocinar Africagua
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const getIcon = (index: number) => {
  const iconClass = "w-8 h-8 text-teal-600";
  switch (index) {
    case 0:
      return <Globe2 className={iconClass} />;
    case 1:
      return <Users className={iconClass} />;
    case 2:
      return <TrendingUp className={iconClass} />;
    default:
      return <Globe2 className={iconClass} />;
  }
};

export default Sponsors;