import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Button, Col, Modal, Row, Table, ButtonGroup} from 'react-bootstrap';

import { EliminarUsuario, FormularioUsuario, handleEdit, ObtenerUsuarios, SuspenderUsuario, valoresIniciales  } from './UsuariosService';
import { Espera } from '@oxtron/componentes/base/Espera';
import { Container } from 'rsuite';
import { useFormik } from 'formik';

const Usuarios = () => {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        ObtenerUsuarios(false).then((respuesta:any) => {
            setUsuarios(respuesta);
        })
    }, [])

    const formik = useFormik({
        initialValues: valoresIniciales,
        
        onSubmit: (values) =>{
            FormularioUsuario(values, edit) 
        },
    })

    function editar(row){
        setEdit(true);
    
        handleEdit(row.IdUsuario);
        formik.initialValues = valoresIniciales;
        handleShow()
    }

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
                        <Table className='mb-3' responsive striped bordered hover>
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
                                        <td><img className='rounded-circle' src={"https://oxtron-pub-files.s3.amazonaws.com/no-foto.jpg"} alt="image" width={50} height={50}></img></td>
                                        <td>{item.NombreCompleto}</td>
                                        <td>{item.Correo}</td>
                                        <td>{item.Status}</td>
                                        <td>
                                            <ButtonGroup className='mb-3'>
                                                <Button variant='outline-info' onClick={(e) => editar(item)} >Editar</Button>
                                                <Button variant='outline-warning' onClick={() => SuspenderUsuario(item.IdUsuario)} >Suspender</Button>
                                                <Button variant='outline-danger' onClick={() => EliminarUsuario(item.IdUsuario)} >Eliminar</Button>
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
                        <Modal.Title onClick={() => setEdit(false)}>Nuevo usuario</Modal.Title>
                        </Modal.Header>
                            <form onSubmit={formik.handleSubmit}>
                                <Modal.Body>
                                    <Container>
                                    <Row>
                                        <Col md={6}>
                                            <label htmlFor='foto'>Foto:</label>
                                            <input className='form-control' id='foto' type="file" onChange={formik.handleChange} value={formik.values.foto}></input>
                                            <img className='rounded-circle' src={"https://oxtron-pub-files.s3.amazonaws.com/no-foto.jpg"} alt="image" width={200} height={200}></img>
                                        </Col>
                                        <Col md={6}>
                                        <label htmlFor='nombre'>Nombre:</label>
                                        <input className='form-control' name="nombre" id='nombre' type="text" onChange={formik.handleChange} value={formik.values.nombre}/>
                                        <label htmlFor='apellidoPaterno'>Apellido paterno:</label>
                                        <input className='form-control' id='apellidoPaterno' type="text" onChange={formik.handleChange} value={formik.values.apellidoPaterno}/>
                                        <label htmlFor='apellidoMaterno'>Apellido materno:</label>
                                        <input className='form-control' id='apellidoMaterno' type="text" onChange={formik.handleChange} value={formik.values.apellidoMaterno}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <label htmlFor='correo'>Correo electrónico:</label>
                                        <input className='form-control' id='correo' type="email" onChange={formik.handleChange} value={formik.values.correo}/>
                                        </Col>
                                        <Col>
                                        <label htmlFor='telefono'>Teléfono:</label>
                                        <input className='form-control' id='telefono' type="phone" onChange={formik.handleChange} value={formik.values.telefono}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <label htmlFor='calle'>Calle:</label>
                                        <input className='form-control' id='calle' type="text" onChange={formik.handleChange} value={formik.values.calle}/>
                                        </Col>
                                        <Col md={3}>
                                        <label htmlFor='noExterior'>No. Exterior:</label>
                                        <input className='form-control' id='noExterior' type="text" onChange={formik.handleChange} value={formik.values.noExterior}/>
                                        </Col>
                                        <Col md={3}>
                                        <label htmlFor='noInterior'>No. Interior:</label>
                                        <input className='form-control' id='noInterior' type="text" onChange={formik.handleChange} value={formik.values.noInterior}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={5}>
                                        <label htmlFor='colonia'>Colonia:</label>
                                        <input className='form-control' id='colonia' type="text" onChange={formik.handleChange} value={formik.values.colonia}/>
                                        </Col>
                                        <Col md={2}>
                                        <label htmlFor='codigoPostal'>Código postal:</label>
                                        <input className='form-control' id='codigoPostal' type="text" onChange={formik.handleChange} value={formik.values.codigoPostal}/>
                                        </Col>
                                        <Col md={5}>
                                        <label htmlFor='municipio'>Municipio:</label>
                                        <input className='form-control' id='municipio' type="text" onChange={formik.handleChange} value={formik.values.municipio}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                        <label htmlFor='estado'>Estado:</label>
                                        <input className='form-control' id='estado' type="text" onChange={formik.handleChange} value={formik.values.estado}/>
                                        </Col>
                                        <Col >
                                        <label htmlFor='pais'>País:</label>
                                        <input className='form-control' id='pais' type="text" onChange={formik.handleChange} value={formik.values.pais}/>
                                        </Col>
                                    </Row>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="danger"  onClick={handleClose}>Cancelar</Button>
                                <Button variant="success" type="submit">Guardar</Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </>
            }
        </Base>
    );
};

export default Usuarios;