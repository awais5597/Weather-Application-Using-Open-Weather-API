import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { TEXT } from '@/constants';

const weatherFacts = [
  "Weather forecasts become approximately 25% less accurate for each day further into the future they predict.",
  "A single cloud can weigh more than 1 million pounds.",
  "Lightning strikes the Earth 8.6 million times per day on average.",
  "The highest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley, California.",
  "The lowest temperature ever recorded was -128.6°F (-89.2°C) in Antarctica.",
  "Rain drops can fall at speeds of up to 20 mph (32 kph).",
  "Hurricanes release as much energy as 10,000 nuclear bombs.",
  "It is impossible to 'see' rain until it is approximately 169 feet (51.5 meters) from the ground.",
  "A snowflake can take up to 1 hour to reach the ground.",
  "The wettest place on Earth is Mawsynram, India, which receives 467 inches of rain per year."
];

const InfoCard: React.FC = () => {
  const [factIndex, setFactIndex] = useState(0);
  
  const getRandomFact = () => {
    const newIndex = Math.floor(Math.random() * weatherFacts.length);
    setFactIndex(newIndex === factIndex ? (newIndex + 1) % weatherFacts.length : newIndex);
  };
  
  useEffect(() => {
    getRandomFact();
  }, []);
  
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-3 text-white">
      <h3 className="text-lg font-medium">{TEXT.INFO_CARD.QUESTION}</h3>
      <p className="mb-1">{weatherFacts[factIndex]}</p>
      <div className="flex justify-end">
        <button 
          onClick={getRandomFact}
          className="flex items-center text-sm font-medium hover:underline"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          {TEXT.INFO_CARD.NEW_FACT}
        </button>
      </div>
    </div>
  );
};

export default InfoCard;