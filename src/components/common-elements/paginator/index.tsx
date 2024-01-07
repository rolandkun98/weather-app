import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PaginatorDirections } from "@/utils/enums/paginator-directions";

interface PaginatorProps {
  text: string;
  lastItemIndex: number;
  selectedItemIndex: number;
  setSelectedItem: (index: number) => void;
}

const Paginator = ({
  text,
  lastItemIndex,
  selectedItemIndex,
  setSelectedItem,
}: PaginatorProps): JSX.Element => {
  const setDisplayedItem = (direction: PaginatorDirections): void => {
    if (direction === PaginatorDirections.BACK) {
      if (selectedItemIndex === 0) {
        setSelectedItem(lastItemIndex);
      } else {
        const newIndex = selectedItemIndex - 1;
        setSelectedItem(newIndex);
      }
    } else {
      if (selectedItemIndex === lastItemIndex) {
        setSelectedItem(0);
      } else {
        const newIndex = selectedItemIndex + 1;
        setSelectedItem(newIndex);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton onClick={() => setDisplayedItem(PaginatorDirections.BACK)}>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="subtitle2">{text}</Typography>
      <IconButton onClick={() => setDisplayedItem(PaginatorDirections.NEXT)}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Paginator;
