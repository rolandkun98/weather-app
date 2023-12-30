import { CityData, RawCityData } from "@/utils/interfaces/city";
import {
  CurrentWeatherData,
  RawCurrentWeatherData,
} from "@/utils/interfaces/current-weather";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";

type GetCityByNameParams = {
  cityName: string;
  limit: number;
};

type GetCurrentWeatherByCoordinatesParams = {
  longitude: number;
  latitude: number;
};

const openWeatherMapApi = createApi({
  reducerPath: "openWeatherMapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.openweathermap.org/",
  }),
  endpoints: (builder) => ({
    getCityByName: builder.query<CityData[], GetCityByNameParams>({
      query: ({ cityName, limit }) =>
        `geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${process.env.API_KEY}`,
      transformResponse: (rawData: RawCityData[]) => {
        return rawData.map((city) => ({
          id: uuidv4(),
          name: city.name,
          latitude: city.lat,
          longitude: city.lon,
          country: city.country,
          localNames: city.local_names,
        }));
      },
    }),
    getCurrentWeatherByCoordinates: builder.query<
      CurrentWeatherData,
      GetCurrentWeatherByCoordinatesParams
    >({
      query: ({ longitude, latitude }) =>
        `data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${process.env.API_KEY}`,
      transformResponse: (rawData: RawCurrentWeatherData) => {
        return {
          clouds: rawData.clouds.all,
          windSpeed: rawData.wind.speed,
          temp: {
            current: rawData.main.temp,
            min: rawData.main.temp_min,
            max: rawData.main.temp_max,
          },
        };
      },
    }),
  }),
});

export const {
  useGetCityByNameQuery,
  useLazyGetCityByNameQuery,
  useGetCurrentWeatherByCoordinatesQuery,
  useLazyGetCurrentWeatherByCoordinatesQuery,
  reducerPath: openWeatherMapApiReducerPath,
  reducer: openWeatherMapApiReducer,
  middleware: openWeatherMapApiMiddleware,
} = openWeatherMapApi;
