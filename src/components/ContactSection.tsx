import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">Contacto Africagua</h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Oficina Técnica Africagua</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1 group-hover:text-teal-500 transition-colors" />
                <div>
                  <p className="font-medium text-gray-900">{t('contact.office.address.label')}</p>
                  <p className="text-gray-600">
                    {t('contact.office.address.line1')}
                    <br />
                    {t('contact.office.address.line2')}
                    <br />
                    {t('contact.office.address.line3')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <Phone className="w-6 h-6 text-teal-600 group-hover:text-teal-500 transition-colors" />
                <div>
                  <p className="font-medium text-gray-900">{t('contact.office.phone.label')}</p>
                  <a href="tel:+34928861070" className="text-gray-600 hover:text-teal-600 transition-colors">{t('contact.office.phone.number')}</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <Mail className="w-6 h-6 text-teal-600 group-hover:text-teal-500 transition-colors" />
                <div>
                  <p className="font-medium text-gray-900">{t('contact.office.email.label')}</p>
                  <a href="mailto:info@africagua.com" className="text-gray-600 hover:text-teal-600 transition-colors">{t('contact.office.email.address')}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-lg flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">¡Inscríbete en Africagua 2025!</h3>
            <p className="text-lg text-gray-600 mb-8">
              No te pierdas la oportunidad de participar en Africagua, el principal foro internacional de agua y energías renovables. Regístrate ahora para asegurar tu plaza y acceder a todas las actividades de Africagua, incluyendo las reuniones B2B.
            </p>
            <a 
              href="https://eventosccf.netlify.app/eventos/-OJJMdGgVrnpZVJJdFDL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white py-4 px-8 rounded-lg font-medium hover:bg-teal-700 transition-all duration-300 group"
              title="Inscribirse en Africagua 2025"
            >
              <span>Inscribirse en Africagua</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Al registrarte en Africagua, aceptas nuestros términos y condiciones de participación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;