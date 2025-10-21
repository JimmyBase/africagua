import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

// PWA registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch(error => {
        console.warn('Service Worker registration failed (non-critical):', error);
      });
  });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Please check your HTML file.');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render application:', error);
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f9fafb; padding: 1rem;">
        <div style="max-width: 28rem; width: 100%; background: white; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 2rem; text-align: center;">
          <h1 style="font-size: 1.5rem; font-weight: bold; color: #111827; margin-bottom: 0.5rem;">Error al cargar la aplicación</h1>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">Por favor, recarga la página para intentarlo de nuevo.</p>
          <button onclick="window.location.reload()" style="background: #0d9488; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 500;">Recargar página</button>
        </div>
      </div>
    `;
  }
}