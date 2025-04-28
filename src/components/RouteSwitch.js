import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./Landing";
import App from "./App";

function RouteSwitch() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/client" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
}

export default RouteSwitch;
