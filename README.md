# WeatherView App

A modern weather application built with React, Vite, and Tailwind CSS that provides current weather conditions, forecasts, and historical weather data using the OpenWeather API.

## Features

- Search weather by city name
- View current weather conditions (temperature, humidity, wind speed, etc.)
- 5-day weather forecast
- Historical weather data with date selector
- Toggle between Celsius and Fahrenheit
- Responsive design for all devices
- Error handling and loading states

## Technologies Used

- React 19
- Vite (for fast development and building)
- Tailwind CSS (for styling)
- Axios (for API requests)
- OpenWeather API 
- Open-Meteo API (For Historical Data)
- Environment variables for secure API key management

## Setup Instructions

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- OpenWeather API key

### Installation

1. Clone the repository:
cd weather-app

2. Install dependencies:
npm install

3. Create a `.env` file in the root directory with your OpenWeather API key:
VITE_OPENWEATHER_API_KEY = your_api_key_here

4. Start the development server:
npm run dev

5. Open your browser and navigate to `http://localhost:5173`

### Getting an OpenWeather API Key

1. Go to [OpenWeather](https://openweathermap.org/) and create an account
2. After logging in, go to "API Keys" tab
3. Generate a new API key (it may take a few hours to activate)
4. Copy the API key to your `.env` file and assign teh value to `VITE_OPENWEATHER_API_KEY`

## Build for Production
npm run build

The built files will be in the `dist` directory and can be deployed to any static site hosting service.

## License
MIT