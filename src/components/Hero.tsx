import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NewsModal from './NewsModal';

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNobelModalOpen, setIsNobelModalOpen] = useState(false);
  const totalSlides = 2;
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const nobelArticle = {
    title: 'El Nobel de Química 2025 premia una innovación clave para el futuro del agua y la sostenibilidad',
    content: `
      <p>El Premio Nobel de Química 2025 ha sido concedido a Omar M. Yaghi, Susumu Kitagawa y Stuart L. Robson por el desarrollo de las estructuras metal-orgánicas (MOF, por sus siglas en inglés), conocidas también como esponjas moleculares. Se trata de materiales con una estructura porosa que permite capturar y almacenar moléculas de gases o líquidos con una eficiencia sin precedentes, abriendo nuevas vías para el tratamiento del agua, la captura de CO₂ y la producción de energía limpia.</p>

      <p>Estas "esponjas" están formadas por átomos metálicos unidos mediante compuestos orgánicos, creando una red tridimensional que puede atrapar contaminantes o separar moléculas de forma selectiva. Sus aplicaciones son amplias: desde la purificación de aguas y la eliminación de contaminantes, hasta el almacenamiento de hidrógeno o la captura de gases de efecto invernadero.</p>

      <h3 style="font-weight: bold; font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 1rem;">Ciencia e innovación al servicio de los objetivos de desarrollo sostenible</h3>

      <p>Este reconocimiento internacional subraya la importancia de la investigación científica como motor de la transición ecológica y la sostenibilidad global, e ilustra cómo los avances en química de materiales pueden ofrecer soluciones concretas a los grandes desafíos ambientales de nuestro tiempo: la gestión eficiente del agua, la reducción de emisiones y la optimización energética.</p>

      <h3 style="font-weight: bold; font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 1rem;">Un descubrimiento en sintonía con el espíritu de Africagua Canarias 2025</h3>

      <p>Desde la Cámara de Comercio de Fuerteventura, organizadora de Africagua Canarias 2025, celebramos este hito científico por su estrecha relación con los valores que inspiran el foro internacional de agua y energías renovables: la innovación, la cooperación internacional y la búsqueda de soluciones sostenibles que mejoren la gestión de los recursos naturales.</p>

      <p>Africagua Canarias 2025, que se celebrará los días 20 y 21 de noviembre de 2025 en el Palacio de Formación y Congresos de Fuerteventura, reunirá a expertos, instituciones, empresas y organismos de Europa, África y América para abordar precisamente estos retos: cómo avanzar hacia una economía más limpia, resiliente y sostenible, con el agua y la energía como ejes estratégicos.</p>

      <p>El descubrimiento de los MOF —ahora reconocido con el Nobel— recuerda la relevancia del conocimiento científico en la transformación hacia un futuro más sostenible, una visión compartida por los participantes y entidades que forman parte de Africagua Canarias 2025.</p>
    `,
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/news%2FNOTICIAS%20DE%20SLIDESHOW%2Fnobel%20quimica%20(1).png?alt=media&token=ac9fd254-0eb7-4dec-b962-d8f268c5c763',
    createdAt: new Date('2025-10-15')
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleVideoEnded = () => {
    nextSlide();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Desktop Version */}
      <div className="relative hidden md:block h-screen overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/95 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/95 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Registration Button */}
        <div className="absolute bottom-8 right-8 z-10">
          <a
            href="https://eventosccf.netlify.app/eventos/-OJJMdGgVrnpZVJJdFDL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white/95 text-teal-600 font-medium text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>{t('hero.register')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Slides Container */}
        <div className="relative w-full h-full">
          {/* Slide 1: Video */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover"
              poster="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.jpg?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
              title="Africagua 2025 - IX Foro Internacional de Agua y Energías Renovables"
              aria-label="Video promocional de Africagua 2025"
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.mp4?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
                type="video/mp4"
              />
              Tu navegador no soporta el video de Africagua 2025.
            </video>
          </div>

          {/* Slide 2: Nobel Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              onClick={() => setIsNobelModalOpen(true)}
              className="w-full h-full cursor-pointer hover:opacity-95 transition-opacity duration-300"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsNobelModalOpen(true);
                }
              }}
              aria-label="Abrir artículo del Nobel de Química 2025"
            >
              <img
                src={nobelArticle.imageUrl}
                alt="Nobel de Química 2025 - Innovación en agua y sostenibilidad"
                className="w-full h-full object-contain bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative md:hidden h-[60vh] overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/95 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/95 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Registration Button */}
        <div className="absolute bottom-4 right-4 z-10">
          <a
            href="https://eventosccf.netlify.app/eventos/-OJJMdGgVrnpZVJJdFDL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm hover:bg-white/95 text-teal-600 font-medium text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>{t('hero.register')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Slides Container */}
        <div className="relative w-full h-full">
          {/* Slide 1: Video */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <video
              ref={mobileVideoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover"
              poster="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1.%20Promo%20Africagua%202025%20-%20VIDEO.jpg?alt=media&token=186a474a-9d76-4b6b-9ae6-bc7105583f8c"
              title="Africagua 2025 - IX Foro Internacional de Agua y Energías Renovables"
              aria-label="Video promocional de Africagua 2025"
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/PORTADA%2FV1%20movil%20version.mp4?alt=media&token=bed9d732-863a-4c36-8ad8-0294cd613846"
                type="video/mp4"
              />
              Tu navegador no soporta el video de Africagua 2025.
            </video>
          </div>

          {/* Slide 2: Nobel Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              onClick={() => setIsNobelModalOpen(true)}
              className="w-full h-full cursor-pointer active:opacity-90 transition-opacity duration-300"
              role="button"
              tabIndex={0}
              aria-label="Abrir artículo del Nobel de Química 2025"
            >
              <img
                src={nobelArticle.imageUrl}
                alt="Nobel de Química 2025 - Innovación en agua y sostenibilidad"
                className="w-full h-full object-contain bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nobel Modal */}
      <NewsModal
        news={isNobelModalOpen ? nobelArticle : null}
        onClose={() => setIsNobelModalOpen(false)}
      />
    </>
  );
};

export default Hero;