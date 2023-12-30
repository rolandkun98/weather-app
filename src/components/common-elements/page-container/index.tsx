import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguageHandler } from "@/hooks/use-language-handler";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/router";
interface PageContainerProps {
  children: React.ReactNode;
  backRoute?: string;
}

const PageContainer = ({
  children,
  backRoute,
}: PageContainerProps): JSX.Element => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
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
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h1">{t("global.appTitle")}</Typography>
        <Button
          startIcon={<LanguageIcon />}
          onClick={() => changeLanguage(i18n.language)}
        >
          {showOtherLanguage(i18n.language).toUpperCase()}
        </Button>
      </Box>
      {backRoute && (
        <Box
          sx={{
            width: "100%",
            padding: "0 1rem",
            margin: ".5rem 0",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => router.push(backRoute)}
          >
            {t("global.buttons.back")}
          </Button>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default PageContainer;
