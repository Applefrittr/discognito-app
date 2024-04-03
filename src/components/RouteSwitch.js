import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./Landing";
import App from "./App";

function RouteSwitch() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/client" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
}

export default RouteSwitch;
