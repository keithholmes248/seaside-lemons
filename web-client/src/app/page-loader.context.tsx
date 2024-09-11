"use client";
import React from "react";

export interface PageLoaderContext {
  hidePageLoader: () => void;
  showPageLoader: (text?: string) => void;
}

export const PageLoaderContext = React.createContext<PageLoaderContext>({
  hidePageLoader: () => {},
  showPageLoader: () => {},
});
