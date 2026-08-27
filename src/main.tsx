import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import { store } from "./App/store";
import AuthInitializer from "./components/AuthIntializer/AuthInitializer";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 🔥 NEW:
            Restore authentication before rendering
            protected routes. */}
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthInitializer>
          <App />
        </AuthInitializer>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);
