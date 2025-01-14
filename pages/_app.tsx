import { Layout } from "@/components/Layout";
import { IpoProvider } from "@/context/IpoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "@/context/ToastContext";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// NextJS Material Dashboard 2 themes
// import theme from "@assets/theme-dark";
import { StockProvider } from "@/context/StockContext";

export default function App({ Component, pageProps }: AppProps) {
  const componentName = Component.displayName || Component.name;

  if (componentName === "Home") {
    return <Component {...pageProps} />;
  }

  return (
    // <ThemeProvider theme={theme}>
    <>
      <CssBaseline />
      <IpoProvider>
        <ToastProvider>
          <StockProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StockProvider>
        </ToastProvider>
      </IpoProvider>
    </>
    // </ThemeProvider>
  );
}
