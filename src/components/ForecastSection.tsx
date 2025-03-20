import React from 'react';
import WeatherCard from './WeatherCard';
import { TEXT } from '@/constants';

const ForecastSection: React.FC = () => {
  
  const forecastData = [
    { day: 'Monday', icon: '01d', highTemp: 25, lowTemp: 15 },
    { day: 'Tuesday', icon: '02d', highTemp: 22, lowTemp: 14 },
    { day: 'Wednesday', icon: '03d', highTemp: 20, lowTemp: 13 },
    { day: 'Thursday', icon: '04d', highTemp: 18, lowTemp: 12 },
    { day: 'Friday', icon: '09d', highTemp: 21, lowTemp: 16 },
  ];

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