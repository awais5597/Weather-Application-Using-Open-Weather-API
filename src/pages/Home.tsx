import React, { useEffect } from 'react';
import Header from '@/components/Header.tsx';
import SearchSection from '@/components/SearchSection.tsx';
import CurrentWeather from '@/components/CurrentWeather.tsx';
import InfoCard from '@/components/InfoCard.tsx';
import Footer from '@/components/Footer.tsx';
import { useWeather } from '@/context/WeatherContext.tsx';

const Home: React.FC = () => {
  const { fetchWeatherData, searchCity } = useWeather();
  
  useEffect(() => {
    fetchWeatherData(searchCity);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <Header />
      <SearchSection />
      <CurrentWeather />
      <Footer />
    </div>
  );
};

export default Home;