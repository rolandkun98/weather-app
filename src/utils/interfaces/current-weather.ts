export interface RawCurrentWeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      description: string;
      icon: string;
      id: string;
      main: string;
    }
  ];
  wind: {
    deg: number;
    speed: number;
  };
}

export interface CurrentWeatherData {
  clouds: number;
  windSpeed: number;
  temp: {
    current: number;
    min: number;
    max: number;
  };
}
