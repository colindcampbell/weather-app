import { create } from "zustand";
import { isFunction } from "../utils";
import { useEffect } from "react";

const initialState = {
  current: "",
  saved: [],
};

const weatherStoreHandler = (set, get) => ({
  ...initialState,
  actions: {
    init: (current = "", saved: string[] = []) => set({ current, saved }),
    resetInput: set({ current: initialState.current }),
    set: (val) => (isFunction(val) ? set(val(get())) : set(val)),
  },
});

export const useWeatherStore = create(weatherStoreHandler);
export const useCurrentZipcode = () => useWeatherStore((state) => state.current);
export const useInitWeatherStore = () => {
  const { actions } = useWeatherStore();
  useEffect(() => {
    //TODO: get saved values from local storage
    actions.init("", []);
  }, [actions]);
};
