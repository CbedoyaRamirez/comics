import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import BusquedaComics from "./Screens/Search/BusquedaComics";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <BusquedaComics />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
