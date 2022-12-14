import React from "react";
import ReactDOM from "react-dom/client";
//import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import { AuthProvider } from "context/auth";
import { SearchProvider } from "context/search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <App />
    </SearchProvider>
  </AuthProvider>
);
