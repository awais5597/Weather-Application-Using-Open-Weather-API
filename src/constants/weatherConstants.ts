export const WEATHER_CODES = {
    // Mapping for Open-Meteo weather codes to descriptions
    DESCRIPTIONS: {
      0: "clear sky",
      1: "mainly clear",
      2: "partly cloudy",
      3: "overcast",
      45: "fog",
      48: "depositing rime fog",
      51: "light drizzle",
      53: "moderate drizzle",
      55: "dense drizzle",
      // ...other codes...
    },
    // Mapping for Open-Meteo weather codes to OpenWeather icons
    ICONS: {
      0: {day: "01d", night: "01n"}, // clear sky
      1: {day: "02d", night: "02n"}, // mainly clear
      2: {day: "02d", night: "02n"}, // partly cloudy
      // ...other codes...
    },
  };