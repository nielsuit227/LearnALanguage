import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import Router from "./Router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth, db } from "./firebase.config";

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
