import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { SplashScreen } from "@/components/common/splash-screen";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <SplashScreen key="splash" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      {!loading && (
        <ReactLenis root>
          <CommonLayout>
            <Outlet />
          </CommonLayout>
        </ReactLenis>
      )}
    </>
  );
}

export default App;
