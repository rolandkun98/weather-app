import { useMediaQuery, useTheme } from "@mui/material";

interface UseBreakpointsOutput {
  isAboveMd: boolean;
}

export const useBreakpoints = (): UseBreakpointsOutput => {
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));

  return {
    isAboveMd,
  };
};
