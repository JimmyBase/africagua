export interface LanguageConfig {
  code: string;
  name: string;
  flagUrl: string;
  flagAlt: string;
  locale: string;
}

/**
 * Single source of truth for supported interface languages.
 * Spanish is the original content language; the others are translation targets.
 * Add a new entry here to support another language across the app.
 */
export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'es',
    name: 'Español',
    flagUrl: 'https://flagcdn.com/w40/es.png',
    flagAlt: 'Bandera de España',
    locale: 'es-ES'
  },
  {
    code: 'en',
    name: 'English',
    flagUrl: 'https://flagcdn.com/w40/gb.png',
    flagAlt: 'Flag of United Kingdom',
    locale: 'en-US'
  },
  {
    code: 'fr',
    name: 'Français',
    flagUrl: 'https://flagcdn.com/w40/fr.png',
    flagAlt: 'Drapeau de la France',
    locale: 'fr-FR'
  },
  {
    code: 'it',
    name: 'Italiano',
    flagUrl: 'https://flagcdn.com/w40/it.png',
    flagAlt: "Bandiera d'Italia",
    locale: 'it-IT'
  },
  {
    code: 'de',
    name: 'Deutsch',
    flagUrl: 'https://flagcdn.com/w40/de.png',
    flagAlt: 'Flagge von Deutschland',
    locale: 'de-DE'
  }
];

export const SOURCE_LANGUAGE = 'es';

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);

export const TRANSLATABLE_LANGUAGES = LANGUAGE_CODES.filter(
  (code) => code !== SOURCE_LANGUAGE
);

export function getLanguageConfig(code: string): LanguageConfig {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
}

export function isSupportedLanguage(code: string): boolean {
  return LANGUAGE_CODES.includes(code);
}

/**
 * Resolve the initial interface language following the priority:
 * 1. Saved choice in localStorage
 * 2. Browser language (if a supported prefix matches)
 * 3. Spanish fallback
 */
export function resolveInitialLanguage(): string {
  try {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && isSupportedLanguage(saved)) {
      return saved;
    }
  } catch {
    // localStorage may be unavailable (private mode, SSR)
  }

  if (typeof navigator !== 'undefined') {
    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
    if (isSupportedLanguage(browserLang)) {
      return browserLang;
    }
  }

  return SOURCE_LANGUAGE;
}
