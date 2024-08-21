import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SnackBarProvider } from "./contexts/SnackBarProvider.tsx";
import "@/assets/styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
  </StrictMode>
);
