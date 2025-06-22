import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TripProvider } from "./context/TripContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // Usa index.css si tienes Tailwind, o App.css si es tu principal

// Renderiza la app con todos los providers necesarios
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TripProvider>
        <App />
      </TripProvider>
    </BrowserRouter>
  </React.StrictMode>
);
