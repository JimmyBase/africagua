import React from 'react';
import { useYear } from '../contexts/YearContext';

const YearSelector = () => {
  const { year, setYear } = useYear();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5">
      <button
        onClick={() => setYear('2025')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
          year === '2025'
            ? 'bg-teal-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-teal-600'
        }`}
      >
        2025
      </button>
      <button
        onClick={() => setYear('2027')}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
          year === '2027'
            ? 'bg-teal-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-teal-600'
        }`}
      >
        2027
      </button>
    </div>
  );
};

export default YearSelector;
