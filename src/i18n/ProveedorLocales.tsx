import React, { Fragment } from 'react';
import textos from './textos';
import Rutas from '../rutas/Rutas';
import { BrowserRouter } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import { IntlProvider } from 'react-intl';
import { useRecoilValue } from 'recoil';
import { LocaleAtom } from '../app/atomos/LocaleAtom';

const ProveedorLocales = () => {
    
    const locale = useRecoilValue(LocaleAtom)
    
    return (
    <IntlProvider locale={locale.localeIntl} textComponent={Fragment} messages={textos[locale.localeIntl]}>
        <CustomProvider locale={locale.localeRSuite}>
          <BrowserRouter>
            <Rutas/>
          </BrowserRouter>
        </CustomProvider>
    </IntlProvider>
    );
}

export default ProveedorLocales;