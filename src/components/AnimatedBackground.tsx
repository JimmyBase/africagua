import React from 'react';
import { Wind, Sun, Droplets } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
      {/* Animated Wind Turbines */}
      <div className="absolute inset-0 w-full h-full">
        {/* Large Wind Turbine */}
        <div className="absolute top-20 left-10 animate-float-slow opacity-20">
          <div className="relative w-60 h-96">
            <div className="absolute w-6 h-96 bg-teal-800/50 left-1/2 -translate-x-1/2"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-spin-slow">
              <div className="w-60 h-60">
                <div className="absolute w-6 h-28 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-0"></div>
                <div className="absolute w-6 h-28 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-120"></div>
                <div className="absolute w-6 h-28 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-240"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Medium Wind Turbine */}
        <div className="absolute top-40 right-20 animate-float-medium opacity-20">
          <div className="relative w-48 h-80">
            <div className="absolute w-5 h-80 bg-teal-800/50 left-1/2 -translate-x-1/2"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-spin-slow">
              <div className="w-48 h-48">
                <div className="absolute w-5 h-24 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-0"></div>
                <div className="absolute w-5 h-24 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-120"></div>
                <div className="absolute w-5 h-24 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-240"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Solar Panels Grid */}
        <div className="absolute bottom-20 left-20 grid grid-cols-3 gap-3 animate-float-slow opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-24 h-24 bg-blue-800/30 rounded-sm transform rotate-45 border border-blue-400/20"></div>
          ))}
        </div>

        {/* Small Solar Panels Grid */}
        <div className="absolute top-40 right-40 grid grid-cols-2 gap-3 animate-float-medium opacity-20">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-20 h-20 bg-blue-800/30 rounded-sm transform rotate-45 border border-blue-400/20"></div>
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float-slow opacity-15">
          <Wind className="w-40 h-40 text-teal-600" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-float-medium opacity-15">
          <Sun className="w-40 h-40 text-yellow-500" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float-fast opacity-15">
          <Droplets className="w-40 h-40 text-blue-500" />
        </div>

        {/* Additional Medium Wind Turbine */}
        <div className="absolute bottom-40 left-1/2 animate-float-slow opacity-20">
          <div className="relative w-48 h-80">
            <div className="absolute w-5 h-80 bg-teal-800/50 left-1/2 -translate-x-1/2"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-spin-slow">
              <div className="w-48 h-48">
                <div className="absolute w-5 h-24 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-0"></div>
                <div className="absolute w-5 h-24 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-120"></div>
                <div className="absolute w-5 h-24 bg-teal-800/50 left-1/2 -translate-x-1/2 origin-bottom rotate-240"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay - Reduced opacity for better visibility of elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40"></div>
    </div>
  );
};

export default AnimatedBackground;