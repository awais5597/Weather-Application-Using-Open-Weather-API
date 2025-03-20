import React from 'react';
import { Sun, Thermometer } from 'lucide-react';
import { TEXT } from '@/constants';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
      <div className="flex items-center mb-4 sm:mb-0">
        <Sun className="h-8 w-8 text-yellow-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">{TEXT.APP.TITLE}</h1>
      </div>
      <div className="flex items-center">
        <button 
          className="flex items-center bg-white rounded-lg shadow px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Thermometer className="h-4 w-4 mr-2" />
          °C
        </button>
      </div>
    </header>
  );
};

export default Header;
