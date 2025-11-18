import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, Users, Coffee, Award, Presentation, ChevronDown, ChevronUp, Sparkles, User, Globe, Linkedin, Mail, ExternalLink, X, Trophy } from 'lucide-react';
import CookiePolicy from './CookiePolicy';
import PrivacyPolicy from './PrivacyPolicy';
import LegalNotice from './LegalNotice';
import ProfileModal from './ProfileModal';
import Avatar from './Avatar';

const ProgramPage = () => {
  const { t } = useTranslation();
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedJuryMember, setSelectedJuryMember] = useState<any>(null);

  const programData = t('program_page', { returnObjects: true });
  const speakerProfiles = t('speaker_profiles', { returnObjects: true }) as Record<string, any>;
  const juryMembers = t('startup_competition.jury.members', { returnObjects: true }) as any[];

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const toggleSpeakerProfile = (speakerKey: string, participantIndex: string) => {
    const profileKey = `${speakerKey}-${participantIndex}`;
    setExpandedSpeaker(prev => prev === profileKey ? null : profileKey);
  };

  const extractSpeakerNames = (participantText: string): string[] => {
    const parts = participantText.split('|');
    if (parts.length > 1) {
      const namesText = parts[1].trim();
      const separators = [' y ', ' and ', ' und ', ' et ', ' e '];

      for (const separator of separators) {
        if (namesText.includes(separator)) {
          return namesText.split(separator).map(name => name.trim());
        }
      }

      return [namesText];
    }
    return [];
  };

  const extractRolePrefix = (participantText: string): string => {
    const parts = participantText.split('|');
    if (parts.length > 1) {
      return parts[0].trim();
    }
    return participantText;
  };

  const getSpeakerProfile = (speakerName: string) => {
    return speakerProfiles[speakerName] || null;
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'opening':
        return <Award className="w-5 h-5 text-cyan-400" />;
      case 'panel':
        return <Users className="w-5 h-5 text-cyan-500" />;
      case 'break':
        return <Coffee className="w-5 h-5 text-slate-400" />;
      case 'presentation':
        return <Presentation className="w-5 h-5 text-cyan-400" />;
      case 'awards':
        return <Award className="w-5 h-5 text-cyan-300" />;
      default:
        return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'break':
        return 'bg-gray-100 border border-gray-200 hover:shadow-md';
      default:
        return 'bg-white border border-gray-200 hover:shadow-md';
    }
  };

  const renderSession = (session: any, index: number, dayKey: string, venueKey: string = '') => {
    const sessionId = `${dayKey}-${venueKey}-${index}`;
    const isExpanded = expandedSessions.includes(sessionId);
    const hasDetails = session.moderator || (session.participants && session.participants.length > 0) || session.description;
    const isWelcomeCocktail = session.title.includes('Cóctel de bienvenida') || session.title.includes('Welcome cocktail');
    const isJuryDeliberation = session.title.includes('Deliberación jurado') || session.title.includes('Jury deliberation') || session.title.includes('Délibération du jury');

    return (
      <div
        key={sessionId}
        className={`rounded-xl p-5 sm:p-6 transition-all duration-300 ${getSessionColor(session.type)}`}
      >
        <div
          className={`${(hasDetails && !isWelcomeCocktail) || isJuryDeliberation ? 'cursor-pointer' : ''} flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4`}
          onClick={(hasDetails && !isWelcomeCocktail) || isJuryDeliberation ? () => toggleSession(sessionId) : undefined}
        >
          <div className="flex items-start gap-3 sm:gap-4 flex-grow">
            <div className="flex-grow min-w-0 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2c3e50] rounded-full">
                <span className="font-semibold text-sm text-white">{session.time}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{session.title}</h3>
            </div>
          </div>
          {((hasDetails && !isWelcomeCocktail) || isJuryDeliberation) && (
            <button className="self-start p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 flex-shrink-0 border border-gray-300">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>

        {session.description && isWelcomeCocktail && (
          <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{session.description}</p>
          </div>
        )}

        {session.location && session.mapLink && (
          <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
              <div className="flex-grow">
                <h4 className="font-bold text-gray-900 mb-1">{session.location}</h4>
                <p className="text-sm text-gray-700 mb-2">{session.locationAddress}</p>
                <a
                  href={session.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 hover:text-cyan-900 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('program_page.view_on_map')}
                </a>
              </div>
            </div>
          </div>
        )}

        {hasDetails && !isWelcomeCocktail && isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-300 animate-fadeIn">
            {session.description && (
              <div className="mb-6 p-4 sm:p-5 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-800 leading-relaxed text-justify text-sm sm:text-base">{session.description}</p>
              </div>
            )}

            {session.moderator && (
              <div className="mb-6">
                <h4 className="font-bold text-sm uppercase tracking-wide text-gray-700 mb-2">Moderador</h4>
                <p className="text-gray-900 font-medium text-base">{session.moderator}</p>
              </div>
            )}

            {session.participants && session.participants.length > 0 && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide text-gray-700 mb-3">Participantes</h4>
                <ul className="space-y-3">
                  {session.participants.map((participant: string, idx: number) => {
                    const speakerNames = extractSpeakerNames(participant);
                    const rolePrefix = extractRolePrefix(participant);
                    const hasSeparator = participant.includes('|');

                    return (
                      <li key={idx} className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0 mt-2"></div>
                          <div className="flex-grow">
                            {hasSeparator && speakerNames.length > 0 ? (
                              <div className="text-gray-800 leading-relaxed text-sm">
                                <span className="font-normal text-gray-600">{rolePrefix} | </span>
                                {speakerNames.map((name, nameIdx) => {
                                  const profile = getSpeakerProfile(name);
                                  const profileKey = `${sessionId}-${idx}-${nameIdx}`;
                                  const isProfileExpanded = expandedSpeaker === profileKey;

                                  return (
                                    <span key={nameIdx}>
                                      <span className="font-semibold text-gray-900">{name}</span>
                                      {profile && (
                                        <>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleSpeakerProfile(sessionId, `${idx}-${nameIdx}`);
                                            }}
                                            className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-[#2c3e50] hover:bg-[#1a252f] font-medium rounded-full transition-all duration-200"
                                          >
                                            <User className="w-3 h-3" />
                                            {isProfileExpanded ? 'Ocultar' : 'Ver'} biografía
                                          </button>
                                          {isProfileExpanded && (
                                            <div className="ml-0 mt-4 mb-3 p-5 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
                                              <div className="flex flex-col md:flex-row gap-5">
                                                {profile.image && profile.image.trim() !== '' && (
                                                  <div className="flex-shrink-0 flex items-center justify-center md:items-start">
                                                    <img
                                                      src={profile.image}
                                                      alt={profile.name}
                                                      className="w-32 h-32 rounded-lg object-cover object-top border-2 border-gray-300"
                                                    />
                                                  </div>
                                                )}
                                                <div className="flex-grow space-y-2">
                                                  <div>
                                                    <h5 className="text-lg font-bold text-gray-900 mb-1">
                                                      {profile.name}
                                                    </h5>
                                                    <p className="text-sm font-semibold text-gray-700 mb-2">{profile.title}</p>
                                                  </div>
                                                  <div className="h-px bg-gray-300"></div>
                                                  <p className="text-sm text-gray-700 leading-relaxed text-justify">{profile.bio}</p>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      )}
                                      {nameIdx < speakerNames.length - 1 && (
                                        <span className="mx-1">
                                          {participant.includes(' y ') ? ' y ' :
                                           participant.includes(' and ') ? ' and ' :
                                           participant.includes(' und ') ? ' und ' :
                                           participant.includes(' et ') ? ' et ' : ' e '}
                                        </span>
                                      )}
                                    </span>
                                  );
                                })}
                              </div>
                            ) : (
                              <>
                                <span className="text-gray-800 leading-relaxed text-sm font-medium">{participant}</span>
                                {speakerNames.length === 1 && (() => {
                                  const profile = getSpeakerProfile(speakerNames[0]);
                                  const profileKey = `${sessionId}-${idx}`;
                                  const isProfileExpanded = expandedSpeaker === profileKey;

                                  return profile ? (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleSpeakerProfile(sessionId, idx.toString());
                                        }}
                                        className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 text-xs text-white bg-[#2c3e50] hover:bg-[#1a252f] font-medium rounded-full transition-all duration-200"
                                      >
                                        <User className="w-3 h-3" />
                                        {isProfileExpanded ? 'Ocultar' : 'Ver'} biografía
                                      </button>
                                      {isProfileExpanded && (
                                        <div className="ml-0 mt-4 mb-3 p-5 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
                                          <div className="flex flex-col md:flex-row gap-5">
                                            {profile.image && profile.image.trim() !== '' && (
                                              <div className="flex-shrink-0 flex items-center justify-center md:items-start">
                                                <img
                                                  src={profile.image}
                                                  alt={profile.name}
                                                  className="w-32 h-32 rounded-lg object-cover object-top border-2 border-gray-300"
                                                />
                                              </div>
                                            )}
                                            <div className="flex-grow space-y-2">
                                              <div>
                                                <h5 className="text-lg font-bold text-gray-900 mb-1">
                                                  {profile.name}
                                                </h5>
                                                <p className="text-sm font-semibold text-gray-700 mb-2">{profile.title}</p>
                                              </div>
                                              <div className="h-px bg-gray-300"></div>
                                              <p className="text-sm text-gray-700 leading-relaxed text-justify">{profile.bio}</p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ) : null;
                                })()}
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        {isJuryDeliberation && isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-300 animate-fadeIn">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full text-teal-600 font-medium mb-6">
                <Trophy className="w-5 h-5" />
                {t('startup_competition.jury.expert_panel')}
              </div>
              <h4 className="font-bold text-2xl text-gray-900 mb-2">{t('startup_competition.jury.title')}</h4>
              <p className="text-base text-gray-600 mb-6">{t('startup_competition.jury.description')}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {juryMembers.map((member: any, idx: number) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-2/5 relative overflow-hidden h-[350px] md:h-auto">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{
                          objectPosition: "center 20%",
                          minHeight: "350px"
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
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-[#0a1929] via-[#1a2f42] to-[#0d2235] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q25 10, 50 20 T100 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
              <path d="M0 25 Q25 15, 50 25 T100 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 right-0 text-white/40 text-xs sm:text-sm italic">
            *Programa sujeto a cambios
          </div>

          <div className="mb-8">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
              alt="Africagua Logo"
              className="h-20 sm:h-28 w-auto mx-auto brightness-0 invert mb-6"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              20 y 21 Noviembre de 2025
            </h2>
            <p className="text-lg sm:text-xl text-white/80 italic font-light mb-8">
              Foro Internacional de agua y energía Fuerteventura
            </p>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-wider">
            PROGRAMA
          </h1>
        </div>

        <div className="mb-16">
          <div className="bg-[#1a2332] text-white p-6 sm:p-8 rounded-2xl mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{programData.days.day1.date}</h2>
          </div>

          <div className="space-y-5">
            {/* Main Sessions */}
            {programData.days.day1.sessions.map((session: any, index: number) => 
              renderSession(session, index, 'day1')
            )}

            {programData.days.day1.sala_a && (
              <div className="mt-8">
                <div className="bg-[#1a2332] text-white p-5 sm:p-6 rounded-xl mb-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{programData.days.day1.sala_a.venue}</h3>
                </div>
                {programData.days.day1.sala_a.sessions.map((session: any, index: number) =>
                  renderSession(session, index, 'day1', 'sala_a')
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-[#1a2332] text-white p-6 sm:p-8 rounded-2xl mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{programData.days.day2.date}</h2>
          </div>

          <div className="space-y-5">
            {programData.days.day2.sessions.map((session: any, index: number) =>
              renderSession(session, index, 'day2')
            )}
          </div>
        </div>

        <div className="text-center py-12">
          <p className="text-white/60 italic text-sm">
            * Este programa está sujeto a cambios y modificaciones
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0d1a26] py-6 sm:py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logos */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-6 sm:mb-8">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
              alt="Africagua Logo"
              className="h-12 sm:h-16 w-auto brightness-0 invert"
            />
            <a href="https://www.camaradefuerteventura.org" target="_blank" rel="noopener noreferrer">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/logo-camara-fuerteventura-email.png?alt=media&token=64a09d59-abce-4a3e-96fa-88aca412d19c"
                alt="Cámara de Comercio de Fuerteventura"
                className="h-12 sm:h-16 w-auto brightness-0 invert hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Credit line and Policy Links */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-white/60 px-2">
              <span>Página web diseñada por J.M Tordeur de la Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura</span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="transition-transform hover:scale-110"
                aria-label="Ver perfil de J.M Tordeur"
              >
                <Avatar
                  src="/Captura de pantalla 2025-10-21 090729.png"
                  alt="J.M Tordeur"
                  name="Jean Michel Jimmy Tordeur"
                  size="medium"
                  className="cursor-pointer"
                />
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-2">
              <button
                onClick={() => setIsCookiePolicyOpen(true)}
                className="text-white/70 hover:text-white transition-colors py-1"
              >
                Política de cookies
              </button>
              <button
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-white/70 hover:text-white transition-colors py-1"
              >
                Política de privacidad
              </button>
              <button
                onClick={() => setIsLegalNoticeOpen(true)}
                className="text-white/70 hover:text-white transition-colors py-1"
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

export default ProgramPage;