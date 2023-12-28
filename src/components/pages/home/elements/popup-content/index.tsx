import { CityData } from "@/utils/interfaces/city";
import { Box, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";

interface PopupContentProps {
  cities: CityData[];
  select: (city: CityData) => void;
}

const PopupContent = ({ cities, select }: PopupContentProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Box sx={{ height: "100%", padding: ".8rem", overflow: "scroll" }}>
      {cities.map((city) => {
        return (
          <Paper
            onClick={() => select(city)}
            key={city.latitude + city.longitude}
            sx={{
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
              <Typography variant="subtitle2" sx={{ color: "primary.light" }}>
                {t("homePage.popup.subtitles.element1")}: {city.latitude}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "primary.light" }}>
                {t("homePage.popup.subtitles.element2")}: {city.longitude}
              </Typography>
            </Box>
            <Box>
              <ArrowForwardIosIcon />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default PopupContent;
