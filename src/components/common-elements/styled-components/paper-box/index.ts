import { Paper } from "@mui/material";
import { styled } from "@mui/system";

export const PaperBox = styled(Paper)(({ theme }) => ({
  width: "90%",
  marginTop: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  [theme.breakpoints.up("sm")]: {
    boxShadow: "none",
  },
}));
