import { Box, Paper, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface PopupProps {
  title: string;
  children: React.ReactNode;
  close: () => void;
}

const Popup = ({ title, children, close }: PopupProps): JSX.Element => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: (theme) => theme.palette.primary.dark + "55",
        position: "absolute",
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "80%", height: "50%" }}>
        <Box
          sx={{
            height: "3rem",
            width: "100%",
            padding: "0 .8rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {title}
          </Typography>
          <IconButton onClick={close}>
            <ClearIcon color="error" />
          </IconButton>
        </Box>
        <Box sx={{ height: "85%", width: "100%" }}>{children}</Box>
      </Paper>
    </Box>
  );
};

export default Popup;
