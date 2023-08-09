import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import "../styles/App.css";
import { useCurrentTemperatureUnit, useWeatherStoreActions } from "../hooks/useWeatherStore";
import { useCallback } from "react";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TEMPERATURE_UNITS, drawerWidth } from "../constants";
import * as R from "ramda";

export const Drawer = ({ setOpen, open }) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ padding: 1 }}>
        <TemperatureUnitControl />
        <Divider />
        <Typography variant="h6">Recent Searches</Typography>
      </Box>
    </MuiDrawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const TemperatureUnitControl = () => {
  const unit = useCurrentTemperatureUnit();
  const actions = useWeatherStoreActions();

  const makeHandleChange = useCallback(
    (unitVal: TEMPERATURE_UNITS) => () => {
      actions.set({ unit: unitVal });
    },
    [actions]
  );
  return (
    <FormControl>
      <FormLabel id="temperature-unit">Temperature Unit</FormLabel>
      <RadioGroup aria-labelledby="temperature-unit" defaultValue={TEMPERATURE_UNITS.F} name="radio-buttons-group">
        <FormControlLabel
          value={TEMPERATURE_UNITS.F}
          control={<Radio />}
          label="°F (Fahrenheit)"
          checked={R.equals(unit, TEMPERATURE_UNITS.F)}
          onChange={makeHandleChange(TEMPERATURE_UNITS.F)}
        />
        <FormControlLabel
          value={TEMPERATURE_UNITS.C}
          control={<Radio />}
          label="°C (Celcius)"
          checked={R.equals(unit, TEMPERATURE_UNITS.C)}
          onChange={makeHandleChange(TEMPERATURE_UNITS.C)}
        />
      </RadioGroup>
    </FormControl>
  );
};
