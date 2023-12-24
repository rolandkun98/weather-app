import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguageHandler } from "@/hooks/use-language-handler";
interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps): JSX.Element => {
  const { i18n } = useTranslation();
  const { changeLanguage, showOtherLanguage } = useLanguageHandler();

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
      <Box
        sx={{
          width: "100%",
          paddingRight: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          startIcon={<LanguageIcon />}
          onClick={() => changeLanguage(i18n.language)}
        >
          {showOtherLanguage(i18n.language).toUpperCase()}
        </Button>
      </Box>
      {children}
    </Box>
  );
};

export default PageContainer;
