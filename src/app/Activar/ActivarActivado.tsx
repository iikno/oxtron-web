import React from 'react';
import { Button } from 'rsuite';
import { Col } from 'react-bootstrap';
import { RedireccionarLogin } from './ActivarService';

import Logo from '@oxtron/assets/images/Logo W.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Traducir from '@oxtron/i18n/Traducir';

const ActivarActivado = () => {
    const params = useParams();

    useEffect(() => {

    }, [params])

    return (
        <div className='row d-flex vh-100 vw-100 m-0'>
            <Col xs={12} md={6} className='vh-100 px-4 d-flex align-items-center justify-content-center'>
                <div>
                    <h3>{Traducir('activar.exito')}</h3>
                    <Button onClick={RedireccionarLogin} appearance='primary' className='btn-primary-rs'>{Traducir('activar.aceptar')}</Button>
                </div>                
            </Col>
            <Col xs={12} md={6} id='bg-primary' className='bg-primary vh-100 d-flex align-items-center justify-content-center'>
                <img style={{
                    maxWidth: "50%"
                }} src={Logo} alt='oxtron'/>
            </Col>
        </div>
    );
};

export default ActivarActivado;