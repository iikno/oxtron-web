import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Col, Row, Card, Container } from 'react-bootstrap';
import { SelectPicker, DateRangePicker, Stack, Whisper, Tooltip, IconButton } from 'rsuite';
import { DateRange } from "rsuite/DateRangePicker";
import { GrPrint } from "react-icons/gr";
import { TbLeaf } from "react-icons/tb";
import Chart from "react-apexcharts";
import html2canvas from 'html2canvas';

import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import { ObtenerFechasMesActual, ObtenerReporte, ObtenerClientes } from './ReportesService';
import { ReporteInterface } from '../../@oxtron/Interfaces/ReporteInterface.d';
import Medidor from '@oxtron/componentes/general/Medidor';
import Logo from '@oxtron/assets/images/Logo W.png';
import './Reportes.scss';
import { $baseS3, $noFoto } from '@oxtron/configs/Env';

const Reportes = () => {
    const refReporte = useRef();
    const intl = useIntl();
    const sesion = ObtenerSesion();

    const [clientes, setClientes] = useState([]);
    const [clientesSelect, setClientesSelect] = useState([]);
    const [fechas, setFechas] = useState<DateRange>(ObtenerFechasMesActual);
    const [reporte, setReporte] = useState<ReporteInterface>(null);
    const [cliente, setCliente] = useState(sesion.EsUsuario ? "TODOS" : sesion.IdUsuario);

    useEffect(() => {
        if(sesion.EsUsuario){
            ObtenerClientes(false).then((respuesta:any) => {
                respuesta.unshift({NombreCompleto: intl.formatMessage({id: 'planificador.select.todos'}), IdCliente:"TODOS"});
                setClientes(respuesta)
                setClientesSelect(respuesta.map(
                    (item:any) => ({ label: item.NombreCompleto, value: item.IdCliente })
                ));
            });
        }
    }, [intl, sesion.EsUsuario])

    useEffect(() => {
        ObtenerReporte(cliente, fechas, false).then((respuesta) => {
            console.log(respuesta)
            setReporte(respuesta)
        })
    },[fechas, cliente])

    const imprimirReporte = async () => {
        const element = refReporte.current;
        const canvas = await html2canvas(element, {useCORS: true});
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === "string") {
            link.href = data;
            link.download = "report-" + intl.formatMessage({id: `reportes.mes.${fechas[0].getMonth() + 1}`}) + ".jpg";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    }

    const colocarImagen = () => {        
        if(cliente === "TODOS")
            return Logo;
        const foto = (sesion.EsUsuario) ? clientes.find(item => item.IdCliente === cliente).Foto : sesion.Foto;
        if (foto !== "no-image.png") 
            return $baseS3 + foto 
        return $noFoto        
    }

    return (
        <Base titulo={Traducir("reportes.titulos")}>
            <Container>
                <Row className='mb-3'>
                    {sesion.EsUsuario && clientesSelect &&
                        <Col>
                            <Stack spacing={6} alignItems={"center"}>
                                {Traducir('reportes.cliente')}
                                <SelectPicker 
                                    cleanable={false} 
                                    data={clientesSelect} 
                                    defaultValue={cliente} 
                                    onChange={(value) => {setCliente(value)}}/>
                            </Stack>
                        </Col>
                    }
                    <Col className='d-flex justify-content-end'>
                        <Whisper trigger={"hover"} 
                            speaker={
                                <Tooltip placement='topEnd' arrow={false}>
                                    {Traducir('reportes.tooltip.imprimir')}
                                </Tooltip>
                            }>
                            <IconButton className='me-4' icon={<GrPrint size="18px"/>} circle size="sm" onClick={() => imprimirReporte()}/>
                        </Whisper>
                        <Stack spacing={6} alignItems={"center"} justifyContent={"flex-end"}>
                            {Traducir('reportes.mes')}
                            <DateRangePicker isoWeek placement="bottomEnd"
                                            cleanable={false}
                                            oneTap showOneCalendar
                                            hoverRange="month" 
                                            ranges={[]}
                                            value={fechas} 
                                            onChange={(value) => {setFechas(value)}} 
                                            format={"dd/MM/yyyy"}/>
                        </Stack>
                    </Col>
                </Row>
                {
                    reporte === null &&
                    <Espera/>
                }
                {
                    reporte !== null &&
                    <>                    
                        <Card className='p-1' ref={refReporte}>
                            <Row className='logo-container'>
                                <Col>
                                    <div className='py-4'>
                                        <img src={colocarImagen()} 
                                            alt="Logo" 
                                            style={{maxHeight: "100px"}} />
                                    </div>
                                </Col>
                                <Col>                                    
                                </Col>
                            </Row>                                
                            <Card.Body className='mx-4'>
                                <div className='titulo-reporte'>{Traducir('reportes.tituloReporte')}</div>
                                <div className='mt-3' style={{borderTop: "3px solid #D2D2D2", width: "100%"}}></div>
                                <Row>
                                    <Col md={12} lg={8} className="px-4 my-4">
                                        <div>
                                            <h5 className='mb-4'>{Traducir('reportes.graficaEmision')}</h5>
                                        </div>
                                        <Chart
                                            options={{
                                                xaxis: {
                                                    categories: reporte.EmisionesCarbono.GENERAL.map((item) => intl.formatMessage({id: `reportes.mes.${item.Mes}`})),
                                                },
                                                stroke: {
                                                    show: false,
                                                    curve: 'straight',
                                                },
                                                dataLabels: {
                                                    enabled: false
                                                },
                                                legend: {
                                                    position: 'top',
                                                    horizontalAlign: 'left'
                                                },
                                                colors: ['#002B64', '#94B9DA', '#5D86B7'],
                                                fill: {
                                                    type:'solid',                                                    
                                                },}}
                                            series={[
                                                {
                                                    name: intl.formatMessage({id: 'reportes.graficaEmision.general'}),
                                                    data: reporte.EmisionesCarbono.GENERAL.map((item) => Number.parseFloat(item.Valor.toFixed(2))),
                                                },                                                                                                
                                                {
                                                    name: intl.formatMessage({id: 'reportes.graficaEmision.noVegano'}),
                                                    data: reporte.EmisionesCarbono.NO_VEGANO.map((item) => Number.parseFloat(item.Valor.toFixed(2))),
                                                },
                                                {
                                                    name: intl.formatMessage({id: 'reportes.graficaEmision.vegano'}),
                                                    data: reporte.EmisionesCarbono.VEGANO.map((item) => Number.parseFloat(item.Valor.toFixed(2))),
                                                },
                                                ]}
                                            type='area'
                                        />
                                    </Col>
                                    <Col md={12} lg={4} style={{borderLeft: "3px solid #D2D2D2"}} className="px-4 my-4">
                                        <div>
                                            <h5 className='mb-4'>{Traducir('reportes.porcionPromedio')}</h5>
                                        </div>
                                        <Row>
                                            <Col xs={12}>
                                                <div className='reporte-texto-secundario'>{Traducir('reportes.porcionPromedio.historico')}</div>
                                                <div className='text-center'>
                                                    <Medidor id='historico' co2={reporte.PorcionPromedio.Historico}/>
                                                </div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className='reporte-texto-secundario'>{Traducir(`reportes.mes.${fechas[0].getMonth() + 1}`)}</div>
                                                <div className='text-center'>
                                                    <Medidor id='fechas' co2={reporte.PorcionPromedio.MesPasado}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div style={{borderTop: "3px solid #D2D2D2", width: "100%"}}></div>
                                <Row>
                                    <Col md={12} lg={6} className="px-4 my-4">
                                        <Row >
                                            <Col xs={12}>
                                                <div>
                                                    <h5 className='mb-4'>{Traducir('reportes.platilloMenorImpacto')}</h5>
                                                </div>
                                                {reporte.Platillos.MenorEmision === null &&
                                                    <p>{Traducir('reportes.error.noHayPlatillos')}</p>
                                                }
                                                {reporte.Platillos.MenorEmision !== null &&
                                                <Row>
                                                    <Col xs={12} md={3}>
                                                        <div className='text-center'>
                                                            <Medidor 
                                                                id={reporte.Platillos.MenorEmision.Nombre} 
                                                                co2={reporte.Platillos.MenorEmision.EmisionCarbono}/>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={9}>
                                                        <div className='reporte-texto-secundario'>{reporte.Platillos.MenorEmision.Nombre} {reporte.Platillos.MenorEmision.Vegano && <TbLeaf size="18px" />}</div>
                                                        <div className='reporte-texto-descripcion'>{reporte.Platillos.MenorEmision.Descripcion}</div>
                                                    </Col>
                                                </Row>
                                                }
                                            </Col>
                                            <Col xs={12}>
                                                <div>
                                                    <h5 className='mb-4 mt-4'>{Traducir('reportes.platilloMayorImpacto')}</h5>
                                                </div>
                                                {reporte.Platillos.MayorEmision === null &&
                                                    <p>{Traducir('reportes.error.noHayPlatillos')}</p>
                                                }
                                                {reporte.Platillos.MayorEmision !== null &&
                                                <Row>
                                                    <Col xs={12} md={3}>
                                                        <div className='text-center'>
                                                            <Medidor 
                                                                id={reporte.Platillos.MayorEmision.Nombre} 
                                                                co2={reporte.Platillos.MayorEmision.EmisionCarbono}/>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={9}>
                                                        <div className='reporte-texto-secundario'>{reporte.Platillos.MayorEmision.Nombre} {reporte.Platillos.MayorEmision.Vegano && <TbLeaf size="18px" />}</div> 
                                                        <div className='reporte-texto-descripcion'>{reporte.Platillos.MayorEmision.Descripcion}</div> 
                                                    </Col>
                                                </Row>
                                                }
                                            </Col>
                                        </Row>
                                    </Col >
                                    <Col md={12} lg={6} style={{borderLeft: "3px solid #D2D2D2"}} className="px-4 my-4">
                                        <div>
                                            <h5 className='mb-4'>{Traducir('reportes.ganancia')}</h5>
                                        </div>
                                        <Chart
                                            options={{
                                                xaxis: {
                                                    categories: reporte.Ganancias.map((item) => intl.formatMessage({id: `reportes.mes.${item.Mes}`})),
                                                },
                                                dataLabels: {
                                                    enabled: false
                                                },}}
                                            series={[
                                                {
                                                    name: intl.formatMessage({id: 'reportes.ganancia'}),
                                                    data: reporte.Ganancias.map((item) => item.Valor),
                                                }]} 
                                            type="bar"/>
                                    </Col>
                                </Row>
                                <div style={{borderTop: "3px solid #D2D2D2", width: "100%"}}></div>                                
                                <div>
                                    <h5 className='mt-4'>{Traducir('reportes.total')}</h5>
                                </div>
                                <Row>
                                    <Col sm={6} md={3} className="py-3">
                                        <div className='text-center'>
                                            <div className='total-data'>{reporte.Generales.Platillos}</div>
                                            <div>{Traducir('reportes.total.platillos')}</div>
                                        </div>
                                    </Col>
                                    <Col sm={6} md={3} style={{borderLeft: "3px solid #D2D2D2"}} className="py-3">
                                        <div className='text-center'>
                                            <div className='total-data'>{reporte.Generales.Amigables}</div>
                                            <div>{Traducir('reportes.total.amigables')}</div>
                                            <div><small>{Traducir('reportes.total.amigables.descripcion')}<span> CO<sup>2</sup>e</span></small></div>
                                        </div>
                                    </Col>
                                    <Col sm={6} md={3} style={{borderLeft: "3px solid #D2D2D2"}} className="py-3">
                                        <div className='text-center'>
                                            <div className='total-data'>{reporte.Generales.EmisionTotal.toFixed(2)}</div>
                                            <div>{Traducir('reportes.total.emision')}<span> CO<sup>2</sup>e</span></div>
                                        </div>
                                    </Col>
                                    <Col sm={6} md={3} style={{borderLeft: "3px solid #D2D2D2"}} className="py-3">
                                        <div className='text-center'>
                                            <div className='total-data'>{reporte.Generales.ViajesAuto.toFixed(2)}</div>
                                            <div>{Traducir('reportes.total.viajes')}</div>
                                        </div>
                                    </Col>
                                </Row>                            
                            </Card.Body>
                            <Row className='logo-container'>
                                <Col className='d-flex align-items-center'>
                                    <div className='footer-mes'>{Traducir(`reportes.mes.${fechas[0].getMonth() + 1}`)} {fechas[0].getFullYear()}</div>                                               
                                </Col>
                                <Col align="right">
                                    <img src={Logo} alt="Logo" style={{maxWidth: "60%"}} />
                                </Col>
                            </Row> 
                        </Card>
                    </>
                }
            </Container>
        </Base>
    );
};

export default Reportes;