import { createBrowserRouter } from "react-router-dom";

import App from "@/App"; // Wrapper layout with Navbar + Footer
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Index,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Pricing,
        path: "pricing",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: NotFound,
    path: "*", // catch-all
  },
]);
