import { CityData, RawCityData } from "@/utils/interfaces/city";
import {
  WeatherData,
  RawCurrentWeatherData,
  RawDailyForecastData,
} from "@/utils/interfaces/weather";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { DateFormat } from "@/utils/enums/date-format";

type GetCityByNameParams = {
  cityName: string;
  limit: number;
};

type GetCurrentWeatherByCoordinatesParams = {
  longitude: number;
  latitude: number;
};

type GetDailyForecast5DaysParams = {
  longitude: number;
  latitude: number;
};

const openWeatherMapApi = createApi({
  reducerPath: "openWeatherMapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/",
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
      WeatherData,
      GetCurrentWeatherByCoordinatesParams
    >({
      query: ({ longitude, latitude }) =>
        `data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${process.env.API_KEY}`,
      transformResponse: (rawData: RawCurrentWeatherData) => {
        return {
          clouds: Math.round(rawData.clouds.all),
          windSpeed: Math.round(rawData.wind.speed),
          humidity: Math.round(rawData.main.humidity),
          temperature: Math.round(rawData.main.temp),
          weatherDescription: rawData.weather[0].description,
          icon: rawData.weather[0].icon,
          date: format(new Date(), DateFormat.PRIMARY),
        };
      },
    }),
    getDailyForecast5Days: builder.query<
      WeatherData[],
      GetDailyForecast5DaysParams
    >({
      query: ({ longitude, latitude }) =>
        `data/2.5/forecast?lon=${longitude}&lat=${latitude}&units=metric&appid=${process.env.API_KEY}`,
      transformResponse: (rawData: RawDailyForecastData) => {
        const totalForecastData: WeatherData[] = [];
        const avgForecastData: WeatherData[] = [];

        for (const listItem of rawData.list) {
          const today = format(new Date(), DateFormat.SECONDARY);
          const formattedDate = format(
            new Date(listItem?.dt_txt),
            DateFormat.SECONDARY
          );

          if (today !== formattedDate) {
            const foundItem = totalForecastData.find(
              (totalForecastItem) => totalForecastItem.date === formattedDate
            );

            if (foundItem) {
              foundItem.clouds += listItem.clouds.all;
              foundItem.windSpeed += listItem.wind.speed;
              foundItem.humidity += listItem.main.humidity;
              foundItem.temperature += listItem.main.temp;
            } else {
              const newTotalForecastItem: WeatherData = {
                clouds: listItem.clouds.all,
                windSpeed: listItem.wind.speed,
                humidity: listItem.main.humidity,
                temperature: listItem.main.temp,
                weatherDescription: "",
                icon: "",
                date: formattedDate,
              };
              totalForecastData.push(newTotalForecastItem);
            }
          }
        }

        for (const totalForecastItem of totalForecastData) {
          const listItems = rawData.list.filter((listItem) =>
            listItem.dt_txt.includes(totalForecastItem?.date)
          );
          const count = listItems.length;

          const newAvgForecastItem: WeatherData = {
            clouds: Math.round(totalForecastItem.clouds / count),
            windSpeed: Math.round(totalForecastItem.windSpeed / count),
            humidity: Math.round(totalForecastItem.humidity / count),
            temperature: Math.round(totalForecastItem.temperature / count),
            weatherDescription:
              listItems[Math.round(count / 2)].weather[0].description,
            icon: listItems[Math.round(count / 2)].weather[0].icon,
            date: totalForecastItem.date.replaceAll("-", "."),
          };

          avgForecastData.push(newAvgForecastItem);
        }

        return avgForecastData;
      },
    }),
  }),
});

export const {
  useGetCityByNameQuery,
  useLazyGetCityByNameQuery,
  useGetCurrentWeatherByCoordinatesQuery,
  useLazyGetCurrentWeatherByCoordinatesQuery,
  useGetDailyForecast5DaysQuery,
  useLazyGetDailyForecast5DaysQuery,
  reducerPath: openWeatherMapApiReducerPath,
  reducer: openWeatherMapApiReducer,
  middleware: openWeatherMapApiMiddleware,
} = openWeatherMapApi;
