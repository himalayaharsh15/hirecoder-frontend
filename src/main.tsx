import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./App/store";
import AuthInitializer from "./components/AuthIntializer/AuthInitializer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 🔥 NEW:
            Restore authentication before rendering
            protected routes. */}
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </Provider>
  </React.StrictMode>,
);
