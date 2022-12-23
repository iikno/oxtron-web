import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Col, Row } from 'react-bootstrap';
import { Button, ButtonToolbar, InputNumber, SelectPicker, Modal } from 'rsuite';
import { BiSave } from "react-icons/bi";

import { ObtenerRecetas, AltaPlanificador } from '../PlanificadorService';
import { RecetarioInterface } from '@oxtron/Interfaces/RecetarioInterface.d';
import Traducir from '@oxtron/i18n/Traducir';
import { Moment } from 'moment';

const ModalNuevaPlanificador = (
    {mostrar, setMostrar, fecha, cliente, setActualizar}:
    {mostrar: boolean, setMostrar: any, fecha:Moment, cliente?:string, setActualizar?: any}
) => {
    const intl = useIntl();
    const [cargando, setCargando] = useState(false)
    const [recetas, setRecetas] = useState([])
    const [unidades, setUnidades] = useState(0)
    const [recetaSeleccionada, setRecetaSeleccionada] = useState("")

    useEffect(() => {
        if(!mostrar)
            return
        ObtenerRecetas(cliente).then((resultados) => {
            setRecetas(resultados)
        })
    }, [cliente, mostrar])

    const cambioCampoUnidades = (value) => {
        if(Number.isNaN(value))
            return;
        value = Number.parseInt(value);
        if(value < 0)
            value = 0;
        setUnidades(value)
    }

    const guardarRecetaEnPlanificador = async () => {
        let exito = false;
        setCargando(true);
        const receta: RecetarioInterface = recetas.find(item => item.IdReceta === recetaSeleccionada);
        await AltaPlanificador(intl, receta, fecha.format("YYYY/MM/DD"), unidades).then((resultado) => {
            exito = resultado;
        })
        setCargando(false)
        if(!exito)
            return
        if(setActualizar)
            setActualizar()
        ocultarModal();
    }

    const ocultarModal = () => {
        setTimeout(() => {
            setUnidades(0)
            setRecetaSeleccionada("")            
        }, 500);
        setMostrar(false)
    }

    return (
        <Modal size="sm" open={mostrar} onClose={ocultarModal} style={{"fontFamily": "inter"}} overflow={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {Traducir("planificador.modal.titulo")}
                </Modal.Title>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <h6 className='text-uppercase label-input mt-4'>{Traducir("planificador.modal.label.Descripcion")}</h6>
                            <h3 className='principal-title fw-bold'>
                                <input className='modal-input-text without-borders' id='fechaNuevoPlanificador' value={fecha.format("DD/MM/YYYY")} readOnly/>
                            </h3>                            
                        </Col>
                        <Col xs={12}>
                            <h6 className='text-uppercase label-input mt-4'>{Traducir("planificador.modal.label.Receta")}</h6>
                            <SelectPicker
                                key={recetaSeleccionada}
                                data={recetas.map(item => ({ label: item.Nombre, value: item.IdReceta }))}
                                defaultValue={recetaSeleccionada}
                                onChange={(value) => setRecetaSeleccionada(value ?? "")}
                                cleanable={false}                                
                                block
                            />
                        </Col>
                        {
                            recetaSeleccionada !== "" &&
                            <Col xs={12}>
                                <h6 className='text-uppercase label-input mt-4'>{Traducir("planificador.modal.label.Unidades")}</h6>
                                <InputNumber placeholder={'Unidades'} className='modal-input-text without-borders' value={unidades} onChange={cambioCampoUnidades}/>
                            </Col>
                        }
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {
                        recetaSeleccionada !== "" && unidades > 0 &&
                        <Row>
                            <Col align="left">
                                <ButtonToolbar >
                                    <Button type="submit" appearance='primary' className='btn-primary-rs' loading={cargando} onClick={guardarRecetaEnPlanificador}>
                                        <BiSave size="18px" /> {Traducir('recetario.modal.btnGuardar')}
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    }
                </Modal.Footer>
            </Modal.Header>
        </Modal>
    )
}

export default ModalNuevaPlanificador;