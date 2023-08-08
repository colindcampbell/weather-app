import { useQuery } from "@tanstack/react-query";
import { Weather, getWeather } from "../service";
import { calcIsValidZip } from "../utils";

export const useWeatherData = (zip: string) => {
  return useQuery<Weather[], WeatherFetchError>({
    queryKey: [zip],
    queryFn: getWeather,
    enabled: calcIsValidZip(zip),
  });
};

export interface WeatherFetchError {
  response: ErrorResponse;
}

interface ErrorResponse {
  statusText: string;
  statusCode: number;
}
