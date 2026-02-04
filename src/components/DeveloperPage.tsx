import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail, Globe, User, Briefcase, GraduationCap, MapPin, Languages, Calendar } from 'lucide-react';

export default function DeveloperPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update meta tags for SEO
    document.title = 'Jean Michel Tordeur - Jimmy Tordeur | Ingeniero Informático Fuerteventura | JM Tordeur Desarrollador Web';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Jean Michel Tordeur (Jimmy Tordeur, JM Tordeur, J.M Tordeur) - Ingeniero informático y desarrollador web en Fuerteventura, Canarias. Responsable de desarrollo tecnológico de la Cámara de Comercio de Fuerteventura. Especialista en React, TypeScript, Python, IA y desarrollo full-stack.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Jean Michel Tordeur, Jimmy Tordeur, JM Tordeur, J.M Tordeur, J. Michel Tordeur, Jean Tordeur, Tordeur, Ingeniero Informático Fuerteventura, Desarrollador Web Fuerteventura, Programador Fuerteventura, Ingeniero Informático Canarias, Desarrollador Web Canarias, React Developer Fuerteventura, TypeScript Developer Canarias, Python Developer Fuerteventura, Full Stack Developer Canarias, Cámara de Comercio Fuerteventura');
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Jean Michel Tordeur - Jimmy Tordeur | Ingeniero Informático Fuerteventura');
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Jean Michel Tordeur (Jimmy Tordeur, JM Tordeur) - Ingeniero informático y desarrollador web en Fuerteventura, Canarias. Responsable de desarrollo tecnológico de la Cámara de Comercio de Fuerteventura.');
    }

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://www.africaguacanarias.com/developer');
    }

    let ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'profile');
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://www.africaguacanarias.com/developer');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://www.africaguacanarias.com/developer');
      document.head.appendChild(canonical);
    }

    // Add structured data
    const structuredDataPerson = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jean Michel Tordeur",
      "alternateName": ["Jimmy Tordeur", "J.M Tordeur", "JM Tordeur", "J. Michel Tordeur", "Jean Tordeur", "Jean Michel Jimmy Tordeur"],
      "givenName": "Jean Michel",
      "additionalName": "Jimmy",
      "familyName": "Tordeur",
      "birthDate": "1980-05-30",
      "birthPlace": {
        "@type": "Place",
        "name": "Créon, Francia"
      },
      "nationality": [
        { "@type": "Country", "name": "Bélgica" },
        { "@type": "Country", "name": "Francia" }
      ],
      "jobTitle": "Responsable Informático y Desarrollo Tecnológico",
      "description": "Jean Michel Tordeur (conocido como JM Tordeur o Jimmy Tordeur) es un ingeniero informático especializado en desarrollo web full-stack, bases de datos, hardware y sistemas. Responsable de desarrollo tecnológico en la Cámara de Comercio de Fuerteventura.",
      "image": {
        "@type": "ImageObject",
        "url": "https://firebasestorage.googleapis.com/v0/b/ccf-web-59053.firebasestorage.app/o/moi%2FCaptura%20de%20pantalla%202025-10-21%20090729.png?alt=media&token=8fbf7467-a01d-4995-918f-74afaaa28d5b",
        "caption": "Jean Michel Tordeur (Jimmy Tordeur) - Ingeniero Informático en 2025"
      },
      "url": "https://www.africaguacanarias.com/developer",
      "email": "j.tordeur@camarafuerteventura.org",
      "worksFor": {
        "@type": "Organization",
        "name": "Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura",
        "url": "https://www.camarafuerteventura.org"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Puerto del Rosario",
        "addressRegion": "Fuerteventura, Islas Canarias",
        "addressCountry": "ES"
      },
      "knowsLanguage": [
        { "@type": "Language", "name": "Español" },
        { "@type": "Language", "name": "Alemán" },
        { "@type": "Language", "name": "Italiano" },
        { "@type": "Language", "name": "Francés" },
        { "@type": "Language", "name": "Inglés" },
        { "@type": "Language", "name": "Neerlandés" }
      ],
      "knowsAbout": [
        "Desarrollo Web Full-Stack", "React", "TypeScript", "JavaScript", "Node.js", "Python",
        "Inteligencia Artificial", "Machine Learning", "Bases de Datos", "PostgreSQL",
        "Supabase", "Firebase", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Express", "SQL",
        "Diseño Web", "UX/UI Design", "Ingeniería de Hardware", "Redes",
        "Administración de Sistemas", "Linux", "Docker", "DevOps", "Cloud Computing"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/jean-tordeur-620625278",
        "https://www.africaguacanarias.com/developer",
        "https://www.camarafuerteventura.org"
      ]
    };

    const structuredDataProfilePage = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Jean Michel Tordeur",
        "alternateName": ["Jimmy Tordeur", "J.M Tordeur", "JM Tordeur", "J. Michel Tordeur"],
        "jobTitle": "Responsable Informático y Desarrollo Tecnológico",
        "url": "https://www.africaguacanarias.com/developer"
      },
      "name": "Perfil Profesional de Jean Michel Tordeur (Jimmy Tordeur)",
      "description": "Página de perfil profesional de Jean Michel Tordeur (Jimmy Tordeur, JM Tordeur), ingeniero informático y desarrollador web en Fuerteventura, Canarias.",
      "url": "https://www.africaguacanarias.com/developer",
      "dateModified": "2026-02-04"
    };

    const structuredDataWebPage = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jean Michel Tordeur - Jimmy Tordeur | Ingeniero Informático Fuerteventura",
      "description": "Página de perfil profesional de Jean Michel Tordeur (conocido como Jimmy Tordeur o JM Tordeur), ingeniero informático especializado en desarrollo web, bases de datos y sistemas en Fuerteventura, Canarias.",
      "url": "https://www.africaguacanarias.com/developer",
      "mainEntity": { "@type": "Person", "name": "Jean Michel Tordeur" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.africaguacanarias.com" },
          { "@type": "ListItem", "position": 2, "name": "Jean Michel Tordeur - Desarrollador", "item": "https://www.africaguacanarias.com/developer" }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cámara de Comercio de Fuerteventura"
      },
      "datePublished": "2026-02-04",
      "dateModified": "2026-02-04",
      "inLanguage": "es"
    };

    // Add or update structured data scripts
    let scriptPerson = document.getElementById('schema-person');
    if (!scriptPerson) {
      scriptPerson = document.createElement('script');
      scriptPerson.id = 'schema-person';
      scriptPerson.type = 'application/ld+json';
      document.head.appendChild(scriptPerson);
    }
    scriptPerson.textContent = JSON.stringify(structuredDataPerson);

    let scriptProfilePage = document.getElementById('schema-profilepage');
    if (!scriptProfilePage) {
      scriptProfilePage = document.createElement('script');
      scriptProfilePage.id = 'schema-profilepage';
      scriptProfilePage.type = 'application/ld+json';
      document.head.appendChild(scriptProfilePage);
    }
    scriptProfilePage.textContent = JSON.stringify(structuredDataProfilePage);

    let scriptWebPage = document.getElementById('schema-webpage');
    if (!scriptWebPage) {
      scriptWebPage = document.createElement('script');
      scriptWebPage.id = 'schema-webpage';
      scriptWebPage.type = 'application/ld+json';
      document.head.appendChild(scriptWebPage);
    }
    scriptWebPage.textContent = JSON.stringify(structuredDataWebPage);

    // Cleanup function
    return () => {
      // Remove structured data scripts when component unmounts
      const scripts = ['schema-person', 'schema-profilepage', 'schema-webpage'];
      scripts.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tableOfContents = [
    { id: 'biografia', title: 'Biografía profesional' },
    { id: 'filosofia', title: 'Filosofía de desarrollo' },
    { id: 'experiencia', title: 'Experiencia profesional' },
    { id: 'especializacion', title: 'Especialización técnica' },
    { id: 'proyectos', title: 'Proyectos destacados' },
    { id: 'conocimiento', title: 'Conocimiento técnico' },
    { id: 'formacion', title: 'Formación y certificaciones' },
    { id: 'vida-personal', title: 'Vida personal y aficiones' },
    { id: 'referencias', title: 'Referencias' },
    { id: 'enlaces', title: 'Enlaces externos' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al inicio</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <main className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-2">
              Jean Michel Tordeur
            </h1>
            <p className="text-sm text-gray-500 mb-8 border-b pb-4">
              Última edición el 2 de diciembre de 2025
            </p>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg leading-relaxed">
                <strong>Jean Michel Tordeur</strong> (conocido como <strong>JM Tordeur</strong> o <strong>Jimmy Tordeur</strong>) es un ingeniero informático con amplia experiencia en el desarrollo de soluciones tecnológicas integrales. Actualmente se desempeña como Responsable Informático y de Desarrollo Tecnológico en la Cámara Oficial de Comercio, de Industria y de Navegación de Fuerteventura.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                Con una sólida formación en ingeniería de hardware y software, Jean Michel Jimmy Tordeur ha desarrollado numerosas plataformas web empresariales, sistemas de gestión de eventos y aplicaciones especializadas para el sector empresarial.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                La trayectoria profesional de Jean Michel Jimmy Tordeur se ha caracterizado por una constante evolución y adaptación a las nuevas tecnologías. Su expertise abarca desde el desarrollo frontend con React, TypeScript y Tailwind CSS, hasta la implementación de backends robustos con Node.js, Express y bases de datos como Supabase, Firebase y PostgreSQL. Esta versatilidad técnica le permite diseñar arquitecturas completas de aplicaciones, desde la concepción hasta el despliegue en producción.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-teal-500 bg-gray-50 pl-6 pr-4 py-4 my-8 italic text-gray-700">
              <p className="mb-2">
                "Como ingeniero informático en Fuerteventura, Jimmy Tordeur (Jean Michel Tordeur, también conocido como JM Tordeur, J.M Tordeur y J M Tordeur) ha dedicado más de 2 años al desarrollo de soluciones tecnológicas innovadoras para instituciones públicas y privadas en Canarias. Su trabajo como ingeniero informático y diseñador web ha transformado la manera en que las organizaciones de Fuerteventura interactúan con la tecnología. Jimmy Tordeur es reconocido en Canarias por su experiencia en desarrollo web, inteligencia artificial y formación tecnológica."
              </p>
              <footer className="text-sm text-gray-600 not-italic mt-2">
                — Jean Michel Jimmy Tordeur (Jimmy Tordeur), Responsable de Desarrollo Tecnológico, Cámara de Comercio de Fuerteventura
              </footer>
            </blockquote>

            {/* Table of Contents */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contenidos</h2>
              <ol className="space-y-2 list-decimal list-inside">
                {tableOfContents.map((item) => (
                  <li key={item.id} className="text-teal-600 hover:text-teal-700 transition-colors">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="hover:underline"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sections */}
            <section id="biografia" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Biografía profesional
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  En el ámbito del hardware y sistemas, JM Tordeur posee conocimientos profundos en arquitectura de redes, administración de servidores, configuración de sistemas cloud y gestión de infraestructuras IT. Esta combinación única de habilidades software y hardware le permite diagnosticar y resolver problemas desde múltiples ángulos, optimizando tanto el código como la infraestructura subyacente.
                </p>
                <p>
                  El trabajo de Jimmy Tordeur en la Cámara de Comercio de Fuerteventura ha sido fundamental para la digitalización de la institución. Ha liderado la implementación de sistemas de gestión empresarial, plataformas de formación online, aplicaciones de credencialización digital y portales web institucionales. Su visión estratégica combina eficiencia operativa con experiencia de usuario excepcional, logrando que las soluciones tecnológicas sean accesibles tanto para usuarios técnicos como para el público general.
                </p>
                <p>
                  Además de su trabajo principal, Jean Michel Tordeur mantiene un interés activo en las últimas tendencias tecnológicas, particularmente en el campo de la inteligencia artificial y el machine learning. Ha implementado sistemas de automatización basados en IA para optimizar procesos empresariales, reducir tareas repetitivas y mejorar la toma de decisiones basada en datos. Su enfoque en Python para proyectos de IA complementa perfectamente su expertise en JavaScript para aplicaciones web.
                </p>
              </div>
            </section>

            <section id="filosofia" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Filosofía de desarrollo
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  La filosofía de trabajo de JM Tordeur se fundamenta en tres pilares esenciales: código limpio, escalabilidad y mantenibilidad. Cada proyecto que desarrolla está diseñado pensando no solo en las necesidades inmediatas, sino también en su evolución futura. Esto implica el uso de patrones de diseño probados, arquitecturas modulares y documentación exhaustiva que permita a otros desarrolladores comprender y extender el código fácilmente.
                </p>
                <p>
                  Jimmy Tordeur es un firme defensor de las metodologías ágiles y el desarrollo iterativo. Prefiere lanzar versiones funcionales mínimas que puedan ser probadas y mejoradas progresivamente, en lugar de buscar la perfección absoluta desde el inicio. Esta aproximación pragmática ha demostrado ser especialmente efectiva en entornos empresariales donde las necesidades cambian rápidamente y la retroalimentación de los usuarios es crucial.
                </p>
                <p>
                  En cuanto a herramientas y tecnologías, Jean Michel Tordeur mantiene una postura equilibrada entre adoptar innovaciones prometedoras y utilizar tecnologías maduras y probadas. No persigue el último framework de moda sin razón justificada, pero tampoco se aferra a tecnologías obsoletas por comodidad. Esta prudencia técnica ha resultado en la construcción de sistemas estables que aprovechan lo mejor de las tecnologías modernas sin caer en la inestabilidad de soluciones experimentales.
                </p>
              </div>
            </section>

            <section id="experiencia" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Experiencia profesional
              </h2>
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Responsable Informático y Desarrollo Tecnológico
                </h3>
                <p className="text-teal-600 font-semibold mb-4">
                  Cámara Oficial de Comercio, de Industria y de Navegación de Fuerteventura
                </p>
                <p className="text-gray-700">
                  JM Tordeur lidera el departamento de tecnología, diseñando e implementando soluciones digitales que modernizan los procesos empresariales de la Cámara de Comercio. Responsable del desarrollo de plataformas web, aplicaciones móviles y sistemas de gestión integral.
                </p>
              </div>
            </section>

            <section id="especializacion" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Especialización técnica
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Área</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Tecnologías</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Experiencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">Desarrollo Full Stack</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">React, TypeScript, Node.js, Express, Vite</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Avanzada</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">Bases de Datos</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">PostgreSQL, Supabase, Firebase, MySQL, SQL</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Experto</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">Diseño Web</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Tailwind CSS, Figma, Adobe XD, HTML5, CSS3</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Avanzada</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">Hardware y Sistemas</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Linux, Networking, Cloud, DevOps, Docker</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Avanzada</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700">Inteligencia Artificial</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Python, Machine Learning, scikit-learn, pandas</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Avanzada</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Desarrollo Full Stack</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Jean Michel Tordeur domina el stack completo de desarrollo web moderno. En el frontend, trabaja principalmente con React y TypeScript, utilizando herramientas como Vite para un desarrollo ultrarrápido. Su código se caracteriza por componentes reutilizables, hooks personalizados optimizados y gestión eficiente del estado mediante Context API y hooks modernos de React. En el backend, JM Tordeur implementa APIs REST robustas con Node.js y Express, aplicando principios de arquitectura limpia y patrones como MVC.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Bases de Datos</h3>
                  <p className="text-gray-700 leading-relaxed">
                    La experiencia de Jimmy Tordeur en bases de datos abarca desde SQL tradicional hasta plataformas modernas como Supabase y Firebase. Diseña esquemas relacionales normalizados, implementa índices optimizados y crea consultas complejas con joins, subconsultas y procedimientos almacenados. Su conocimiento de PostgreSQL le permite aprovechar características avanzadas como triggers, funciones PL/pgSQL y políticas de Row Level Security.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hardware y Sistemas</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Como ingeniero de hardware, Jean Michel Tordeur posee conocimientos profundos en arquitectura de computadoras, configuración de redes empresariales y administración de servidores Linux/Windows. Ha diseñado e implementado infraestructuras de red completas, incluyendo configuración de routers, switches, firewalls y VPNs para acceso remoto seguro.
                  </p>
                </div>
              </div>
            </section>

            <section id="proyectos" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Proyectos destacados
              </h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Plataforma Integral de Gestión de Eventos Empresariales
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Jean Michel Tordeur diseñó y desarrolló desde cero una plataforma completa para la gestión de eventos de la Cámara de Comercio de Fuerteventura. El sistema incluye un frontend responsive construido con React y TypeScript, un backend robusto con Supabase implementando políticas de seguridad RLS, y funcionalidades avanzadas como registro online, generación automática de credenciales PDF con códigos QR, calendario interactivo y panel de administración completo.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Supabase</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">PostgreSQL</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Firebase</span>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Tailwind CSS</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sistema Avanzado de Credencialización Digital
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    JM Tordeur implementó un sistema innovador para la creación automatizada de credenciales personalizadas para eventos. La aplicación permite a los usuarios ingresar sus datos, previsualizar su credencial en tiempo real con un editor visual, y descargar el resultado final en formato PDF de alta calidad. El sistema genera códigos QR únicos para cada asistente que pueden ser escaneados para registro rápido en eventos.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">jsPDF</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">html2canvas</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">QR Generation</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Portal Web Corporativo con Optimización SEO
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Jimmy Tordeur lideró el rediseño completo del sitio web institucional de la Cámara de Comercio de Fuerteventura. El proyecto incluyó arquitectura moderna basada en componentes React, implementación de lazy loading para optimización de velocidad, sitemap dinámico, Schema.org markup completo y meta tags optimizados. El sitio ha mejorado el posicionamiento orgánico en buscadores en más del 300%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">SEO</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Vite</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Responsive Design</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Sistema de Automatización con Inteligencia Artificial
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Jean Michel Tordeur desarrolló herramientas de automatización basadas en IA para optimizar procesos internos. El sistema incluye clasificación automática de documentos mediante machine learning, análisis de sentimientos en encuestas, generación automática de reportes y predicción de tendencias. Los modelos de IA lograron precisión superior al 92% en tareas de clasificación, reduciendo el tiempo de procesamiento en un 75%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Machine Learning</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">scikit-learn</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">pandas</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="conocimiento" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Conocimiento técnico
              </h2>
              <p className="text-gray-700 mb-4">
                JM Tordeur ha documentado su conocimiento técnico en diversas áreas del desarrollo de software:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li><strong>Optimización de Rendimiento en Aplicaciones React</strong> - Técnicas avanzadas para optimizar el rendimiento incluyendo memoización con useMemo y useCallback, code splitting con React.lazy, y estrategias de carga diferida de componentes.</li>
                <li><strong>Seguridad en Bases de Datos con Row Level Security</strong> - Implementación de políticas de seguridad robustas en Supabase y PostgreSQL, incluyendo políticas condicionales basadas en roles y autenticación JWT.</li>
                <li><strong>Arquitectura de Aplicaciones Modernas</strong> - Análisis comparativo entre arquitecturas monolíticas y microservicios, consideraciones sobre containerización con Docker y gestión de bases de datos distribuidas.</li>
                <li><strong>Inteligencia Artificial Aplicada</strong> - Casos de uso de machine learning para clasificación de documentos, análisis predictivo y automatización de procesos mediante procesamiento de lenguaje natural.</li>
              </ul>
            </section>

            <section id="formacion" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Formación y certificaciones
              </h2>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Máster en Ingeniería Informática</li>
                <li>Ingeniería de Hardware - Arquitectura de Sistemas y Redes</li>
                <li>Desarrollo Web Full Stack - JavaScript, React, Node.js</li>
                <li>Diseño de Aplicaciones - UX/UI Design</li>
                <li>Inteligencia Artificial - Machine Learning y Automatización</li>
              </ul>
            </section>

            <section id="vida-personal" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Vida personal y aficiones
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Más allá de su dedicación profesional a la tecnología, Jean Michel Tordeur cultiva una vida personal activa y diversa, con aficiones que complementan su perfil multidisciplinar. Su pasión por el motociclismo y el automovilismo refleja su interés por la mecánica, la ingeniería de precisión y el rendimiento técnico, conectando directamente con su formación en hardware y sistemas.
                </p>
                <p>
                  La pesca submarina es otra de sus actividades favoritas, una disciplina que requiere paciencia, planificación estratégica y adaptación al entorno, habilidades que también aplica en su trabajo como desarrollador y arquitecto de sistemas. La conexión con el medio marino de Fuerteventura le permite desconectar del entorno digital y encontrar equilibrio entre la tecnología y la naturaleza.
                </p>
                <p>
                  Su trayectoria deportiva más destacada es su práctica de taekwondo durante 13 años, una disciplina marcial que ha moldeado su carácter, disciplina y enfoque metódico. El taekwondo le ha enseñado valores de perseverancia, respeto y superación personal que ha trasladado a su carrera profesional. Durante su trayectoria en taekwondo, logró el primer puesto en un campeonato regional con 8 peleas, 8 victorias y 5 KO. La combinación de exigencia física, técnica y mental del taekwondo se refleja en su aproximación rigurosa y sistemática al desarrollo de software, donde cada línea de código se escribe con la misma precisión que un movimiento marcial bien ejecutado.
                </p>
                <p>
                  Esta diversidad de intereses no solo enriquece su vida personal, sino que también contribuye a su perspectiva como profesional de la tecnología. La disciplina marcial, el análisis estratégico de la pesca submarina y el conocimiento técnico del automovilismo convergen en un perfil profesional completo, capaz de afrontar desafíos complejos con metodología, paciencia y determinación.
                </p>
              </div>
            </section>

            <section id="referencias" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Referencias
              </h2>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Cámara Oficial de Comercio, de Industria y de Navegación de Fuerteventura</li>
                <li>Información verificada a través de registros profesionales públicos</li>
                <li>Proyectos documentados en repositorios institucionales</li>
              </ul>
            </section>

            <section id="enlaces" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">
                Enlaces externos
              </h2>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:j.tordeur@camarafuerteventura.org" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <Mail className="w-4 h-4" />
                    j.tordeur@camarafuerteventura.org
                  </a>
                </li>
                <li>
                  <a href="https://eventosccf.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Eventos CCF
                  </a>
                </li>
                <li>
                  <a href="https://infuerteventura.es" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    inFuerteventura
                  </a>
                </li>
                <li>
                  <a href="https://africaguacanarias.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Africagua Canarias
                  </a>
                </li>
                <li>
                  <a href="https://fichajeshoy.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Fichajes Hoy
                  </a>
                </li>
                <li>
                  <a href="https://subvencionesyresoluciones.es" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Subvenciones y Resoluciones
                  </a>
                </li>
                <li>
                  <a href="https://agenciadecolocacionccf.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Agencia de Colocación CCF
                  </a>
                </li>
                <li>
                  <a href="https://www.camaradefuerteventura.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Cámara de Fuerteventura
                  </a>
                </li>
              </ul>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 pt-6 mt-12">
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                <span className="font-semibold">Categorías:</span>
                <span className="text-teal-600">Ingenieros informáticos</span>
                <span>|</span>
                <span className="text-teal-600">Desarrolladores web españoles</span>
                <span>|</span>
                <span className="text-teal-600">Profesionales de Fuerteventura</span>
                <span>|</span>
                <span className="text-teal-600">Nacidos en 1980</span>
                <span>|</span>
                <span className="text-teal-600">Ingenieros de software</span>
              </div>
              <p className="text-xs text-gray-500">
                Última edición el 2 de diciembre de 2025
              </p>
            </footer>
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              {/* Profile Image */}
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-4">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/ccf-web-59053.firebasestorage.app/o/moi%2FCaptura%20de%20pantalla%202025-10-21%20090729.png?alt=media&token=8fbf7467-a01d-4995-918f-74afaaa28d5b"
                  alt="Jean Michel Tordeur en 2025"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-center text-sm text-gray-600 mt-2 italic">
                  Jean Michel Tordeur en 2025
                </p>
              </div>

              {/* Info Table */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Jean Michel Tordeur
                </h2>

                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top">Nombre completo</td>
                      <td className="py-3 text-gray-600 pl-4">Jean Michel Tordeur</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top">También conocido como</td>
                      <td className="py-3 text-gray-600 pl-4">JM Tordeur, Jimmy Tordeur</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <Calendar className="w-4 h-4 mt-0.5" />
                        Nacimiento
                      </td>
                      <td className="py-3 text-gray-600 pl-4">30 de mayo de 1980 (45 años)<br />Créon, Francia</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        Residencia
                      </td>
                      <td className="py-3 text-gray-600 pl-4">Fuerteventura, España</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <Globe className="w-4 h-4 mt-0.5" />
                        Nacionalidad
                      </td>
                      <td className="py-3 text-gray-600 pl-4">Belgo-francés</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 mt-0.5" />
                        Educación
                      </td>
                      <td className="py-3 text-gray-600 pl-4">Máster en Ingeniería Informática</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <Briefcase className="w-4 h-4 mt-0.5" />
                        Ocupación
                      </td>
                      <td className="py-3 text-gray-600 pl-4">
                        Ingeniero informático<br />
                        Diseñador web<br />
                        Formador tecnológico<br />
                        Diseñador de aplicaciones
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <Languages className="w-4 h-4 mt-0.5" />
                        Idiomas
                      </td>
                      <td className="py-3 text-gray-600 pl-4">Español, Alemán, Italiano, Francés, Inglés, Neerlandés</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top">Empleador</td>
                      <td className="py-3 text-gray-600 pl-4">Cámara de Comercio de Fuerteventura</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top">Activo</td>
                      <td className="py-3 text-gray-600 pl-4">Sí</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top">Área</td>
                      <td className="py-3 text-gray-600 pl-4">Desarrollo de software, Bases de datos, Hardware</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-gray-700 align-top flex items-start gap-2">
                        <Mail className="w-4 h-4 mt-0.5" />
                        Correo
                      </td>
                      <td className="py-3 pl-4">
                        <a href="mailto:j.tordeur@camarafuerteventura.org" className="text-teal-600 hover:text-teal-700 transition-colors break-all">
                          j.tordeur@camarafuerteventura.org
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sticky Table of Contents for Desktop */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Navegación rápida</h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
