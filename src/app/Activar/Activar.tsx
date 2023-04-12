import React from 'react';
import { Button } from 'rsuite';
import { Col } from 'react-bootstrap';
import {
    Formik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import { ActivarUsuarioCliente, convertirTimestampToDate, decodificar, validadores, valoresIniciales } from './ActivarService';

import Logo from '@oxtron/assets/images/Logo W.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import moment from 'moment';

const Activar = () => {
    // const setSesion = useSetRecoilState(SesionAtom);
    const params = useParams();
    const [usuario, setUsuario] = React.useState("");
    const [id, setId] = React.useState("");
    const [esUsuario, setEsUsuario] = React.useState(false);
    const [fecha, setFecha] = React.useState<Date>();
    const [error, setError] = React.useState(false);
    const [cargando, setCargando] = React.useState(false);

    useEffect(() => {
        try {
            setUsuario(decodificar(params["usuario"]));
            setId(decodificar(params["id"]));
            setEsUsuario(decodificar(params["esUsuario"]) === "1");
            setFecha(convertirTimestampToDate(params["fecha"]));
        } catch (error) {
            setError(true)
        }
    }, [params])

    return (
        <div className='row d-flex vh-100 vw-100 m-0'>
            <Col xs={12} md={6} className='vh-100 px-4 d-flex align-items-center justify-content-center'>
                {
                    error &&
                    <h2>{Traducir('activar.error')}</h2>
                }
                {
                    !error && fecha && moment(fecha) >= moment(new Date()).add(-24, 'hours')
                    ?
                    <div>
                        <h2>{Traducir('activar.titulo')}</h2>
                        <p>{Traducir('activar.subtitulo')}</p>
                        {/* <h5>{mostrarToken()}</h5> */}
                        <Formik initialValues={valoresIniciales}
                            onSubmit={(values) => {
                                setCargando(true);
                                ActivarUsuarioCliente(values, usuario, id, esUsuario).then((res) => {
                                    setCargando(false);
                                })
                            }}
                            validate={validadores}
                            enableReinitialize={true}
                        >
                            <Form>
                                <fieldset className='mb-3'>
                                    <label htmlFor="password1">{Traducir('activar.password')}</label>
                                    <Field id="password1" name="password1" className="form-control" type="password"/>
                                    <ErrorMessage className='text-danger' name="password1" component="div"/>
                                </fieldset>
                                <fieldset className='mb-3'>
                                    <label htmlFor="password2">{Traducir('activar.password.repeat')}</label>
                                    <Field id="password2" name="password2" className="form-control" type="password"/>
                                    <ErrorMessage className='text-danger' name="password2" component="div"/>
                                </fieldset>
                                <Button type='submit' appearance='primary' className='btn-primary-rs' loading={cargando}>{Traducir('activar.boton')}</Button>
                            </Form>
                        </Formik>
                    </div>
                    :
                    <h2>{Traducir('activar.expired')}</h2>
                }
            </Col>
            <Col xs={12} md={6} id='bg-primary' className='bg-primary vh-100 d-flex align-items-center justify-content-center'>
                <img style={{
                    maxWidth: "50%"
                }} src={Logo} alt='oxtron'/>
            </Col>
        </div>
    );
};

export default Activar;