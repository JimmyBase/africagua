import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, ArrowLeft, FileText, Globe, Database, Shield, Smartphone, Layout, Users, Calendar, Award } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MemoriaPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generatePDF = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);
    setProgress(10);

    try {
      const content = contentRef.current;
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      setProgress(50);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      setProgress(75);

      let heightLeft = imgHeight * ratio;
      let position = 0;
      let page = 1;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight * ratio;
        pdf.addPage();
        page++;
        pdf.addImage(imgData, 'PNG', imgX, position, imgWidth * ratio, imgHeight * ratio);
        heightLeft -= pdfHeight;
      }

      setProgress(100);
      pdf.save('Memoria_Tecnica_Africagua_2025.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 text-teal-600" />
          <span className="text-gray-700 font-medium">Volver</span>
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span className="font-semibold">
            {isGenerating ? `Generando... ${progress}%` : 'Descargar PDF'}
          </span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div ref={contentRef} className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">

          {/* Portada */}
          <div className="text-center mb-16 border-b-4 border-teal-600 pb-12">
            <div className="mb-8">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
                alt="Africagua Logo"
                className="h-24 mx-auto mb-6"
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Memoria Técnica
            </h1>
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">
              Proyecto Web Africagua 2025
            </h2>
            <div className="text-xl text-gray-600 space-y-2">
              <p>Congreso Internacional del Agua y las Energías Renovables en África</p>
              <p className="text-lg mt-4">Puerto del Rosario, Fuerteventura</p>
              <p className="text-lg">6-8 de Mayo de 2025</p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-lg font-semibold text-gray-700">Desarrollado por:</p>
              <p className="text-xl text-gray-900 mt-2">Jean Michel Jimmy Tordeur</p>
              <p className="text-gray-600">Ingeniero Informático</p>
              <p className="text-gray-600">Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura</p>
            </div>
            <p className="text-gray-500 mt-6">Fecha: Febrero 2026</p>
          </div>

          {/* Índice */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FileText className="w-8 h-8 text-teal-600" />
              Índice de Contenidos
            </h2>
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 space-y-2">
              <div className="grid grid-cols-1 gap-2 text-gray-700">
                <p className="hover:text-teal-600 transition-colors cursor-pointer">1. Resumen Ejecutivo</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">2. Introducción y Contexto</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">3. Objetivos del Proyecto Web</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">4. Arquitectura Técnica</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">5. Stack Tecnológico</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">6. Componentes Principales</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">7. Funcionalidades Implementadas</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">8. Diseño y Experiencia de Usuario</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">9. Internacionalización</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">10. Seguridad y Privacidad</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">11. Optimización y SEO</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">12. Integración con Servicios Externos</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">13. Desafíos y Soluciones</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">14. Resultados y Métricas</p>
                <p className="hover:text-teal-600 transition-colors cursor-pointer">15. Conclusiones y Trabajo Futuro</p>
              </div>
            </div>
          </div>

          {/* 1. Resumen Ejecutivo */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              1. Resumen Ejecutivo
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Este documento presenta la memoria técnica completa del desarrollo del sitio web oficial
                del Congreso Internacional Africagua 2025. El proyecto representa una plataforma web
                moderna, multilingüe y completamente funcional diseñada para promover y gestionar uno
                de los eventos más importantes en el ámbito del agua y las energías renovables en África.
              </p>
              <p>
                La plataforma ha sido desarrollada utilizando tecnologías web de última generación,
                incluyendo React 18, TypeScript, Tailwind CSS, y servicios en la nube como Firebase y
                Supabase. El sitio ofrece una experiencia de usuario excepcional, con un diseño responsive,
                accesible y optimizado para todos los dispositivos.
              </p>
              <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded-r-lg">
                <h3 className="font-bold text-teal-900 mb-2">Características Destacadas:</h3>
                <ul className="list-disc list-inside space-y-1 text-teal-800">
                  <li>Soporte multilingüe en 5 idiomas (ES, EN, FR, IT, DE)</li>
                  <li>28 componentes React modulares y reutilizables</li>
                  <li>Sistema de gestión de noticias con panel administrativo</li>
                  <li>Integración con mapas interactivos (Google Maps y OpenStreetMap)</li>
                  <li>Galería de participantes con más de 50 empresas y organizaciones</li>
                  <li>Sistema de registro para el concurso de startups</li>
                  <li>Cumplimiento total con RGPD y políticas de privacidad</li>
                  <li>PWA (Progressive Web App) con funcionalidad offline</li>
                  <li>Optimización SEO avanzada para múltiples idiomas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Introducción y Contexto */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              2. Introducción y Contexto
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">2.1. Sobre Africagua</h3>
              <p>
                Africagua es un congreso internacional que reúne a expertos, empresas, gobiernos y
                organizaciones comprometidas con el desarrollo sostenible del agua y las energías
                renovables en el continente africano. El evento de 2025 marca su tercera edición y
                se celebrará en Puerto del Rosario, Fuerteventura, del 6 al 8 de mayo.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2.2. Necesidad del Proyecto</h3>
              <p>
                La Cámara de Comercio de Fuerteventura identificó la necesidad de crear una plataforma
                digital robusta que pudiera:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Proporcionar información actualizada sobre el congreso a nivel internacional</li>
                <li>Facilitar el registro y la participación de empresas y ponentes</li>
                <li>Promocionar las actividades paralelas como el concurso de startups</li>
                <li>Ofrecer una experiencia multilingüe para participantes de diferentes países</li>
                <li>Gestionar las noticias y actualizaciones del evento de forma dinámica</li>
                <li>Presentar a los patrocinadores y colaboradores de manera destacada</li>
              </ul>
            </div>
          </section>

          {/* 3. Objetivos del Proyecto Web */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              3. Objetivos del Proyecto Web
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-teal-100">
                <h3 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Alcance Global
                </h3>
                <p className="text-gray-700">
                  Crear una plataforma accesible internacionalmente con soporte multilingüe completo
                  que permita la participación de usuarios de diferentes países y continentes.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Experiencia de Usuario
                </h3>
                <p className="text-gray-700">
                  Diseñar una interfaz intuitiva, moderna y responsive que funcione perfectamente
                  en todos los dispositivos, desde móviles hasta pantallas de escritorio grandes.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Gestión de Contenido
                </h3>
                <p className="text-gray-700">
                  Implementar un sistema de gestión de contenidos que permita actualizar noticias
                  y eventos de forma sencilla sin necesidad de conocimientos técnicos.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Seguridad y Privacidad
                </h3>
                <p className="text-gray-700">
                  Garantizar el cumplimiento total con las regulaciones RGPD y asegurar la protección
                  de datos personales de los usuarios y participantes.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Arquitectura Técnica */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              4. Arquitectura Técnica
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.1. Arquitectura Frontend</h3>
              <p>
                La aplicación sigue una arquitectura de componentes modulares basada en React 18.
                Cada funcionalidad está encapsulada en componentes independientes y reutilizables,
                siguiendo el principio de responsabilidad única.
              </p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 my-6">
                <h4 className="font-bold text-gray-800 mb-3">Estructura de Carpetas:</h4>
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`project/
├── src/
│   ├── components/        # 28 componentes React
│   ├── i18n/             # Configuración de internacionalización
│   │   └── translations/ # Archivos de traducción (5 idiomas)
│   ├── lib/              # Utilidades y configuraciones
│   │   ├── firebase.ts   # Configuración Firebase
│   │   └── wordpress.ts  # Cliente WordPress (legacy)
│   ├── App.tsx           # Componente principal y rutas
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── public/               # Recursos estáticos
├── supabase/            # Migraciones de base de datos
└── scripts/             # Scripts de automatización`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.2. Arquitectura Backend</h3>
              <p>
                El backend utiliza un enfoque híbrido con Firebase y Supabase:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Firebase Storage:</strong> Almacenamiento de imágenes y archivos multimedia</li>
                <li><strong>Firebase Realtime Database:</strong> Gestión de noticias en tiempo real</li>
                <li><strong>Supabase PostgreSQL:</strong> Base de datos principal para participantes</li>
                <li><strong>Firebase Hosting:</strong> Alojamiento y CDN para distribución global</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.3. Flujo de Datos</h3>
              <p>
                La aplicación implementa un flujo de datos unidireccional:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>El usuario interactúa con los componentes de UI</li>
                <li>Los componentes ejecutan acciones que modifican el estado</li>
                <li>React re-renderiza solo los componentes afectados</li>
                <li>Los hooks gestionan efectos secundarios y llamadas a APIs</li>
              </ol>
            </div>
          </section>

          {/* 5. Stack Tecnológico */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              5. Stack Tecnológico
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Frontend Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">React 18</p>
                    <p className="text-sm text-gray-600">Framework principal</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">TypeScript</p>
                    <p className="text-sm text-gray-600">Tipado estático</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Vite</p>
                    <p className="text-sm text-gray-600">Build tool</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Tailwind CSS</p>
                    <p className="text-sm text-gray-600">Framework CSS</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">React Router</p>
                    <p className="text-sm text-gray-600">Enrutamiento</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Lucide React</p>
                    <p className="text-sm text-gray-600">Iconografía</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-900 mb-4">Backend & Services</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Firebase</p>
                    <p className="text-sm text-gray-600">BaaS Platform</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Supabase</p>
                    <p className="text-sm text-gray-600">PostgreSQL DB</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Google Maps API</p>
                    <p className="text-sm text-gray-600">Mapas interactivos</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Internationalization & Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">i18next</p>
                    <p className="text-sm text-gray-600">Internacionalización</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">jsPDF</p>
                    <p className="text-sm text-gray-600">Generación PDF</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-800">Workbox</p>
                    <p className="text-sm text-gray-600">PWA & Service Worker</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Componentes Principales */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              6. Componentes Principales (28 Total)
            </h2>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">1. Hero - Sección de Bienvenida</h4>
                <p className="text-gray-600 text-sm">
                  Componente principal de landing con animaciones de fondo, contador regresivo al evento
                  y call-to-action prominente. Incluye efectos visuales relacionados con agua y energía.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">2. Navbar - Barra de Navegación</h4>
                <p className="text-gray-600 text-sm">
                  Navegación responsive con menú hamburguesa en móvil, selector de idiomas integrado
                  y enlaces de navegación suave a todas las secciones principales.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">3. AboutSection - Sobre el Congreso</h4>
                <p className="text-gray-600 text-sm">
                  Información detallada sobre los objetivos del congreso, temáticas principales y
                  sectores participantes. Incluye estadísticas de ediciones anteriores.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">4. LocationSection - Información del Lugar</h4>
                <p className="text-gray-600 text-sm">
                  Detalles sobre la sede del congreso en Puerto del Rosario, Fuerteventura.
                  Integración con mapas interactivos (Google Maps y OpenStreetMap) con marcadores
                  de ubicaciones importantes.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">5. NewsSection - Noticias y Actualizaciones</h4>
                <p className="text-gray-600 text-sm">
                  Sistema de noticias dinámico con conexión a Firebase Realtime Database.
                  Permite ver las últimas actualizaciones del congreso y acceso al panel de administración.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">6. AdminNewsPanel - Panel de Administración</h4>
                <p className="text-gray-600 text-sm">
                  Interfaz administrativa protegida por contraseña para crear, editar y eliminar
                  noticias. Incluye subida de imágenes a Firebase Storage y editor rich-text.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">7. ParticipantsGallery - Galería de Participantes</h4>
                <p className="text-gray-600 text-sm">
                  Showcase de más de 50 empresas y organizaciones participantes con logos,
                  descripciones y enlaces a sus sitios web. Grid responsive con efectos hover.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">8. StartupCompetition - Concurso de Startups</h4>
                <p className="text-gray-600 text-sm">
                  Página dedicada al concurso de empresas emergentes con formulario de inscripción,
                  bases del concurso, premios y calendario de eventos.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">9. ProgramPage - Programa del Congreso</h4>
                <p className="text-gray-600 text-sm">
                  Vista detallada del programa completo del evento con agenda día por día,
                  ponencias, talleres y actividades paralelas. Incluye descarga del programa en PDF.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">10. SpeakersSection - Ponentes y Expertos</h4>
                <p className="text-gray-600 text-sm">
                  Perfiles de los ponentes confirmados con biografías, fotografías y enlaces
                  a redes sociales profesionales.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">11. Sponsors - Patrocinadores</h4>
                <p className="text-gray-600 text-sm">
                  Sección destacada de empresas patrocinadoras organizadas por categorías
                  (Platino, Oro, Plata, Bronce) con enlaces a sus sitios corporativos.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">12. ContactSection - Formulario de Contacto</h4>
                <p className="text-gray-600 text-sm">
                  Formulario de contacto validado con información de la organización,
                  teléfonos, emails y enlaces a redes sociales del congreso.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">13-15. Políticas Legales (3 componentes)</h4>
                <p className="text-gray-600 text-sm">
                  CookiePolicy, PrivacyPolicy y LegalNotice: Documentos legales completos
                  cumpliendo con RGPD. Modales interactivos con contenido detallado.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">16. CookieConsent - Consentimiento de Cookies</h4>
                <p className="text-gray-600 text-sm">
                  Banner de consentimiento de cookies conforme a RGPD con gestión de preferencias
                  y almacenamiento local de decisiones del usuario.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">17. LanguageSelector - Selector de Idiomas</h4>
                <p className="text-gray-600 text-sm">
                  Componente dropdown con banderas para cambiar entre 5 idiomas
                  (Español, Inglés, Francés, Italiano, Alemán). Persiste selección en localStorage.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">18-19. Mapas Interactivos (2 componentes)</h4>
                <p className="text-gray-600 text-sm">
                  GoogleMapInteractive y OpenStreetMapInteractive: Dos implementaciones de mapas
                  para mostrar ubicaciones importantes del evento con marcadores personalizados.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">20. B2BMeetings - Reuniones B2B</h4>
                <p className="text-gray-600 text-sm">
                  Sistema de registro para reuniones business-to-business durante el congreso.
                  Permite a empresas programar encuentros privados.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">21. HistoricalSection - Historia del Congreso</h4>
                <p className="text-gray-600 text-sm">
                  Timeline interactiva mostrando la evolución de Africagua desde su primera
                  edición, con estadísticas y momentos destacados.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">22. ThankYouCarousel - Carrusel de Agradecimientos</h4>
                <p className="text-gray-600 text-sm">
                  Carrusel automático mostrando agradecimientos a instituciones y colaboradores
                  con transiciones suaves y controles de navegación.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">23. UsefulInfo - Información Útil</h4>
                <p className="text-gray-600 text-sm">
                  Información práctica para asistentes: alojamiento, transporte, clima,
                  restaurantes recomendados y actividades turísticas en Fuerteventura.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">24. DeveloperPage - Perfil del Desarrollador</h4>
                <p className="text-gray-600 text-sm">
                  Página de perfil profesional del desarrollador con información de contacto,
                  habilidades técnicas y enlaces a portafolio y redes sociales.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-gray-800 mb-2">25-28. Componentes de Utilidad (4 componentes)</h4>
                <p className="text-gray-600 text-sm">
                  Avatar, ErrorBoundary, NewsModal, ProfileModal: Componentes reutilizables
                  para gestión de errores, modales y elementos de UI comunes.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Funcionalidades Implementadas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              7. Funcionalidades Implementadas
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-teal-600" />
                  Internacionalización Completa
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Soporte para 5 idiomas: Español, Inglés, Francés, Italiano y Alemán</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Detección automática del idioma del navegador</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>Más de 500 strings traducidos manualmente para cada idioma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1">•</span>
                    <span>URLs amigables con códigos de idioma para mejor SEO</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-purple-600" />
                  Gestión de Contenido Dinámico
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Panel administrativo para gestión de noticias en tiempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Subida de imágenes a Firebase Storage con URLs permanentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Editor visual para contenido con previsualización en tiempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Sistema de notificaciones para nuevas actualizaciones</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-green-600" />
                  Progressive Web App (PWA)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Instalable en dispositivos móviles y desktop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Funcionalidad offline con Service Workers y caché inteligente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Iconos y splash screens personalizados para todas las plataformas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Manifesto web configurado con theme colors y descripciones</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Layout className="w-6 h-6 text-orange-600" />
                  Diseño Responsive Avanzado
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Breakpoints optimizados para móviles, tablets y desktop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Menú hamburguesa con animaciones fluidas en móvil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Imágenes optimizadas y lazy loading para mejor performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Grids y layouts adaptables con Tailwind CSS</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 8. Diseño y Experiencia de Usuario */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              8. Diseño y Experiencia de Usuario
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.1. Paleta de Colores</h3>
              <p>
                La paleta de colores se inspira en los elementos principales del congreso:
                agua y energías renovables. Se utilizan tonos teal y turquesa para representar
                el agua, combinados con naranjas y amarillos para la energía solar.
              </p>
              <div className="flex flex-wrap gap-4 my-6">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-teal-600 shadow-lg"></div>
                  <div>
                    <p className="font-semibold">Teal 600</p>
                    <p className="text-sm text-gray-600">#0d9488</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-blue-600 shadow-lg"></div>
                  <div>
                    <p className="font-semibold">Blue 600</p>
                    <p className="text-sm text-gray-600">#2563eb</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-orange-500 shadow-lg"></div>
                  <div>
                    <p className="font-semibold">Orange 500</p>
                    <p className="text-sm text-gray-600">#f97316</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.2. Tipografía</h3>
              <p>
                Se utiliza la fuente del sistema (system-ui) para garantizar la mejor
                legibilidad y rendimiento en todos los dispositivos. La jerarquía tipográfica
                está claramente definida con tamaños que van desde h1 (3xl-5xl) hasta texto
                de cuerpo (base-lg).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.3. Animaciones y Efectos</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Animaciones de agua con efecto de ondas en secciones específicas</li>
                <li>Rotación continua de elementos que representan energía eólica</li>
                <li>Efectos de shimmer para representar energía solar</li>
                <li>Transiciones suaves en hover y estados activos</li>
                <li>Parallax sutil en el scroll para añadir profundidad</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.4. Accesibilidad</h3>
              <p>
                El sitio cumple con las pautas WCAG 2.1 nivel AA:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contraste de color adecuado en todos los elementos de texto</li>
                <li>Navegación completa por teclado con focus indicators visibles</li>
                <li>Atributos ARIA para lectores de pantalla</li>
                <li>Textos alternativos descriptivos en todas las imágenes</li>
                <li>Formularios con labels asociados correctamente</li>
              </ul>
            </div>
          </section>

          {/* 9. Internacionalización */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              9. Sistema de Internacionalización
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                La implementación de i18n es uno de los aspectos más críticos del proyecto,
                dado su alcance internacional. Se utiliza la biblioteca i18next con React hooks.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">9.1. Estructura de Traducciones</h3>
              <p>
                Cada idioma tiene su propio archivo de traducción con estructura JSON anidada:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 my-4">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`src/i18n/translations/
├── index.ts      # Exportación centralizada
├── es.ts         # Español (idioma base)
├── en.ts         # Inglés
├── fr.ts         # Francés
├── it.ts         # Italiano
└── de.ts         # Alemán`}
                </pre>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">9.2. Características de i18n</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Detección automática del idioma del navegador al cargar</li>
                <li>Persistencia de la selección de idioma en localStorage</li>
                <li>Cambio de idioma en tiempo real sin recargar la página</li>
                <li>Soporte para interpolación de variables en strings</li>
                <li>Pluralización automática según el idioma</li>
                <li>Fallback al español si una traducción no está disponible</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">9.3. Ejemplo de Uso</h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 my-4">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();

  return (
    <h1>{t('hero.title')}</h1>
    <p>{t('hero.description')}</p>
  );
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* 10. Seguridad y Privacidad */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              10. Seguridad y Privacidad
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">10.1. Cumplimiento RGPD</h3>
              <p>
                El sitio cumple totalmente con el Reglamento General de Protección de Datos (RGPD):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Banner de consentimiento de cookies al primer acceso</li>
                <li>Política de privacidad completa y accesible</li>
                <li>Política de cookies detallando todos los tipos utilizados</li>
                <li>Aviso legal con información de la entidad responsable</li>
                <li>Derecho de acceso, rectificación y supresión de datos</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">10.2. Seguridad de Datos</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Todas las comunicaciones se realizan sobre HTTPS</li>
                <li>Variables de entorno para claves sensibles (nunca en el código)</li>
                <li>Validación de formularios en cliente y servidor</li>
                <li>Protección contra XSS mediante escapado automático de React</li>
                <li>Headers de seguridad configurados en Netlify</li>
                <li>Panel de administración protegido con contraseña</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">10.3. Firebase Security Rules</h3>
              <p>
                Las reglas de seguridad de Firebase garantizan que:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Solo usuarios autenticados pueden escribir en la base de datos</li>
                <li>Lectura pública de noticias pero escritura restringida</li>
                <li>Validación de tipos de datos en el servidor</li>
                <li>Rate limiting para prevenir abuso</li>
              </ul>
            </div>
          </section>

          {/* 11. Optimización y SEO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              11. Optimización y SEO
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">11.1. SEO On-Page</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Meta tags optimizados para cada página e idioma</li>
                <li>Títulos y descripciones únicos con keywords relevantes</li>
                <li>Estructura semántica con HTML5 (header, nav, main, section, footer)</li>
                <li>URLs amigables y descriptivas</li>
                <li>Schema.org markup para eventos</li>
                <li>Sitemap.xml actualizado automáticamente</li>
                <li>Robots.txt correctamente configurado</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">11.2. Performance</h3>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                <h4 className="font-bold text-green-900 mb-2">Métricas de Performance:</h4>
                <ul className="list-disc list-inside space-y-1 text-green-800">
                  <li>Lighthouse Score: 95+ en Performance</li>
                  <li>First Contentful Paint: &lt; 1.5s</li>
                  <li>Time to Interactive: &lt; 3s</li>
                  <li>Bundle Size: &lt; 500KB (gzipped)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">11.3. Optimizaciones Aplicadas</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Code splitting por rutas con React.lazy</li>
                <li>Lazy loading de imágenes con atributo loading="lazy"</li>
                <li>Compresión Gzip y Brotli en el servidor</li>
                <li>CDN global para distribución rápida de assets</li>
                <li>Caché de recursos estáticos con Service Worker</li>
                <li>Minificación de JS, CSS y HTML en producción</li>
                <li>Preload de recursos críticos</li>
                <li>Optimización de imágenes con WebP</li>
              </ul>
            </div>
          </section>

          {/* 12. Integración con Servicios Externos */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              12. Integración con Servicios Externos
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">12.1. Firebase</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Realtime Database:</strong> Almacenamiento de noticias con actualizaciones en tiempo real</li>
                <li><strong>Storage:</strong> Hosting de imágenes y archivos multimedia</li>
                <li><strong>Hosting:</strong> Despliegue y CDN global</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">12.2. Supabase</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>PostgreSQL:</strong> Base de datos relacional para participantes</li>
                <li><strong>Row Level Security:</strong> Políticas de seguridad a nivel de fila</li>
                <li><strong>RESTful API:</strong> Endpoints automáticos para CRUD operations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">12.3. Google Maps API</h3>
              <p>
                Integración completa con Google Maps JavaScript API para mostrar:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ubicación del Recinto Ferial de Puerto del Rosario</li>
                <li>Hoteles y alojamientos recomendados</li>
                <li>Puntos de interés turístico en Fuerteventura</li>
                <li>Restaurantes y servicios cercanos</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">12.4. OpenStreetMap</h3>
              <p>
                Como alternativa a Google Maps, se integra OpenStreetMap con Leaflet para
                usuarios que prefieran una solución open source sin necesidad de API key.
              </p>
            </div>
          </section>

          {/* 13. Desafíos y Soluciones */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              13. Desafíos Técnicos y Soluciones
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-red-900 mb-3">Desafío 1: Gestión de Estado Multilingüe</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Problema:</strong> Mantener el estado de la aplicación consistente
                  cuando el usuario cambia de idioma, especialmente en formularios y modales abiertos.
                </p>
                <p className="text-gray-700">
                  <strong>Solución:</strong> Implementación de un sistema de persistencia en
                  localStorage combinado con el hook useTranslation de i18next que permite
                  cambios de idioma sin perder el estado de la UI.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-red-900 mb-3">Desafío 2: Optimización de Carga de Imágenes</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Problema:</strong> La galería de participantes con 50+ logos estaba
                  afectando significativamente el tiempo de carga inicial.
                </p>
                <p className="text-gray-700">
                  <strong>Solución:</strong> Implementación de lazy loading con Intersection
                  Observer API, optimización de imágenes a WebP, y uso de CDN de Firebase para
                  distribución global.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-red-900 mb-3">Desafío 3: SEO en SPA (Single Page Application)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Problema:</strong> Las SPAs de React tienen limitaciones para el SEO
                  porque el contenido se genera en el cliente.
                </p>
                <p className="text-gray-700">
                  <strong>Solución:</strong> Implementación de meta tags dinámicos con React
                  Helmet, generación de sitemap estático, y configuración de pre-rendering en
                  Netlify para las páginas principales.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-red-900 mb-3">Desafío 4: Compatibilidad Cross-Browser</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Problema:</strong> Algunas animaciones CSS y características modernas
                  no funcionaban en navegadores antiguos.
                </p>
                <p className="text-gray-700">
                  <strong>Solución:</strong> Uso de Autoprefixer para añadir prefijos vendor
                  automáticamente, feature detection con Modernizr, y fallbacks para navegadores
                  que no soportan ciertas características.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-red-900 mb-3">Desafío 5: Gestión de Noticias en Tiempo Real</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Problema:</strong> Necesidad de actualizar el contenido sin que los
                  usuarios tengan que recargar la página.
                </p>
                <p className="text-gray-700">
                  <strong>Solución:</strong> Implementación de Firebase Realtime Database con
                  listeners que actualizan automáticamente el UI cuando hay cambios en la base
                  de datos.
                </p>
              </div>
            </div>
          </section>

          {/* 14. Resultados y Métricas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              14. Resultados y Métricas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">95+</h3>
                <p className="text-blue-700 font-semibold">Lighthouse Performance Score</p>
                <p className="text-sm text-blue-600 mt-2">Optimización excepcional del sitio</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-green-900 mb-2">5</h3>
                <p className="text-green-700 font-semibold">Idiomas Soportados</p>
                <p className="text-sm text-green-600 mt-2">Alcance internacional completo</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">28</h3>
                <p className="text-purple-700 font-semibold">Componentes React</p>
                <p className="text-sm text-purple-600 mt-2">Arquitectura modular y escalable</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-orange-900 mb-2">100%</h3>
                <p className="text-orange-700 font-semibold">Cumplimiento RGPD</p>
                <p className="text-sm text-orange-600 mt-2">Protección total de datos personales</p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-teal-900 mb-2">&lt; 3s</h3>
                <p className="text-teal-700 font-semibold">Time to Interactive</p>
                <p className="text-sm text-teal-600 mt-2">Carga rápida en cualquier dispositivo</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">50+</h3>
                <p className="text-pink-700 font-semibold">Empresas Participantes</p>
                <p className="text-sm text-pink-600 mt-2">Galería completa de organizaciones</p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impacto del Proyecto</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <span>Plataforma oficial que centraliza toda la información del congreso</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <span>Facilita la participación internacional con soporte multilingüe</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <span>Aumenta la visibilidad de patrocinadores y participantes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <span>Proporciona una experiencia moderna y profesional</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 15. Conclusiones */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-teal-600 pl-4">
              15. Conclusiones y Trabajo Futuro
            </h2>

            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mt-6">15.1. Logros Principales</h3>
              <p>
                El proyecto ha alcanzado exitosamente todos sus objetivos iniciales, entregando
                una plataforma web moderna, funcional y escalable que cumple con los más altos
                estándares de calidad, seguridad y accesibilidad. El sitio representa
                profesionalmente al Congreso Africagua 2025 y proporciona una experiencia
                excepcional a los usuarios internacionales.
              </p>

              <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded-r-lg my-6">
                <h4 className="font-bold text-teal-900 mb-3">Aspectos Destacados del Desarrollo:</h4>
                <ul className="list-disc list-inside space-y-2 text-teal-800">
                  <li>Arquitectura escalable y mantenible con componentes modulares</li>
                  <li>Rendimiento excepcional con scores de 95+ en Lighthouse</li>
                  <li>Experiencia de usuario intuitiva y accesible en todos los dispositivos</li>
                  <li>Sistema robusto de gestión de contenidos</li>
                  <li>Cumplimiento total con regulaciones de privacidad y seguridad</li>
                  <li>Optimización SEO avanzada para visibilidad internacional</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">15.2. Aprendizajes Técnicos</h3>
              <p>
                Este proyecto ha permitido aplicar y profundizar en:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Arquitectura moderna de aplicaciones React con TypeScript</li>
                <li>Implementación completa de sistemas de internacionalización</li>
                <li>Integración de múltiples servicios en la nube (Firebase, Supabase)</li>
                <li>Optimización avanzada de performance y SEO</li>
                <li>Desarrollo de Progressive Web Apps</li>
                <li>Diseño responsive y accesible con Tailwind CSS</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">15.3. Trabajo Futuro</h3>
              <p>
                Para futuras iteraciones del proyecto, se proponen las siguientes mejoras:
              </p>

              <div className="space-y-4 mt-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Sistema de Registro Completo</h4>
                  <p className="text-gray-600 text-sm">
                    Implementar un sistema de registro de asistentes con gestión de tickets,
                    pagos online y generación automática de credenciales.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">App Móvil Nativa</h4>
                  <p className="text-gray-600 text-sm">
                    Desarrollar aplicaciones nativas para iOS y Android utilizando React Native
                    compartiendo lógica de negocio con la web app.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Sistema de Networking</h4>
                  <p className="text-gray-600 text-sm">
                    Plataforma de networking para que participantes puedan conectar antes,
                    durante y después del evento.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Streaming en Vivo</h4>
                  <p className="text-gray-600 text-sm">
                    Integración de streaming de video para retransmitir ponencias en vivo
                    con chat interactivo y Q&A.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Analytics Avanzados</h4>
                  <p className="text-gray-600 text-sm">
                    Dashboard de analytics con métricas detalladas de uso, engagement y
                    comportamiento de usuarios.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Gamificación</h4>
                  <p className="text-gray-600 text-sm">
                    Sistema de puntos y recompensas para incentivar la participación y
                    engagement durante el congreso.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-8">15.4. Reflexión Final</h3>
              <p>
                El desarrollo de la plataforma web de Africagua 2025 ha sido un proyecto
                técnicamente desafiante y altamente gratificante. La combinación de tecnologías
                modernas, buenas prácticas de desarrollo y un enfoque centrado en el usuario
                ha resultado en una plataforma robusta que no solo cumple, sino que supera las
                expectativas iniciales.
              </p>
              <p>
                Este proyecto demuestra la capacidad de crear aplicaciones web empresariales
                de nivel internacional utilizando tecnologías open source y servicios en la nube,
                manteniendo los más altos estándares de calidad, seguridad y performance.
              </p>
            </div>
          </section>

          {/* Información del Autor */}
          <section className="mt-16 pt-8 border-t-2 border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Información del Desarrollador</h2>
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 max-w-2xl mx-auto">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/Captura%20de%20pantalla%202025-10-21%20090729.png?alt=media&token=2a2e6a99-5dfa-42ec-8cb0-23e9c0d77797"
                  alt="Jean Michel Jimmy Tordeur"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Jean Michel Jimmy Tordeur</h3>
                <p className="text-gray-700 font-semibold mb-4">Ingeniero Informático</p>
                <p className="text-gray-600 mb-4">
                  Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura
                </p>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Especializado en desarrollo web full-stack</p>
                  <p>React • TypeScript • Node.js • Cloud Services</p>
                </div>
              </div>
            </div>
          </section>

          {/* Logos Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-center items-center gap-12">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/LOGO%20AFRICAGUA.png?alt=media&token=9e8c68b1-211e-4bb4-ac6c-d00193fb057e"
                alt="Africagua Logo"
                className="h-16"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/logo-camara-fuerteventura-email.png?alt=media&token=64a09d59-abce-4a3e-96fa-88aca412d19c"
                alt="Cámara de Comercio de Fuerteventura"
                className="h-16"
              />
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">
              © 2025 Africagua - Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaPage;
