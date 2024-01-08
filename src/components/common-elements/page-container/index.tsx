import { Box, Button, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguageHandler } from "@/hooks/use-language-handler";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/router";
import { useBreakpoints } from "@/hooks/use-breakpoints";
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
  const { isAboveMd } = useBreakpoints();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        padding: "3rem 0",
        backgroundColor: "primary.light",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: isAboveMd ? "50%" : "100%",
          height: "100%",
          padding: isAboveMd ? "3rem 1rem 0 1rem" : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: isAboveMd ? "#fff" : "transparent",
          boxShadow: isAboveMd ? undefined : "none",
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
      </Paper>
    </Box>
  );
};

export default PageContainer;
