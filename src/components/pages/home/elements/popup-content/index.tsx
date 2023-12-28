import { CityData } from "@/utils/interfaces/city";
import { Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CityRowContainer from "@/components/common-elements/city-row-container";

interface PopupContentProps {
  cities: CityData[];
  select: (city: CityData) => void;
}

const PopupContent = ({ cities, select }: PopupContentProps): JSX.Element => {
  return (
    <Box sx={{ height: "100%", padding: ".8rem", overflow: "scroll" }}>
      {cities.map((city) => {
        return (
          <CityRowContainer
            onClick={select}
            key={city.id}
            city={city}
            icon={<AddCircleIcon />}
            variant="expanded"
          />
        );
      })}
    </Box>
  );
};

export default PopupContent;
