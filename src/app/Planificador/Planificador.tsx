import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import html2canvas from 'html2canvas';
import { Col, Row } from 'react-bootstrap';
import { SelectPicker, DateRangePicker, Stack, IconButton, ButtonToolbar, Whisper, Tooltip } from 'rsuite';
import { DateRange } from "rsuite/DateRangePicker";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { GrAddCircle, GrPrint } from "react-icons/gr";
import { TbLeaf } from "react-icons/tb";

import { ObtenerClientes, ObtenerPlanificador, ObtenerFechasSemanaActual, FormatearColumnasPorSemana, ModificarFechaPlanificador } from './PlanificadorService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import { PlanificadorInterface } from '@oxtron/Interfaces/PlanificadorInterface.d';

import Base from '@oxtron/componentes/base/Base';
import Traducir from '@oxtron/i18n/Traducir';
import Medidor from '@oxtron/componentes/general/Medidor';
import ModalNuevaPlanificador from './componentes/ModalNuevaPlanificador';
import ModalDetallesRecetaPlanificador from './componentes/ModalDetallesRecetaPlanificador';
import './Planificador.scss';
import moment, { Moment } from 'moment';

const Planificador = () => {
    const intl = useIntl();
    const sesion = ObtenerSesion();
    const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
    const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
    const [planificadorMostrarDetalles, setPlanificadorMostrarDetalles] = useState<PlanificadorInterface>(null)
    const [fechaModalNuevo, setFechaModalNuevo] = useState<Moment>(moment(new Date()));
    const [clientes, setClientes] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [planificador, setPlanificador] = useState<PlanificadorInterface[]>(null);
    const [cargando, setCargando] = useState(false);
    const [cliente, setCliente] = useState(sesion.EsUsuario ? "TODOS" : sesion.IdUsuario);
    const [fechas, setFechas] = useState<DateRange>(ObtenerFechasSemanaActual());
    const columnsRef = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

    useEffect(() => {
        if(sesion.EsUsuario){
            ObtenerClientes(false).then((respuesta:any) => {
                respuesta.unshift({NombreCompleto: intl.formatMessage({id: 'planificador.select.todos'}), IdCliente:"TODOS"});
                setClientes(respuesta.map(
                    (item:any) => ({ label: item.NombreCompleto, value: item.IdCliente })
                ));
            });
        }
    }, [intl, sesion.EsUsuario])

    useEffect(() => {        
        setCargando(true)
        ObtenerPlanificador(cliente, fechas).then((respuesta: any) => {
            setColumnas(FormatearColumnasPorSemana(respuesta, fechas[0]));
            setPlanificador(respuesta)
            setCargando(false)
        })
    }, [fechas, cliente])


    const moverDeFecha = (result) => {
        if(!result.destination)
            return
        const id = result.draggableId;
        const fechaDestino = result.destination.droppableId.substr(result.destination.droppableId.indexOf('*-*') + 3)
        const fechaOrigen = result.source.droppableId.substr(result.destination.droppableId.indexOf('*-*') + 3);
        if(fechaOrigen === fechaDestino)
            return

        const nuevaColumnas = columnas.filter(item => true)
        const origen = nuevaColumnas.find(item => item.Fecha.format("YYYY/MM/DD") === fechaOrigen)        
        const destino = nuevaColumnas.find(item => item.Fecha.format("YYYY/MM/DD") === fechaDestino)
        origen.Elementos = origen.Elementos.filter(item => item.IdPlanificador !== id)
        destino.Elementos.push(planificador.find(item => item.IdPlanificador === id))
        setColumnas(nuevaColumnas)

        ModificarFechaPlanificador(id, fechaDestino).then(() =>{
            actualizar(false);
        })
    }

    const imprimirDia = async (fecha:string, i:number) => {
        const element = columnsRef[i].current;
        const canvas = await html2canvas(element, {useCORS: true, onclone(document, element) {
            const cards = element.querySelectorAll(".card-planificador")
            cards.forEach(card => {                                
                (card as HTMLElement).style.boxShadow = "none";
                (card as HTMLElement).style.border = "1px solid #CCC"
            });            
        },});
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === "string") {
            link.href = data;
            link.download = fecha.replaceAll("/", "-") + ".jpg";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    }

    const nuevaRecetaEnPlanificador = (fecha:Moment) => {
        setFechaModalNuevo(fecha);
        setMostrarModalNuevo(true)
    }

    const mostrarDetallesReceta = (plan:PlanificadorInterface) => {
        setPlanificadorMostrarDetalles(plan)
        setMostrarModalDetalles(true)
    }

    const actualizar = (refresh = true) => { 
        setCargando(refresh)
        ObtenerPlanificador(cliente, fechas).then((respuesta: any) => {
            setColumnas(FormatearColumnasPorSemana(respuesta, fechas[0]));
            setPlanificador(respuesta)
            setCargando(false)
        })
    }

    return (
        <Base titulo={Traducir("planificador.titulo")}>
            <Row className='mb-3'>
                {sesion.EsUsuario && clientes &&
                    <Col>
                        <Stack spacing={6} alignItems={"center"}>
                            {Traducir('planificador.cliente')}
                            <SelectPicker 
                                cleanable={false} 
                                data={clientes} 
                                defaultValue={cliente} 
                                onChange={(value) => {setCliente(value)}}/>
                        </Stack>
                    </Col>
                }
                <Col>
                    <Stack spacing={6} alignItems={"center"} justifyContent={"flex-end"}>
                        {Traducir('planificador.periodoTiempo')}
                        <DateRangePicker isoWeek placement="bottomEnd"
                                        cleanable={false}
                                        oneTap showOneCalendar
                                        hoverRange="week" 
                                        ranges={[]}
                                        value={fechas} 
                                        onChange={(value) => {setFechas(value)}} 
                                        format={"dd/MM/yyyy"}/>
                    </Stack>
                </Col>
            </Row>
            {
                (columnas === null || columnas.length < 1 || cargando) &&
                <Espera/>
            }
            {((columnas !== null && columnas.length > 0) &&
                !cargando) &&
                <div>
                    <Row className="main-row">
                        <DragDropContext onDragEnd={moverDeFecha}>
                            {columnas.length > 0 && Object.entries(columnas).map(([id, columna], indice) => (
                                <Col key={id} className="column-board" xs={12} sm={3} ref={columnsRef[indice]}>
                                    <Row className='column-board-header'>
                                        <Col>
                                            <span className='nombre-dia'>{columna.Nombre}</span>
                                            <small>{columna.Fecha.format("DD/MM")}</small>
                                        </Col>
                                        <Col align={"right"}>
                                            <ButtonToolbar>
                                                <Whisper trigger={"hover"} 
                                                        speaker={
                                                    <Tooltip placement='topEnd' arrow={false}>
                                                        {Traducir('planificador.tooltip.boton.imprimir')}
                                                    </Tooltip>
                                                }>
                                                    <IconButton 
                                                        icon={<GrPrint size="18px"/>} 
                                                        circle 
                                                        appearance="subtle" 
                                                        size="sm"
                                                        onClick={() => imprimirDia(columna.Fecha.format("DD/MM/YYYY"), indice)}/>
                                                </Whisper>
                                                <Whisper trigger={"hover"} 
                                                        speaker={
                                                    <Tooltip placement='topEnd' arrow={false}>
                                                        {Traducir('planificador.tooltip.boton.nuevo')}
                                                    </Tooltip>
                                                }>
                                                    <IconButton icon={<GrAddCircle size="18px"/>} circle appearance="subtle" size="sm" onClick={() => nuevaRecetaEnPlanificador(columna.Fecha)}/>
                                                </Whisper>
                                            </ButtonToolbar>
                                        </Col>
                                    </Row>
                                    <Droppable droppableId={id + '*-*' + columna.Fecha.format("YYYY/MM/DD")} key={id}>
                                        {(provided, snapshot) => (
                                            <div className={`dropping-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`} 
                                                {...provided.droppableProps} 
                                                ref={provided.innerRef}>
                                                    {columna.Elementos.map((itemPlan, index) => (
                                                        <Draggable key={itemPlan.IdPlanificador} draggableId={itemPlan.IdPlanificador} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div 
                                                                    ref={provided.innerRef} 
                                                                    className={`card-planificador ${snapshot.isDragging ? 'dragging': ''}`}
                                                                    {...provided.draggableProps} 
                                                                    {...provided.dragHandleProps}
                                                                    onClick={() => mostrarDetallesReceta(itemPlan)}> 
                                                                    <Row>
                                                                        <Col xs={6} className="d-flex flex-column justify-content-between">
                                                                            <Row>
                                                                                <Col xs={12}><b>{itemPlan.Nombre}</b></Col>
                                                                                <Col xs={12}><small>{itemPlan.Unidades} {Traducir('planificador.unidades')}</small></Col>
                                                                            </Row>
                                                                            {itemPlan.Vegano &&
                                                                                <Row>
                                                                                    <Col><TbLeaf size="18px" /> <small>{Traducir('recetario.vegan')}</small></Col>
                                                                                </Row>
                                                                            }
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
                        </DragDropContext>
                    </Row>
                </div>
            }

            <ModalNuevaPlanificador 
                mostrar={mostrarModalNuevo} 
                setMostrar={setMostrarModalNuevo}
                fecha={fechaModalNuevo}
                cliente={cliente}
                setActualizar={actualizar}/>

            <ModalDetallesRecetaPlanificador 
                mostrarDetalles={mostrarModalDetalles}
                setMostrarDetalles={setMostrarModalDetalles}
                planificador={planificadorMostrarDetalles}
                setActualizar={actualizar}/>
        </Base>
    );
};

export default Planificador;