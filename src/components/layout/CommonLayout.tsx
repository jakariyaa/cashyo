import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

import { useLocation } from "react-router";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className={`grow-1 ${!isHome ? "pt-28" : ""}`}>{children}</div>
      <Footer />
    </div>
  );
}
