import { PaperBox } from "@/components/common-elements/styled-components/paper-box";
import { useGetCurrentWeatherByCoordinatesQuery } from "@/endpoints/open-weather-map";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CurrentWeatherProps {
  latitude: number;
  longitude: number;
}

const CurrentWeather = ({
  longitude,
  latitude,
}: CurrentWeatherProps): JSX.Element => {
  const { t } = useTranslation();
  const { data: currentWeatherData } = useGetCurrentWeatherByCoordinatesQuery({
    latitude,
    longitude,
  });

  return (
    <PaperBox sx={{ paddingLeft: ".8rem" }}>
      <Typography variant="h3">{t("cityPage.currentWeather.title")}</Typography>
      <Box sx={{ width: "100%", display: "flex", marginTop: ".5rem" }}>
        <Box sx={{ width: "50%" }}>
          <Typography variant="subtitle1">
            {t("cityPage.currentWeather.subtitles.element1")}
          </Typography>
          <Typography variant="subtitle1">
            {t("cityPage.currentWeather.subtitles.element2")}
          </Typography>
          <Typography variant="subtitle1">
            {t("cityPage.currentWeather.subtitles.element3")}
          </Typography>
          <Typography variant="subtitle1">
            {t("cityPage.currentWeather.subtitles.element4")}
          </Typography>
          <Typography variant="subtitle1">
            {t("cityPage.currentWeather.subtitles.element5")}
          </Typography>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography variant="subtitle1">
            {currentWeatherData?.clouds} %
          </Typography>
          <Typography variant="subtitle1">
            {currentWeatherData?.windSpeed} km/h
          </Typography>
          <Typography variant="subtitle1">
            {currentWeatherData?.temp.current} °
          </Typography>
          <Typography variant="subtitle1">
            {currentWeatherData?.temp.min} °
          </Typography>
          <Typography variant="subtitle1">
            {currentWeatherData?.temp.max} °
          </Typography>
        </Box>
      </Box>
    </PaperBox>
  );
};

export default CurrentWeather;
