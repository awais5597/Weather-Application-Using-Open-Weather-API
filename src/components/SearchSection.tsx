import React, { useState } from 'react';
import { Calendar, Search, MapPin } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext.tsx';
import ApiSelector from '@/components/ApiSelector.tsx';
import { TEXT } from '@/constants';

const SearchSection: React.FC = () => {
  const { 
    searchCity, 
    setSearchCity, 
    selectedDate, 
    setSelectedDate, 
    fetchWeatherData,
    loading
  } = useWeather();
  
  const [inputCity, setInputCity] = useState(searchCity);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the searchCity state
    setSearchCity(inputCity);
    
    // Pass the inputCity directly to fetchWeatherData
    fetchWeatherData(inputCity);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* City Search */}
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {TEXT.SEARCH.CITY_LABEL}
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder={TEXT.SEARCH.CITY_PLACEHOLDER}
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Date Range */}
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {TEXT.SEARCH.DATE_LABEL}
          </label>
          <div className="relative">
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Search Button */}
        <button 
          type="submit"
          disabled={loading || !inputCity}
          className={`${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-6 py-2 rounded-lg flex items-center justify-center shadow-md transition-colors duration-300`}
        >
          <Search className="h-5 w-5 mr-2" />
          {loading ? TEXT.SEARCH.LOADING : TEXT.SEARCH.SEARCH_BUTTON}
        </button>
      </div>
      
      {/* API Selector */}
      <div className="mt-4 flex justify-end">
        <ApiSelector />
      </div>
    </form>
  );
};

export default SearchSection;