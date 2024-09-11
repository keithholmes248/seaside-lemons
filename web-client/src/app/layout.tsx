"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./globals.css";
import AppNavbar from "./app-navbar";
import { getAuthenticatedFirebaseAppForUser } from "@/firebase/server-firebase";
import { PageLoaderContext } from "./page-loader.context";
import React from "react";
import CircularProgressWithText from "./CircularProgressWithText";
import "../firebase/client-firebase";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPageLoader, setShowPageLoader] = React.useState<boolean>(false);
  const [pageLoaderText, setPageLoaderText] = React.useState<string>();

  function handleShowPageLoader(text?: string): void {
    setPageLoaderText(text);
    setShowPageLoader(true);
  }

  function handleHidePageLoader(): void {
    setShowPageLoader(false);
    setPageLoaderText(undefined);
  }

  const pageLoaderContext: PageLoaderContext = {
    showPageLoader: handleShowPageLoader,
    hidePageLoader: handleHidePageLoader,
  };

  return (
    <html lang="en">
      <body>
        <PageLoaderContext.Provider value={pageLoaderContext}>
          {showPageLoader && <CircularProgressWithText text={pageLoaderText} fullscreen={true} />}
          <AppRouterCacheProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MUIThemeProvider theme={theme}>
                <AppNavbar />
                <main>{children}</main>
              </MUIThemeProvider>
            </LocalizationProvider>
          </AppRouterCacheProvider>
        </PageLoaderContext.Provider>
      </body>
    </html>
  );
}
