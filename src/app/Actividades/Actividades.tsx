import React, { useEffect, useRef, useState } from 'react';
import './Actividades.scss';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Button, Col, Modal, Row, Table, ButtonGroup, Card, Tabs, Tab, ListGroup, CardGroup} from 'react-bootstrap';

import { Espera } from '@oxtron/componentes/base/Espera';
import { DateRangePicker, Pagination, SelectPicker } from 'rsuite';
import { ObtenerActividadesCliente, ObtenerClientes } from './ActividadesService';
import { Indicador3 } from './Indicadores/Indicador3';
import {useIntl} from 'react-intl';


const Actividades = () => {
    const [clientes, setClientes] = useState([]);
    const [IdCliente, setIdCliente] = useState();
    const [Actividad, setActividad] = useState({
        Accion: "",
        Detalles: "",
        Fecha: "",
        IdActividad: "",
        IdObjeto: "",
        Modulo: "",
        Tabla: "",
        Usuario: ""            
    });
    const [accion, setAccion] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [limitePaginas, setLimitePaginas] = useState(1);
    const [total, setTotal] = useState(1);
    const [fechas, setFechas] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [mostrarActividades, setMostrarActividades] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [mostrarPaginacion, setMostrarPaginacion] = useState(true);
    const intl = useIntl();

    const obtenerClientes = ((valor: boolean) => {
        ObtenerClientes(valor).then((respuesta:any) => {
            const datos = respuesta.map(
                cliente => ({label: cliente.NombreCompleto, value: cliente.IdCliente})
            );
            setClientes(datos);
        })
    })

    const obtenerActividadesCliente = ((IdCliente:string, fechas:any) => {
        if(IdCliente === null || fechas === null){
            setActividades([]);
            setMostrarActividades([]);
            setMostrarPaginacion(true);
        }else{
            ObtenerActividadesCliente(IdCliente, 1, 30, "",fechas[0], fechas[1], true).then((respuesta:any) => {
                setActividades(respuesta.ACTIVIDADES);
                setMostrarActividades(respuesta.ACTIVIDADES);
                setLimitePaginas(respuesta.TOTAL_PAGINAS);
                setTotal(respuesta.TOTAL_REGISTROS)
                setMostrarPaginacion(false);
                console.log(respuesta);
            })
        }
    })

    const filtrarActividades = ((metodo:string, pagina:number) =>{
        setActivePage(pagina);
        ObtenerActividadesCliente(IdCliente, pagina, 30, metodo,fechas[0], fechas[1], false).then((respuesta:any) => {
            setMostrarActividades(respuesta.ACTIVIDADES);
            setLimitePaginas(respuesta.TOTAL_PAGINAS);
            setMostrar(false);
        })
    })

    useEffect(() => {
        obtenerClientes(true);
    }, []);

    return (
        <Base titulo={Traducir("actividades.titulo")}>
            {
                clientes === null &&
                <Espera/>
            }
            {
                clientes !== null &&
                <>
                    <Row>
                        <Col align="left">
                            <span>{Traducir("clientes.titulo")} </span>
                            <SelectPicker data={clientes} style={{ width: 300, display: "inline-block" }} value={this} onChange={(e) =>{setIdCliente(e); obtenerActividadesCliente(e, fechas);}} />
                        </Col>
                        <Col align="right">
                            <span>{Traducir("buscar.periodoTiempo")} </span>
                            <DateRangePicker oneTap showOneCalendar isoWeek hoverRange="week" onChange={(e) =>{setFechas(e); obtenerActividadesCliente(IdCliente, e);}} placement="bottomEnd"  style={{display: "inline-block"}}></DateRangePicker>
                        </Col>
                    </Row>
                    <br></br>
                    <Row className='align-middle text-center' >
                        <Col className='mb-3'>
                            <button onClick={() =>{setAccion("OBTENER"); filtrarActividades("OBTENER", 1)}} style={{width: "100%"}} type='button' className='btn btn-block'>
                                <Indicador3 title={intl.formatMessage({id: "boton.obtener"})}></Indicador3>
                            </button>
                        </Col>
                        <Col>
                            <button onClick={() =>{setAccion("ALTA"); filtrarActividades("ALTA", 1)} } style={{width: "100%"}} type='button' className='btn btn-block'>
                                <Indicador3 title={intl.formatMessage({id: "boton.alta"})}></Indicador3>
                            </button>
                        </Col>
                        <Col>
                            <button onClick={() =>{setAccion("MODIFICAR"); filtrarActividades("MODIFICAR", 1)}} style={{width: "100%"}} type='button' className='btn btn-block'>
                                <Indicador3 title={intl.formatMessage({id: "boton.modificar"})}></Indicador3>
                            </button>
                        </Col>
                        <Col>
                            <button onClick={() =>{setAccion("ELIMINAR"); filtrarActividades("ELIMINAR", 1)}} style={{width: "100%"}} type='button' className='btn btn-block'>
                                <Indicador3 title={intl.formatMessage({id: "boton.eliminar"})} ></Indicador3>
                            </button>
                        </Col>
                    </Row>
                    <Row> 
                        {
                            actividades === null && <Espera/>
                        }
                        {  
                            actividades !== null &&
                            <>
                            {
                                mostrarActividades.map((item) => (
                                    <button key={item.IdActividad} type="button" className="btn bg-transparent" onClick={() => {setActividad(item); setMostrar(true)}}> 
                                        <Card >
                                            <Card.Body className=''>
                                                    <Row className='align-middle text-center'>
                                                        <Col className='align-self-center'><strong>{item.Accion}</strong>
                                                        </Col >
                                                        <Col className='align-self-center'><strong>{item.Usuario}</strong>
                                                        </Col>
                                                        <Col ><textarea readOnly disabled style={{resize: "none", overflow: "hidden", background: "none", border: "none"}} value={item.Detalles}></textarea>
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                        <Col className='align-self-center' >
                                                        <span>{item.Modulo}</span><br></br>
                                                        <span>{new Date(item.Fecha).toLocaleString("es-MX", {hour12: true})}</span>
                                                        </Col>
                                                    </Row>
                                            </Card.Body>
                                        </Card>
                                    </button>
                                ))
                            }
                            </>
                        }
                    </Row>
                    <Row hidden={mostrarPaginacion}>
                        <Col>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Pagination 
                                prev
                                last
                                next
                                first
                                size="lg"
                                limit={30}
                                total = {total}
                                maxButtons={limitePaginas}
                                activePage={activePage}
                                onChangePage = {(e) =>{setActivePage(activePage); filtrarActividades(accion, e); }}
                            />
                            </div>
                        </Col>
                    </Row>


                    <Modal size="lg" show={mostrar} onHide={() => setMostrar(false)}>
                        <Modal.Header closeButton>
                        <Modal.Title>{Traducir("modal.titulo.detallesActividad")}</Modal.Title>
                        </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.idActividad")}:</strong> <br></br> {Actividad.IdActividad}</label></Row><br></br>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.accion")}:</strong> <br></br> {Actividad.Accion}</label></Row><br></br>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.usuario")}:</strong> <br></br> {Actividad.Usuario}</label></Row><br></br>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.fecha")}:</strong> <br></br>{new Date(Actividad.Fecha).toLocaleString("es-MX", {hour12: true})}</label></Row><br></br>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.idObjeto")}:</strong> <br></br> {Actividad.IdObjeto}</label></Row><br></br>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.modulo")}:</strong> <br></br> {Actividad.Modulo}</label></Row><br></br>
                                            <Row><label htmlFor=''><strong>{Traducir("modal.titulo.tabla")}: </strong> <br></br> {Actividad.Tabla}</label></Row><br></br>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <textarea readOnly style={{width: "100%",height: "500px", resize: "none"}} value={JSON.stringify(Actividad.Detalles)} ></textarea>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                    </Modal>
                </>
            } 
        </Base>
    );
};

export default Actividades;