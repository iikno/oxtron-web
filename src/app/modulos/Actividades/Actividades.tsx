import React, { useEffect, useState } from 'react';
import { Row, Col, SelectPicker, DateRangePicker } from 'rsuite';
import Traducir from '../../../i18n/Traducir';
import Base from '../../base/Base';

const Actividades = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {

    })

    return (
        <Base titulo={Traducir("actividades.titulo")}>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <span style={{
                                marginRight: "15px"
                            }}>{Traducir("actividades.cliente")}</span>
                        </Col>
                        <Col>
                            <SelectPicker block data={clientes}/>
                        </Col>
                    </Row>
                </Col>
                <Col xsPush={12}>
                    <Row>
                        <Col>
                            <span style={{
                                marginRight: "15px"
                            }}>{Traducir("actividades.periodoTiempo")}</span>
                        </Col>
                        <Col>
                            <DateRangePicker format='dd/MM/yyyy' isoWeek placement='bottomEnd'/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Base>
    );
};

export default Actividades;