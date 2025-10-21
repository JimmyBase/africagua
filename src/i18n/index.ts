import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, es, fr, it, de } from './translations';

try {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en,
        es,
        fr,
        it,
        de
      },
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });
} catch (error) {
  console.error('Failed to initialize i18n:', error);
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        es: es
      },
      lng: 'es',
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });
}

export default i18n;