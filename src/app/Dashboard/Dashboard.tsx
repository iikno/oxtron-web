import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { SelectPicker, DateRangePicker, Stack } from 'rsuite';
import { DateRange } from "rsuite/DateRangePicker";
import { Indicador1 } from './Indicadores/Indicador1';
import './Dashboard.scss';
import { BiCloud, BiArchive, BiWind } from "react-icons/bi";
import { Indicador2 } from './Indicadores/Indicador2';
import { ObtenerClientes, ObtenerDashboard } from './DashboardService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import ReactApexChart from 'react-apexcharts';
import {useIntl} from 'react-intl';
import moment from 'moment';

const Dashboard = () => {
    const sesion = ObtenerSesion();
    const intl = useIntl();

    const [clientes, setClientes] = useState([]);
    const [dashboard, setDashboard] = useState(null);
    const [cliente, setCliente] = useState(sesion.IdUsuario);
    const [fechas, setFechas] = useState<DateRange>([moment().startOf('week').toDate(), moment().endOf('week').toDate()]);
    

    const [general, setGeneral] = useState([]);
    const [veganos, setVeganos] = useState([]);
    const [noVeganos, setNoVeganos] = useState([]);
    const [rango, setRango] = useState([]);

    const [ACF, setACF] = useState(0.0)
    const [MS, setMS] = useState(0.0);
    const [TCO, setTCO] = useState(0.0);

    useEffect(() => {
        ObtenerClientes(false).then((respuesta:any) => {
            respuesta.unshift({NombreCompletoRol: "TODOS", value:"TODOS"});
            setClientes(respuesta.map(
                (item:any) =>({ label: item.NombreCompletoRol, value: item.IdUsuario })
            ));
        })
    }, [])

    useEffect(() => {
        ObtenerDashboard(cliente, fechas, false).then((respuesta:any) => {
            setDashboard(respuesta);
            // console.log(respuesta);
            setGeneral(respuesta.EmisionesCarbono.GENERAL.map((item:any) =>({x: item.Fecha, y: item.Valor.toFixed(2)})));
            setVeganos(respuesta.EmisionesCarbono.VEGANO.map((item:any) => ({x: item.Fecha, y: item.Valor.toFixed(2)})));
            setNoVeganos(respuesta.EmisionesCarbono.NO_VEGANO.map((item:any) =>({x: item.Fecha, y: item.Valor.toFixed(2)})));
            setACF(respuesta.Generales.PromedioEmision);
            setMS(respuesta.Generales.Platillos | 0);
            setTCO(respuesta.Generales.Toneladas);
        })
    },[fechas, cliente])

    const series = [
        {
            name: "General",
            data: general
        },
        {
            name: "Vegano",
            data: veganos
        },
        {
            name: "No vegano",
            data: noVeganos
        }
    ];

    const options = {
        title: {
            text: intl.formatMessage({id: "dashboard.grafica"}),
            style: {
                fontSize: '20px'
            }
        },
        chart: {
            stacked: false
        }
    }

    return (
        <Base titulo={Traducir("dashboard.titulo")}>
            <Row className='mb-3'>
                {
                    sesion.TipoPersona === "Administrador" &&
                    <Col>
                        <Stack spacing={6} alignItems={"center"}>
                            {Traducir('dashboard.cliente')}
                            <SelectPicker cleanable={false} data={clientes} onChange={setCliente} style={{zIndex: '800'}}/>
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
                                        format={"dd/MM/yyyy"}
                                        menuClassName='rs-picker-menu'/>
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
                                    {/* <span> CO<sup>2</sup>e</span> */}
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
                            <Card>
                                <Card.Body>
                                        <ReactApexChart
                                        options={options} 
                                        series={series} 
                                        stroke='smooth'
                                        type="area" 
                                        width='100%' 
                                        height={320} 
                                        />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="6" className='mb-3'>
                            <Indicador2 
                            data={dashboard.Platillos.MayorEmision !== null? dashboard.Platillos.MayorEmision.EmisionCarbonoReceta: 0} 
                            title={dashboard.Platillos.MayorEmision !== null? dashboard.Platillos.MayorEmision.Nombre : Traducir('dashboard.meal.name')} 
                            subtitle={Traducir('dashboard.meal.highImpact')}/>
                        </Col>
                        <Col xs="12" sm="6" className='mb-3'>
                            <Indicador2 
                            data={dashboard.Platillos.MenorEmision !== null ? dashboard.Platillos.MenorEmision.EmisionCarbonoReceta : 0} 
                            title={dashboard.Platillos.MenorEmision !== null? dashboard.Platillos.MenorEmision.Nombre : Traducir('dashboard.meal.name')} 
                            subtitle={Traducir('dashboard.meal.lowImpact')}/>
                        </Col>
                    </Row>
                </>
            }
        </Base>
    );
};

export default Dashboard;