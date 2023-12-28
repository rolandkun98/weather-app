import PageContainer from "@/components/common-elements/page-container";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CitySearcher from "./elements/city-searcher";
import CityList from "./elements/city-list";

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Typography variant="h1">{t("global.title")}</Typography>
      <CitySearcher />
      <CityList />
    </PageContainer>
  );
};

export default HomePage;
