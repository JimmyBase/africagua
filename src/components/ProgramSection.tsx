import React from 'react';
import { Leaf, Lightbulb, Users, Building2 } from 'lucide-react';

const ProgramSection = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white" id="program">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title gradient-text">Estructura del programa</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {blocks.map((block, index) => (
            <div 
              key={index} 
              className="relative bg-white p-10 rounded-xl shadow-lg overflow-hidden group card-hover"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative">
                {getBlockIcon(index)}
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Bloque {index + 1}</h3>
                <p className="text-gray-700 text-lg font-medium">{block}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-teal-50 via-blue-50 to-teal-50 p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">AGENDA 2025</h3>
          <p className="text-xl text-teal-700 font-medium">Próximamente</p>
          <p className="text-sm text-gray-500 mt-4">*Este programa está sujeto a cambios y modificaciones</p>
        </div>
      </div>
    </section>
  );
};

const getBlockIcon = (index: number) => {
  const iconClass = "w-12 h-12 text-teal-600";
  switch (index) {
    case 0:
      return <Leaf className={iconClass} />;
    case 1:
      return <Lightbulb className={iconClass} />;
    case 2:
      return <Users className={iconClass} />;
    case 3:
      return <Building2 className={iconClass} />;
  }
};

const blocks = [
  "Sostenibilidad",
  "Innovación",
  "Social",
  "Gobernanza y financiación"
];

export default ProgramSection;