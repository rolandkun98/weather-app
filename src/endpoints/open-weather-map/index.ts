import { CityData, RawCityData } from "@/utils/interfaces/city";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";

type GetCityByNameParams = {
  cityName: string;
  limit: number;
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
  }),
});

export const {
  useGetCityByNameQuery,
  useLazyGetCityByNameQuery,
  reducerPath: openWeatherMapApiReducerPath,
  reducer: openWeatherMapApiReducer,
  middleware: openWeatherMapApiMiddleware,
} = openWeatherMapApi;
