import { configureStore } from "@reduxjs/toolkit";
import { citiesSlice } from "../slices/cities-slice";
import {
  openWeatherMapApiReducerPath,
  openWeatherMapApiReducer,
  openWeatherMapApiMiddleware,
} from "@/endpoints/open-weather-map";
import { localStorageMiddleware } from "../middlewares/local-storage-middleware";

const store = configureStore({
  reducer: {
    [citiesSlice.name]: citiesSlice.reducer,
    [openWeatherMapApiReducerPath]: openWeatherMapApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      openWeatherMapApiMiddleware,
      localStorageMiddleware,
    ]),
});

export default store;
