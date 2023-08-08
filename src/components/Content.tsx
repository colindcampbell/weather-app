import { WeatherFetchError, useWeatherData } from "../hooks/useWeatherData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/App.css";
import { useCurrentZipcode } from "../hooks/useWeatherStore";
import { useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import { Weather } from "../service";
import useResizeObserver from "use-resize-observer";
import { calcIsValidZip, mapIndexed } from "../utils";
import dayjs from "dayjs";
import { FetchStatus } from "@tanstack/react-query";
import { WeatherVisualization } from "./Visualization/WeatherVisualization";

export const AppContent = () => {
  const zip = useCurrentZipcode();
  const isValidZip = calcIsValidZip(zip);
  const { error, data = [], isLoading, fetchStatus } = useWeatherData(zip);

  return isValidZip && !isLoading && !error ? (
    <ForecastInterface data={data} />
  ) : (
    <WelcomeInterface error={error} isLoading={isLoading} fetchStatus={fetchStatus} />
  );
};

const WelcomeInterface = ({ error, isLoading, fetchStatus }: { error: WeatherFetchError; isLoading: boolean; fetchStatus: FetchStatus }) => {
  const hasError = R.pipe(R.isNil, R.not)(error);
  return (
    <Box className="d-f h-100 w-100 ai-c jc-c">
      {isLoading && fetchStatus !== "idle" ? (
        <CircularProgress sx={{ color: "white" }} />
      ) : (
        <Typography variant="h4" sx={{ color: "white" }}>
          {hasError ? error?.response?.statusText : "Welcome, please enter a valid 5 digit zip code above"}
        </Typography>
      )}
    </Box>
  );
};

const ForecastInterface = ({ data }: { data: Weather[] }) => {
  const currentWeather = R.head(data);
  const forecastWeatherItems = R.tail(data);
  const [forecastWeatherItemWidths, setForecastWeatherItemWidths] = useState<number[]>([]);
  console.log("🚀 ~ file: Content.tsx:47 ~ ForecastInterface ~ forecastWeatherItemWidths:", forecastWeatherItemWidths);

  const setItemWidth = useCallback((index: number, width: number) => {
    setForecastWeatherItemWidths((widths) => R.assoc(index, width, widths));
  }, []);

  return (
    <Box component="main" className="d-f fd-c h-100 jc-c" sx={{ paddingTop: 4, gap: 8 }}>
      {currentWeather && <CurrentWeather {...currentWeather} />}
      <div className="ovf-a w-100 f-1">
        <div className="d-f pos-r" style={{ marginTop: 240 }}>
          <WeatherVisualization forecastWeatherItemWidths={forecastWeatherItemWidths} forecastWeatherItems={forecastWeatherItems} />
          {mapIndexed(
            (weatherItem: Weather, index: number) => (
              <WeatherItem key={weatherItem.startTime} index={index} setItemWidth={setItemWidth} {...weatherItem} />
            ),
            forecastWeatherItems
          )}
        </div>
      </div>
    </Box>
  );
};

const WeatherItem: React.FC<Weather & { index: number; setItemWidth: (index: number, width: number) => void }> = ({
  startTime,
  icon,
  shortForecast,
  temperature,
  windSpeed,
  windDirection,
  index,
  setItemWidth,
}) => {
  const { width, ref } = useResizeObserver();
  useEffect(() => {
    if (width) {
      setItemWidth(index, width + 16);
    }
  }, [index, setItemWidth, width]);
  return (
    <Box className="py-8 reverse-bg d-f" ref={ref}>
      <Box className="d-f fd-c ai-c ta-c ofv-h" sx={{ transform: "translateY(-60px)", paddingBottom: "60px" }}>
        <Typography variant="h4">{temperature}</Typography>
        <img
          src={icon}
          alt={shortForecast}
          className="w-100"
          style={{ height: "auto", maxWidth: 60, minWidth: 32, borderRadius: 4, border: "2px solid white" }}
        />
        <Typography variant="body1" sx={{ color: "white" }} noWrap>
          {dayjs(startTime).format("hh:mm A")}
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          {shortForecast}
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          {windSpeed} {windDirection}
        </Typography>
      </Box>
    </Box>
  );
};

const CurrentWeather: React.FC<Weather> = ({ icon, startTime, shortForecast, temperature, windSpeed, windDirection }) => {
  return (
    <div className="d-f jc-sa">
      <Box className="d-f fd-c ai-c" sx={{ color: "white" }}>
        <Typography variant="body2">{dayjs(startTime).format("MMM. D, YYYY, hh:mm A")}</Typography>
        <div className="d-f g-8">
          <Typography variant="h1">{temperature}&#176;</Typography>
          <Typography variant="h2">
            <sup>F</sup>
          </Typography>
        </div>
        <Typography variant="h4" gutterBottom>
          {shortForecast}
        </Typography>
        <Typography variant="h5">
          Wind {windSpeed} {windDirection}
        </Typography>
      </Box>
      <div className="d-f fd-c ai-c jc-c">
        <img src={R.replace("size=small", "size=large", icon)} alt={shortForecast} style={{ borderRadius: 8, width: 160, height: "auto" }} />
      </div>
    </div>
  );
};
