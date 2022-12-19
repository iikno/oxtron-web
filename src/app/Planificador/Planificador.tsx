import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { SelectPicker, DateRangePicker, Stack } from 'rsuite';
import { DateRange } from "rsuite/DateRangePicker";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import '@asseinfo/react-kanban/dist/styles.css'

import { BiCloud, BiArchive, BiWind } from "react-icons/bi";
import { ObtenerClientes, ObtenerPlanificador, ObtenerFechasSemanaActual, FormatearColumnasPorSemana } from './PlanificadorService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import { PlanificadorInterface } from '@oxtron/Interfaces/PlanificadorInterface.d';

const Planificador = () => {
    const sesion = ObtenerSesion();

    const [board, setBoard] = useState({
        columns: [
          {
            id: 1,
            title: "Backlog",
            cards: [
              {
                id: 1,
                title: "Card title 1",
                description: "Card content"
              },
              {
                id: 2,
                title: "Card title 2",
                description: "Card content"
              },
              {
                id: 3,
                title: "Card title 3",
                description: "Card content"
              }
            ]
          },
          {
            id: 2,
            title: "Doing",
            cards: [
              {
                id: 9,
                title: "Card title 9",
                description: "Card content"
              }
            ]
          },
          {
            id: 3,
            title: "Q&A",
            cards: [
              {
                id: 10,
                title: "Card title 10",
                description: "Card content"
              },
              {
                id: 11,
                title: "Card title 11",
                description: "Card content"
              }
            ]
          },
          {
            id: 4,
            title: "Production",
            cards: [
              {
                id: 12,
                title: "Card title 12",
                description: "Card content"
              },
              {
                id: 13,
                title: "Card title 13",
                description: "Card content"
              }
            ]
          }
        ]
      })
    const [clientes, setClientes] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [planificador, setPlanificador] = useState<PlanificadorInterface>(null);
    const [cliente, setCliente] = useState(sesion.IdUsuario);
    const [fechas, setFechas] = useState<DateRange>(ObtenerFechasSemanaActual());

    useEffect(() => {
        ObtenerClientes(false).then((respuesta:any) => {
            respuesta.unshift({NombreCompleto: "TODOS", value:"TODOS"});
            setClientes(respuesta.map(
                (item:any) => ({ label: item.NombreCompleto, value: item.IdCliente })
            ));
        })        
    }, [])

    useEffect(() => {        
        ObtenerPlanificador("TODOS", fechas).then((respuesta: any) => {
            setColumnas(FormatearColumnasPorSemana(respuesta, fechas[0]));
            console.log(columnas)
            setPlanificador(respuesta)            
            // setBoard({
            //     id: "lunes",
            //     title: "Lunes",
            //     cards: respuesta.map((item) => ({IdPlanificador: item.IdPlanificador, Nombre: item.Nombre, Unidades: item.Unidades, EmisionCarbono: item.EmisionCarbono}))
            // })
        })
    }, [fechas])

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
                    {/* <DragDropContext >
                        {Object.entries(columnas).map(([id, columna]) => (
                            <Droppable id={id + '-' + columna.Fecha} droppableId={id + '-' + columna.Fecha} key={id}>
                                {(provided) => (

                                )}
                            </Droppable>
                        ))}
                    </DragDropContext> */}
                </div>
                // <Board
                //     allowRemoveLane
                //     allowRenameColumn
                //     allowRemoveCard
                //     onLaneRemove={console.log}
                //     onCardRemove={console.log}
                //     onLaneRename={console.log}
                //     initialBoard={board}
                //     allowAddCard={{ on: "top" }}
                //     onNewCardConfirm={draftCard => ({
                //     id: new Date().getTime(),
                //     ...draftCard
                //     })}
                //     onCardNew={console.log}
                // />
            }
            {/* {
                planificador !== null &&
                <Board renderCard={({ Nombre, Unidades, EmisionCarbono }, { removeCard, dragging }) => (
                    <Card>
                        <Card.Body>{Nombre}</Card.Body>
                    </Card>
                )} >
                    {board}
                </Board>
            } */}
        </Base>
    );
};

export default Planificador;