import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthRoutes from "./auth/AuthRoutes";
import ThemeProvider from "./theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
