import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import Router from "./Router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8000";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <ToastContainer autoClose={1000} />
      <Router />
    </React.StrictMode>
  </ChakraProvider>,
);
