import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { weatherIcons } from '../constants/weatherIcons';

interface WeatherCardProps {
  day: string;
  icon: string;
  highTemp: number;
  lowTemp: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ day, icon, highTemp, lowTemp }) => {
  const { unit } = useWeather();
  const tempUnit = unit === 'celsius' ? '°C' : '°F';
  
  const iconToShow = icon && weatherIcons[icon] ? weatherIcons[icon] : weatherIcons['default'];
  
  return (
    <div className="bg-blue-50 rounded-lg p-4 text-center">
      <div className="text-sm font-medium text-gray-500 mb-2">
        {day}
      </div>
      {iconToShow}
      <div className="font-bold">{Math.round(highTemp)}{tempUnit}</div>
      <div className="text-xs text-gray-500">{Math.round(lowTemp)}{tempUnit}</div>
    </div>
  );
};

export default WeatherCard;