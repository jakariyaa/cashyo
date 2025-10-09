import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { Theme } from "./providers/theme.provider.tsx";
import { setCredentials } from "./redux/features/auth/userSlice.ts";
import { store } from "./redux/store.ts";
import { router } from "./routes/index.tsx";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

if (user && token) {
  store.dispatch(setCredentials({ user: JSON.parse(user), token }));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Theme defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </Theme>
    </ReduxProvider>
  </React.StrictMode>
);
