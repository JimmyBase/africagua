import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, Users, Coffee, Award, Presentation, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import CookiePolicy from './CookiePolicy';
import PrivacyPolicy from './PrivacyPolicy';
import LegalNotice from './LegalNotice';
import ProfileModal from './ProfileModal';

const ProgramPage = () => {
  const { t } = useTranslation();
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  const programData = t('program_page', { returnObjects: true });

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'opening':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'panel':
        return <Users className="w-5 h-5 text-teal-600" />;
      case 'break':
        return <Coffee className="w-5 h-5 text-orange-600" />;
      case 'presentation':
        return <Presentation className="w-5 h-5 text-purple-600" />;
      case 'awards':
        return <Award className="w-5 h-5 text-gold-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'opening':
        return 'border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 hover:to-amber-50';
      case 'panel':
        return 'border-l-4 border-l-teal-500 bg-gradient-to-r from-teal-50 to-white hover:from-teal-100 hover:to-teal-50';
      case 'break':
        return 'border-l-4 border-l-slate-400 bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50';
      case 'presentation':
        return 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50';
      case 'awards':
        return 'border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50';
      default:
        return 'border-l-4 border-l-gray-400 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50';
    }
  };

  const renderSession = (session: any, index: number, dayKey: string, venueKey: string = '') => {
    const sessionId = `${dayKey}-${venueKey}-${index}`;
    const isExpanded = expandedSessions.includes(sessionId);
    const hasDetails = session.moderator || (session.participants && session.participants.length > 0);

    return (
      <div
        key={sessionId}
        className={`rounded-xl p-4 sm:p-6 mb-4 transition-all duration-300 ${getSessionColor(session.type)} shadow-md hover:shadow-xl group`}
      >
        <div
          className={`${hasDetails ? 'cursor-pointer' : ''} flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4`}
          onClick={hasDetails ? () => toggleSession(sessionId) : undefined}
        >
          <div className="flex items-start gap-3 sm:gap-4 flex-grow">
            <div className="flex-shrink-0 p-2.5 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
              {getSessionIcon(session.type)}
            </div>
            <div className="flex-grow min-w-0">
              <div className="mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm mb-3">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-sm text-gray-900">{session.time}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{session.title}</h3>
              </div>
            </div>
          </div>
          {hasDetails && (
            <button className="self-end sm:self-start sm:mt-1 p-2 rounded-lg bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all shadow-sm hover:shadow-md flex-shrink-0">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>

        {hasDetails && isExpanded && (
          <div className="mt-6 pt-6 border-t-2 border-gray-200/50 animate-fadeIn">
            {session.moderator && (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <h4 className="font-bold text-sm uppercase tracking-wide text-teal-700">Moderador</h4>
                </div>
                <p className="text-gray-800 font-medium ml-6">{session.moderator}</p>
              </div>
            )}

            {session.participants && session.participants.length > 0 && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <h4 className="font-bold text-sm uppercase tracking-wide text-teal-700">Participantes</h4>
                </div>
                <ul className="space-y-3 ml-6">
                  {session.participants.map((participant: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full flex-shrink-0 mt-2 group-hover/item:scale-125 transition-transform"></div>
                      <span className="text-gray-700 leading-relaxed">{participant}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h1 className="text-6xl font-extrabold text-teal-600 mb-4 leading-tight">
              {programData.title}
            </h1>
            <p className="text-2xl text-gray-700 font-light">
              {programData.subtitle}
            </p>
          </div>
        </div>

        {/* Day 1 */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-10 rounded-t-3xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center gap-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold mb-2">{programData.days.day1.date}</h2>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xl font-medium opacity-95">{programData.days.day1.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-b-3xl shadow-2xl border border-gray-100">
            {/* Main Sessions */}
            {programData.days.day1.sessions.map((session: any, index: number) => 
              renderSession(session, index, 'day1')
            )}

            {/* Sala A Sessions */}
            {programData.days.day1.sala_a && (
              <div className="mt-10">
                <div className="flex items-center gap-4 mb-8 p-6 bg-teal-600 rounded-2xl shadow-lg">
                  <div className="p-3 bg-white rounded-xl shadow-md">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white">{programData.days.day1.sala_a.venue}</h3>
                </div>
                {programData.days.day1.sala_a.sessions.map((session: any, index: number) =>
                  renderSession(session, index, 'day1', 'sala_a')
                )}
              </div>
            )}
          </div>
        </div>

        {/* Day 2 */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-10 rounded-t-3xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center gap-6">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold mb-2">{programData.days.day2.date}</h2>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xl font-medium opacity-95">{programData.days.day2.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-b-3xl shadow-2xl border border-gray-100">
            {programData.days.day2.sessions.map((session: any, index: number) => 
              renderSession(session, index, 'day2')
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center py-12">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-slate-100 to-gray-100 rounded-2xl shadow-sm">
            <p className="text-gray-600 italic text-sm font-medium">
              * Este programa está sujeto a cambios y modificaciones
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 sm:py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logos */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-6 sm:mb-8">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
              alt="Africagua Logo"
              className="h-12 sm:h-16 w-auto"
            />
            <a href="https://www.camaradefuerteventura.org" target="_blank" rel="noopener noreferrer">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/logo-camara-fuerteventura-email.png?alt=media&token=64a09d59-abce-4a3e-96fa-88aca412d19c"
                alt="Cámara de Comercio de Fuerteventura"
                className="h-12 sm:h-16 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Credit line and Policy Links */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-500 px-2">
              <span>Página web diseñada por J.M Tordeur de la Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura</span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="transition-transform hover:scale-110"
                aria-label="Ver perfil de J.M Tordeur"
              >
                <img
                  src="/image.png"
                  alt="J.M Tordeur"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
                />
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-2">
              <button
                onClick={() => setIsCookiePolicyOpen(true)}
                className="text-teal-600 hover:text-teal-700 transition-colors py-1"
              >
                Política de cookies
              </button>
              <button
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-teal-600 hover:text-teal-700 transition-colors py-1"
              >
                Política de privacidad
              </button>
              <button
                onClick={() => setIsLegalNoticeOpen(true)}
                className="text-teal-600 hover:text-teal-700 transition-colors py-1"
              >
                Aviso legal
              </button>
            </div>
          </div>
        </div>
      </footer>

      <CookiePolicy
        isOpen={isCookiePolicyOpen}
        onClose={() => setIsCookiePolicyOpen(false)}
      />

      <PrivacyPolicy
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />

      <LegalNotice
        isOpen={isLegalNoticeOpen}
        onClose={() => setIsLegalNoticeOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default ProgramPage;