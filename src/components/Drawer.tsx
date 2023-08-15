import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useCurrentTemperatureUnit, useCurrentZipcode, useSavedSearches, useWeatherStoreActions } from "../hooks/useWeatherStore";
import { FC, useCallback } from "react";
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
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { updateQueryString } from "../utils";

interface DrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const Drawer: FC<DrawerProps> = ({ setOpen, open }) => {
  const currentZip = useCurrentZipcode();
  const savedSearches = useSavedSearches();
  const actions = useWeatherStoreActions();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickSavedSearch = useCallback(
    (zip: string) => {
      actions.set({ current: zip });
      updateQueryString({ zip });
    },
    [actions]
  );
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
      <Box>
        <Box sx={{ padding: 1 }}>
          <TemperatureUnitControl />
        </Box>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <Typography variant="h6" sx={{ padding: 1 }}>
          Recent Searches
        </Typography>
        <List aria-label="main mailbox folders">
          {R.map(
            (zip) => (
              <ListItemButton key={zip} onClick={() => handleClickSavedSearch(zip)} selected={R.equals(zip, currentZip)}>
                <ListItemText>{zip}</ListItemText>
              </ListItemButton>
            ),
            savedSearches
          )}
        </List>
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
      <RadioGroup aria-labelledby="temperature-unit" defaultValue={TEMPERATURE_UNITS.F} value={unit} name="unit-radio-buttons-group">
        <FormControlLabel
          value={TEMPERATURE_UNITS.F}
          control={<Radio value={unit === TEMPERATURE_UNITS.F} />}
          label="°F (Fahrenheit)"
          checked={R.equals(unit, TEMPERATURE_UNITS.F)}
          onChange={makeHandleChange(TEMPERATURE_UNITS.F)}
        />
        <FormControlLabel
          value={TEMPERATURE_UNITS.C}
          control={<Radio value={unit === TEMPERATURE_UNITS.C} />}
          label="°C (Celsius)"
          checked={R.equals(unit, TEMPERATURE_UNITS.C)}
          onChange={makeHandleChange(TEMPERATURE_UNITS.C)}
        />
      </RadioGroup>
    </FormControl>
  );
};
