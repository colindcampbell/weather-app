import { expect, test, describe } from "vitest";
import { calcMinMax, calcValuePercentage } from "../src/utils";

describe("calcValuePercentage", () => {
  test("half value", () => {
    expect(calcValuePercentage({ min: 0, max: 100, value: 50 })).toEqual(0.5);
  });
  test("3/4 value", () => {
    expect(calcValuePercentage({ min: 12, max: 60, value: 48 })).toEqual(0.75);
  });
});

describe("calcMinMax", () => {
  test("empty list", () => {
    expect(calcMinMax([])).toEqual({});
  });
  test("one value", () => {
    expect(calcMinMax([5])).toEqual({ min: 5, max: 5 });
  });
  test("several values", () => {
    expect(calcMinMax([5, 3, 8, 19, 4, 12])).toEqual({ min: 3, max: 19 });
  });
});
