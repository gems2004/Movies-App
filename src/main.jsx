import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { extendedApiSlice } from "./features/movies/moviesSlice.js";
import { BrowserRouter } from "react-router-dom";

store.dispatch(extendedApiSlice.endpoints.discoverMovies.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
