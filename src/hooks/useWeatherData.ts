import { useQuery } from "@tanstack/react-query";
import { Weather, getWeather } from "../service";
import { calcIsValidZip, convertToCelcius, updateQueryString } from "../utils";
import { TEMPERATURE_UNITS } from "../constants";
import * as R from "ramda";

export const useWeatherData = (zip: string, unit: TEMPERATURE_UNITS, set: (val) => void) => {
  return useQuery<Weather[], WeatherFetchError>({
    queryKey: [zip],
    queryFn: getWeather,
    select: calcWeatherData(unit),
    onSuccess: () => {
      updateQueryString({ zip });
      set(({ history }: { history: string[] }) => ({
        history: R.includes(zip, history) ? history : R.pipe(R.prepend(zip), R.uniq, R.take(10))(history),
      }));
    },
    enabled: calcIsValidZip(zip),
  });
};

const calcWeatherData = (unit: TEMPERATURE_UNITS) => (response) => {
  if (R.equals(unit, TEMPERATURE_UNITS.F)) {
    return response;
  }
  return convertToCelcius(response);
};

export interface WeatherFetchError {
  response: ErrorResponse;
}

interface ErrorResponse {
  statusText: string;
  statusCode: number;
}
