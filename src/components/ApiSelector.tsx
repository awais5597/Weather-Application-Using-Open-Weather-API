import React from 'react';
import { Settings } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';
import { TEXT, API } from '@/constants';

const ApiSelector: React.FC = () => {
  const { apiConfig, setHistoricalApi } = useWeather();
  
  return (
    <div className="flex items-center mt-2 mb-2 text-sm">
      <Settings className="h-4 w-4 text-gray-500 mr-2" />
      <span className="text-gray-600 mr-2">{TEXT.API.SELECTOR_LABEL}</span>
      <select 
        value={apiConfig.historical}
        onChange={(e) => setHistoricalApi(e.target.value as 'open-meteo' | 'openweather')}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={API.PROVIDERS.OPEN_METEO}>{TEXT.API.OPEN_METEO}</option>
        <option value={API.PROVIDERS.OPENWEATHER}>{TEXT.API.OPENWEATHER}</option>
      </select>
    </div>
  );
};

export default ApiSelector;