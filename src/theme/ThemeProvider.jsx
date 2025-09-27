import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: 'Tajawal, "Segoe UI", Roboto, Arial, sans-serif',
  },
  palette: {
    primary: { main: "#415a77" }, // CTA
    secondary: { main: "#778da9" }, // accents
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#0d1b2a", secondary: "#1b263b" },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700, borderRadius: 999 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
