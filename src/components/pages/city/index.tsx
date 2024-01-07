import PageContainer from "@/components/common-elements/page-container";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import {
  useLazyGetCurrentWeatherByCoordinatesQuery,
  useLazyGetDailyForecast5DaysQuery,
} from "@/endpoints/open-weather-map";
import { useEffect } from "react";
import WeatherContainer from "@/components/pages/city/elements/weather-container";
import { useTranslation } from "react-i18next";
import WeatherDataChart from "./elements/weather-data-chart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { citiesSlice } from "@/redux/slices/cities-slice";
import CircularProgress from "@/components/common-elements/circular-progress";
import { toast } from "@/components/services/toast";

const CityPage = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useDispatch();
  const selectedCity = useAppSelector((state) =>
    state.cities.find((city) => city.id === id)
  );
  const [getCurrentWeather, { data: currentWeatherData }] =
    useLazyGetCurrentWeatherByCoordinatesQuery();
  const [getForecast, { data: forecastData }] =
    useLazyGetDailyForecast5DaysQuery();

  useEffect(() => {
    if (selectedCity) {
      getCurrentWeather({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      });

      getForecast({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      });
    }
  }, [selectedCity]);

  return (
    <PageContainer backRoute="/">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "1rem",
          boxShadow: "0px 3px 1px -1px rgba(0,0,0,0.14)",
          zIndex: 3,
        }}
      >
        <Typography variant="h2">{selectedCity?.name}</Typography>
      </Box>
      {currentWeatherData && forecastData ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "2rem",
          }}
        >
          <WeatherContainer
            weatherData={currentWeatherData}
            title={t("cityPage.weatherContainer.titles.currentWeather")}
          />
          <WeatherContainer
            weatherData={forecastData}
            title={t("cityPage.weatherContainer.titles.forecast")}
          />
          <WeatherDataChart
            weatherData={[currentWeatherData, ...forecastData]}
          />
          <Button
            color="error"
            variant="contained"
            sx={{ width: "90%", marginTop: "1.5rem" }}
            startIcon={<DeleteIcon />}
            onClick={() => {
              if (selectedCity) {
                dispatch(citiesSlice.actions.removeCity(selectedCity.id));
                router.push("/");
                toast.success(t("cityPage.toastMessages.successRemove"));
              }
            }}
          >
            {t("cityPage.buttons.remove")}
          </Button>{" "}
        </Box>
      ) : (
        <CircularProgress />
      )}
    </PageContainer>
  );
};

export default CityPage;
