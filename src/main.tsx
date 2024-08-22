import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackBarProvider } from "./contexts/SnackBarProvider.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import store, { persistor } from "@/store";

import App from "./App.tsx";

import "@/assets/styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackBarProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SnackBarProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
