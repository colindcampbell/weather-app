import { expect, test, describe } from "vitest";
import { addVisualizationBookends, calcPoints, calcTemperatureValues } from "../src/components/Visualization/visualizationUtils";
import { Weather } from "../src/service";

describe("calcTemperatureValues", () => {
  const values = [{ temperature: 15 }, { temperature: 45 }] as Weather[];
  test("list of values", () => {
    expect(calcTemperatureValues(values)).toEqual([15, 45]);
  });
});

describe("calcPoints", () => {
  test("list of points with x and y values", () => {
    expect(calcPoints(4, 16, 100, [10, 10, 20])([4, 10, 16])).toEqual([
      [5, 100], // min y is 0, max is 120
      [15, 50],
      [30, 0],
    ]);
  });
});

describe("addVisualizationBookends", () => {
  test("adds items at the start and end of the visualization", () => {
    expect(
      addVisualizationBookends(40)([
        [5, 100],
        [15, 50],
        [30, 0],
      ])
    ).toEqual([
      [0, 100],
      [5, 100],
      [15, 50],
      [30, 0],
      [40, 0],
    ]);
  });
});
