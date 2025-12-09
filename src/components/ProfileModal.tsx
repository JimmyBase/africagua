import React from 'react';
import { X } from 'lucide-react';
import Avatar from './Avatar';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6"></h2>

          <div className="flex flex-col items-center">
            <div className="mb-6 shadow-lg">
              <Avatar
                src="https://firebasestorage.googleapis.com/v0/b/africagua-eb795.firebasestorage.app/o/Captura%20de%20pantalla%202025-10-21%20090729.png?alt=media&token=2a2e6a99-5dfa-42ec-8cb0-23e9c0d77797"
                alt="Jean Michel Jimmy Tordeur - Ingeniero Informático Cámara de Comercio Fuerteventura"
                name="Jean Michel Jimmy Tordeur"
                size="large"
              />
            </div>

            <h3 className="text-xl font-semibold text-red-600 mb-6">
              Jean Michel Jimmy Tordeur
            </h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              J.M Tordeur | Jimmy Tordeur | JM Tordeur
            </p>

            <div className="w-full space-y-3 text-sm">
              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Perfil:</span>
                <span className="text-gray-600">Ingeniero informático</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Especialización:</span>
                <span className="text-gray-600">Software, Web App, Web Designer, Ingeniería de hardware</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Tecnologías:</span>
                <span className="text-gray-600">SQL, JavaScript, Python</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Formación:</span>
                <span className="text-gray-600">Master en ingeniería de hardware, Programacion Software, Inteligencia Artificial</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Cargo actual:</span>
                <span className="text-gray-600">Responsable informático y desarrollo tecnológico de la Cámara de Comercio de Fuerteventura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
