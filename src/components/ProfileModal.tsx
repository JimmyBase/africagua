import React from 'react';
import { X } from 'lucide-react';

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
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Avatar del usuario</h2>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg">
              <img
                src="/image.png"
                alt="Jean Michel Jimmy Tordeur"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold text-red-600 mb-6">
              Jean Michel Jimmy Tordeur
            </h3>

            <div className="w-full space-y-3 text-sm">
              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Perfil:</span>
                <span className="text-gray-600">Ingeniero informático DUT</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Especialización:</span>
                <span className="text-gray-600">Web Designer</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Tecnologías:</span>
                <span className="text-gray-600">SQL, JavaScript, Python</span>
              </div>

              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[130px]">Formación:</span>
                <span className="text-gray-600">Inteligencia Artificial</span>
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
