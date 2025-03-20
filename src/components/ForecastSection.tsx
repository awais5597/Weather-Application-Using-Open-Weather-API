import React from 'react';
import { useWeather } from '../context/WeatherContext';
import WeatherCard from './WeatherCard';
import { TEXT } from '@/constants';

const ForecastSection: React.FC = () => {
  const { forecastData } = useWeather();
  
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="p-6 pt-4 border-t border-gray-100">
        <p className="text-gray-500">{TEXT.FORECAST.NO_DATA}</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 pt-4 border-t border-gray-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{TEXT.FORECAST.TITLE}</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecastData.map((day, index) => (
          <WeatherCard 
            key={index}
            day={day.day}
            icon={day.icon}
            highTemp={day.highTemp}
            lowTemp={day.lowTemp}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;