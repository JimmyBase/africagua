import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { X, Settings, Check } from 'lucide-react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  preferences: boolean;
}

interface CookieConsentProps {
  onOpenCookiePolicy?: () => void;
}

const CookieConsent = ({ onOpenCookiePolicy }: CookieConsentProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    advertising: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const savedSettings = JSON.parse(consent);
        setSettings(savedSettings);
      } catch (error) {
        console.error('Error parsing cookie settings:', error);
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allSettings: CookieSettings = {
      necessary: true,
      analytics: true,
      advertising: true,
      preferences: true,
    };
    saveSettings(allSettings);
  };

  const handleRejectAll = () => {
    const minimalSettings: CookieSettings = {
      necessary: true,
      analytics: false,
      advertising: false,
      preferences: false,
    };
    saveSettings(minimalSettings);
  };

  const handleSaveSettings = () => {
    saveSettings(settings);
  };

  const saveSettings = (newSettings: CookieSettings) => {
    // Save settings in a cookie that expires in 1 year
    Cookies.set('cookie-consent', JSON.stringify(newSettings), { expires: 365 });
    setSettings(newSettings);
    setShowBanner(false);
    setShowSettings(false);

    // Apply cookie settings
    if (newSettings.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }

    if (newSettings.advertising) {
      enableAdvertising();
    } else {
      disableAdvertising();
    }

    if (newSettings.preferences) {
      enablePreferences();
    } else {
      disablePreferences();
    }
  };

  const enableAnalytics = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const disableAnalytics = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  const enableAdvertising = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted'
      });
    }
  };

  const disableAdvertising = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'denied'
      });
    }
  };

  const enablePreferences = () => {
    Cookies.set('preferences-enabled', 'true', { expires: 365 });
  };

  const disablePreferences = () => {
    Cookies.remove('preferences-enabled');
  };

  const handleToggle = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Never allow toggling necessary cookies
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        {showSettings ? (
          <>
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Configuración de Cookies</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {[
                {
                  key: 'necessary' as const,
                  title: 'Cookies Necesarias',
                  description: 'Estas cookies son esenciales para el funcionamiento básico del sitio web.'
                },
                {
                  key: 'analytics' as const,
                  title: 'Cookies Analíticas',
                  description: 'Nos ayudan a entender cómo interactúas con el sitio web.'
                },
                {
                  key: 'advertising' as const,
                  title: 'Cookies Publicitarias',
                  description: 'Se utilizan para mostrar anuncios relevantes según tus intereses.'
                },
                {
                  key: 'preferences' as const,
                  title: 'Cookies de Preferencias',
                  description: 'Permiten recordar tus preferencias y personalizar tu experiencia.'
                }
              ].map((cookie) => (
                <div key={cookie.key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cookie.title}</h3>
                    <p className="text-gray-600 text-sm">{cookie.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[cookie.key]}
                      onChange={() => handleToggle(cookie.key)}
                      disabled={cookie.key === 'necessary'}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Rechazar todo
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Aceptar todo
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </>
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Política de Cookies</h2>
            <p className="text-gray-600 mb-6">
              En nuestro sitio web utilizamos cookies propias y de terceros para finalidades analíticas mediante el análisis del tráfico web, personalizar el contenido mediante sus preferencias, ofrecer funciones de redes sociales y mostrarle publicidad personalizada en base a un perfil elaborado a partir de sus hábitos de navegación. Para más información puedes consultar nuestra política de cookies{' '}
              <button 
                onClick={() => {
                  setShowBanner(false);
                  if (onOpenCookiePolicy) {
                    onOpenCookiePolicy();
                  }
                }}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                AQUÍ
              </button>
              .
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Rechazar todo
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Configuración de Privacidad
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Aceptar todo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;