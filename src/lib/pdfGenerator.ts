import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ProgressCallback {
  (progress: number): void;
}

const PRIMARY_COLOR: [number, number, number] = [13, 148, 136];
const SECONDARY_COLOR: [number, number, number] = [37, 99, 235];
const TEXT_COLOR: [number, number, number] = [31, 41, 55];
const LIGHT_BG: [number, number, number] = [240, 253, 250];

export class MemoriaPDFGenerator {
  private doc: jsPDF;
  private currentPage = 1;
  private yPosition = 20;
  private readonly pageWidth: number;
  private readonly pageHeight: number;
  private readonly marginLeft = 20;
  private readonly marginRight = 20;
  private readonly marginTop = 20;
  private readonly marginBottom = 25;
  private readonly contentWidth: number;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - this.marginLeft - this.marginRight;
  }

  private addHeader() {
    this.doc.setFillColor(...PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, 10, 'F');

    this.doc.setFontSize(8);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('Memoria Técnica - Africagua 2025', this.pageWidth / 2, 6, { align: 'center' });
  }

  private addFooter() {
    const footerY = this.pageHeight - 15;

    this.doc.setDrawColor(...PRIMARY_COLOR);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.marginLeft, footerY, this.pageWidth - this.marginRight, footerY);

    this.doc.setFontSize(8);
    this.doc.setTextColor(...TEXT_COLOR);
    this.doc.text(
      `Página ${this.currentPage}`,
      this.pageWidth / 2,
      footerY + 5,
      { align: 'center' }
    );

    this.doc.text(
      '© 2025 Africagua - Cámara de Comercio de Fuerteventura',
      this.pageWidth / 2,
      footerY + 10,
      { align: 'center' }
    );
  }

  private checkPageBreak(requiredSpace: number): boolean {
    if (this.yPosition + requiredSpace > this.pageHeight - this.marginBottom) {
      this.doc.addPage();
      this.currentPage++;
      this.addHeader();
      this.addFooter();
      this.yPosition = this.marginTop + 15;
      return true;
    }
    return false;
  }

  private addText(text: string, fontSize: number, isBold = false, color: [number, number, number] = TEXT_COLOR) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    this.doc.setTextColor(...color);

    const lines = this.doc.splitTextToSize(text, this.contentWidth);
    const lineHeight = fontSize * 0.4;

    for (const line of lines) {
      this.checkPageBreak(lineHeight + 2);
      this.doc.text(line, this.marginLeft, this.yPosition);
      this.yPosition += lineHeight;
    }

    this.yPosition += 2;
  }

  private addTitle(text: string, level: 1 | 2 | 3 = 1) {
    const fontSizes = { 1: 18, 2: 14, 3: 12 };
    const spacing = { 1: 10, 2: 8, 3: 6 };

    this.yPosition += spacing[level];
    this.checkPageBreak(fontSizes[level] + spacing[level]);

    if (level === 1) {
      this.doc.setFillColor(...PRIMARY_COLOR);
      this.doc.rect(this.marginLeft - 5, this.yPosition - 5, 5, fontSizes[level], 'F');
    }

    this.addText(text, fontSizes[level], true, level === 1 ? PRIMARY_COLOR : TEXT_COLOR);
    this.yPosition += spacing[level] / 2;
  }

  private addBulletPoint(text: string) {
    this.checkPageBreak(10);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...TEXT_COLOR);

    this.doc.circle(this.marginLeft + 2, this.yPosition - 1.5, 1, 'F');

    const lines = this.doc.splitTextToSize(text, this.contentWidth - 8);
    for (const line of lines) {
      this.doc.text(line, this.marginLeft + 6, this.yPosition);
      this.yPosition += 5;
    }
  }

  private addHighlightBox(title: string, items: string[], bgColor: [number, number, number] = LIGHT_BG) {
    const boxHeight = (items.length * 5) + 15;
    this.checkPageBreak(boxHeight);

    this.doc.setFillColor(...bgColor);
    this.doc.roundedRect(this.marginLeft, this.yPosition, this.contentWidth, boxHeight, 3, 3, 'F');

    this.yPosition += 8;
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...PRIMARY_COLOR);
    this.doc.text(title, this.marginLeft + 5, this.yPosition);

    this.yPosition += 7;
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...TEXT_COLOR);

    for (const item of items) {
      const lines = this.doc.splitTextToSize(item, this.contentWidth - 15);
      for (const line of lines) {
        this.doc.text(`• ${line}`, this.marginLeft + 8, this.yPosition);
        this.yPosition += 4.5;
      }
    }

    this.yPosition += 5;
  }

  private addCoverPage() {
    this.doc.setFillColor(...PRIMARY_COLOR);
    this.doc.rect(0, 0, this.pageWidth, this.pageHeight / 3, 'F');

    this.doc.setFontSize(32);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('Memoria Técnica', this.pageWidth / 2, 50, { align: 'center' });

    this.doc.setFontSize(24);
    this.doc.text('Proyecto Web', this.pageWidth / 2, 65, { align: 'center' });

    this.doc.setFontSize(20);
    this.doc.setTextColor(...SECONDARY_COLOR);
    this.doc.text('Africagua 2025', this.pageWidth / 2, 110, { align: 'center' });

    this.doc.setFontSize(14);
    this.doc.setTextColor(...TEXT_COLOR);
    this.doc.text('Congreso Internacional del Agua y las Energías Renovables en África',
      this.pageWidth / 2, 125, { align: 'center', maxWidth: this.contentWidth });

    this.doc.setFontSize(12);
    this.doc.text('Puerto del Rosario, Fuerteventura', this.pageWidth / 2, 140, { align: 'center' });
    this.doc.text('6-8 de Mayo de 2025', this.pageWidth / 2, 148, { align: 'center' });

    this.doc.setFillColor(240, 240, 240);
    this.doc.roundedRect(40, 170, this.pageWidth - 80, 40, 5, 5, 'F');

    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Desarrollado por:', this.pageWidth / 2, 182, { align: 'center' });

    this.doc.setFontSize(14);
    this.doc.text('Jean Michel Jimmy Tordeur', this.pageWidth / 2, 192, { align: 'center' });

    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Ingeniero Informático', this.pageWidth / 2, 200, { align: 'center' });
    this.doc.text('Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura',
      this.pageWidth / 2, 206, { align: 'center' });

    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text('Febrero 2026', this.pageWidth / 2, this.pageHeight - 20, { align: 'center' });

    this.addFooter();
  }

  private addTableOfContents() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('Índice de Contenidos', 1);

    const sections = [
      '1. Resumen Ejecutivo',
      '2. Introducción y Contexto',
      '3. Objetivos del Proyecto Web',
      '4. Arquitectura Técnica',
      '5. Stack Tecnológico',
      '6. Componentes Principales',
      '7. Funcionalidades Implementadas',
      '8. Diseño y Experiencia de Usuario',
      '9. Sistema de Internacionalización',
      '10. Seguridad y Privacidad',
      '11. Optimización y SEO',
      '12. Integración con Servicios Externos',
      '13. Desafíos Técnicos y Soluciones',
      '14. Resultados y Métricas',
      '15. Conclusiones y Trabajo Futuro'
    ];

    this.doc.setFillColor(...LIGHT_BG);
    this.doc.roundedRect(this.marginLeft, this.yPosition, this.contentWidth, sections.length * 7 + 10, 3, 3, 'F');

    this.yPosition += 8;
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...TEXT_COLOR);

    for (const section of sections) {
      this.doc.text(section, this.marginLeft + 5, this.yPosition);
      this.yPosition += 7;
    }
  }

  public async generate(onProgress?: ProgressCallback): Promise<void> {
    try {
      onProgress?.(5);
      this.addCoverPage();

      onProgress?.(10);
      this.addTableOfContents();

      onProgress?.(15);
      this.addSection1();

      onProgress?.(20);
      this.addSection2();

      onProgress?.(30);
      this.addSection3();

      onProgress?.(40);
      this.addSection4();

      onProgress?.(50);
      this.addSection5();

      onProgress?.(60);
      this.addSection6();

      onProgress?.(70);
      this.addSection7();

      onProgress?.(75);
      this.addSection8();

      onProgress?.(80);
      this.addSection9();

      onProgress?.(85);
      this.addSection10();

      onProgress?.(90);
      this.addSection11();

      onProgress?.(92);
      this.addSection12();

      onProgress?.(94);
      this.addSection13();

      onProgress?.(96);
      this.addSection14();

      onProgress?.(98);
      this.addSection15();

      onProgress?.(100);

      this.doc.save('Memoria_Tecnica_Africagua_2025.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  private addSection1() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('1. Resumen Ejecutivo', 1);

    this.addText(
      'Este documento presenta la memoria técnica completa del desarrollo del sitio web oficial del Congreso Internacional Africagua 2025. El proyecto representa una plataforma web moderna, multilingüe y completamente funcional diseñada para promover y gestionar uno de los eventos más importantes en el ámbito del agua y las energías renovables en África.',
      10
    );

    this.addText(
      'La plataforma ha sido desarrollada utilizando tecnologías web de última generación, incluyendo React 18, TypeScript, Tailwind CSS, y servicios en la nube como Firebase y Supabase. El sitio ofrece una experiencia de usuario excepcional, con un diseño responsive, accesible y optimizado para todos los dispositivos.',
      10
    );

    this.addHighlightBox('Características Destacadas:', [
      'Soporte multilingüe en 5 idiomas (ES, EN, FR, IT, DE)',
      '28 componentes React modulares y reutilizables',
      'Sistema de gestión de noticias con panel administrativo',
      'Integración con mapas interactivos (Google Maps y OpenStreetMap)',
      'Galería de participantes con más de 50 empresas y organizaciones',
      'Sistema de registro para el concurso de startups',
      'Cumplimiento total con RGPD y políticas de privacidad',
      'PWA (Progressive Web App) con funcionalidad offline',
      'Optimización SEO avanzada para múltiples idiomas'
    ]);
  }

  private addSection2() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('2. Introducción y Contexto', 1);

    this.addTitle('2.1. Sobre Africagua', 3);
    this.addText(
      'Africagua es un congreso internacional que reúne a expertos, empresas, gobiernos y organizaciones comprometidas con el desarrollo sostenible del agua y las energías renovables en el continente africano. El evento de 2025 marca su tercera edición y se celebrará en Puerto del Rosario, Fuerteventura, del 6 al 8 de mayo.',
      10
    );

    this.addTitle('2.2. Necesidad del Proyecto', 3);
    this.addText(
      'La Cámara de Comercio de Fuerteventura identificó la necesidad de crear una plataforma digital robusta que pudiera:',
      10
    );

    this.addBulletPoint('Proporcionar información actualizada sobre el congreso a nivel internacional');
    this.addBulletPoint('Facilitar el registro y la participación de empresas y ponentes');
    this.addBulletPoint('Promocionar las actividades paralelas como el concurso de startups');
    this.addBulletPoint('Ofrecer una experiencia multilingüe para participantes de diferentes países');
    this.addBulletPoint('Gestionar las noticias y actualizaciones del evento de forma dinámica');
    this.addBulletPoint('Presentar a los patrocinadores y colaboradores de manera destacada');
  }

  private addSection3() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('3. Objetivos del Proyecto Web', 1);

    this.addHighlightBox('Alcance Global', [
      'Crear una plataforma accesible internacionalmente con soporte multilingüe completo que permita la participación de usuarios de diferentes países y continentes.'
    ], [240, 253, 250]);

    this.addHighlightBox('Experiencia de Usuario', [
      'Diseñar una interfaz intuitiva, moderna y responsive que funcione perfectamente en todos los dispositivos, desde móviles hasta pantallas de escritorio grandes.'
    ], [239, 246, 255]);

    this.addHighlightBox('Gestión de Contenido', [
      'Implementar un sistema de gestión de contenidos que permita actualizar noticias y eventos de forma sencilla sin necesidad de conocimientos técnicos.'
    ], [240, 253, 244]);

    this.addHighlightBox('Seguridad y Privacidad', [
      'Garantizar el cumplimiento total con las regulaciones RGPD y asegurar la protección de datos personales de los usuarios y participantes.'
    ], [250, 245, 255]);
  }

  private addSection4() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('4. Arquitectura Técnica', 1);

    this.addTitle('4.1. Arquitectura Frontend', 3);
    this.addText(
      'La aplicación sigue una arquitectura de componentes modulares basada en React 18. Cada funcionalidad está encapsulada en componentes independientes y reutilizables, siguiendo el principio de responsabilidad única.',
      10
    );

    this.addTitle('4.2. Arquitectura Backend', 3);
    this.addText('El backend utiliza un enfoque híbrido con Firebase y Supabase:', 10);

    this.addBulletPoint('Firebase Storage: Almacenamiento de imágenes y archivos multimedia');
    this.addBulletPoint('Firebase Realtime Database: Gestión de noticias en tiempo real');
    this.addBulletPoint('Supabase PostgreSQL: Base de datos principal para participantes');
    this.addBulletPoint('Firebase Hosting: Alojamiento y CDN para distribución global');

    this.addTitle('4.3. Flujo de Datos', 3);
    this.addText('La aplicación implementa un flujo de datos unidireccional:', 10);

    this.addBulletPoint('El usuario interactúa con los componentes de UI');
    this.addBulletPoint('Los componentes ejecutan acciones que modifican el estado');
    this.addBulletPoint('React re-renderiza solo los componentes afectados');
    this.addBulletPoint('Los hooks gestionan efectos secundarios y llamadas a APIs');
  }

  private addSection5() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('5. Stack Tecnológico', 1);

    this.addHighlightBox('Frontend Technologies', [
      'React 18 - Framework principal',
      'TypeScript - Tipado estático',
      'Vite - Build tool de alta velocidad',
      'Tailwind CSS - Framework CSS utility-first',
      'React Router - Enrutamiento del lado del cliente',
      'Lucide React - Iconografía moderna'
    ], [239, 246, 255]);

    this.addHighlightBox('Backend & Services', [
      'Firebase - Backend as a Service Platform',
      'Supabase - Base de datos PostgreSQL',
      'Google Maps API - Mapas interactivos',
      'Firebase Storage - Almacenamiento de archivos'
    ], [240, 253, 244]);

    this.addHighlightBox('Internationalization & Tools', [
      'i18next - Sistema de internacionalización',
      'jsPDF - Generación de documentos PDF',
      'Workbox - Progressive Web App y Service Workers'
    ], [250, 245, 255]);
  }

  private addSection6() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('6. Componentes Principales', 1);

    this.addText('El proyecto cuenta con 28 componentes React modulares:', 10, true);

    const components = [
      ['Hero', 'Sección de bienvenida con animaciones y contador regresivo'],
      ['Navbar', 'Barra de navegación responsive con selector de idiomas'],
      ['AboutSection', 'Información sobre el congreso y objetivos'],
      ['LocationSection', 'Detalles de ubicación con mapas interactivos'],
      ['NewsSection', 'Sistema de noticias dinámico con Firebase'],
      ['AdminNewsPanel', 'Panel administrativo para gestión de contenido'],
      ['ParticipantsGallery', 'Galería de 50+ empresas participantes'],
      ['StartupCompetition', 'Información del concurso de startups'],
      ['ProgramPage', 'Programa completo del congreso'],
      ['SpeakersSection', 'Perfiles de ponentes y expertos'],
      ['Sponsors', 'Patrocinadores por categorías'],
      ['ContactSection', 'Formulario de contacto validado'],
      ['CookiePolicy', 'Política de cookies conforme RGPD'],
      ['PrivacyPolicy', 'Política de privacidad completa'],
      ['LegalNotice', 'Aviso legal de la organización']
    ];

    for (const [name, description] of components) {
      this.checkPageBreak(15);
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(...PRIMARY_COLOR);
      this.doc.text(`${name}:`, this.marginLeft, this.yPosition);

      this.yPosition += 5;
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(...TEXT_COLOR);
      this.doc.setFontSize(9);
      const lines = this.doc.splitTextToSize(description, this.contentWidth - 5);
      for (const line of lines) {
        this.doc.text(line, this.marginLeft + 3, this.yPosition);
        this.yPosition += 4;
      }
      this.yPosition += 3;
    }
  }

  private addSection7() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('7. Funcionalidades Implementadas', 1);

    this.addHighlightBox('Internacionalización Completa', [
      'Soporte para 5 idiomas: Español, Inglés, Francés, Italiano y Alemán',
      'Detección automática del idioma del navegador',
      'Más de 500 strings traducidos manualmente para cada idioma',
      'URLs amigables con códigos de idioma para mejor SEO'
    ], [240, 253, 250]);

    this.addHighlightBox('Gestión de Contenido Dinámico', [
      'Panel administrativo para gestión de noticias en tiempo real',
      'Subida de imágenes a Firebase Storage con URLs permanentes',
      'Editor visual para contenido con previsualización',
      'Sistema de notificaciones para nuevas actualizaciones'
    ], [250, 245, 255]);

    this.addHighlightBox('Progressive Web App (PWA)', [
      'Instalable en dispositivos móviles y desktop',
      'Funcionalidad offline con Service Workers',
      'Iconos y splash screens personalizados',
      'Manifesto web configurado completamente'
    ], [240, 253, 244]);

    this.addHighlightBox('Diseño Responsive Avanzado', [
      'Breakpoints optimizados para todos los dispositivos',
      'Menú hamburguesa con animaciones fluidas',
      'Imágenes optimizadas y lazy loading',
      'Grids y layouts adaptables'
    ], [255, 247, 237]);
  }

  private addSection8() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('8. Diseño y Experiencia de Usuario', 1);

    this.addTitle('8.1. Paleta de Colores', 3);
    this.addText(
      'La paleta de colores se inspira en los elementos principales del congreso: agua y energías renovables. Se utilizan tonos teal y turquesa para representar el agua, combinados con naranjas y amarillos para la energía solar.',
      10
    );

    this.addTitle('8.2. Tipografía', 3);
    this.addText(
      'Se utiliza la fuente del sistema (system-ui) para garantizar la mejor legibilidad y rendimiento en todos los dispositivos. La jerarquía tipográfica está claramente definida.',
      10
    );

    this.addTitle('8.3. Animaciones y Efectos', 3);
    this.addBulletPoint('Animaciones de agua con efecto de ondas en secciones específicas');
    this.addBulletPoint('Rotación continua de elementos que representan energía eólica');
    this.addBulletPoint('Efectos de shimmer para representar energía solar');
    this.addBulletPoint('Transiciones suaves en hover y estados activos');
    this.addBulletPoint('Parallax sutil en el scroll para añadir profundidad');

    this.addTitle('8.4. Accesibilidad', 3);
    this.addText('El sitio cumple con las pautas WCAG 2.1 nivel AA:', 10);
    this.addBulletPoint('Contraste de color adecuado en todos los elementos de texto');
    this.addBulletPoint('Navegación completa por teclado con focus indicators visibles');
    this.addBulletPoint('Atributos ARIA para lectores de pantalla');
    this.addBulletPoint('Textos alternativos descriptivos en todas las imágenes');
    this.addBulletPoint('Formularios con labels asociados correctamente');
  }

  private addSection9() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('9. Sistema de Internacionalización', 1);

    this.addText(
      'La implementación de i18n es uno de los aspectos más críticos del proyecto, dado su alcance internacional. Se utiliza la biblioteca i18next con React hooks.',
      10
    );

    this.addTitle('9.1. Estructura de Traducciones', 3);
    this.addText(
      'Cada idioma tiene su propio archivo de traducción con estructura JSON anidada en src/i18n/translations/',
      10
    );

    this.addTitle('9.2. Características de i18n', 3);
    this.addBulletPoint('Detección automática del idioma del navegador al cargar');
    this.addBulletPoint('Persistencia de la selección de idioma en localStorage');
    this.addBulletPoint('Cambio de idioma en tiempo real sin recargar la página');
    this.addBulletPoint('Soporte para interpolación de variables en strings');
    this.addBulletPoint('Pluralización automática según el idioma');
    this.addBulletPoint('Fallback al español si una traducción no está disponible');
  }

  private addSection10() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('10. Seguridad y Privacidad', 1);

    this.addTitle('10.1. Cumplimiento RGPD', 3);
    this.addText('El sitio cumple totalmente con el Reglamento General de Protección de Datos:', 10);

    this.addBulletPoint('Banner de consentimiento de cookies al primer acceso');
    this.addBulletPoint('Política de privacidad completa y accesible');
    this.addBulletPoint('Política de cookies detallando todos los tipos utilizados');
    this.addBulletPoint('Aviso legal con información de la entidad responsable');
    this.addBulletPoint('Derecho de acceso, rectificación y supresión de datos');

    this.addTitle('10.2. Seguridad de Datos', 3);
    this.addBulletPoint('Todas las comunicaciones se realizan sobre HTTPS');
    this.addBulletPoint('Variables de entorno para claves sensibles');
    this.addBulletPoint('Validación de formularios en cliente y servidor');
    this.addBulletPoint('Protección contra XSS mediante escapado automático de React');
    this.addBulletPoint('Headers de seguridad configurados en el servidor');
    this.addBulletPoint('Panel de administración protegido con contraseña');

    this.addTitle('10.3. Firebase Security Rules', 3);
    this.addBulletPoint('Solo usuarios autenticados pueden escribir en la base de datos');
    this.addBulletPoint('Lectura pública de noticias pero escritura restringida');
    this.addBulletPoint('Validación de tipos de datos en el servidor');
    this.addBulletPoint('Rate limiting para prevenir abuso');
  }

  private addSection11() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('11. Optimización y SEO', 1);

    this.addTitle('11.1. SEO On-Page', 3);
    this.addBulletPoint('Meta tags optimizados para cada página e idioma');
    this.addBulletPoint('Títulos y descripciones únicos con keywords relevantes');
    this.addBulletPoint('Estructura semántica con HTML5');
    this.addBulletPoint('URLs amigables y descriptivas');
    this.addBulletPoint('Schema.org markup para eventos');
    this.addBulletPoint('Sitemap.xml actualizado automáticamente');
    this.addBulletPoint('Robots.txt correctamente configurado');

    this.addHighlightBox('Métricas de Performance', [
      'Lighthouse Score: 95+ en Performance',
      'First Contentful Paint: < 1.5s',
      'Time to Interactive: < 3s',
      'Bundle Size: < 500KB (gzipped)'
    ], [240, 253, 244]);

    this.addTitle('11.3. Optimizaciones Aplicadas', 3);
    this.addBulletPoint('Code splitting por rutas con React.lazy');
    this.addBulletPoint('Lazy loading de imágenes');
    this.addBulletPoint('Compresión Gzip y Brotli en el servidor');
    this.addBulletPoint('CDN global para distribución rápida de assets');
    this.addBulletPoint('Caché de recursos estáticos con Service Worker');
    this.addBulletPoint('Minificación de JS, CSS y HTML en producción');
    this.addBulletPoint('Preload de recursos críticos');
    this.addBulletPoint('Optimización de imágenes con WebP');
  }

  private addSection12() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('12. Integración con Servicios Externos', 1);

    this.addTitle('12.1. Firebase', 3);
    this.addBulletPoint('Realtime Database: Almacenamiento de noticias con actualizaciones en tiempo real');
    this.addBulletPoint('Storage: Hosting de imágenes y archivos multimedia');
    this.addBulletPoint('Hosting: Despliegue y CDN global');

    this.addTitle('12.2. Supabase', 3);
    this.addBulletPoint('PostgreSQL: Base de datos relacional para participantes');
    this.addBulletPoint('Row Level Security: Políticas de seguridad a nivel de fila');
    this.addBulletPoint('RESTful API: Endpoints automáticos para CRUD operations');

    this.addTitle('12.3. Google Maps API', 3);
    this.addText('Integración completa con Google Maps JavaScript API para mostrar:', 10);
    this.addBulletPoint('Ubicación del Recinto Ferial de Puerto del Rosario');
    this.addBulletPoint('Hoteles y alojamientos recomendados');
    this.addBulletPoint('Puntos de interés turístico en Fuerteventura');
    this.addBulletPoint('Restaurantes y servicios cercanos');

    this.addTitle('12.4. OpenStreetMap', 3);
    this.addText(
      'Como alternativa a Google Maps, se integra OpenStreetMap con Leaflet para usuarios que prefieran una solución open source.',
      10
    );
  }

  private addSection13() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('13. Desafíos Técnicos y Soluciones', 1);

    this.addHighlightBox('Desafío 1: Gestión de Estado Multilingüe', [
      'Problema: Mantener el estado consistente cuando el usuario cambia de idioma',
      'Solución: Sistema de persistencia en localStorage con useTranslation'
    ], [254, 242, 242]);

    this.addHighlightBox('Desafío 2: Optimización de Carga de Imágenes', [
      'Problema: Galería con 50+ logos afectaba el tiempo de carga',
      'Solución: Lazy loading con Intersection Observer y optimización a WebP'
    ], [254, 242, 242]);

    this.addHighlightBox('Desafío 3: SEO en SPA', [
      'Problema: SPAs tienen limitaciones para el SEO',
      'Solución: Meta tags dinámicos, sitemap estático y pre-rendering'
    ], [254, 242, 242]);

    this.addHighlightBox('Desafío 4: Compatibilidad Cross-Browser', [
      'Problema: Animaciones no funcionaban en navegadores antiguos',
      'Solución: Autoprefixer, feature detection y fallbacks'
    ], [254, 242, 242]);

    this.addHighlightBox('Desafío 5: Gestión de Noticias en Tiempo Real', [
      'Problema: Necesidad de actualizar contenido sin recargar',
      'Solución: Firebase Realtime Database con listeners automáticos'
    ], [254, 242, 242]);
  }

  private addSection14() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('14. Resultados y Métricas', 1);

    const metrics = [
      ['95+', 'Lighthouse Performance Score'],
      ['5', 'Idiomas Soportados'],
      ['28', 'Componentes React'],
      ['100%', 'Cumplimiento RGPD'],
      ['< 3s', 'Time to Interactive'],
      ['50+', 'Empresas Participantes']
    ];

    for (const [value, label] of metrics) {
      this.checkPageBreak(15);
      this.doc.setFontSize(16);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(...PRIMARY_COLOR);
      this.doc.text(value, this.marginLeft, this.yPosition);

      this.yPosition += 6;
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(...TEXT_COLOR);
      this.doc.text(label, this.marginLeft, this.yPosition);
      this.yPosition += 10;
    }

    this.addHighlightBox('Impacto del Proyecto', [
      'Plataforma oficial que centraliza toda la información del congreso',
      'Facilita la participación internacional con soporte multilingüe',
      'Aumenta la visibilidad de patrocinadores y participantes',
      'Proporciona una experiencia moderna y profesional'
    ], [240, 253, 250]);
  }

  private addSection15() {
    this.doc.addPage();
    this.currentPage++;
    this.addHeader();
    this.addFooter();
    this.yPosition = this.marginTop + 15;

    this.addTitle('15. Conclusiones y Trabajo Futuro', 1);

    this.addTitle('15.1. Logros Principales', 3);
    this.addText(
      'El proyecto ha alcanzado exitosamente todos sus objetivos iniciales, entregando una plataforma web moderna, funcional y escalable que cumple con los más altos estándares de calidad, seguridad y accesibilidad.',
      10
    );

    this.addHighlightBox('Aspectos Destacados del Desarrollo', [
      'Arquitectura escalable y mantenible con componentes modulares',
      'Rendimiento excepcional con scores de 95+ en Lighthouse',
      'Experiencia de usuario intuitiva y accesible',
      'Sistema robusto de gestión de contenidos',
      'Cumplimiento total con regulaciones de privacidad',
      'Optimización SEO avanzada para visibilidad internacional'
    ], [240, 253, 250]);

    this.addTitle('15.2. Aprendizajes Técnicos', 3);
    this.addBulletPoint('Arquitectura moderna de aplicaciones React con TypeScript');
    this.addBulletPoint('Implementación completa de sistemas de internacionalización');
    this.addBulletPoint('Integración de múltiples servicios en la nube');
    this.addBulletPoint('Optimización avanzada de performance y SEO');
    this.addBulletPoint('Desarrollo de Progressive Web Apps');
    this.addBulletPoint('Diseño responsive y accesible con Tailwind CSS');

    this.addTitle('15.3. Trabajo Futuro', 3);
    this.addBulletPoint('Sistema de Registro Completo con gestión de tickets y pagos');
    this.addBulletPoint('App Móvil Nativa con React Native');
    this.addBulletPoint('Sistema de Networking para participantes');
    this.addBulletPoint('Streaming en Vivo de ponencias');
    this.addBulletPoint('Analytics Avanzados con dashboard de métricas');
    this.addBulletPoint('Gamificación para incentivar la participación');

    this.addTitle('15.4. Reflexión Final', 3);
    this.addText(
      'El desarrollo de la plataforma web de Africagua 2025 ha sido un proyecto técnicamente desafiante y altamente gratificante. La combinación de tecnologías modernas, buenas prácticas de desarrollo y un enfoque centrado en el usuario ha resultado en una plataforma robusta que supera las expectativas iniciales.',
      10
    );

    this.yPosition += 10;
    this.doc.setFillColor(...LIGHT_BG);
    this.doc.roundedRect(this.marginLeft, this.yPosition, this.contentWidth, 40, 3, 3, 'F');

    this.yPosition += 10;
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(...PRIMARY_COLOR);
    this.doc.text('Jean Michel Jimmy Tordeur', this.pageWidth / 2, this.yPosition, { align: 'center' });

    this.yPosition += 6;
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(...TEXT_COLOR);
    this.doc.text('Ingeniero Informático', this.pageWidth / 2, this.yPosition, { align: 'center' });

    this.yPosition += 5;
    this.doc.text('Cámara Oficial de Comercio, Industria y Navegación de Fuerteventura',
      this.pageWidth / 2, this.yPosition, { align: 'center' });

    this.yPosition += 8;
    this.doc.setFontSize(9);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text('© 2025 Africagua - Todos los derechos reservados',
      this.pageWidth / 2, this.yPosition, { align: 'center' });
  }
}

export async function generateMemoriaPDF(onProgress?: ProgressCallback): Promise<void> {
  const generator = new MemoriaPDFGenerator();
  await generator.generate(onProgress);
}
