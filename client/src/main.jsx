import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./Redux/Store/index.js";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

axios.defaults.baseURL = import.meta.env.VITE_APP_API || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);
