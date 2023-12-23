import { Box } from "@mui/material";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps): JSX.Element => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        paddingTop: "3rem",
        backgroundColor: "primary.light",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
