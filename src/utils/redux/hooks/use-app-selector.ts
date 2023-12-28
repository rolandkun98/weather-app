import { CityData } from "@/utils/interfaces/city";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface RootState {
  cities: CityData[];
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
