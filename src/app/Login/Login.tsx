import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { SesionAtom } from '@oxtron/atomos/SesionAtom';
import {
    Formik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import { IniciarSesion, validadores, valoresIniciales } from './LoginService';

import Logo from '@oxtron/assets/images/Logo W.png';

const Login = () => {
    const setSesion = useSetRecoilState(SesionAtom);

    return (
        <div className='d-flex vh-100'>
            <Col className='vh-100 d-flex align-items-center justify-content-center'>
                <div>
                    <h2>Welcome</h2>
                    <Formik initialValues={valoresIniciales}
                    onSubmit={(values, actions) => {
                        IniciarSesion(values, setSesion);
                        actions.setSubmitting(false);
                    }}
                    validate={validadores}
                    enableReinitialize={true}>
                        <Form>
                            <fieldset className='mb-3'>
                                <label htmlFor="usuario">Usuario</label>
                                <Field id="usuario" name="usuario" className="form-control" />
                                <ErrorMessage className='text-danger' name="usuario" component="div"/>
                            </fieldset>
                            <fieldset className='mb-3'>
                                <label htmlFor="password">Password</label>
                                <Field id="password" name="password" className="form-control" type="password"/>
                                <ErrorMessage className='text-danger' name="password" component="div"/>
                            </fieldset>
                            <Button type='submit'>Continuar</Button>
                        </Form>
                    </Formik>
                </div>
            </Col>
            <Col id='bg-primary' className='bg-primary vh-100 d-flex align-items-center justify-content-center'>
                <img style={{
                    maxWidth: "50%"
                }} src={Logo}/>
            </Col>
        </div>
    );
};

export default Login;