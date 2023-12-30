import PageContainer from "@/components/common-elements/page-container";
import CitySearcher from "./elements/city-searcher";
import CityList from "./elements/city-list";

const HomePage = (): JSX.Element => {
  return (
    <PageContainer>
      <CitySearcher />
      <CityList />
    </PageContainer>
  );
};

export default HomePage;
