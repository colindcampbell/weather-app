import * as R from "ramda";

export const isFunction = R.is(Function);
export const calcIsValidZip = R.both(
  R.pipe(R.length, R.equals(5)),
  R.pipe((val: string) => parseInt(val, 10), R.equals(NaN), R.not)
);
export const mapIndexed = R.addIndex(R.map);
export const reduceIndexed = R.addIndex(R.reduce);
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
