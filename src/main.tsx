import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/index.tsx";
//import { ThemeProvider } from "./providers/theme.provider.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Provider as ReduxProvider } from "react-redux";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme"> */}
        <RouterProvider router={router} />
        <Sonner richColors />
        {/* </ThemeProvider> */}
      </TooltipProvider>
    </ReduxProvider>
  </React.StrictMode>
);
