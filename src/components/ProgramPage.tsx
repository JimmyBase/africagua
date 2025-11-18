import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, Users, Coffee, Award, Presentation, ChevronDown, ChevronUp, Sparkles, User, Globe, Linkedin, Mail, ExternalLink } from 'lucide-react';
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

  const programData = t('program_page', { returnObjects: true });
  const speakerProfiles = t('speaker_profiles', { returnObjects: true }) as Record<string, any>;

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
      case 'opening':
        return 'border-l-[3px] border-l-cyan-400 bg-gradient-to-br from-white via-cyan-50/30 to-white hover:via-cyan-50/50';
      case 'panel':
        return 'border-l-[3px] border-l-teal-500 bg-gradient-to-br from-white via-teal-50/30 to-white hover:via-teal-50/50';
      case 'break':
        return 'border-l-[3px] border-l-gray-300 bg-gradient-to-br from-white via-gray-50/50 to-white hover:via-gray-100/50';
      case 'presentation':
        return 'border-l-[3px] border-l-cyan-500 bg-gradient-to-br from-white via-cyan-50/40 to-white hover:via-cyan-50/60';
      case 'awards':
        return 'border-l-[3px] border-l-amber-400 bg-gradient-to-br from-white via-amber-50/30 to-white hover:via-amber-50/50';
      default:
        return 'border-l-[3px] border-l-slate-300 bg-gradient-to-br from-white via-slate-50/30 to-white hover:via-slate-50/50';
    }
  };

  const renderSession = (session: any, index: number, dayKey: string, venueKey: string = '') => {
    const sessionId = `${dayKey}-${venueKey}-${index}`;
    const isExpanded = expandedSessions.includes(sessionId);
    const hasDetails = session.moderator || (session.participants && session.participants.length > 0) || session.description;

    return (
      <div
        key={sessionId}
        className={`relative rounded-2xl p-6 sm:p-8 mb-6 transition-all duration-500 ${getSessionColor(session.type)} session-card-shadow hover:session-card-shadow-hover hover:scale-[1.01] group overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400/5 to-cyan-400/5 rounded-full blur-3xl -z-0 group-hover:from-teal-400/10 group-hover:to-cyan-400/10 transition-all duration-700"></div>

        <div
          className={`${hasDetails ? 'cursor-pointer' : ''} relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6`}
          onClick={hasDetails ? () => toggleSession(sessionId) : undefined}
        >
          <div className="flex items-start gap-4 sm:gap-5 flex-grow">
            <div className="flex-shrink-0 p-3 sm:p-3.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-teal-100/50">
              {getSessionIcon(session.type)}
            </div>
            <div className="flex-grow min-w-0 space-y-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                <Clock className="w-4 h-4 text-white" />
                <span className="font-bold text-sm text-white tracking-wide">{session.time}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight tracking-tight">{session.title}</h3>
            </div>
          </div>
          {hasDetails && (
            <button className="self-end sm:self-start sm:mt-1 p-3 rounded-xl bg-gradient-to-br from-white to-teal-50/30 hover:from-teal-50/50 hover:to-teal-100/50 text-teal-600 hover:text-teal-700 transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0 border border-teal-100/50">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>

        {hasDetails && isExpanded && (
          <div className="relative z-10 mt-8 pt-8 border-t border-gray-200/70 animate-fadeIn">
            {session.description && (
              <div className="stagger-item mb-8 p-6 sm:p-7 bg-gradient-to-br from-teal-50/40 via-cyan-50/30 to-white rounded-2xl shadow-lg border border-teal-100/50 backdrop-blur-sm">
                <p className="text-gray-800 leading-relaxed text-justify text-base sm:text-lg">{session.description}</p>
              </div>
            )}

            {session.moderator && (
              <div className="stagger-item mb-8 p-6 sm:p-7 bg-gradient-to-br from-white via-teal-50/20 to-white rounded-2xl shadow-lg border border-teal-100/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-teal-100">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <h4 className="font-bold text-base uppercase tracking-wider text-teal-700">Moderador</h4>
                </div>
                <p className="text-gray-900 font-semibold text-lg ml-11">{session.moderator}</p>
              </div>
            )}

            {session.participants && session.participants.length > 0 && (
              <div className="stagger-item p-6 sm:p-7 bg-gradient-to-br from-white via-cyan-50/20 to-white rounded-2xl shadow-lg border border-cyan-100/50">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-cyan-100">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h4 className="font-bold text-base uppercase tracking-wider text-cyan-700">Participantes</h4>
                </div>
                <ul className="space-y-4 ml-11">
                  {session.participants.map((participant: string, idx: number) => {
                    const speakerNames = extractSpeakerNames(participant);
                    const rolePrefix = extractRolePrefix(participant);
                    const hasSeparator = participant.includes('|');

                    return (
                      <li key={idx} className="flex flex-col gap-4">
                        <div className="flex items-start gap-4 group/item">
                          <div className="w-2 h-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex-shrink-0 mt-2 group-hover/item:scale-125 group-hover/item:shadow-lg transition-all duration-300"></div>
                          <div className="flex-grow">
                            {hasSeparator && speakerNames.length > 0 ? (
                              <div className="text-gray-800 leading-relaxed text-base">
                                <span className="font-medium text-gray-600">{rolePrefix} | </span>
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
                                            className="ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                                          >
                                            <User className="w-3.5 h-3.5" />
                                            {isProfileExpanded ? 'Ocultar' : 'Ver'} biografía
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProfileExpanded ? 'rotate-180' : ''}`} />
                                          </button>
                                          {isProfileExpanded && (
                                            <div className="ml-6 mt-5 mb-4 p-8 bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 rounded-3xl shadow-2xl border-2 border-teal-200/60 animate-fadeIn relative overflow-hidden">
                                              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
                                              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
                                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
                                                <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(13, 148, 136, 0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                                              </div>

                                              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                                <div className="flex-shrink-0 flex items-center justify-center md:items-start">
                                                  <div className="relative group/avatar">
                                                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-60 group-hover/avatar:opacity-90 transition-all duration-500 animate-glow"></div>
                                                    <div className="relative">
                                                      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-2xl"></div>
                                                      <img
                                                        src={profile.image}
                                                        alt={profile.name}
                                                        className="relative w-44 h-44 rounded-2xl object-cover object-top shadow-2xl ring-4 ring-white/90"
                                                      />
                                                      <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-3 rounded-xl shadow-2xl border-4 border-white">
                                                        <User className="w-5 h-5" />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="flex-grow space-y-4">
                                                  <div>
                                                    <h5 className="text-2xl font-black text-gray-900 mb-2 flex flex-wrap items-center gap-3">
                                                      {profile.name}
                                                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white shadow-lg">
                                                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                                                        Ponente
                                                      </span>
                                                    </h5>
                                                    <p className="text-base font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">{profile.title}</p>
                                                  </div>
                                                  <div className="h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
                                                  <p className="text-base text-gray-700 leading-relaxed text-justify">{profile.bio}</p>
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
                                <span className="text-gray-800 leading-relaxed text-base font-medium">{participant}</span>
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
                                        className="ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                                      >
                                        <User className="w-3.5 h-3.5" />
                                        {isProfileExpanded ? 'Ocultar' : 'Ver'} biografía
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProfileExpanded ? 'rotate-180' : ''}`} />
                                      </button>
                                      {isProfileExpanded && (
                                        <div className="ml-6 mt-5 mb-4 p-8 bg-gradient-to-br from-white via-teal-50/40 to-cyan-50/30 rounded-3xl shadow-2xl border-2 border-teal-200/60 animate-fadeIn relative overflow-hidden">
                                          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
                                          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
                                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
                                            <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(13, 148, 136, 0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                                          </div>

                                          <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                            <div className="flex-shrink-0 flex items-center justify-center md:items-start">
                                              <div className="relative group/avatar">
                                                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 rounded-3xl blur-lg opacity-60 group-hover/avatar:opacity-90 transition-all duration-500 animate-glow"></div>
                                                <div className="relative">
                                                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-2xl"></div>
                                                  <img
                                                    src={profile.image}
                                                    alt={profile.name}
                                                    className="relative w-44 h-44 rounded-2xl object-cover object-top shadow-2xl ring-4 ring-white/90"
                                                  />
                                                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-3 rounded-xl shadow-2xl border-4 border-white">
                                                    <User className="w-5 h-5" />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex-grow space-y-4">
                                              <div>
                                                <h5 className="text-2xl font-black text-gray-900 mb-2 flex flex-wrap items-center gap-3">
                                                  {profile.name}
                                                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white shadow-lg">
                                                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                                                    Ponente
                                                  </span>
                                                </h5>
                                                <p className="text-base font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">{profile.title}</p>
                                              </div>
                                              <div className="h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>
                                              <p className="text-base text-gray-700 leading-relaxed text-justify">{profile.bio}</p>
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
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-50 via-white to-teal-50/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(13, 148, 136, 0.4) 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 blur-3xl opacity-20 rounded-full animate-glow"></div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight pb-2 relative tracking-tight">
              {programData.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-medium relative">
              {programData.subtitle}
            </p>
          </div>
        </div>

        <div className="mb-24">
          <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 text-white p-12 rounded-t-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBjMjUgMCAyNSAxMCA1MCAxMHMyNS0xMCA1MC0xMCA1MCAxMCA1MCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YXZlcykiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-center gap-8">
              <div className="p-5 bg-white/20 rounded-3xl backdrop-blur-md border-2 border-white/30 shadow-2xl">
                <Calendar className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black mb-3 text-white tracking-tight">{programData.days.day1.date}</h2>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-white/90" />
                  <span className="text-xl sm:text-2xl font-semibold text-white/95">{programData.days.day1.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect-strong p-10 sm:p-12 rounded-b-3xl shadow-2xl border-x-2 border-b-2 border-teal-100/50">
            {/* Main Sessions */}
            {programData.days.day1.sessions.map((session: any, index: number) => 
              renderSession(session, index, 'day1')
            )}

            {programData.days.day1.sala_a && (
              <div className="mt-12">
                <div className="flex items-center gap-5 mb-10 p-8 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBjMjUgMCAyNSAxMCA1MCAxMHMyNS0xMCA1MC0xMCA1MCAxMCA1MCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YXZlcykiLz48L3N2Zz4=')] opacity-30"></div>
                  <div className="p-4 bg-white/20 rounded-2xl shadow-lg border-2 border-white/30 relative z-10 backdrop-blur-md">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white relative z-10 tracking-tight">{programData.days.day1.sala_a.venue}</h3>
                </div>
                {programData.days.day1.sala_a.sessions.map((session: any, index: number) =>
                  renderSession(session, index, 'day1', 'sala_a')
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-24">
          <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 text-white p-12 rounded-t-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBjMjUgMCAyNSAxMCA1MCAxMHMyNS0xMCA1MC0xMCA1MCAxMCA1MCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YXZlcykiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-center gap-8">
              <div className="p-5 bg-white/20 rounded-3xl backdrop-blur-md border-2 border-white/30 shadow-2xl">
                <Calendar className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-black mb-3 text-white tracking-tight">{programData.days.day2.date}</h2>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-white/90" />
                  <span className="text-xl sm:text-2xl font-semibold text-white/95">{programData.days.day2.venue}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect-strong p-10 sm:p-12 rounded-b-3xl shadow-2xl border-x-2 border-b-2 border-teal-100/50">
            {programData.days.day2.sessions.map((session: any, index: number) => 
              renderSession(session, index, 'day2')
            )}
          </div>
        </div>

        <div className="text-center py-16">
          <div className="inline-block px-10 py-5 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 rounded-2xl shadow-lg border border-teal-200/50">
            <p className="text-gray-700 italic text-base font-semibold">
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
                className="text-[#2c5f6f] hover:text-cyan-600 transition-colors py-1"
              >
                Política de cookies
              </button>
              <button
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-[#2c5f6f] hover:text-cyan-600 transition-colors py-1"
              >
                Política de privacidad
              </button>
              <button
                onClick={() => setIsLegalNoticeOpen(true)}
                className="text-[#2c5f6f] hover:text-cyan-600 transition-colors py-1"
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