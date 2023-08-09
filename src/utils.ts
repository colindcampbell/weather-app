import * as R from "ramda";
import { Weather } from "./service";
import queryString from "query-string";

export const isFunction = R.is(Function);
export const calcIsValidZip = R.both(
  R.pipe(R.length, R.equals(5)),
  R.pipe((val: string) => parseInt(val, 10), R.equals(NaN), R.not)
);
export const mapIndexed = R.addIndex(R.map);
export const reduceIndexed = R.addIndex(R.reduce);
const isNotNil = R.complement(R.isNil);
export const isNotEmpty = R.complement(R.isEmpty);
export const existsAndIsNotEmpty = R.allPass([isNotNil, isNotEmpty]);
export const calcValuePercentage = ({ min, max, value }: { min: number; max: number; value: number }): number => {
  const rangeTotal = max - min;
  const rangeValue = value - min;
  return rangeValue / rangeTotal;
};
export const calcMinMax = (list: number[]) => {
  return R.reduce(
    ({ min, max }, val) => ({ min: val < min ? val : min, max: val > max ? val : max }),
    { min: R.head(list), max: R.head(list) },
    list
  );
};
export const convertToCelcius = (list: Weather[]) => {
  const converted = R.map(({ temperature, ...rest }) => ({ temperature: R.pipe(fToC, roundNumber)(temperature), ...rest }), list);
  return converted;
};

const fToC = (val: number) => ((val - 32) * 5) / 9;
const roundNumber = (num: number) => Math.round(num * 10) / 10; // Round to tenths

export const getQueryString = () => queryString.parse(window.location.search);
export const updateQueryString = (params) => window.history.replaceState(null, null, `?${queryString.stringify(params)}`);
