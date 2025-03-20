import { Cloud, CloudRain } from 'lucide-react';
import React, { JSX } from 'react';

interface WeatherCardProps {
  day: string;
  icon: string;
  highTemp: number;
  lowTemp: number;
}

// Map of OpenWeather icon codes to Lucide icons
const weatherIcons: { [key: string]: JSX.Element } = {
  '01d': <Cloud className="h-8 w-8 mx-auto text-yellow-500 mb-2" />, // clear sky day
  '01n': <Cloud className="h-8 w-8 mx-auto text-blue-900 mb-2" />, // clear sky night
  '02d': <Cloud className="h-8 w-8 mx-auto text-blue-400 mb-2" />, // few clouds day
  '02n': <Cloud className="h-8 w-8 mx-auto text-blue-800 mb-2" />, // few clouds night
  '03d': <Cloud className="h-8 w-8 mx-auto text-blue-500 mb-2" />, // scattered clouds
  '03n': <Cloud className="h-8 w-8 mx-auto text-blue-700 mb-2" />, // scattered clouds
  '04d': <Cloud className="h-8 w-8 mx-auto text-gray-500 mb-2" />, // broken clouds
  '04n': <Cloud className="h-8 w-8 mx-auto text-gray-700 mb-2" />, // broken clouds
  '09d': <CloudRain className="h-8 w-8 mx-auto text-blue-600 mb-2" />, // shower rain
  '09n': <CloudRain className="h-8 w-8 mx-auto text-blue-800 mb-2" />, // shower rain
  '10d': <CloudRain className="h-8 w-8 mx-auto text-blue-500 mb-2" />, // rain day
  '10n': <CloudRain className="h-8 w-8 mx-auto text-blue-700 mb-2" />, // rain night
  '11d': <CloudRain className="h-8 w-8 mx-auto text-purple-500 mb-2" />, // thunderstorm
  '11n': <CloudRain className="h-8 w-8 mx-auto text-purple-700 mb-2" />, // thunderstorm
  '13d': <CloudRain className="h-8 w-8 mx-auto text-white mb-2" />, // snow
  '13n': <CloudRain className="h-8 w-8 mx-auto text-gray-200 mb-2" />, // snow
  '50d': <Cloud className="h-8 w-8 mx-auto text-gray-400 mb-2" />, // mist
  '50n': <Cloud className="h-8 w-8 mx-auto text-gray-600 mb-2" />, // mist
  'default': <Cloud className="h-8 w-8 mx-auto text-blue-500 mb-2" />, // default
};

const WeatherCard: React.FC<WeatherCardProps> = ({ day, icon, highTemp, lowTemp }) => {
  const tempUnit = '°C'; // Default to Celsius for design purposes
  
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
