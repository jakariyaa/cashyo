
import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./tour.css";
import { useTheme } from "@/hooks/useTheme";

const Tour = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const hasTakenTour = localStorage.getItem("hasTakenTour");

    if (!hasTakenTour) {
      const driverObj = driver({
        showProgress: true,
        popoverClass: theme === "dark" ? "dark" : "",
        steps: [
          {
            element: "nav",
            popover: {
              title: "Navigation",
              description: "Use the navigation bar to explore the different sections of the website.",
            },
          },
          {
            element: "#features-preview",
            popover: {
              title: "Features",
              description: "Explore the features of Cashyo. We offer a wide range of services to suit your needs.",
            },
          },
          {
            element: "#login",
            popover: {
              title: "Login/Signup",
              description: "Login or create an account to start using Cashyo.",
            },
          },
          {
            element: "#theme-toggler",
            popover: {
              title: "Theme Toggle",
              description: "Switch between light and dark mode for a comfortable viewing experience.",
            },
          },
          {
            element: "#social-icons",
            popover: {
              title: "Social Media",
              description: "Follow us on our social media channels to stay updated.",
            },
          },
        ],
        onDestroyStarted: () => {
          localStorage.setItem("hasTakenTour", "true");
          driverObj.destroy();
        },
      });

      driverObj.drive();
    }
  }, [theme]);

  return null;
};

export default Tour;
