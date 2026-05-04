import React, { useState, useRef } from 'react';
import { MapPin, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero2027 = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) videoRef.current.muted = newMuted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = newMuted;
  };

  return (
    <>
      {/* Africagua 2027 Senegal Announcement Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-800 via-teal-700 to-amber-600 pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.3),transparent_50%)]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-pulse">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span className="text-amber-100 text-sm font-medium tracking-wide uppercase">{t('hero2027.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            {t('hero2027.title')}
            <span className="block text-amber-300 mt-2">{t('hero2027.subtitle')}</span>
          </h2>
          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
            {t('hero2027.description')}
          </p>
        </div>
      </div>

      {/* Desktop Video */}
      <div className="relative hidden md:block h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.jpg?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
          title="Africagua 2027 - Foro Internacional de Agua y Energías Renovables"
          aria-label="Video promocional de Africagua 2027"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/ACTU%20AFRICAGUA%2FIMG_5079.MP4?alt=media&token=a8e923f9-3a47-436c-9e82-5cd025691b22"
            type="video/mp4"
          />
          Tu navegador no soporta el video.
        </video>
        <button
          onClick={toggleMute}
          className="absolute bottom-6 left-6 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label={isMuted ? 'Activar audio' : 'Desactivar audio'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Video */}
      <div className="relative md:hidden h-[60vh] overflow-hidden">
        <video
          ref={mobileVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.jpg?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
          title="Africagua 2027 - Foro Internacional de Agua y Energías Renovables"
          aria-label="Video promocional de Africagua 2027"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/ACTU%20AFRICAGUA%2FIMG_5079.MP4?alt=media&token=a8e923f9-3a47-436c-9e82-5cd025691b22"
            type="video/mp4"
          />
          Tu navegador no soporta el video.
        </video>
        <button
          onClick={toggleMute}
          className="absolute bottom-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label={isMuted ? 'Activar audio' : 'Desactivar audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </>
  );
};

export default Hero2027;
