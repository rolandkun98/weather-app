import { LocalStorageKeys } from "@/utils/enums/local-storage-keys";
import { CityData } from "@/utils/interfaces/city";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CityData[] = [];

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    initCities: () => {
      const loadedCities = localStorage.getItem(LocalStorageKeys.CITIES);
      return loadedCities ? JSON.parse(loadedCities) : [];
    },
    addNewCity: (state, action: { payload: CityData }) => {
      state.push(action.payload);
    },
    removeCity: (state, action: { payload: string }) => {
      const filteredState = state.filter((item) => item.id !== action.payload);
      return filteredState;
    },
  },
});
