// File: src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Index.css";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your entire app so useContext(AuthContext) is never undefined */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
