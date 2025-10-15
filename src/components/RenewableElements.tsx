import React from 'react';
import { Wind, Sun, Droplets } from 'lucide-react';

export const WindTurbine = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <img 
      src="https://media.giphy.com/media/3o7TKDEhaHWJpBs2Xu/giphy.gif" 
      alt="Wind Turbine"
      className="w-48 h-auto object-contain"
    />
  </div>
);

export const SolarPanel = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-2 gap-2 ${className}`}>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="w-16 h-16 bg-blue-800/20 rounded-sm transform rotate-45 border border-blue-400/20"></div>
    ))}
  </div>
);

export const FloatingIcon = ({ icon: Icon, className = "" }: { icon: any, className?: string }) => (
  <div className={className}>
    <Icon className="w-24 h-24" />
  </div>
);

export const BackgroundDecorator = ({ section }: { section: string }) => {
  switch (section) {
    case 'about':
      return (
        <>
          <WindTurbine className="absolute -right-20 top-20 opacity-90" />
          <FloatingIcon icon={Sun} className="absolute -left-10 bottom-40 text-yellow-500/20 animate-float-medium" />
        </>
      );
    case 'program':
      return (
        <>
          <SolarPanel className="absolute -left-10 top-40 opacity-20 animate-float-slow" />
          <FloatingIcon icon={Wind} className="absolute -right-10 bottom-20 text-teal-600/20 animate-float-medium" />
        </>
      );
    case 'b2b':
      return (
        <>
          <WindTurbine className="absolute -left-20 top-40 opacity-90" />
          <SolarPanel className="absolute -right-10 bottom-40 opacity-20 animate-float-slow" />
        </>
      );
    case 'speakers':
      return (
        <>
          <FloatingIcon icon={Droplets} className="absolute -right-10 top-20 text-blue-500/20 animate-float-fast" />
          <WindTurbine className="absolute -left-20 bottom-40 opacity-90" />
        </>
      );
    case 'location':
      return (
        <>
          <SolarPanel className="absolute -right-10 top-40 opacity-20 animate-float-medium" />
          <FloatingIcon icon={Sun} className="absolute -left-10 bottom-20 text-yellow-500/20 animate-float-slow" />
        </>
      );
    case 'sponsors':
      return (
        <>
          <WindTurbine className="absolute -right-20 top-20 opacity-90" />
          <FloatingIcon icon={Wind} className="absolute -left-10 bottom-40 text-teal-600/20 animate-float-medium" />
        </>
      );
    case 'contact':
      return (
        <>
          <SolarPanel className="absolute -left-10 top-40 opacity-20 animate-float-slow" />
          <FloatingIcon icon={Droplets} className="absolute -right-10 bottom-20 text-blue-500/20 animate-float-fast" />
        </>
      );
    default:
      return null;
  }
};

export default BackgroundDecorator;