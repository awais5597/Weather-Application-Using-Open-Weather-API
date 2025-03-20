export const API = {
    PROVIDERS: {
      OPENWEATHER: 'openweather',
      OPEN_METEO: 'open-meteo',
    },
    ENDPOINTS: {
      OPENWEATHER_BASE: 'https://api.openweathermap.org/data/2.5',
      OPEN_METEO_BASE: 'https://archive-api.open-meteo.com/v1',
    },
    UNITS: {
      METRIC: 'metric',
      IMPERIAL: 'imperial',
      CELSIUS: 'celsius',
      FAHRENHEIT: 'fahrenheit',
    },
    PARAMS: {
      HOURLY: [
        'temperature_2m',
        'relative_humidity_2m',
        'precipitation',
        'rain',
        'weather_code',
        'wind_speed_10m'
      ],
      DAILY: [
        'temperature_2m_max',
        'temperature_2m_min'
      ],
    },
  };