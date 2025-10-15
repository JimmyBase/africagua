import React, { useState } from 'react';
import { Euro, Rocket, MapPin, Download, ArrowRight, Users, Trophy, ExternalLink, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StartupCompetition = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [selectedJuryMember, setSelectedJuryMember] = useState(null);
  
  // Get jury members from translations
  const juryMembers = t('startup_competition.jury.members', { returnObjects: true });

  // Map language codes to their respective PDF download URLs
  const downloadUrls = {
    es: 'https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FBASES%2001-08-25%2FBASES%20ESP.pdf?alt=media&token=66a9d278-2188-479b-a378-9ce18c4b8577',
    en: 'https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FBASES%2001-08-25%2FBASES%20GB.pdf?alt=media&token=f937eac8-789f-4ecd-9d50-0ac3a33c0560',
    fr: 'https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FBASES%2001-08-25%2FBASES%20FR.pdf?alt=media&token=e6876708-5664-4441-950e-cb589b2099cf',
    it: 'https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FBASES%2001-08-25%2FBASES%20IT.pdf?alt=media&token=50307f06-5ea5-4bb5-b179-f2118a3ea4e5',
    de: 'https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FBASES%2001-08-25%2FBASES%20DE.pdf?alt=media&token=e76db9dc-3513-4b28-8961-d769ddcacd3c'
  };

  // Get the current language, fallback to Spanish if not found
  const currentDownloadUrl = downloadUrls[i18n.language] || downloadUrls.es;

  return (
    <div className="min-h-screen">
      {/* Hero Section with top padding to account for fixed navbar */}
      <div className="relative min-h-[calc(90vh+75.6px)] flex items-end pb-20 pt-24">
        {/* Background container */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FDise%C3%B1o%20sin%20t%C3%ADtulo%20(1).png?alt=media&token=f52dfccd-d300-43fb-b2e9-e57f1ddff009"
            alt="Africagua Global Startup Competition - Competición de startups de agua y energías renovables"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            {/* Text content moved to bottom */}
            <div className="max-w-2xl text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('startup_competition.title')}
              </h1>
              <p className="text-2xl text-white font-light">
                {t('startup_competition.subtitle')}
              </p>
            </div>

            {/* Registration Card */}
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md lg:w-96 transform hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="registration-status registration-closed mb-4 justify-center">
                  <X className="w-4 h-4" />
                  <span className="text-lg font-bold">{t('startup_competition.registration.open')}</span>
                </div>
                <div className="text-red-600 font-medium">{t('startup_competition.registration.deadline')}</div>
              </div>

              <div className="space-y-4">
                <div 
                  className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled-button"
                  title="Inscripción cerrada - No disponible"
                >
                  <Download className="w-5 h-5" />
                  {t('startup_competition.registration.download_rules')}
                </div>

                <div 
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled-button"
                  title="Inscripción cerrada - No disponible"
                >
                  <ArrowRight className="w-5 h-5" />
                  {t('startup_competition.registration.submit_project')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('startup_competition.description')}
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Euro className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('startup_competition.prizes.title')}</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• {t('startup_competition.prizes.first')}</li>
                    <li>• {t('startup_competition.prizes.second')}</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('startup_competition.training.title')}</h3>
                  <p className="text-gray-600">
                    {t('startup_competition.training.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finalists Section */}
      <div className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/GLOBAL%20STARTUP%2FIMAGEN%206.jpg?alt=media&token=6ea3f9bb-9b22-46a3-a55a-08dc195f955b"
            alt="Finalistas Africagua Startup Competition presentando sus proyectos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">{t('startup_competition.finalists.title')}</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-white/90 mb-12">
              {t('startup_competition.finalists.description')}
            </p>

            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all">
              {t('startup_competition.finalists.coming_soon')}
            </button>
          </div>
        </div>
      </div>

      {/* Jury Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full text-teal-600 font-medium mb-6">
              <Trophy className="w-5 h-5" />
              {t('startup_competition.jury.expert_panel')}
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {t('startup_competition.jury.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('startup_competition.jury.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {juryMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        objectPosition: member.name === "Patricia Fraile Romero" || 
                                      member.name === "Gema Báez Espino" || 
                                      member.name === "Pablo Martín Carbajal" ||
                                      member.name === "Luis Suárez León" ||
                                      member.name === "Ana Torrent Acosta" ||
                                      member.name === "María Delgado Segura"
                                      ? "center top" : "center center",
                        height: "400px"
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span>{t('startup_competition.jury.expert_in')} {member.expertise}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8 flex flex-col">
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                          <p className="text-teal-600 font-medium text-sm">{member.position}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-6">
                        {member.bio}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedJuryMember(member)}
                      className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors group/btn"
                    >
                      {t('startup_competition.jury.view_full_bio')}
                      <ExternalLink className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biography Modal */}
      {selectedJuryMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedJuryMember.name}</h3>
                <p className="text-teal-600 font-medium">{selectedJuryMember.position}</p>
              </div>
              <button
                onClick={() => setSelectedJuryMember(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {selectedJuryMember.fullBio || selectedJuryMember.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupCompetition;