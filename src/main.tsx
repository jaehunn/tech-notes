import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { serviceWorker } from "./server/browser";
serviceWorker.start({ onUnhandledRequest: "bypass" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
