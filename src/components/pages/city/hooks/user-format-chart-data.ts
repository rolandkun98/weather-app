import { WeatherChartDataItemNames } from "@/utils/enums/weather-chart-data-item-names";
import { WeatherData } from "@/utils/interfaces/weather";
import { useEffect, useState } from "react";

interface UseFormatChartDataInput {
  weatherData: WeatherData[];
}

interface UseFormatChartDataOutput {
  weatherChartData: number[][];
  chartLabels: string[];
}

export const useFormatChartData = ({
  weatherData,
}: UseFormatChartDataInput): UseFormatChartDataOutput => {
  const [weatherChartData, setWeatherChartData] = useState<number[][]>([]);
  const [chartLabels, setChartLabes] = useState<string[]>([]);

  useEffect(() => {
    setChartLabes([]);
    const dataSummary: {
      clouds: number[];
      windSpeed: number[];
      humidity: number[];
      temperature: number[];
    } = {
      clouds: [],
      windSpeed: [],
      humidity: [],
      temperature: [],
    };
    const chartData: number[][] = [];

    for (const weatherDataItem of weatherData) {
      Object.entries(weatherDataItem).forEach(([key, value]) => {
        dataSummary[key as WeatherChartDataItemNames].push(value);
      });
    }

    Object.entries(dataSummary).forEach(([key, value]) => {
      chartData.push(value);
      setChartLabes((prevArr) => [
        ...prevArr,
        key as WeatherChartDataItemNames,
      ]);
    });

    setWeatherChartData(chartData);
  }, [weatherData]);

  return {
    weatherChartData,
    chartLabels,
  };
};
