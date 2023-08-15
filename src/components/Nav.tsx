import { styled, alpha } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/App.css";
import { useCurrentZipcode, useWeatherStoreActions } from "../hooks/useWeatherStore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { drawerWidth } from "../constants";
import { Drawer } from "./Drawer";
import * as R from "ramda";
import { calcIsValidZip, existsAndIsNotEmpty } from "../utils";

export const AppNavBar = ({ open, setOpen }) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box component="nav">
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg">
          {!open && (
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }} className="f-1">
            Weather
          </Typography>
          <SearchInput />
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
    </Box>
  );
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchInput = () => {
  const current = useCurrentZipcode();
  const [zip, setZip] = useState<string>(current);
  const actions = useWeatherStoreActions();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = R.trim(e.target.value);
      setZip(value);
      if (calcIsValidZip(value)) {
        actions.set({ current: value });
      }
    },
    [actions]
  );
  const handleReset = useCallback(() => {
    setZip("");
    actions.set({ current: "" });
  }, [actions]);

  useEffect(() => {
    setZip(current);
  }, [current]);

  const showReset = existsAndIsNotEmpty(current);
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} value={zip} onChange={handleChange} type="search" autoFocus />
      </Search>
      {showReset && (
        <IconButton title="Reset" size="large" color="inherit" aria-label="Reset" onClick={handleReset} sx={{ ml: 1 }}>
          <ClearIcon />
        </IconButton>
      )}
    </>
  );
};
