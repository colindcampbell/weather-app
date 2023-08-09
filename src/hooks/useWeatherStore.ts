import { create } from "zustand";
import { getQueryString, isFunction } from "../utils";
import { TEMPERATURE_UNITS } from "../constants";
import { persist } from "zustand/middleware";
import * as R from "ramda";

type Actions = {
  resetInput: () => void;
  set: (val) => void;
};

type PersistedState = {
  current: string;
  history: string[];
  unit: TEMPERATURE_UNITS;
};

type WeatherState = PersistedState & {
  actions: Actions;
};

const initialState = {
  current: "",
  history: [],
  unit: TEMPERATURE_UNITS.F,
};

export const useWeatherStore = create(
  persist<WeatherState>(
    (set, get) => ({
      ...initialState,
      actions: {
        resetInput: () => set({ current: "" }),
        set: (val) => (isFunction(val) ? set(val(get())) : set(val)),
      },
    }),
    {
      partialize: (state: WeatherState) => R.pick(R.keys(initialState))(state) as WeatherState,
      name: "weather-storage",
      merge: (persistedState: PersistedState, currentState) => {
        const { zip } = getQueryString();
        return {
          ...currentState,
          ...persistedState,
          ...(zip && { current: zip as string }), // load value from url if it exists
        };
      },
    }
  )
);

export const useCurrentZipcode = () => useWeatherStore((state) => state.current);
export const useSavedSearches = () => useWeatherStore((state) => state.history);
export const useWeatherStoreActions = () => useWeatherStore((state) => state.actions);
export const useCurrentTemperatureUnit = () => useWeatherStore((state) => state.unit);
