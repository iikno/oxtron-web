import React from 'react';
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import Home from './pages/Home';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next';
import global_en from './translations/en/global.json'
import global_es from './translations/es/global.json'
import Login from './pages/Login';
import AuthLoading from './pages/AuthLoading'
i18next.init({
  interpolation:{ escapeValue: false },
  lng: "en",
  resources:{
    en:{
      global: global_en
    },
    es:{
      global: global_es
    }
  }
})

const App =(
  <I18nextProvider i18n={i18next}>
    <BrowserRouter>
      <Routes>
        <Route exact path= "/home" element={<Home/>}/>
        <Route exact path= "/login" element={<Login/>}/>
        <Route exact path= "/loading" element={<AuthLoading/>}/>
        <Route path= "/" element={<Navigate to="/loading"/>}/>
      </Routes>
    </BrowserRouter>
  </I18nextProvider>
)

const rootElement = document.getElementById('root')
const root = createRoot(rootElement);
root.render(
    App
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
