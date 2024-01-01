import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from 'react-toastify';
import { ProSidebarProvider } from "react-pro-sidebar";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.StrictMode>
        <ProSidebarProvider>
            <App />
            <ToastContainer />
        </ProSidebarProvider>
    </React.StrictMode>,
    document.getElementById("root")
);