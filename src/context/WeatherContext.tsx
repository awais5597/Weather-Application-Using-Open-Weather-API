import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { fetchCurrentWeather, fetchForecast, fetchHistoricalWeather, setApiConfig } from '../utils/api/api';

interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  date: Date;
  precipitation: number;
}

interface ForecastDay {
  day: string;
  icon: string;
  highTemp: number;
  lowTemp: number;
}

interface WeatherContextType {
  unit: string;
  setUnit: (unit: string) => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  searchCity: string;
  setSearchCity: (city: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  currentWeather: WeatherData | null;
  forecastData: ForecastDay[];
  historicalData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (cityOverride?: string) => Promise<void>;
  getUnitSystem: () => string;
  apiConfig: {
    current: string;
    forecast: string;
    historical: string;
  };
  setHistoricalApi: (api: 'open-meteo' | 'openweather') => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState('celsius');
  const [expanded, setExpanded] = useState(false);
  const [searchCity, setSearchCity] = useState('San Francisco');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [historicalData, setHistoricalData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiConfig, setApiConfigState] = useState<{
    current: 'openweather';
    forecast: 'openweather';
    historical: 'open-meteo' | 'openweather';
  }>({
    current: 'openweather',
    forecast: 'openweather',
    historical: 'open-meteo'
  });

  const getUnitSystem = () => unit === 'celsius' ? 'metric' : 'imperial';
  
  // Set the API to use for historical data
  const setHistoricalApi = (api: 'open-meteo' | 'openweather') => {
    const newConfig = { ...apiConfig, historical: api };
    setApiConfigState(newConfig);
    setApiConfig(newConfig);
  };
  
  // Initialize API config
  useEffect(() => {
    setApiConfig(apiConfig);
  }, []);
  
  const fetchWeatherData = async (cityOverride?: string) => {
    const cityToUse = cityOverride || searchCity;
    
    if (!cityToUse) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const currentData = await fetchCurrentWeather(cityToUse, getUnitSystem());
      
      setCurrentWeather({
        city: currentData.name,
        country: currentData.sys.country,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        date: new Date(),
        precipitation: currentData.rain ? currentData.rain['1h'] * 100 : 0
      });
      
      // Fetch forecast
      const forecastData = await fetchForecast(cityToUse, getUnitSystem());
      
      // Group forecast by day and find max/min temps
      const dailyForecasts: { [key: string]: { temps: number[], icons: string[] } } = {};
      
      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        if (!dailyForecasts[day]) {
          dailyForecasts[day] = { temps: [], icons: [] };
        }
        
        dailyForecasts[day].temps.push(item.main.temp);
        dailyForecasts[day].icons.push(item.weather[0].icon);
      });
      
      const processedForecast: ForecastDay[] = Object.keys(dailyForecasts).slice(0, 5).map(day => {
        const temps = dailyForecasts[day].temps;
        const icons = dailyForecasts[day].icons;
        
        // Get most frequent icon
        const iconCounts: { [key: string]: number } = {};
        let maxCount = 0;
        let mostFrequentIcon = icons[0];
        
        icons.forEach(icon => {
          iconCounts[icon] = (iconCounts[icon] || 0) + 1;
          if (iconCounts[icon] > maxCount) {
            maxCount = iconCounts[icon];
            mostFrequentIcon = icon;
          }
        });
        
        return {
          day,
          icon: mostFrequentIcon,
          highTemp: Math.max(...temps),
          lowTemp: Math.min(...temps)
        };
      });
      
      setForecastData(processedForecast);
      
      // Fetch historical data if date is selected
      if (selectedDate) {
        const selectedDateObj = new Date(selectedDate);
        const { lat, lon } = currentData.coord;
        
        try {
          const historicalData = await fetchHistoricalWeather(lat, lon, selectedDateObj, getUnitSystem());
          
          setHistoricalData({
            city: currentData.name,
            country: currentData.sys.country,
            temp: historicalData.current.temp,
            feels_like: historicalData.current.feels_like,
            humidity: historicalData.current.humidity,
            wind_speed: historicalData.current.wind_speed,
            description: historicalData.current.weather[0].description,
            icon: historicalData.current.weather[0].icon,
            date: selectedDateObj,
            precipitation: historicalData.current.rain ? historicalData.current.rain['1h'] * 100 : 0
          });
        } catch (err) {
          console.error('Failed to fetch historical data', err);
          setHistoricalData(null);
          setError('Failed to fetch historical weather data. Try a different date.');
        }
      } else {
        setHistoricalData(null);
      }
      
    } catch (err: any) {
      console.error('Error fetching weather data', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setCurrentWeather(null);
      setForecastData([]);
      setHistoricalData(null);
    } finally {
      setLoading(false);
    }
  };

  // Refetch weather data when unit changes
  useEffect(() => {
    if (currentWeather) {
      fetchWeatherData();
    }
  }, [unit]);

  return (
    <WeatherContext.Provider value={{ 
      unit, 
      setUnit, 
      expanded, 
      setExpanded, 
      searchCity, 
      setSearchCity, 
      selectedDate, 
      setSelectedDate, 
      currentWeather, 
      forecastData, 
      historicalData, 
      loading, 
      error, 
      fetchWeatherData,
      getUnitSystem,
      apiConfig,
      setHistoricalApi
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};