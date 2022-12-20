import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { SelectPicker, DateRangePicker, Stack, Modal, IconButton, ButtonToolbar } from 'rsuite';
import { DateRange } from "rsuite/DateRangePicker";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { GrAddCircle, GrPrint } from "react-icons/gr";

import { ObtenerClientes, ObtenerPlanificador, ObtenerFechasSemanaActual, FormatearColumnasPorSemana } from './PlanificadorService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import { PlanificadorInterface } from '@oxtron/Interfaces/PlanificadorInterface.d';

import './Planificador.scss';
import Medidor from '@oxtron/componentes/general/Medidor';
import ModalNuevaPlanificador from './componentes/ModalNuevaPlanificador';

const Planificador = () => {
    const sesion = ObtenerSesion();
    const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
    const [fechaModalNuevo, setFechaModalNuevo] = useState("");
    const [fechaEnviarModalNuevo, setFechaEnviarModalNuevo] = useState("");
    const [clientes, setClientes] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [planificador, setPlanificador] = useState<PlanificadorInterface[]>(null);
    const [cliente, setCliente] = useState(sesion.IdUsuario);
    const [actualizar, setActualizar] = useState(false);
    const [fechas, setFechas] = useState<DateRange>(ObtenerFechasSemanaActual());

    useEffect(() => {
        ObtenerClientes(false).then((respuesta:any) => {
            respuesta.unshift({NombreCompleto: "TODOS", value:"TODOS"});
            setClientes(respuesta.map(
                (item:any) => ({ label: item.NombreCompleto, value: item.IdCliente })
            ));
        });    
    }, [])

    // useEffect(() => {
    //     if(!actualizar)
    //         return        
    //     ObtenerPlanificador("TODOS", fechas).then((respuesta: any) => {
    //         setColumnas(FormatearColumnasPorSemana(respuesta, fechas[0]));
    //         // console.log(columnas)
    //         setPlanificador(respuesta)            
    //     })
    // }, [actualizar])
    useEffect(() => {
        console.log("Col",columnas)
    },[columnas])

    useEffect(() => {    
        ObtenerPlanificador("TODOS", fechas).then((respuesta: any) => {
            const colum = FormatearColumnasPorSemana(respuesta, fechas[0]);
            setColumnas(colum);
            console.log("HOla", colum)
            setPlanificador(respuesta)            
        })
    }, [fechas])

    const moverDeFecha = (result) => {
        if(!result.destination)
            return
        console.log(result)
        console.log(result.draggableId)
        console.log(result.destination.droppableId.substr(result.destination.droppableId.indexOf('*-*') + 3))
        console.log(result.source.droppableId.substr(result.destination.droppableId.indexOf('*-*') + 3))
        const id = result.draggableId;
        const fechaDestino = result.destination.droppableId.substr(result.destination.droppableId.indexOf('*-*') + 3)
        const fechaOrigen = result.source.droppableId.substr(result.destination.droppableId.indexOf('*-*') + 3);
        if(fechaOrigen === fechaDestino)
            return
        const nuevaColumnas = columnas.filter(item => true)
        const origen = nuevaColumnas.find(item => item.FechaCompleta === fechaOrigen)
        const destino = nuevaColumnas.find(item => item.FechaCompleta === fechaDestino)
        console.log(origen)
        console.log(destino)
        origen.Elementos = origen.Elementos.filter(item => item.IdPlanificador !== id)
        destino.Elementos.push(planificador.find(item => item.IdPlanificador === id))
        setColumnas(nuevaColumnas)
    }

    const nuevaRecetaEnPlanificador = (fecha:string, fechaEnviar: string) => {
        setFechaModalNuevo(fecha);
        setFechaEnviarModalNuevo(fechaEnviar);
        setMostrarModalNuevo(true)
    }

    return (
        <Base titulo={Traducir("planificador.titulo")}>
            <Row className='mb-3'>
                {clientes &&
                    <Col>
                        <Stack spacing={6} alignItems={"center"}>
                            {Traducir('planificador.cliente')}
                            <SelectPicker cleanable={false} data={clientes} onChange={setCliente}/>
                        </Stack>
                    </Col>
                }
                {/* {
                    sesion.TipoPersona === "Administrador" &&
                    <Col>
                        <Stack spacing={6} alignItems={"center"}>
                            {Traducir('planificador.cliente')}
                            <SelectPicker cleanable={false} data={clientes} onChange={setCliente}/>
                        </Stack>
                    </Col>
                } */}
                <Col>
                    <Stack spacing={6} alignItems={"center"} justifyContent={"flex-end"}>
                        {Traducir('planificador.periodoTiempo')}
                        <DateRangePicker isoWeek placement="bottomEnd"
                                        cleanable={false}
                                        oneTap showOneCalendar
                                        hoverRange="week" 
                                        ranges={[]}
                                        value={fechas} 
                                        onChange={setFechas} 
                                        format={"dd/MM/yyyy"}/>
                    </Stack>
                </Col>
            </Row>
            {
                planificador === null &&
                <Espera/>
            }
            {planificador !== null &&
                <div>
                    <DragDropContext onDragEnd={moverDeFecha}>
                        <Row className="main-row">
                            {columnas.length > 0 && Object.entries(columnas).map(([id, columna]) => (
                                <Col key={id} className="column-board" xs={12} sm={3}>
                                    <Row className='column-board-header'>
                                        <Col>
                                            <Row>
                                                <Col xs={12}>
                                                    <b>{columna.Nombre}</b>
                                                </Col>
                                                <Col xs={12}>
                                                    <small>{columna.Fecha}</small>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col align={"right"}>
                                            <ButtonToolbar>
                                                <IconButton icon={<GrPrint size="18px"/>} circle appearance="subtle" size="sm"/>
                                                <IconButton icon={<GrAddCircle size="18px"/>} circle appearance="subtle" size="sm" onClick={() => nuevaRecetaEnPlanificador(columna.FechaCompletaMostrar, columna.FechaCompleta)}/>
                                            </ButtonToolbar>
                                        </Col>
                                    </Row>
                                    <Droppable id={id + '*-*' + columna.FechaCompleta} droppableId={id + '*-*' + columna.FechaCompleta} >
                                        {(provided, snapshot) => (
                                            <div className={`dropping-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`} 
                                                {...provided.droppableProps} 
                                                ref={provided.innerRef}>
                                                    {columna.Elementos.map((itemPlan, index) => (
                                                        <Draggable key={itemPlan.IdPlanificador} draggableId={itemPlan.IdPlanificador} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='card-planificador'>
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <Row>
                                                                                <Col xs={12}><b>{itemPlan.Nombre}</b></Col>
                                                                                <Col xs={12}><small>{itemPlan.Unidades}</small></Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col xs={6} className='text-center'>
                                                                            <Medidor id={itemPlan.IdPlanificador} co2={itemPlan.EmisionCarbono}/>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}                                                
                                            </div>
                                        )}
                                    </Droppable>
                                </Col>                                
                            ))}
                        </Row>
                    </DragDropContext>
                </div>
            }

            <ModalNuevaPlanificador 
                mostrar={mostrarModalNuevo} 
                setMostrar={setMostrarModalNuevo}
                fecha={fechaModalNuevo}
                fechaEnviar={fechaEnviarModalNuevo}
                setActualizar={setActualizar}/>
        </Base>
    );
};

export default Planificador;