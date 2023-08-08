import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export type weatherUrlParams = {
  zip: string;
};

export type Weather = {
  endTime: string;
  icon: string;
  shortForecast: string;
  startTime: string;
  temperature: number;
  startTimeZone: string;
  windSpeed: string;
  windDirection: string;
};

export const serviceGetWeather = (url: string, urlParams: { zip: string }): Promise<Weather[]> =>
  axios
    .get(url, {
      params: urlParams,
    })
    .then((response) => {
      return response.data;
    });

export const getWeather = ({ queryKey }) => {
  const [zip] = queryKey;
  return serviceGetWeather(`${baseUrl}/weather`, { zip });
};
