import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useWeatherStore } from "../hooks/useWeatherStore";
import { FC, useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import { Weather } from "../service";
import useResizeObserver from "use-resize-observer";
import { mapIndexed } from "../utils";
import dayjs from "dayjs";
import { WeatherVisualization } from "./Visualization/WeatherVisualization";

interface ForecastInterfaceProps {
  data: Weather[];
}

export const ForecastInterface: FC<ForecastInterfaceProps> = ({ data }) => {
  const currentWeather = R.head(data);
  const forecastWeatherItems = R.tail(data);
  const [forecastWeatherItemWidths, setForecastWeatherItemWidths] = useState<number[]>([]);

  const setItemWidth = useCallback((index: number, width: number) => {
    setForecastWeatherItemWidths((widths) => R.assoc(index, width, widths));
  }, []);

  return (
    <Box className="d-f fd-c h-100 jc-c" sx={{ paddingTop: 4, gap: 8 }}>
      {currentWeather && <CurrentWeather {...currentWeather} />}
      <Box className="ovfx-a ovfy-a w-100 f-1">
        <Box className="d-f pos-r" sx={{ marginTop: "240px" }}>
          <WeatherVisualization forecastWeatherItemWidths={forecastWeatherItemWidths} forecastWeatherItems={forecastWeatherItems} />
          {mapIndexed(
            (weatherItem: Weather, index: number) => (
              <WeatherItem key={weatherItem.startTime} index={index} setItemWidth={setItemWidth} {...weatherItem} />
            ),
            forecastWeatherItems
          )}
        </Box>
      </Box>
    </Box>
  );
};

const CurrentWeather: FC<Weather> = ({ icon, startTime, shortForecast, temperature, windSpeed, windDirection }) => {
  const { unit } = useWeatherStore();
  return (
    <Box className="d-f jc-sa">
      <Box className="d-f fd-c ai-c" sx={{ color: "white" }}>
        <Typography variant="body2">{dayjs(startTime).format("MMM. D, YYYY, h a")}</Typography>
        <Box className="d-f g-8">
          <Typography variant="h1">{temperature}&#176;</Typography>
          <Typography variant="h2">
            <sup>{unit}</sup>
          </Typography>
        </Box>
        <Typography variant="h4" gutterBottom>
          {shortForecast}
        </Typography>
        <Typography variant="h5">
          Wind {windSpeed} {windDirection}
        </Typography>
      </Box>
      <Box className="d-f fd-c ai-c jc-c">
        <img src={R.replace("size=small", "size=large", icon)} alt={shortForecast} style={{ borderRadius: 8, width: 160, height: "auto" }} />
      </Box>
    </Box>
  );
};

type WeatherItemProps = Weather & { index: number; setItemWidth: (index: number, width: number) => void };

const WeatherItem: FC<WeatherItemProps> = ({ startTime, icon, shortForecast, temperature, windSpeed, windDirection, index, setItemWidth }) => {
  const { width, ref } = useResizeObserver();
  useEffect(() => {
    if (width) {
      setItemWidth(index, width);
    }
  }, [index, setItemWidth, width]);
  return (
    <Box className="reverse-bg d-f" ref={ref} sx={{ paddingBottom: "60px" }}>
      <Box className="d-f fd-c ai-c ta-c ofv-h py-8" sx={{ transform: "translateY(-60px)", paddingBottom: "60px", color: "white" }}>
        <Typography variant="h4">{temperature}</Typography>
        <img
          src={icon}
          alt={shortForecast}
          className="w-100"
          style={{ height: "auto", maxWidth: 60, minWidth: 32, borderRadius: 4, border: "2px solid white" }}
        />
        <Typography variant="body1" noWrap>
          {dayjs(startTime).format("h a")}
        </Typography>
        <Typography variant="h6">{shortForecast}</Typography>
        <Typography variant="body2">
          {windSpeed} {windDirection}
        </Typography>
      </Box>
    </Box>
  );
};
