import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar, MapPin, Clock, Users, Coffee, Award, Presentation,
  ChevronDown, ChevronUp, Sparkles, User, Bookmark, Search,
  Filter, Download, Share2, X, Star, Building2
} from 'lucide-react';
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
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2'>('day1');
  const [bookmarkedSessions, setBookmarkedSessions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const programData = t('program_page', { returnObjects: true });
  const speakerProfiles = t('speaker_profiles', { returnObjects: true }) as Record<string, any>;

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('africagua_bookmarks');
    if (savedBookmarks) {
      setBookmarkedSessions(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBookmark = (sessionId: string) => {
    const newBookmarks = new Set(bookmarkedSessions);
    if (newBookmarks.has(sessionId)) {
      newBookmarks.delete(sessionId);
    } else {
      newBookmarks.add(sessionId);
    }
    setBookmarkedSessions(newBookmarks);
    localStorage.setItem('africagua_bookmarks', JSON.stringify([...newBookmarks]));
  };

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

  const extractSpeakerName = (participantText: string): string => {
    const parts = participantText.split('|');
    if (parts.length > 1) {
      return parts[1].trim();
    }
    return '';
  };

  const getSpeakerProfile = (speakerName: string) => {
    return speakerProfiles[speakerName] || null;
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'opening':
        return <Award className="w-5 h-5 text-gold-500" />;
      case 'panel':
        return <Users className="w-5 h-5 text-navy-600" />;
      case 'break':
        return <Coffee className="w-5 h-5 text-slate-500" />;
      case 'presentation':
        return <Presentation className="w-5 h-5 text-navy-700" />;
      case 'awards':
        return <Award className="w-5 h-5 text-gold-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const getSessionBadge = (type: string) => {
    switch (type) {
      case 'opening':
        return <span className="premium-badge badge-keynote">Apertura</span>;
      case 'panel':
        return <span className="premium-badge badge-panel">Panel</span>;
      case 'presentation':
        return <span className="premium-badge badge-workshop">Presentación</span>;
      case 'awards':
        return <span className="premium-badge badge-keynote">Premios</span>;
      case 'break':
        return <span className="premium-badge badge-break">Pausa</span>;
      default:
        return null;
    }
  };

  const renderSession = (session: any, index: number, dayKey: string, venueKey: string = '') => {
    const sessionId = `${dayKey}-${venueKey}-${index}`;
    const isExpanded = expandedSessions.includes(sessionId);
    const isBookmarked = bookmarkedSessions.has(sessionId);
    const hasDetails = session.moderator || (session.participants && session.participants.length > 0);

    if (filterType !== 'all' && session.type !== filterType) {
      return null;
    }

    if (searchQuery && !session.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return null;
    }

    return (
      <div
        key={sessionId}
        className="session-card-premium p-6 mb-6 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-navy-50 to-slate-50 shadow-sm">
                {getSessionIcon(session.type)}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-navy-700 to-navy-800 rounded-full shadow-md border border-navy-600">
                  <Clock className="w-4 h-4 text-gold-300" />
                  <span className="font-semibold text-sm text-white">{session.time}</span>
                </div>
                {getSessionBadge(session.type)}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 leading-tight mb-2">
              {session.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(sessionId)}
              className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
              aria-label={isBookmarked ? 'Quitar marcador' : 'Añadir marcador'}
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? 'fill-gold-600 text-gold-600' : 'text-slate-400'}`}
              />
            </button>
            {hasDetails && (
              <button
                onClick={() => toggleSession(sessionId)}
                className="p-2 rounded-full bg-slate-100 hover:bg-navy-100 text-slate-700 hover:text-navy-700 transition-all shadow-sm hover:shadow-md"
              >
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {hasDetails && isExpanded && (
          <div className="mt-6 pt-6 border-t-2 border-slate-100 animate-slide-up">
            {session.moderator && (
              <div className="mb-6 p-5 bg-gradient-to-r from-navy-50 to-slate-50 rounded-xl border-l-4 border-navy-600 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-navy-600" />
                  <h4 className="font-bold text-sm uppercase tracking-wide text-navy-700">Moderador</h4>
                </div>
                <p className="text-navy-900 font-semibold ml-7">{session.moderator}</p>
              </div>
            )}

            {session.participants && session.participants.length > 0 && (
              <div className="p-5 bg-gradient-to-r from-gold-50/30 to-slate-50 rounded-xl border-l-4 border-gold-500 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-gold-600" />
                  <h4 className="font-bold text-sm uppercase tracking-wide text-navy-700">Participantes</h4>
                </div>
                <ul className="space-y-4 ml-7">
                  {session.participants.map((participant: string, idx: number) => {
                    const speakerName = extractSpeakerName(participant);
                    const profile = getSpeakerProfile(speakerName);
                    const profileKey = `${sessionId}-${idx}`;
                    const isProfileExpanded = expandedSpeaker === profileKey;

                    return (
                      <li key={idx} className="flex flex-col gap-3">
                        <div className="flex items-start gap-3 group">
                          <Star className="w-4 h-4 text-gold-500 flex-shrink-0 mt-1" />
                          <div className="flex-grow">
                            <span className="text-slate-800 font-medium leading-relaxed">{participant}</span>
                            {profile && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSpeakerProfile(sessionId, idx.toString());
                                }}
                                className="ml-3 inline-flex items-center gap-1 text-xs text-navy-600 hover:text-navy-800 font-semibold transition-colors"
                              >
                                <User className="w-3.5 h-3.5" />
                                {isProfileExpanded ? 'Ocultar' : 'Ver'} biografía
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isProfileExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>
                        </div>

                        {profile && isProfileExpanded && (
                          <div className="ml-7 mt-2 p-5 bg-white rounded-xl shadow-xl border-2 border-navy-100 animate-fade-in">
                            <div className="flex flex-col md:flex-row gap-5">
                              <div className="flex-shrink-0 flex items-center justify-center md:items-start">
                                <img
                                  src={profile.image}
                                  alt={profile.name}
                                  className="w-32 h-32 rounded-xl object-cover object-top shadow-lg ring-4 ring-navy-100"
                                />
                              </div>
                              <div className="flex-grow">
                                <h5 className="text-xl font-bold text-navy-900 mb-1">{profile.name}</h5>
                                <p className="text-sm font-semibold text-gold-600 mb-4">{profile.title}</p>
                                <p className="text-sm text-slate-700 leading-relaxed text-justify">{profile.bio}</p>
                              </div>
                            </div>
                          </div>
                        )}
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-navy-50/30">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/5 via-transparent to-gold-900/5 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16 animate-fade-in-down">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-navy-600 to-gold-500 blur-3xl opacity-10 rounded-full"></div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight relative">
                <span className="text-gradient-navy">{programData.title}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 font-light relative mb-8">
                {programData.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 relative">
                <button
                  onClick={() => setSelectedDay('day1')}
                  className={`day-selector ${selectedDay === 'day1' ? 'active' : ''}`}
                >
                  <Calendar className="w-5 h-5" />
                  Día 1
                </button>
                <button
                  onClick={() => setSelectedDay('day2')}
                  className={`day-selector ${selectedDay === 'day2' ? 'active' : ''}`}
                >
                  <Calendar className="w-5 h-5" />
                  Día 2
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar sesiones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-navy-500 focus:ring-4 focus:ring-navy-100 transition-all outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border-2 border-slate-300 hover:border-navy-500 hover:bg-slate-200 text-slate-700 hover:text-navy-800 font-semibold transition-all shadow-sm hover:shadow-md"
              >
                <Filter className="w-5 h-5" />
                Filtros
              </button>
              <button
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-navy-700 to-navy-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-navy-600"
                style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
              >
                <Download className="w-5 h-5 text-white" />
                <span className="hidden sm:inline text-white">Descargar PDF</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-200 animate-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-navy-600" />
                <h3 className="font-bold text-navy-900">Filtrar por tipo de sesión</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFilterType('all')}
                  className={`filter-chip ${filterType === 'all' ? 'active' : ''}`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilterType('opening')}
                  className={`filter-chip ${filterType === 'opening' ? 'active' : ''}`}
                >
                  Apertura
                </button>
                <button
                  onClick={() => setFilterType('panel')}
                  className={`filter-chip ${filterType === 'panel' ? 'active' : ''}`}
                >
                  Paneles
                </button>
                <button
                  onClick={() => setFilterType('presentation')}
                  className={`filter-chip ${filterType === 'presentation' ? 'active' : ''}`}
                >
                  Presentaciones
                </button>
              </div>
            </div>
          )}

          {selectedDay === 'day1' && (
            <div className="mb-20 animate-fade-in">
              <div className="gradient-navy-gold text-white p-8 sm:p-12 rounded-t-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
                <div className="relative flex items-center gap-6">
                  <div className="p-4 bg-gold-500/20 rounded-2xl backdrop-blur-sm border-2 border-gold-400/30 shadow-xl">
                    <Calendar className="w-10 h-10 text-gold-300" />
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">{programData.days.day1.date}</h2>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gold-300" />
                      <span className="text-lg sm:text-xl font-medium text-slate-100">{programData.days.day1.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-b-3xl shadow-2xl border-x border-b border-slate-200">
                {programData.days.day1.sessions.map((session: any, index: number) =>
                  renderSession(session, index, 'day1')
                )}

                {programData.days.day1.sala_a && (
                  <div className="mt-12">
                    <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-navy-700 to-navy-800 rounded-2xl shadow-xl">
                      <div className="p-3 bg-gold-500/20 rounded-xl shadow-md border-2 border-gold-400/30">
                        <Building2 className="w-6 h-6 text-gold-300" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{programData.days.day1.sala_a.venue}</h3>
                    </div>
                    {programData.days.day1.sala_a.sessions.map((session: any, index: number) =>
                      renderSession(session, index, 'day1', 'sala_a')
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedDay === 'day2' && (
            <div className="mb-20 animate-fade-in">
              <div className="gradient-navy-gold text-white p-8 sm:p-12 rounded-t-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
                <div className="relative flex items-center gap-6">
                  <div className="p-4 bg-gold-500/20 rounded-2xl backdrop-blur-sm border-2 border-gold-400/30 shadow-xl">
                    <Calendar className="w-10 h-10 text-gold-300" />
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">{programData.days.day2.date}</h2>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gold-300" />
                      <span className="text-lg sm:text-xl font-medium text-slate-100">{programData.days.day2.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-b-3xl shadow-2xl border-x border-b border-slate-200">
                {programData.days.day2.sessions.map((session: any, index: number) =>
                  renderSession(session, index, 'day2')
                )}
              </div>
            </div>
          )}

          <div className="text-center py-12">
            <div className="inline-block px-8 py-5 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl shadow-lg border border-slate-200">
              <p className="text-slate-600 italic text-sm font-medium">
                * Este programa está sujeto a cambios y modificaciones
              </p>
            </div>
          </div>
        </div>
      </div>

      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-navy-700 to-navy-800 text-white shadow-2xl hover:shadow-glow-navy transition-all hover:scale-110 z-40 animate-bounce-gentle"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <footer className="bg-white py-6 sm:py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-slate-600 px-2">
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
                className="text-navy-600 hover:text-navy-800 transition-colors py-1 font-medium"
              >
                Política de cookies
              </button>
              <button
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-navy-600 hover:text-navy-800 transition-colors py-1 font-medium"
              >
                Política de privacidad
              </button>
              <button
                onClick={() => setIsLegalNoticeOpen(true)}
                className="text-navy-600 hover:text-navy-800 transition-colors py-1 font-medium"
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
