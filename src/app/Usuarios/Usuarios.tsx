import React, { useEffect, useRef, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import {classNames, ValidarImg, ValidarStatus} from '@iikno/clases/Utils';
import { Button, Col, Modal, Row, Table, ButtonGroup, Card, Tabs, Tab} from 'react-bootstrap';

import { buscarEnUsuarios, EliminarUsuario, FormularioUsuario, handleEdit, LimpiarCampos, ObtenerUsuarios, SuspenderUsuario, validarCampos, valoresIniciales  } from './UsuariosService';
import { Espera } from '@oxtron/componentes/base/Espera';
import { Container } from 'rsuite';
import { useFormik } from 'formik';
import { $noFoto } from '@oxtron/configs/Env';
import {useIntl} from 'react-intl';

const Usuarios = () => {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [img, setImg] = useState($noFoto);
    const [imgBuff, setImgBuff] = useState();
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosMostrar, setUsuariosMostrar] = useState([]);
    const inputFile = useRef(null);

    const intl = useIntl();

    const fileHandler = (e) => {
        try{
            setImg(URL.createObjectURL(e.target.files[0]));
            setImgBuff(e.target.files[0]);
        }catch(e){
        }        
    }  

    function obtenerUsuarios(valor: boolean){
        ObtenerUsuarios(valor).then((respuesta:any) => {
            setShow(false);
            setUsuarios(respuesta);
            setUsuariosMostrar(respuesta);
        })
    }

    useEffect(() => {
        obtenerUsuarios(true);
    }, [])


    const formik = useFormik({
        initialValues: valoresIniciales,
        enableReinitialize: true,
        onSubmit: (values) =>{
                FormularioUsuario(values, edit, imgBuff, usuarios, intl).then((valido) =>{
                    if(valido)
                        obtenerUsuarios(false);
                });
            
        },
    })

    function editar(row){
        setEdit(true);
        handleEdit(row.IdUsuario, intl).then(() => {
            formik.initialValues = valoresIniciales;
            setImg(ValidarImg(formik.initialValues.foto));
            setShow(true);   
        })
    }
    
    const limpiarModal = () => {
        setShow(false); 
        LimpiarCampos(); 
        formik.initialValues= valoresIniciales; 
        setImg($noFoto);
    }
    
    const abrirVentana = () =>{
        inputFile.current.click();
    }
    
    const handleOnKeyUpBuscar = (e: any) => {
        if(e.target.value != "" || e.target.value != undefined){
            setUsuariosMostrar(buscarEnUsuarios(e.target.value, usuarios))
        }else{
            setUsuariosMostrar(usuarios);
        }   
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
                    <Col align="left">
                            <input type="text" 
                                className="form-control" 
                                onChange={handleOnKeyUpBuscar}
                                placeholder={intl.formatMessage({id: "buscar.titulo"})}
                            />                            
                        </Col>
                        <Col align="right">
                            <Button variant="primary" onClick={()=>setShow(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                                </svg>  {Traducir("usuarios.boton.nuevoUsuario")}
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table  className='mb-3' size='sm' responsive  hover>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>{Traducir("usuarios.titulo.Foto")}</th>
                                                <th className='text-center'>{Traducir("usuarios.titulo.Nombre")}</th>
                                                <th className='text-center'>{Traducir("usuarios.titulo.Correo")}</th>
                                                <th className='text-center'>{Traducir("usuarios.titulo.Status")}</th>
                                                <th className='text-center'>{Traducir("opciones.titulo")}</th>
                                            </tr>
                                        </thead>
                                    <tbody>
                                        {
                                            usuariosMostrar.map((item) => (
                                                <tr key={item.IdUsuario} className="align-middle">
                                                    <td className='text-center align-middle'><img className='rounded-circle' src={ValidarImg(item.Foto)} alt="image" width={50} height={50} ></img></td>
                                                    <td>{item.NombreCompleto}</td>
                                                    <td>{item.Correo}</td>
                                                    <td className={classNames("text-center", ValidarStatus(item.Status))}>{item.Status.toLowerCase()}</td>
                                                    <td className="text-center">
                                                            <Button variant='outline-info' onClick={() => editar(item)} title= {intl.formatMessage({id: "opciones.titulo.editar"})}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                                                </svg>
                                                            </Button>
                                                            <Button variant='outline-warning' onClick={() => {SuspenderUsuario(item.IdUsuario, intl).then(()=> obtenerUsuarios(false))}} title={intl.formatMessage({id: "opciones.titulo.suspender"})}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lock" viewBox="0 0 16 16">
                                                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z"/>
                                                                </svg>
                                                            </Button>
                                                            <Button variant='outline-danger' onClick={() => {EliminarUsuario(item.IdUsuario, intl).then(()=>obtenerUsuarios(false)) }} title={intl.formatMessage({id: "opciones.titulo.eliminar"})}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                                </svg>
                                                            </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Modal size="lg" show={show} onHide={limpiarModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>{Traducir("usuarios.modal.titulo")}</Modal.Title>
                        </Modal.Header>
                            <form  onSubmit={formik.handleSubmit}>
                                <Modal.Body>
                                    <Container>
                                    <Row>
                                        <Col md={5} className="text-center align-self-middle">
                                            <input style={{display: 'none'}} className='form-control' ref={inputFile} id='foto' type="file" onChange={fileHandler} ></input>
                                            <button type="button" className="btn bg-transparent" onClick={abrirVentana} >
                                                <img className='rounded-circle' src={img} alt="image" width={250} height={250} onChange={formik.handleChange} ></img>
                                            </button>  
                                        </Col>
                                        <Col md={7}>
                                            <Tabs defaultActiveKey="datos" id="tabs-usuario" className="mb-3" >
                                                <Tab eventKey="datos" title={Traducir("modal.titulo.tab.datosPersonales")}>
                                                        <label htmlFor='nombre'>{Traducir("modal.titulo.nombre")}:</label>
                                                        <input  className='form-control' name="nombre" id='nombre' type="text" onChange={formik.handleChange} value={formik.values.nombre} onBlur={formik.validateOnBlur.valueOf}/>
                                                        <br></br>
                                                        <label htmlFor='apellidoPaterno'>{Traducir("modal.titulo.apellidoPaterno")}:</label>
                                                        <input  className='form-control' id='apellidoPaterno' type="text" onChange={formik.handleChange} value={formik.values.apellidoPaterno}/>
                                                        <br></br>
                                                        <label htmlFor='apellidoMaterno'>{Traducir("modal.titulo.apellidoMaterno")}:</label>
                                                        <input  className='form-control' id='apellidoMaterno' type="text" onChange={formik.handleChange} value={formik.values.apellidoMaterno}/>                                                    
                                                        <br></br>
                                                        <Row>
                                                        <Col>
                                                        <label htmlFor='correo'>{Traducir("modal.titulo.correo")}:</label>
                                                        <input  className='form-control' id='correo' type="email" onChange={formik.handleChange} value={formik.values.correo}/>
                                                        </Col>
                                                        <Col>
                                                        <label htmlFor='telefono'>{Traducir("modal.titulo.telefono")}:</label>
                                                        <input className='form-control' id='telefono' type="phone" onChange={formik.handleChange} value={formik.values.telefono}/>
                                                        </Col>
                                                        </Row>
                                                </Tab>
                                                <Tab eventKey="direccion" title={Traducir("modal.titulo.tab.direccion")}>
                                                    <Row>
                                                        <Col>
                                                        <label htmlFor='calle'>{Traducir("modal.titulo.calle")}:</label>
                                                        <input className='form-control' id='calle' type="text" onChange={formik.handleChange} value={formik.values.calle}/>
                                                        </Col>
                                                    </Row>
                                                    <br></br>
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor='noExterior'>{Traducir("modal.titulo.noExterior")}:</label>
                                                            <input className='form-control' id='noExterior' type="text" onChange={formik.handleChange} value={formik.values.noExterior}/>
                                                        </Col>
                                                        <Col>
                                                        <label htmlFor='noInterior'>{Traducir("modal.titulo.noInterior")}:</label>
                                                        <input className='form-control' id='noInterior' type="text" onChange={formik.handleChange} value={formik.values.noInterior}/>
                                                        </Col>
                                                        <Col >
                                                        <label htmlFor='codigoPostal'>{Traducir("modal.titulo.codigoPostal")}:</label>
                                                        <input className='form-control' id='codigoPostal' type="number" onChange={formik.handleChange} value={formik.values.codigoPostal}/>
                                                        </Col>
                                                        
                                                    </Row>
                                                    <br></br>
                                                    <Row>
                                                        <Col >
                                                            <label htmlFor='colonia'>{Traducir("modal.titulo.colonia")}:</label>
                                                            <input className='form-control' id='colonia' type="text" onChange={formik.handleChange} value={formik.values.colonia}/>
                                                        </Col>
                                                        <Col >
                                                            <label htmlFor='municipio'>{Traducir("modal.titulo.municipio")}:</label>
                                                            <input className='form-control' id='municipio' type="text" onChange={formik.handleChange} value={formik.values.municipio}/>
                                                        </Col>
                                                        
                                                    </Row>
                                                    <br></br>
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
                                                </Tab>
                                            </Tabs>
                                        
                                        </Col>
                                    </Row>
                                    
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="dark"  onClick={limpiarModal}>{Traducir("boton.cancelar")}</Button>
                                <Button variant="primary" type="submit">{Traducir("boton.guardar")}</Button>
                                </Modal.Footer>
                            </form>
                    </Modal>
                </>
            }
        </Base>
    );
};

export default Usuarios;