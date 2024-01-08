import CityRowContainer from "@/components/common-elements/city-row-container";
import { useAppSelector } from "@/redux/hooks/use-app-selector";
import { Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { PaperBox } from "@/components/common-elements/styled-components/paper-box";
import { useBreakpoints } from "@/hooks/use-breakpoints";

const CityList = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const cities = useAppSelector((state) => state.cities);
  const { isAboveMd } = useBreakpoints();

  return (
    <PaperBox
      sx={{
        maxHeight: "50%",
        width: isAboveMd ? "60%" : undefined,
        padding: "1rem .8rem",
        overflow: "scroll",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: ".5rem" }}>
        {t("homePage.cityList.title")}
      </Typography>
      {cities.length ? (
        cities.map((city) => {
          return (
            <CityRowContainer
              onClick={async (city) => {
                router.push(`/city/${city.id}`);
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
    </PaperBox>
  );
};

export default CityList;
