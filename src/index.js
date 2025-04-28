import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouteSwitch from "./components/RouteSwitch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={"/discognito-app"}>
      <RouteSwitch />
    </BrowserRouter>
  </React.StrictMode>
);
