import CityRowContainer from "@/components/common-elements/city-row-container";
import { useAppSelector } from "@/utils/redux/hooks/use-app-selector";
import { Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import uriEncoder from "@/utils/uri-encoder";

const CityList = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const cities = useAppSelector((state) => state.cities);

  return (
    <Paper
      sx={{
        width: "90%",
        maxHeight: "50%",
        marginTop: "1.5rem",
        padding: "1rem .8rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "scroll",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: ".5rem" }}>
        {t("homePage.cityList.title")}
      </Typography>
      {cities.length ? (
        cities.map((city) => {
          return (
            <CityRowContainer
              onClick={async (city) => {
                router.push(
                  `/${uriEncoder.encode(city.name)}?lon=${city.longitude}&lat=${
                    city.latitude
                  }`
                );
              }}
              key={city.id}
              city={city}
              icon={<ArrowForwardIosIcon />}
              variant="collapsed"
            />
          );
        })
      ) : (
        <Typography variant="subtitle1">
          {t("homePage.cityList.subtitles.element1")}
        </Typography>
      )}
    </Paper>
  );
};

export default CityList;
