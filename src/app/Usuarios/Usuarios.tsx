import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Button, Col, Dropdown, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';

import { DateRange } from "rsuite/DateRangePicker";

import { AltaUsuario, ObtenerUsuarios, valoresIniciales  } from './UsuariosService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { Container, Grid, Input, InputGroup } from 'rsuite';
import { classNames } from '@iikno/clases/Utils';
import { ErrorMessage, Field, Formik } from 'formik';

const Usuarios = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        ObtenerUsuarios(false).then((respuesta:any) => {
            setUsuarios(respuesta);
        })
    }, [])

    return (
        <Base titulo={Traducir("usuarios.titulo")}>
            {
                usuarios === null &&
                <Espera/>
            }
            {
                usuarios !== null &&
                <>
                    <Row className='mb-3'>
                        <Col align="right">
                            <Button variant="primary" onClick={handleShow}>
                                Nuevo usuario
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>{Traducir("usuarios.titulo.Foto")}</th>
                            <th>{Traducir("usuarios.titulo.Nombre")}</th>
                            <th>{Traducir("usuarios.titulo.Correo")}</th>
                            <th>{Traducir("usuarios.titulo.Status")}</th>
                            <th>{Traducir("Opciones")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((item) => (
                                    <tr key={item.IdUsuario}>
                                        <td><img src={item.Foto}></img></td>
                                        <td>{item.Nombre}</td>
                                        <td>{item.Correo}</td>
                                        <td>{item.Status}</td>
                                        <td>
                                        <Dropdown>
                                            <Dropdown.Toggle>
                                                Dropdown Button
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Eliminar</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </Table>
                    </Row>

                    
                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Nuevo usuario</Modal.Title>
                        </Modal.Header>
                        <Formik initialValues={valoresIniciales} 
                        onSubmit={(values, actions) => {
                            AltaUsuario(values); 
                            actions.setSubmitting(false);}}
                        enableReinitialize={true}>
                            <Form >
                            <Modal.Body>
                                <Container>
                                    
                                        <Row>
                                            <Col md={6}>
                                            <Form.Group as={Col} className="mb-3" controlId='foto'>
                                            <Form.Label>Seleccione una fotografía</Form.Label>
                                            <Form.Control type="file"></Form.Control>    
                                            </Form.Group>
                                            </Col>
                                            <Col md={6}>

                                            <fieldset className='mb-3'>
                                                <label htmlFor="nombre">Nombre:</label>
                                                <Field id="nombre" name="nombre" className="form-control" placeholder="Nombre" />
                                                <ErrorMessage className='text-danger' name="usuario" component="div"/>
                                            </fieldset>
                                            <fieldset className='mb-3'>
                                                <label htmlFor="nombre">Apellido paterno:</label>
                                                <Field id="nombre" name="nombre" className="form-control" placeholder="Nombre" />
                                                <ErrorMessage className='text-danger' name="usuario" component="div"/>
                                            </fieldset>
                                            <fieldset className='mb-3'>
                                                <label htmlFor="nombre">Apellido materno:</label>
                                                <Field id="nombre" name="nombre" className="form-control" placeholder="Nombre" />
                                                <ErrorMessage className='text-danger' name="usuario" component="div"/>
                                            </fieldset>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>Correo:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" as={Col} controlId="apellidoMaterno">
                                            <Form.Label>Teléfono:</Form.Label>
                                            <Form.Control type="phone" placeholder="Numéro telefónico" />
                                            </Form.Group>                                       
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3" controlId="correo">
                                                <Form.Label>Calle:</Form.Label>
                                                <Form.Control type="text" placeholder="Correo eléctronico" />
                                                </Form.Group>
                                            </Col>
                                            <Form.Group className="mb-3" as={Col} controlId="apellidoMaterno">
                                            <Form.Label>No. Interior:</Form.Label>
                                            <Form.Control type="text" placeholder="Numéro telefónico" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>No. Exterior:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Col md={4}>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>Colonia:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>Código postal:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                            </Col>
                                            <Col md={4}>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>Municipio:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>Estado:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" as={Col} controlId="correo">
                                            <Form.Label>País:</Form.Label>
                                            <Form.Control type="text" placeholder="Correo eléctronico" />
                                            </Form.Group>
                                        </Row>
                                            
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" active onClick={handleClose}>Cancelar</Button>
                            <Button variant="success" active type="submit">Guardar</Button>
                            </Modal.Footer>
                            </Form>
                        </Formik>
                    </Modal>
                </>
            }
        </Base>
    );
};

export default Usuarios;