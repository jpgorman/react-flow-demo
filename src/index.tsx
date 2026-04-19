import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Route } from "./pages";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <Route />
    </App>
  </StrictMode>
);
