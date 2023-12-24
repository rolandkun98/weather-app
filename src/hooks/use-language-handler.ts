import { Languages } from "@/utils/enums/languages";
import { useTranslation } from "react-i18next";

interface IUseLanguageHandlerOutput {
  changeLanguage: (currentLanguage: string) => void;
  showOtherLanguage: (currentLanguage: string) => Languages;
}

export const useLanguageHandler = (): IUseLanguageHandlerOutput => {
  const { i18n } = useTranslation();

  const changeLanguage = (currentLanguage: string): void => {
    if (currentLanguage === Languages.HU) {
      i18n.changeLanguage(Languages.EN);
    } else {
      i18n.changeLanguage(Languages.HU);
    }
  };

  const showOtherLanguage = (currentLanguage: string): Languages => {
    if (currentLanguage === Languages.HU) {
      return Languages.EN;
    } else {
      return Languages.HU;
    }
  };

  return {
    changeLanguage,
    showOtherLanguage,
  };
};
