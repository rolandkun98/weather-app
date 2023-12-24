import { createTheme } from "@mui/material";
import { createBreakpoints } from "@mui/system";

const breakpoints = createBreakpoints({});

const globalTheme = createTheme({
  palette: {
    primary: {
      light: "#eceff1",
      main: "#607d8b",
      dark: "#455a64",
    },
  },
});

export const theme = createTheme({
  ...globalTheme,
  typography: {
    h1: {
      fontSize: "3.3rem",
      fontWeight: 600,
      userSelect: "none",
      color: globalTheme.palette.primary.dark,
      [breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    subtitle1: {
      fontSize: "1.2rem",
      userSelect: "none",
      color: globalTheme.palette.primary.dark,
      [breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    subtitle2: {
      fontSize: "1rem",
      userSelect: "none",
      color: globalTheme.palette.primary.dark,
      [breakpoints.down("sm")]: {
        fontSize: ".9rem",
      },
    },
  },
});
