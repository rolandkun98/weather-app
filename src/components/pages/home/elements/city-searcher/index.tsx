import { Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import { useLazyGetCityByNameQuery } from "@/endpoints/open-weather-map";
import Popup from "@/components/common-elements/popup";
import { usePopup } from "@/hooks/use-popup";
import PopupContent from "../popup-content";
import { CityData } from "@/utils/interfaces/city";
import { citiesSlice } from "@/utils/redux/slices/cities-slice";
import { useDispatch } from "react-redux";
import { PaperBox } from "@/components/common-elements/styled-components/paper-box";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const CitySearcher = (): JSX.Element => {
  const { t } = useTranslation();
  const [trigger] = useLazyGetCityByNameQuery();
  const dispatch = useDispatch();
  const popup = usePopup();

  const validationSchema = Yup.object({
    cityName: Yup.string().required(
      t("homePage.validationSchemaMessages.cityRequired")
    ),
  });

  const formik = useFormik({
    initialValues: {
      cityName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ cityName }, { resetForm }) => {
      const { data } = await trigger({
        cityName,
        limit: 10,
      });

      const select = (city: CityData): void => {
        resetForm();
        popup.close();
        dispatch(citiesSlice.actions.addNewCity(city));
      };

      popup.show(
        t("homePage.popup.title"),
        <PopupContent cities={data ? data : []} select={select} />
      );
    },
  });

  return (
    <PaperBox
      sx={{
        padding: "1rem 0",
      }}
    >
      <Typography variant="subtitle1">
        {t("homePage.subtitles.element1")}
      </Typography>
      <Typography variant="subtitle2">
        {t("homePage.subtitles.element2")}
      </Typography>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          label={t("homePage.labels.city")}
          id="cityName"
          value={formik.values.cityName}
          onChange={formik.handleChange}
          error={formik.touched.cityName && Boolean(formik.errors.cityName)}
          helperText={formik.touched.cityName && formik.errors.cityName}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "1rem" }}
          disabled={!formik.values.cityName}
        >
          {t("homePage.buttons.add")}
        </Button>
      </Form>
      {popup.open && (
        <Popup title={popup.title} close={popup.close}>
          {popup.content}
        </Popup>
      )}
    </PaperBox>
  );
};

export default CitySearcher;
