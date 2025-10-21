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
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <img
              src="/image.png"
              alt="Jean Michel Jimmy Tordeur"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Jean Michel Jimmy Tordeur
              </h2>
              <p className="text-lg text-teal-600 font-semibold">
                Técnico Kit Digital
              </p>
              <p className="text-gray-600">
                Cámara de Comercio de Fuerteventura
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfil</h3>
              <p className="text-gray-700">Ingeniero informático DUT</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Especialización</h3>
              <p className="text-gray-700">Web Designer</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  SQL
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  Python
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Formación</h3>
              <p className="text-gray-700">Inteligencia Artificial</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargo actual</h3>
              <p className="text-gray-700">
                Técnico Kit Digital de la Cámara de Comercio de Fuerteventura
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
