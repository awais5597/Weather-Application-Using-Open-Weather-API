import axios from 'axios';
import { API, WEATHER_CODES } from '../../constants';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// API Selection - could be set by user
const API_CONFIG = {
  current: API.PROVIDERS.OPENWEATHER,
  forecast: API.PROVIDERS.OPENWEATHER, 
  historical: API.PROVIDERS.OPEN_METEO 
};

// OpenWeather API instance
export const openWeatherApi = axios.create({
  baseURL: API.ENDPOINTS.OPENWEATHER_BASE,
  params: {
    appid: OPENWEATHER_API_KEY,
  }
});

// Open-Meteo API instance
export const openMeteoApi = axios.create({
  baseURL: API.ENDPOINTS.OPEN_METEO_BASE
});

// Convert temperature units between APIs
const normalizeUnits = (units: string) => {
  // OpenWeather uses 'metric' and 'imperial'
  // Open-Meteo uses 'celsius' and 'fahrenheit'
  return units === 'metric' ? 'celsius' : 'fahrenheit';
};

// Current weather using OpenWeather API
export const fetchCurrentWeather = async (city: string, units = 'metric') => {
  const response = await openWeatherApi.get('/weather', {
    params: {
      q: city,
      units,
    }
  });
  return response.data;
};

// Forecast using OpenWeather API
export const fetchForecast = async (city: string, units = 'metric') => {
  const response = await openWeatherApi.get('/forecast', {
    params: {
      q: city,
      units,
    }
  });
  return response.data;
};

// Historical weather using OpenWeather API (paid version)
export const fetchOpenWeatherHistorical = async (lat: number, lon: number, dt: number, units = 'metric') => {
  const response = await openWeatherApi.get('/onecall/timemachine', {
    params: {
      lat,
      lon,
      dt, // Unix timestamp
      units,
    }
  });
  return response.data;
};

// Convert date to the format required by Open-Meteo
const formatDateForOpenMeteo = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const fetchOpenMeteoHistorical = async (lat: number, lon: number, date: Date, units = API.UNITS.METRIC) => {
  const formattedDate = formatDateForOpenMeteo(date);
  
  const response = await openMeteoApi.get('/archive', {
    params: {
      latitude: lat,
      longitude: lon,
      start_date: formattedDate,
      end_date: formattedDate,
      temperature_unit: normalizeUnits(units),
      wind_speed_unit: units === API.UNITS.METRIC ? 'kmh' : 'mph',
      precipitation_unit: 'mm',
      timezone: 'auto',
      daily: API.PARAMS.DAILY,
      hourly: API.PARAMS.HOURLY
    }
  });
  
  return response.data;
};

// Get weather description from Open-Meteo weather code
const getWeatherDescription = (code: number): string => {
  return WEATHER_CODES.DESCRIPTIONS[code as keyof typeof WEATHER_CODES.DESCRIPTIONS] || "unknown";
};

// Convert Open-Meteo weather code to OpenWeather icon code for consistency
const mapWeatherCodeToIcon = (code: number, isDay: boolean = true): string => {
  const codeMapping = WEATHER_CODES.ICONS[code as keyof typeof WEATHER_CODES.ICONS];
  if (codeMapping) {
    return isDay ? codeMapping.day : codeMapping.night;
  }
  return isDay ? "03d" : "03n"; // Default to scattered clouds
};

// Unified function to fetch historical weather based on selected API
export const fetchHistoricalWeather = async (lat: number, lon: number, date: Date, units = 'metric') => {
  if (API_CONFIG.historical === 'openweather') {
    const timestamp = Math.floor(date.getTime() / 1000);
    return fetchOpenWeatherHistorical(lat, lon, timestamp, units);
  } else {
    const meteoData = await fetchOpenMeteoHistorical(lat, lon, date, units);
    
    const noonIndex = 12;
    
    return {
      current: {
        temp: meteoData.hourly.temperature_2m[noonIndex],
        feels_like: meteoData.hourly.temperature_2m[noonIndex], 
        humidity: meteoData.hourly.relative_humidity_2m[noonIndex],
        wind_speed: meteoData.hourly.wind_speed_10m[noonIndex],
        weather: [
          {
            description: getWeatherDescription(meteoData.hourly.weather_code[noonIndex]),
            icon: mapWeatherCodeToIcon(meteoData.hourly.weather_code[noonIndex])
          }
        ],
        rain: meteoData.hourly.rain[noonIndex] ? { "1h": meteoData.hourly.rain[noonIndex] / 100 } : undefined
      },
      daily: {
        temperature_max: meteoData.daily.temperature_2m_max[0],
        temperature_min: meteoData.daily.temperature_2m_min[0]
      }
    };
  }
};

// Allow setting the API configuration
export const setApiConfig = (config: {
  current?: 'openweather',
  forecast?: 'openweather',
  historical?: 'open-meteo' | 'openweather'
}) => {
  Object.assign(API_CONFIG, config);
};