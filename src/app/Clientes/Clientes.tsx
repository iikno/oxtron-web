import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Button, Col, Modal, Row, Table, ButtonGroup} from 'react-bootstrap';

import { EliminarCliente, FormularioCliente, handleEdit, ObtenerClientes, SuspenderCliente, valoresIniciales  } from './ClientesService';
import { Espera } from '@oxtron/componentes/base/Espera';
import { Container } from 'rsuite';
import { useFormik } from 'formik';
import { $baseS3, $noFoto } from '@oxtron/configs/Env';

const Clientes = () => {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [img, setImg] = useState($noFoto);

    const handleClose = () => (setShow(false));
    const handleShow = () => setShow(true);

    const fileHandler = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]));
    }

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        ObtenerClientes(false).then((respuesta:any) => {
            setClientes(respuesta);
        })
    }, [])

    const formik = useFormik({
        initialValues: valoresIniciales,
        enableReinitialize: true,
        onSubmit: (values) =>{
            FormularioCliente(values, edit) 
        },
    })

    function editar(row){
        setEdit(true);
        handleEdit(row.IdCliente);
        formik.initialValues = valoresIniciales;
        handleShow();   
    }

    return (
        <Base titulo={Traducir("clientes.titulo")}>
            {
                clientes === null &&
                <Espera/>
            }
            {
                clientes !== null &&
                <>
                    <Row className='mb-3'>
                        <Col align="right">
                            <Button variant="primary" onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                                </svg>  {Traducir("clientes.boton.nuevoCliente")}
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Table  className='mb-3' responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>{Traducir("clientes.titulo.Foto")}</th>
                            <th>{Traducir("clientes.titulo.Nombre")}</th>
                            <th>{Traducir("clientes.titulo.Correo")}</th>
                            <th>{Traducir("clientes.titulo.Status")}</th>
                            <th>{Traducir("opciones.titulo")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map((item) => (
                                    <tr key={item.IdUsuario}>
                                        <td><img className='rounded-circle' src={(item.Foto == null || item.Foto == "noFoto")? $noFoto : $baseS3+item.Foto} alt="image" width={50} height={50}></img></td>
                                        <td>{item.NombreCompleto}</td>
                                        <td>{item.Correo}</td>
                                        <td>{item.Status}</td>
                                        <td>
                                            <ButtonGroup className='mb-3'>
                                                <Button variant='outline-info' onClick={(e) => editar(item)} title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                                    </svg>
                                                </Button>
                                                <Button variant='outline-warning' onClick={() => SuspenderCliente(item.IdUsuario)} title="Suspend">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lock" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z"/>
                                                    </svg>
                                                </Button>
                                                <Button variant='outline-danger' onClick={() => EliminarCliente(item.IdUsuario)} title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        </Table>
                    </Row>

                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{Traducir("clientes.modal.titulo")}</Modal.Title>
                        </Modal.Header>
                            <form onSubmit={formik.handleSubmit}>
                                <Modal.Body>
                                    <Container>
                                    <Row>
                                        <Col md={6}>
                                            <label htmlFor='foto'>{Traducir("modal.titulo.foto")}:</label>
                                            <input className='form-control' id='foto' type="file" onChange={fileHandler} value={formik.values.foto}></input>
                                            <img className='rounded-circle' src={img} alt="image" width={200} height={200}></img>
                                        </Col>
                                        <Col md={6}>
                                        <label htmlFor='nombre'>{Traducir("modal.titulo.nombre")}:</label>
                                        <input className='form-control' name="nombre" id='nombre' type="text" onChange={formik.handleChange} value={formik.values.nombre}/>
                                        <label htmlFor='apellidoPaterno'>{Traducir("modal.titulo.apellidoPaterno")}:</label>
                                        <input className='form-control' id='apellidoPaterno' type="text" onChange={formik.handleChange} value={formik.values.apellidoPaterno}/>
                                        <label htmlFor='apellidoMaterno'>{Traducir("modal.titulo.apellidoMaterno")}:</label>
                                        <input className='form-control' id='apellidoMaterno' type="text" onChange={formik.handleChange} value={formik.values.apellidoMaterno}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor='correo'>{Traducir("modal.titulo.correo")}:</label>
                                        <input className='form-control' id='correo' type="email" onChange={formik.handleChange} value={formik.values.correo}/>
                                        </Col>
                                        <Col>
                                        <label htmlFor='telefono'>{Traducir("modal.titulo.telefono")}:</label>
                                        <input className='form-control' id='telefono' type="phone" onChange={formik.handleChange} value={formik.values.telefono}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <label htmlFor='calle'>{Traducir("modal.titulo.calle")}:</label>
                                        <input className='form-control' id='calle' type="text" onChange={formik.handleChange} value={formik.values.calle}/>
                                        </Col>
                                        <Col md={3}>
                                        <label htmlFor='noExterior'>{Traducir("modal.titulo.noExterior")}:</label>
                                        <input className='form-control' id='noExterior' type="text" onChange={formik.handleChange} value={formik.values.noExterior}/>
                                        </Col>
                                        <Col md={3}>
                                        <label htmlFor='noInterior'>{Traducir("modal.titulo.noInterior")}:</label>
                                        <input className='form-control' id='noInterior' type="text" onChange={formik.handleChange} value={formik.values.noInterior}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={5}>
                                        <label htmlFor='colonia'>{Traducir("modal.titulo.colonia")}:</label>
                                        <input className='form-control' id='colonia' type="text" onChange={formik.handleChange} value={formik.values.colonia}/>
                                        </Col>
                                        <Col md={2}>
                                        <label htmlFor='codigoPostal'>{Traducir("modal.titulo.codigoPostal")}:</label>
                                        <input className='form-control' id='codigoPostal' type="text" onChange={formik.handleChange} value={formik.values.codigoPostal}/>
                                        </Col>
                                        <Col md={5}>
                                        <label htmlFor='municipio'>{Traducir("modal.titulo.municipio")}:</label>
                                        <input className='form-control' id='municipio' type="text" onChange={formik.handleChange} value={formik.values.municipio}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                        <label htmlFor='estado'>{Traducir("modal.titulo.estado")}:</label>
                                        <input className='form-control' id='estado' type="text" onChange={formik.handleChange} value={formik.values.estado}/>
                                        </Col>
                                        <Col >
                                        <label htmlFor='pais'>{Traducir("modal.titulo.pais")}:</label>
                                        <input className='form-control' id='pais' type="text" onChange={formik.handleChange} value={formik.values.pais}/>
                                        </Col>
                                    </Row>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="danger"  onClick={handleClose}>{Traducir("boton.cancelar")}</Button>
                                <Button variant="success" type="submit">{Traducir("boton.guardar")}</Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </>
            }
        </Base>
    );
};

export default Clientes;