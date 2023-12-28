import { CityData } from "@/utils/interfaces/city";
import { Box, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CityRowContainerProps {
  city: CityData;
  icon: React.ReactNode;
  onClick: (city: CityData) => void;
  variant: "expanded" | "collapsed";
}

const CityRowContainer = ({
  city,
  icon,
  onClick,
  variant,
}: CityRowContainerProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper
      onClick={() => onClick(city)}
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        color: "primary.light",
        marginBottom: ".5rem",
        padding: ".5rem .5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ color: "primary.light" }}>
          {city.country} {city.name}
        </Typography>
        {variant === "expanded" && (
          <>
            <Typography variant="subtitle2" sx={{ color: "primary.light" }}>
              {t("homePage.popup.subtitles.element1")}: {city.latitude}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "primary.light" }}>
              {t("homePage.popup.subtitles.element2")}: {city.longitude}
            </Typography>
          </>
        )}
      </Box>
      <Box>{icon}</Box>
    </Paper>
  );
};

export default CityRowContainer;
