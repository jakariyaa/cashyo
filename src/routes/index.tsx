import { createBrowserRouter } from "react-router";

import App from "@/App";
import ProtectedRoute from "@/components/ProtectedRoutes";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import AgentDashboard from "@/pages/dashboard/agent/AgentDashboard";
import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
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
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "user",
        element: <UserDashboard />,
      },
      {
        path: "agent",
        element: (
          <ProtectedRoute allowedRoles={["agent", "admin"]}>
            <AgentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: () => <div>Unauthorized Access</div>,
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
