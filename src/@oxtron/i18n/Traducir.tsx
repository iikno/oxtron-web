import React from 'react';
import { FormattedMessage } from 'react-intl'

const Traducir = (id:string, value={}) => <FormattedMessage id={id} values={{...value}}/>

export default Traducir;