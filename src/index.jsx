import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UploadImage from "./Components/UploadImage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <UploadImage />
  </React.StrictMode>,
);
