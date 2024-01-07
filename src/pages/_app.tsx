import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import "@/utils/i18n/config";
import store from "@/redux/store/store";
import Initializer from "@/components/services/initializer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Initializer>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Initializer>
    </ReduxProvider>
  );
}
