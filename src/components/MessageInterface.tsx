import { WeatherFetchError } from "../hooks/useWeatherData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";
import * as R from "ramda";
import { FetchStatus } from "@tanstack/react-query";
import { FETCH_STATUS } from "../constants";

interface MessageInterfaceProps {
  error: WeatherFetchError;
  isLoading: boolean;
  fetchStatus: FetchStatus;
}

export const MessageInterface: FC<MessageInterfaceProps> = ({ error, isLoading, fetchStatus }) => {
  const hasError = R.pipe(R.isNil, R.not)(error);
  const showLoading = isLoading && fetchStatus !== FETCH_STATUS.IDLE;
  return (
    <Box className="d-f h-100 w-100 ai-c jc-c">
      {showLoading ? (
        <CircularProgress sx={{ color: "white" }} />
      ) : (
        <Typography variant="h4" sx={{ color: "white" }} className="ta-c">
          {hasError ? error?.response?.statusText : "Welcome, please enter a valid 5 digit zip code above"}
        </Typography>
      )}
    </Box>
  );
};
