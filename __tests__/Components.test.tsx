import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { MessageInterface } from "../src/components/MessageInterface";
import { ForecastInterface } from "../src/components/ForecastInterface";
import { Drawer } from "../src/components/Drawer";

describe("MessageInterface", () => {
  test("renders welcome message", () => {
    render(<MessageInterface isLoading={false} fetchStatus="idle" />);

    expect(screen.getByText("Welcome, please enter a valid 5 digit zip code above")).toBeInTheDocument();
  });
  test("renders error message", () => {
    render(<MessageInterface isLoading={false} fetchStatus="idle" error={{ response: { statusText: "There was an error", statusCode: 504 } }} />);

    expect(screen.getByText("There was an error")).toBeInTheDocument();
  });
});

describe("ForecastInterface", () => {
  test("renders temperature", () => {
    render(
      <ForecastInterface
        data={[
          {
            endTime: "2023-08-15T19:00:00.000Z",
            icon: "https://api.weather.gov/icons/land/day/bkn,0?size=small",
            shortForecast: "Partly Sunny",
            startTime: "2023-08-15T13:00:00-05:00",
            temperature: 76,
            startTimeZone: "-05:00",
            windSpeed: "9 mph",
            windDirection: "WNW",
          },
          {
            endTime: "2023-08-15T20:00:00.000Z",
            icon: "https://api.weather.gov/icons/land/day/bkn,0?size=small",
            shortForecast: "Mostly Cloudy",
            startTime: "2023-08-15T14:00:00-05:00",
            temperature: 77,
            startTimeZone: "-05:00",
            windSpeed: "10 mph",
            windDirection: "NW",
          },
        ]}
      />
    );

    expect(screen.getByText("76°")).toBeInTheDocument(); // Current weather
    expect(screen.getByText("77")).toBeInTheDocument(); // Forecast weather
  });
});

describe("Drawer", () => {
  test("renders temperature unit input", () => {
    const state = {
      open: true,
    };
    render(<Drawer open={state.open} setOpen={() => (state.open = !state.open)} />);

    expect(screen.getByLabelText("Temperature Unit")).toBeInTheDocument();
    // TODO: test clicking the checked radio button
  });
});
