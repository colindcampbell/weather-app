import { FC, useEffect, useMemo } from "react";
import * as R from "ramda";
import * as d3 from "d3";
import { Weather } from "../../service";
import { GeneratePoints, calcVisualizationPoints } from "./visualizationUtils";
import { visualizationHeight } from "../../constants";

interface WeatherVisualization {
  forecastWeatherItems: Weather[];
  forecastWeatherItemWidths: number[];
}

export const WeatherVisualization: FC<WeatherVisualization> = ({ forecastWeatherItems, forecastWeatherItemWidths }) => {
  const width = R.sum(forecastWeatherItemWidths);
  const points = useMemo(() => {
    if (R.isEmpty(forecastWeatherItemWidths)) {
      return [];
    }
    return calcVisualizationPoints(forecastWeatherItems, forecastWeatherItemWidths, width, visualizationHeight / 2);
  }, [forecastWeatherItems, forecastWeatherItemWidths, width]);

  useEffect(() => {
    d3.select("#trend-path").attr("d", GeneratePoints(visualizationHeight)(points)).attr("fill", "url(#trend-fill");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [R.toString(points)]);

  return (
    <svg id="weather-trend" className="pos-a" width={`${width}`} height={`${visualizationHeight}`}>
      <defs>
        <linearGradient id="trend-fill" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#0072e4" />
          <stop offset="17%" stopColor="#0072e4" />
          <stop offset="51%" stopColor="#0072e4" />
          <stop offset="67.33%" stopColor="#1d7fe7" />
          <stop offset="100%" stopColor="#3e97f1" />
        </linearGradient>
      </defs>
      <path id="trend-path"></path>
    </svg>
  );
};
