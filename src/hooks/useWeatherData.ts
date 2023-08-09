import { useQuery } from "@tanstack/react-query";
import { Weather, getWeather } from "../service";
import { calcIsValidZip, convertToCelcius } from "../utils";
import { TEMPERATURE_UNITS } from "../constants";
import * as R from "ramda";

export const useWeatherData = (zip: string, unit: TEMPERATURE_UNITS) => {
  return useQuery<Weather[], WeatherFetchError>({
    queryKey: [zip],
    queryFn: getWeather,
    select: calcWeatherData(unit),
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
