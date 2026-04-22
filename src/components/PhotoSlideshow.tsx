import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchSlidePhotos } from '../lib/firebase';

const FOLDER = 'SLIDE ACTUALIZADO DE FOTOS';

const PhotoSlideshow = () => {
  const { i18n } = useTranslation();
  const [photos, setPhotos] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchSlidePhotos(FOLDER).then((urls) => {
      setPhotos(urls);
      setLoading(false);
    });
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (isPaused || photos.length === 0) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [isPaused, next, photos.length]);

  const handleNav = (action: () => void) => {
    setIsPaused(true);
    action();
    setTimeout(() => setIsPaused(false), 10000);
  };

  const titles: Record<string, { heading: string; sub: string }> = {
    es: { heading: 'Galería de Imágenes', sub: 'Momentos destacados de Africagua 2025' },
    en: { heading: 'Photo Gallery', sub: 'Highlights from Africagua 2025' },
    fr: { heading: 'Galerie Photos', sub: 'Moments forts d\'Africagua 2025' },
    de: { heading: 'Fotogalerie', sub: 'Höhepunkte von Africagua 2025' },
    it: { heading: 'Galleria Fotografica', sub: 'I momenti salienti di Africagua 2025' },
  };

  const lang = i18n.language?.slice(0, 2) || 'es';
  const { heading, sub } = titles[lang] ?? titles['es'];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Camera className="w-4 h-4" />
            <span>Africagua 2025</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {sub}
          </p>
        </div>

        {loading ? (
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-[16/9] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
              <Camera className="w-16 h-16 text-gray-300" />
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        ) : photos.length === 0 ? null : (
          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main slide */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              {photos.map((url, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    current === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Africagua 2025 - foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full">
                {current + 1} / {photos.length}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => handleNav(prev)}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 group hover:scale-110"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => handleNav(next)}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 group hover:scale-110"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden max-w-5xl mx-auto">
              <div
                key={current}
                className={`h-full bg-teal-500 rounded-full ${
                  isPaused ? '' : 'animate-progress-bar'
                }`}
                style={{
                  animation: isPaused ? 'none' : 'progressBar 5s linear forwards',
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress-bar {
          animation: progressBar 5s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default PhotoSlideshow;
