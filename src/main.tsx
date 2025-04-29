import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./routes/AppRoutes.tsx";
import axiosClient from "./api/axiosClient.ts";
import { setupAxios } from "./helpers/AuthHelpers.ts";
import { AuthProvider, AuthInit } from "./context/AuthContext.tsx";

setupAxios(axiosClient);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AuthInit>
        <App />
      </AuthInit>
    </AuthProvider>
  </React.StrictMode>
);
