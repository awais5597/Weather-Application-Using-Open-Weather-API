import { JSX } from "react";
import { Cloud, CloudRain } from 'lucide-react';

// Map of OpenWeather icon codes to Lucide icons
export const weatherIcons: { [key: string]: JSX.Element } = {
  '01d': <Cloud className="h-20 w-20 text-yellow-500" />, // clear sky day
  '01n': <Cloud className="h-20 w-20 text-blue-900" />, // clear sky night
  '02d': <Cloud className="h-20 w-20 text-blue-400" />, // few clouds day
  '02n': <Cloud className="h-20 w-20 text-blue-800" />, // few clouds night
  '03d': <Cloud className="h-20 w-20 text-blue-500" />, // scattered clouds
  '03n': <Cloud className="h-20 w-20 text-blue-700" />, // scattered clouds
  '04d': <Cloud className="h-20 w-20 text-gray-500" />, // broken clouds
  '04n': <Cloud className="h-20 w-20 text-gray-700" />, // broken clouds
  '09d': <CloudRain className="h-20 w-20 text-blue-600" />, // shower rain
  '09n': <CloudRain className="h-20 w-20 text-blue-800" />, // shower rain
  '10d': <CloudRain className="h-20 w-20 text-blue-500" />, // rain day
  '10n': <CloudRain className="h-20 w-20 text-blue-700" />, // rain night
  '11d': <CloudRain className="h-20 w-20 text-purple-500" />, // thunderstorm
  '11n': <CloudRain className="h-20 w-20 text-purple-700" />, // thunderstorm
  '13d': <CloudRain className="h-20 w-20 text-white" />, // snow
  '13n': <CloudRain className="h-20 w-20 text-gray-200" />, // snow
  '50d': <Cloud className="h-20 w-20 text-gray-400" />, // mist
  '50n': <Cloud className="h-20 w-20 text-gray-600" />, // mist
  'default': <Cloud className="h-20 w-20 text-blue-500" />, // default
};