import { WeatherData } from "@/utils/interfaces/weather";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PaperBox } from "../../../../common-elements/styled-components/paper-box";
import { mpsToKph } from "@/utils/mps-to-kph";
import { weatherConditionKeyGenerator } from "@/utils/weather-condition-key-generator";
import Paginator from "@/components/common-elements/paginator";

interface WeatherContainerProps {
  weatherData: WeatherData | WeatherData[];
  title: string;
}

const WeatherContainer = ({
  weatherData,
  title,
}: WeatherContainerProps): JSX.Element => {
  const [selectedWeatherDataItemIndex, setSelectedWeatherDataItemIndex] =
    useState(0);
  const { t } = useTranslation();

  return (
    <PaperBox sx={{ paddingLeft: ".8rem" }}>
      <Typography variant="h3">{title}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: Array.isArray(weatherData)
            ? "space-between"
            : "center",
          alignItems: "center",
        }}
      >
        {Array.isArray(weatherData) ? (
          <Paginator
            text={weatherData[selectedWeatherDataItemIndex].date}
            lastItemIndex={weatherData.length - 1}
            selectedItemIndex={selectedWeatherDataItemIndex}
            setSelectedItem={(i) => setSelectedWeatherDataItemIndex(i)}
          />
        ) : (
          <Typography variant="subtitle2">{weatherData.date}</Typography>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: ".5rem 0",
        }}
      >
        <Image
          src={`https://openweathermap.org/img/wn/${
            Array.isArray(weatherData)
              ? weatherData[selectedWeatherDataItemIndex].icon
              : weatherData.icon
          }.png`}
          alt={`${
            Array.isArray(weatherData)
              ? weatherData[selectedWeatherDataItemIndex].weatherDescription
              : weatherData.weatherDescription
          } icon`}
          height={40}
          width={40}
        />
        <Typography variant="subtitle1">
          {Array.isArray(weatherData)
            ? t(
                `cityPage.weatherContainer.weatherConditions.${weatherConditionKeyGenerator(
                  weatherData[selectedWeatherDataItemIndex].weatherDescription
                )}`
              )
            : t(
                `cityPage.weatherContainer.weatherConditions.${weatherConditionKeyGenerator(
                  weatherData.weatherDescription
                )}`
              )}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: "50%" }}>
          <Typography variant="subtitle1">
            {t("global.weatherElements.clouds")}
          </Typography>
          <Typography variant="subtitle1">
            {t("global.weatherElements.windSpeed")}
          </Typography>
          <Typography variant="subtitle1">
            {t("global.weatherElements.humidity")}
          </Typography>
          <Typography variant="subtitle1">
            {t("global.weatherElements.temperature")}
          </Typography>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography variant="subtitle1">
            {Array.isArray(weatherData)
              ? weatherData[selectedWeatherDataItemIndex].clouds
              : weatherData.clouds}{" "}
            %
          </Typography>
          <Typography variant="subtitle1">
            {Array.isArray(weatherData)
              ? mpsToKph(weatherData[selectedWeatherDataItemIndex].windSpeed)
              : mpsToKph(weatherData.windSpeed)}{" "}
            km/h
          </Typography>
          <Typography variant="subtitle1">
            {Array.isArray(weatherData)
              ? weatherData[selectedWeatherDataItemIndex].humidity
              : weatherData.humidity}{" "}
            %
          </Typography>
          <Typography variant="subtitle1">
            {Array.isArray(weatherData)
              ? weatherData[selectedWeatherDataItemIndex].temperature
              : weatherData.temperature}{" "}
            °
          </Typography>
        </Box>
      </Box>
    </PaperBox>
  );
};

export default WeatherContainer;
