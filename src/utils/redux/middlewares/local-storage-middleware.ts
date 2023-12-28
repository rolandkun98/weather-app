import { createListenerMiddleware } from "@reduxjs/toolkit";
import { citiesSlice } from "../slices/cities-slice";
import { CityData } from "@/utils/interfaces/city";
import { LocalStorageKeys } from "@/utils/enums/local-storage-keys";

const localStorageListener = createListenerMiddleware();

localStorageListener.startListening({
  actionCreator: citiesSlice.actions.addNewCity,
  effect: async (action, listenerApi) => {
    if (action.type === citiesSlice.actions.addNewCity.type) {
      const citiesState = (listenerApi.getState() as { cities: CityData[] })
        .cities;
      localStorage.setItem(
        LocalStorageKeys.CITIES,
        JSON.stringify(citiesState)
      );
    }
  },
});

export const { middleware: localStorageMiddleware } = localStorageListener;
