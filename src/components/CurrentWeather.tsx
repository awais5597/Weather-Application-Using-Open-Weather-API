import React from 'react';
import { Wind, Droplet, CloudRain, ChevronDown, ChevronUp } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import ForecastSection from './ForecastSection';
import { weatherIcons } from '../constants/weatherIcons';
import { TEXT } from '@/constants';

const CurrentWeather: React.FC = () => {
  const { expanded, setExpanded, currentWeather, historicalData, unit, loading, error } = useWeather();
  
  // Use historical data if available, otherwise use current
  const weatherData = historicalData || currentWeather;
  const tempUnit = unit === 'celsius' ? '°C' : '°F';
  const speedUnit = unit === 'celsius' ? 'km/h' : 'mph';
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
        <div className="text-lg text-gray-500">{TEXT.WEATHER.LOADING_MESSAGE}</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-lg text-red-500">Error: {error}</div>
        <p className="text-gray-600 mt-2">{TEXT.WEATHER.TRY_DIFFERENT}</p>
      </div>
    );
  }
  
  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-lg text-gray-500">
        {TEXT.WEATHER.DEFAULT_MESSAGE}
        </div>
      </div>
    );
  }
  
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const formattedDate = weatherData.date.toLocaleDateString('en-US', dateOptions);
  const iconToShow = weatherData.icon && weatherIcons[weatherData.icon] ? 
    weatherIcons[weatherData.icon] : weatherIcons['default'];
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{weatherData.city}, {weatherData.country}</h2>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4">
              {iconToShow}
            </div>
            <div>
              <div className="text-5xl font-bold text-gray-800">{Math.round(weatherData.temp)}{tempUnit}</div>
              <div className="text-gray-500 capitalize">{weatherData.description}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">{TEXT.WEATHER.WIND}</div>
                <div className="font-medium">{weatherData.wind_speed} {speedUnit}</div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center">
              <Droplet className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">{TEXT.WEATHER.HUMIDITY}</div>
                <div className="font-medium">{weatherData.humidity}%</div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg flex items-center">
              <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">{TEXT.WEATHER.LOADING_MESSAGE}</div>
                <div className="font-medium">{weatherData.precipitation || 0}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        onClick={() => setExpanded(!expanded)}
        className="bg-gray-50 py-3 px-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 mr-2">
          {expanded ? 'Hide Details' : 'Show Detailed Forecast'}
        </span>
        {expanded ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </div>
      
      {expanded && <ForecastSection />}
    </div>
  );
};

export default CurrentWeather;