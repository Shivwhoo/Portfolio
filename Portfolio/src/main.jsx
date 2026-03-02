import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
        <Toaster position="top-right" />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);