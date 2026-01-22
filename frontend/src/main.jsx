import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { PricingProvider } from "./context/Pricingcontext"; // ⭐ ADD THIS IMPORT

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PricingProvider> {/* ⭐ ADD THIS WRAPPER */}
      <App />
    </PricingProvider> {/* ⭐ CLOSE THE WRAPPER */}
  </StrictMode>
);