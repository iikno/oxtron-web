import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'rsuite/dist/rsuite.min.css';
import "./index.scss";
import ProveedorLocales from './i18n/ProveedorLocales';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ProveedorLocales/>
    </RecoilRoot>
  </React.StrictMode>
);
