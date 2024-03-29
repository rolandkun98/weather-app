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

export const theme = createTheme(globalTheme, {
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
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
      userSelect: "none",
      color: globalTheme.palette.primary.dark,
      [breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      userSelect: "none",
      color: globalTheme.palette.primary.dark,
      [breakpoints.down("sm")]: {
        fontSize: "1.3rem",
      },
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: 600,
      userSelect: "none",
      color: globalTheme.palette.primary.dark,
      [breakpoints.down("sm")]: {
        fontSize: "1.1rem",
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
