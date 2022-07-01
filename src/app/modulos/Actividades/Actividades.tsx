import React, { useEffect, useState } from 'react';
import Base from '../Base/Base';
import { Col, Row, Table } from 'react-bootstrap'
import { BuscarActividades, ObtenerActividades } from './ActividadesService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { FormatoFechaHora } from '../@iikno/Formatos';
import Espera from '../@iikno/Espera';

const Actividades = () => {
    const navegador = useNavigate();
    const [actividades, setActividades] = useState([])
    const [actividadesBuscador, setActividadesBuscador] = useState([])
    const [fechas, setFechas] = useState([moment().startOf('month').toDate(), moment().endOf('month').toDate()]);
    const [showEspera, setShowEspera] = useState(false)

    useEffect(() => {
        setShowEspera(true);
        ObtenerActividades(fechas).then((actividades) => {
            setActividades(actividades);
            setActividadesBuscador(actividades)
        }).then(() => {
            setShowEspera(false)
        })
    },[fechas])

    return (
        <>
            <Base>
                <Row>
                    <Col xs={12} md={4} className='text-center'>
                        <div className="form-outline">
                            <input type="text" id="typeText" className="form-control" onKeyUp={(e) => {
                                setActividades(BuscarActividades(e.currentTarget.value, actividadesBuscador))
                            }}/>
                            <label className="form-label">Buscar en los registros</label>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className='text-center'>
                        <DateRangePicker format="dd-MM-y" locale="es-mx" onChange={(valor:any) => {
                                setFechas(valor)
                            }} value={fechas} />
                    </Col>
                    <Col xs={12} md={4} className='text-center'>
                        <select className='form-control' onChange={(e) => {
                            if(e.currentTarget.value !== "todos")
                                setActividades(BuscarActividades(e.currentTarget.value, actividadesBuscador))
                            else
                                setActividades(BuscarActividades("", actividadesBuscador))
                        }}>
                            <option value="todos">Todos</option>
                            <option value="consulta">Consulta</option>
                            <option value="alta">Alta</option>
                            <option value="modificar">Modificación</option>
                            <option value="eliminar">Eliminación</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Módulo</th>
                                    <th>Acción</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    actividades.map((actividad:any, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{actividad.Usuario}</td>
                                                <td>{actividad.Modulo}</td>
                                                <td>{actividad.Accion}</td>
                                                <td>{FormatoFechaHora(actividad.Fecha)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Base>
            <Espera show={showEspera}/>
        </>
    );
};

export default Actividades;