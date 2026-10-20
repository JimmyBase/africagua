import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es, fr, it, de } from './translations';
import { resolveInitialLanguage, getLanguageConfig } from './languages';

const resources = { en, es, fr, it, de };

/**
 * Keep the <html lang="..."> attribute in sync with the active interface
 * language for accessibility and SEO.
 */
function syncHtmlLang(lang: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

try {
  i18n.use(initReactI18next).init({
    resources,
    lng: resolveInitialLanguage(),
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

  syncHtmlLang(i18n.language || 'es');

  i18n.on('languageChanged', (lng) => {
    syncHtmlLang(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {
      // localStorage may be unavailable
    }
  });
} catch (error) {
  console.error('Failed to initialize i18n:', error);
  i18n.use(initReactI18next).init({
    resources: { es },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });
  syncHtmlLang('es');
}

export { getLanguageConfig };
export default i18n;
