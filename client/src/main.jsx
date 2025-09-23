import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ServerProvider } from "./context/ServerContext.jsx";

createRoot(document.getElementById("root")).render(
  <ServerProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ServerProvider>,
);
