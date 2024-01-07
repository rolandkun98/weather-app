import { Box, CircularProgress as MUICircularProgress } from "@mui/material";

const CircularProgress = (): JSX.Element => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MUICircularProgress />
    </Box>
  );
};

export default CircularProgress;
