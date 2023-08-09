import { useWeatherData } from "../hooks/useWeatherData";
import { useCurrentTemperatureUnit, useCurrentZipcode, useWeatherStoreActions } from "../hooks/useWeatherStore";
import { FC } from "react";
import { calcIsValidZip } from "../utils";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants";
import { ForecastInterface } from "./ForecastInterface";
import { MessageInterface } from "./MessageInterface";

interface AppProps {
  open: boolean;
}

export const AppContent: FC<AppProps> = ({ open }) => {
  const zip = useCurrentZipcode();
  const unit = useCurrentTemperatureUnit();
  const actions = useWeatherStoreActions();
  const isValidZip = calcIsValidZip(zip);
  const { error, data = [], isLoading, fetchStatus } = useWeatherData(zip, unit, actions.set);

  return (
    <Main open={open} className="d-f fd-c h-100">
      {isValidZip && !isLoading && !error ? (
        <ForecastInterface data={data} />
      ) : (
        <MessageInterface error={error} isLoading={isLoading} fetchStatus={fetchStatus} />
      )}
    </Main>
  );
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));
