import React, { useEffect, useRef, useState } from 'react';
import './Actividades.scss';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Button, Col, Modal, Row, Table, ButtonGroup, Card, Tabs, Tab, ListGroup} from 'react-bootstrap';

import { Espera } from '@oxtron/componentes/base/Espera';
import { Container, DateRangePicker, SelectPicker } from 'rsuite';
import { $noFoto } from '@oxtron/configs/Env';
import { ObtenerClientes } from './ActividadesService';


const Actividades = () => {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [img, setImg] = useState($noFoto);
    const [imgBuff, setImgBuff] = useState();
    const [clientes, setClientes] = useState([]);
    const [usuariosMostrar, setUsuariosMostrar] = useState([]);
    const inputFile = useRef(null);


    function obtenerClientes(valor: boolean){
        ObtenerClientes(valor).then((respuesta:any) => {
            const datos = respuesta.map(
                cliente => ({label: cliente.NombreCompleto, value: cliente.IdCliente})
            );
            setClientes(datos);
        })
    }

    useEffect(() => {
        obtenerClientes(true);
    }, [])


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
                            <span>Customers </span>
                            <SelectPicker data={clientes} style={{ width: 300, display: "inline-block" }} />
                        </Col>
                        <Col align="right">
                            <span>Time period </span>
                            <DateRangePicker placement="bottomEnd" style={{display: "inline-block"}}></DateRangePicker>
                        </Col>
                    </Row>
                    <br></br>
                    <Row >
                        <Col>
                            <Button className='botonActividad'>Obtener</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Card>
                            <Card.Body>
                                <Table>
                                    <tr>
                                        <td>metodo</td>
                                        <td>usuario</td>
                                        <td>detalles</td>
                                        <td>metodo</td>
                                        <td>metodo</td>
                                        <td>metodo</td>
                                    </tr>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Row>
                </>
            } 
        </Base>
    );
};

export default Actividades;