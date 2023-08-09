import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/App.css";
import { AppContent } from "./Content";
import { AppNavBar } from "./Nav";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <Box className="app">
      <CssBaseline />
      <AppNavBar open={open} setOpen={setOpen} />
      <AppContent open={open} />
    </Box>
  );
}
