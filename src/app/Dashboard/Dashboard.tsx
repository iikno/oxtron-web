import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Col, Row, Spinner } from 'react-bootstrap';
import { SelectPicker, DateRangePicker, Stack } from 'rsuite';
import { DateRange } from "rsuite/DateRangePicker";
import { Indicador1 } from './Indicadores/Indicador1';

import { BiCloud, BiArchive, BiWind } from "react-icons/bi";
import { Indicador2 } from './Indicadores/Indicador2';
import { ObtenerClientes, ObtenerDashboard } from './DashboardService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import { DashboardInterface } from '@oxtron/Interfaces/DashboardInterface.d';

const Dashboard = () => {
    const sesion = ObtenerSesion();

    const [clientes, setClientes] = useState([]);
    const [dashboard, setDashboard] = useState<DashboardInterface>(null);
    const [cliente, setCliente] = useState(sesion.IdUsuario);
    const [fechas, setFechas] = useState<DateRange>([new Date(), new Date()]);

    const [ACF, setACF] = useState(0.0)
    const [MS, setMS] = useState(0.0);
    const [TCO, setTCO] = useState(0.0);

    useEffect(() => {
        ObtenerClientes(false).then((respuesta:any) => {
            respuesta.unshift({NombreCompletoRol: "TODOS", value:"TODOS"});
            setClientes(respuesta.map(
                (item:any) => ({ label: item.NombreCompletoRol, value: item.IdUsuario })
            ));
        })
    }, [])

    useEffect(() => {
        ObtenerDashboard(cliente, fechas, false).then((respuesta:DashboardInterface) => {
            setDashboard(respuesta);
            console.log(respuesta);
            let acf = 0;
            respuesta.CO2Diario.map((co2Dia, index) => {
                acf += co2Dia.sumaCO2;
            })

            setACF(acf/respuesta.CO2Diario.length | 0);
            setMS(respuesta.PlatillosSemanales.length | 0);
            setTCO(acf/1000 | 0);
        })
    },[fechas, cliente])

    return (
        <Base titulo={Traducir("dashboard.titulo")}>
            <Row className='mb-3'>
                {
                    sesion.TipoPersona === "Administrador" &&
                    <Col>
                        <Stack spacing={6} alignItems={"center"}>
                            {Traducir('dashboard.cliente')}
                            <SelectPicker cleanable={false} data={clientes} onChange={setCliente}/>
                        </Stack>
                    </Col>
                }
                <Col>
                    <Stack spacing={6} alignItems={"center"} justifyContent={"flex-end"}>
                        {Traducir('dashboard.periodoTiempo')}
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
                dashboard === null &&
                <Espera/>
            }
            {
                dashboard !== null &&
                <>
                    <Row>
                        <Col xs="12" sm="6" md="4" className='mb-3'>
                            <Indicador1 Icon={BiCloud} data={ACF} Title={Traducir('dashboard.CF')} Subtitle={(
                                    <>
                                        {
                                            Traducir('dashboard.CF.subtitle')
                                        }
                                        <span> Kg/CO<sup>2</sup>e</span> 
                                    </>
                            )}/>
                        </Col>
                        <Col xs="12" sm="6" md="4" className='mb-3'>
                            <Indicador1 Icon={BiArchive} data={MS} Title={Traducir('dashboard.MS')} Subtitle={Traducir('dashboard.MS.subtitle')}/>
                        </Col>
                        <Col xs="12" md="4" className='mb-3'>
                            <Indicador1 Icon={BiWind} data={TCO} Title={(
                                <>
                                    {
                                        Traducir("dashboard.TCO")
                                    }
                                    <span> CO<sup>2</sup>e</span>
                                </>
                            )} Subtitle={(
                                    <>
                                        {
                                            Traducir('dashboard.TCO.subtitle')
                                        }
                                        <span> Tn/CO<sup>2</sup>e</span>
                                    </>
                                )}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-3'>
                        Gráfica
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6" className='mb-3'>
                            <Indicador2 data={dashboard.MayorMenorCO2General[0].PlatilloMayorCO2.EmisionCarbono || 0} title={dashboard.MayorMenorCO2General[0].PlatilloMayorCO2.Nombre || ""} subtitle={Traducir('dashboard.meal.highImpact')}/>
                        </Col>
                        <Col xs="12" sm="6" className='mb-3'>
                            <Indicador2 data={dashboard.MayorMenorCO2General[0].PlatilloMenorCO2.EmisionCarbono || 0} title={dashboard.MayorMenorCO2General[0].PlatilloMenorCO2.Nombre || ""} subtitle={Traducir('dashboard.meal.lowImpact')}/>
                        </Col>
                    </Row>
                </>
            }
        </Base>
    );
};

export default Dashboard;