import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import RouteSwitch from "./components/RouteSwitch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <RouteSwitch />
    </HashRouter>
  </React.StrictMode>
);
