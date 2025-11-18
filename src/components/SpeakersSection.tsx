import React, { useState } from 'react';
import { Info, ChevronDown, User, Briefcase, Award, ExternalLink } from 'lucide-react';

const SpeakersSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30" id="speakers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 blur-3xl opacity-20 rounded-full"></div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center gap-4 group cursor-pointer relative"
            >
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#1a3d4a] to-[#2c5f6f] bg-clip-text text-transparent">Ponentes</h2>
              <ChevronDown className={`w-8 h-8 text-teal-600 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <p className="text-xl text-slate-600 mt-4 relative">Expertos líderes en agua y energías renovables</p>
          </div>
        </div>
        
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
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-teal-200"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: 0,
                  animation: isOpen ? `fadeInUp 0.6s ease ${index * 50}ms forwards` : 'none'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center shadow-md">
                        <User className="w-8 h-8 text-teal-600" />
                      </div>
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">{speaker.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-teal-600 font-medium">
                        <Briefcase className="w-4 h-4" />
                        <span className="line-clamp-1">{speaker.organization}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {speaker.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <button className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors group/btn">
                      <Info className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Ver más
                    </button>

                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-medium rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Award className="w-3 h-3" />
                      Ponente
                    </div>
                  </div>
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