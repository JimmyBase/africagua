import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ThankYouCarousel = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    {
      src: '/363 (1).jpg',
      alt: 'Africagua 2025 - International participants with flags'
    },
    {
      src: '/121.jpg',
      alt: 'Africagua 2025 - Unity and solidarity handshake moment'
    },
    {
      src: '/368 (1).jpg',
      alt: 'Africagua 2025 - Partnership and collaboration handshake'
    },
    {
      src: '/023.jpg',
      alt: 'Africagua 2025 - Main conference plenary session with international speakers'
    },
    {
      src: '/542.jpg',
      alt: 'Africagua 2025 - Award ceremony with participant'
    },
    {
      src: '/037.jpg',
      alt: 'Africagua 2025 - International flags display at the venue entrance'
    },
    {
      src: '/202.jpg',
      alt: 'Africagua 2025 - Business networking and agreement moment'
    },
    {
      src: '/534.jpg',
      alt: 'Africagua 2025 - Global Startup Competition award presentation'
    },
    {
      src: '/AFRICAGUA 2025.jpg',
      alt: 'Africagua 2025 - Official delegation and VIP guests group photo'
    },
    {
      src: '/279.jpg',
      alt: 'Africagua 2025 - Panel discussion on water and renewable energy cooperation'
    },
    {
      src: '/521.jpg',
      alt: 'Africagua 2025 - Team collaboration and partnership'
    },
    {
      src: '/232.jpg',
      alt: 'Africagua 2025 - Women leaders panel on project financing'
    },
    {
      src: '/419.jpg',
      alt: 'Africagua 2025 - Global Startup Competition winners'
    }
  ];

  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  const handleManualNavigation = (action: () => void) => {
    setIsPaused(true);
    action();
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('thankyou.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('thankyou.message')}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-gray-100">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            <button
              onClick={() => handleManualNavigation(prevSlide)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 group"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleManualNavigation(nextSlide)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 group"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNavigation(() => goToSlide(index))}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? 'bg-white w-8 sm:w-10 h-2.5 sm:h-3'
                      : 'bg-white/60 hover:bg-white/80 w-2.5 sm:w-3 h-2.5 sm:h-3'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouCarousel;
