import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";
import 'rsuite/dist/rsuite.min.css';
import "./index.scss";
import ProveedorLocales from './@oxtron/i18n/ProveedorLocales';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus/>
      <ProveedorLocales/>
    </RecoilRoot>
  </React.StrictMode>
);
