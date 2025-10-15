import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';

const SpeakersSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50" id="speakers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full flex items-center justify-center gap-4 group cursor-pointer"
        >
          <h2 className="section-title gradient-text mb-0">Ponentes</h2>
          <ChevronDown className={`w-8 h-8 text-teal-600 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`
          relative transition-all duration-700 ease-in-out
          ${isOpen ? 'h-auto opacity-100 mt-12' : 'h-0 opacity-0 mt-0'}
        `}>
          {/* Water wave effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`
              absolute inset-x-0 top-0 h-40
              transform transition-transform duration-700 ease-in-out
              ${isOpen ? 'translate-y-0' : '-translate-y-full'}
              wave-animation
            `}></div>
          </div>

          <div className={`
            grid md:grid-cols-2 lg:grid-cols-3 gap-8
            transform transition-all duration-700
            ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
          `}>
            {speakers.map((speaker, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden group card-hover"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: 0,
                  animation: isOpen ? `fadeInUp 0.6s ease ${index * 50}ms forwards` : 'none'
                }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                  <div className="text-teal-600 font-medium mb-4">{speaker.organization}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {speaker.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                    <Info className="w-4 h-4" />
                    + info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const speakers = [
  {
    name: "Jean Francis Semporé",
    organization: "ECREEE",
    description: "Director Ejecutivo del Centro Regional de Energías Renovables y Eficiencia Energética de la CEDEAO (ECREEE) en Cabo Verde."
  },
  {
    name: "Sebastián López Suárez",
    organization: "ULPGC",
    description: "Director de Innovación y Transferencia de la Universidad de Las Palmas de Gran Canaria (ULPGC)"
  },
  {
    name: "Pedro Cabrera Santana",
    organization: "ULPGC",
    description: "Profesor del Departamento de Ing. Mecánica e Investigador del Grupo de Investigación en Sistemas de Energías Renovables de la Universidad de Las Palmas de Gran Canaria (ULPGC)"
  },
  {
    name: "Mohamed Taffa",
    organization: "APIM",
    description: "Especialista en inversiones y Licenciado en finanzas y contabilidad."
  },
  {
    name: "Javier Molina Romero",
    organization: "Nova Studio",
    description: "Founder & CEO de Nova Studio"
  },
  {
    name: "María José Tomás Sánchez",
    organization: "CDTI",
    description: "Técnico de la Dirección de Programas de la UE y Cooperación Territorial del Centro para el Desarrollo Tecnológico y la Innovación (CDTI)"
  },
  {
    name: "Celia Pérez Ibáñez",
    organization: "Embajada de España en Costa de Marfil",
    description: "Consejera Económica y Comercial en Abiyán de la Embajada de España en Costa de Marfil"
  },
  {
    name: "Aridane González",
    organization: "ULPGC",
    description: "Presidente del Comité de Personas Expertas para Cambio Climático, Economía Circular y Azul del Gobierno de Canarias"
  },
  {
    name: "José Joaquín Brito",
    organization: "PLOCAN",
    description: "CEO de Plataforma Oceánica de Canarias (PLOCAN)"
  },
  {
    name: "Gonzalo Piernavieja Izquierdo",
    organization: "ITC",
    description: "Director de I+D+i Instituto Tecnológico de Canarias (ITC)"
  },
  {
    name: "Ana de Vicente Lancho",
    organization: "Secretaría de Estado de Comercio de España",
    description: "Subdirectora General de Países Mediterráneos, África y Oriente Medio de la Secretaría de Estado de Comercio de España"
  },
  {
    name: "Rafael Daranas Carballo",
    organization: "GESPLAN",
    description: "Responsable Departamento de Desarrollo Exterior en Gestión y Planeamiento Territorial y Medioambiental S.A. (GESPLAN)"
  },
  {
    name: "Luis González Sosa",
    organization: "SOLOh2o Canarian Water Solutions",
    description: "Presidente Ejecutivo - SOLOh2o Canarian Water Solutions"
  }
];

export default SpeakersSection;