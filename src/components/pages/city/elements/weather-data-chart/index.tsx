import { PaperBox } from "@/components/common-elements/styled-components/paper-box";
import { theme } from "@/styles/theme";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { AutoSizer } from "react-virtualized";
import { useFormatChartData } from "../../hooks/user-format-chart-data";
import { WeatherData } from "@/utils/interfaces/weather";
import { useState } from "react";
import Paginator from "@/components/common-elements/paginator";
import { DateFormat } from "@/utils/enums/date-format";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface WeatherDataChartProps {
  weatherData: WeatherData[];
}

const WeatherDataChart = ({
  weatherData,
}: WeatherDataChartProps): JSX.Element => {
  const { t } = useTranslation();
  const [selectedWeatherChartDataIndex, setSelectedWeatherChartDataIndex] =
    useState(0);
  const { weatherChartData, chartLabels } = useFormatChartData({ weatherData });

  return (
    <PaperBox sx={{ paddingLeft: ".8rem", paddingBottom: "2rem" }}>
      <Typography variant="h3">{t("cityPage.chartContainer.title")}</Typography>
      <Box sx={{ width: "100%", height: "15rem", paddingRight: ".8rem" }}>
        <Paginator
          text={t(
            `global.weatherElements.${chartLabels[selectedWeatherChartDataIndex]}`
          )}
          lastItemIndex={weatherChartData.length - 1}
          selectedItemIndex={selectedWeatherChartDataIndex}
          setSelectedItem={(index) => setSelectedWeatherChartDataIndex(index)}
        />
        {weatherChartData[selectedWeatherChartDataIndex] &&
          chartLabels[selectedWeatherChartDataIndex] && (
            <AutoSizer style={{ width: "100%", height: "100%" }}>
              {({ height, width }) => (
                <LineChart
                  sx={{
                    ".MuiChartsLegend-series": {
                      display: "none",
                    },
                  }}
                  xAxis={[
                    {
                      data: weatherData.map((item) =>
                        format(item.date, DateFormat.TERTIARY)
                      ),
                      scaleType: "point",
                    },
                  ]}
                  series={[
                    {
                      data: weatherChartData[selectedWeatherChartDataIndex],
                      color: theme.palette.primary.main,
                      label: t(
                        `global.weatherElements.${chartLabels[selectedWeatherChartDataIndex]}`
                      ),
                    },
                  ]}
                  width={width}
                  height={height}
                />
              )}
            </AutoSizer>
          )}
      </Box>
    </PaperBox>
  );
};

export default WeatherDataChart;
