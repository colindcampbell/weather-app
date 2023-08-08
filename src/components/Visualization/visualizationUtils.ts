import * as R from "ramda";
import { Weather } from "../../service";
import { calcMinMax, calcValuePercentage, reduceIndexed } from "../../utils";
import * as d3 from "d3";

type Point = [x: number, y: number];
type Points = Point[];

export const calcVisualizationPoints = (
  forecastWeatherItems: Weather[],
  forecastWeatherItemWidths: number[],
  width: number,
  height: number
): Points => {
  const temperatures = calcTemperatureValues(forecastWeatherItems);

  const { min, max } = calcMinMax(temperatures);

  const points = R.pipe(calcPoints(min, max, height, forecastWeatherItemWidths), addVisualizationBookends(width))(temperatures);

  return points;
};

export const calcPoints = (min: number, max: number, height: number, itemWidths: number[]) => (list: number[]) =>
  R.pipe(
    reduceIndexed(
      ({ reduced, sum }, temperature: number, i) => {
        const itemWidth = R.prop(i, itemWidths);
        const point = calcPointXandY({ sum, itemWidth, height, min, max, temperature });
        return {
          reduced: R.append(point, reduced),
          sum: sum + itemWidth,
        };
      },
      { reduced: [], sum: 0 }
    ),
    (val) => R.prop("reduced", val) as Points
  )(list);

const calcPointXandY = ({ sum, itemWidth, height, min, max, temperature }) => {
  const x = sum + itemWidth / 2;
  const y = height - calcValuePercentage({ min, max, value: temperature }) * height;
  return [x, y];
};

export const addVisualizationBookends = (width: number) => (list: Points) => {
  if (R.isEmpty(list)) {
    return list;
  }
  const first = R.pipe(R.head, ([, y]) => [0, y])(list as Points);
  const last = R.pipe(R.last, ([, y]) => [width, y])(list as Points);
  return [first, ...list, last] as Points;
};

export const calcTemperatureValues = (list: Weather[]) => R.map(R.pipe(R.prop("temperature")), list);

export const GeneratePoints = (height: number) =>
  d3
    .area()
    .x((p) => p[0])
    .y0(R.always(height))
    .y1((p) => p[1])
    .curve(d3.curveCardinal);
