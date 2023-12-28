export interface RawCityData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: {
    [language: string]: string;
  };
}

export interface CityData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state?: string;
  localNames?: {
    [language: string]: string;
  };
}
