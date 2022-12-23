import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import DataTable from 'react-data-table-component';
import html2canvas from 'html2canvas';
import { Col, Row, Container } from 'react-bootstrap';
import { Button, ButtonToolbar, InputNumber, InputGroup, Modal } from 'rsuite';
import { BsPrinter, BsTrash } from "react-icons/bs";
import { BiSave } from "react-icons/bi";

import Traducir from '@oxtron/i18n/Traducir';
import Medidor from '@oxtron/componentes/general/Medidor';
import { ConfirmarEliminar } from '@oxtron/componentes/alerts/alertas';
import { $baseS3, $noFoto } from '@oxtron/configs/Env';
import { ObtenerDetallesReceta } from '../../Recetario/RecetarioService';
import { PlanificadorInterface } from '@oxtron/Interfaces/PlanificadorInterface.d';
import { EliminarPlanificador, ModificarPlanificador } from '../PlanificadorService';

const ModalDetallesRecetaPlanificador = (
    {mostrarDetalles, setMostrarDetalles, planificador, setActualizar}:
    {mostrarDetalles: boolean, setMostrarDetalles: any, planificador:PlanificadorInterface, setActualizar: any}
) => {
    const intl = useIntl();
    const [ingredientesModal, setIngredientesModal] = useState([]);
    const [alergenosModal, setAlergenosModal] = useState([]);
    const [recetaModal, setRecetaModal] = useState(null);
    const [unidades, setUnidades] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [validadores, setValidadores] = useState({Unidades: true})
    const [cargando, setCargando] = useState(false);
    const [img, setImg] = useState($noFoto);

    const modalRef = useRef(null)
    const medidorRef = useRef(null)

    useEffect(() => {
        if(!mostrarDetalles || !planificador)
            return
        ObtenerDetallesReceta(planificador.IdReceta, true).then((respuesta) => {
            setAlergenosModal(respuesta.ALERGENOS)
            setIngredientesModal(respuesta.INGREDIENTES)
            setRecetaModal(respuesta.RECETA)
            const URL_IMAGEN = (respuesta.RECETA.Foto && respuesta.RECETA.Foto !== "no-image.png") ? ($baseS3 + respuesta.RECETA.Foto) : $noFoto;
            setImg(URL_IMAGEN)
            setUnidades(planificador.Unidades)
            setMostrarModal(true)
        })
    }, [mostrarDetalles, planificador])

    const tableIngredientsColumns = [
        {
            name: intl.formatMessage({id: 'recetario.modal.form.tabla.ingrediente'}),
            selector: row => row.Nombre,
            sortable: true,
        },
        {
            name: intl.formatMessage({id: 'recetario.modal.form.tabla.medida'}),
            selector: row => (row.Medida + " " + row.UnidadMedida),
            sortable: true,
        },
        {
            name: (<span>Kg/CO<sup>2</sup>e</span>),
            selector: row => Number.parseFloat(row.HuellaCarbono.toString()).toFixed(2),
            sortable: true,
        }
    ];

    const imprimirMedidor = async () => {
        const element = medidorRef.current;
        const canvas = await html2canvas(element, {useCORS: true});
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === "string") {
            link.href = data;
            link.download = "co2e-" + recetaModal.Nombre.replaceAll(" ", "-") + ".jpg";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    }

    const imprimirReceta = async () => {
        const element = modalRef.current;
        const canvas = await html2canvas(element, {useCORS: true});
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === "string") {
            link.href = data;
            link.download = recetaModal.Nombre.replaceAll(" ", "-") + ".jpg";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    }

    const cambioSelectUnidades = (value) => {
        let num = Number.parseInt(value)
        if(num < 0)
            num = 0;
        setValidadores({Unidades: (num > 0)})
        setUnidades(num)
    }


    const validarCampos = () => {
        const val = {
            Unidades: (unidades > 0)
        }
        setValidadores(val)
        return val.Unidades;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validarCampos())
            return

        setCargando(true);
        let exito = false;
        await ModificarPlanificador(intl, planificador, recetaModal.EmisionCarbono, unidades).then((resultado) => {
            exito = resultado;
        })        
        setCargando(false)

        if(!exito)
            return
        if(setActualizar)
            setActualizar()
        ocultarModal();
    }

    const eliminarPlanificador = () => {
        ConfirmarEliminar(intl).then((result) => {
            if(result.isConfirmed){
                EliminarPlanificador(intl, planificador.IdPlanificador).then(() => {
                    if(setActualizar)
                        setActualizar()
                    ocultarModal();
                })
            }
        })
    }

    const ocultarModal = () => {
        setTimeout(() => {
            setValidadores({Unidades: true})
        }, 500);
        setMostrarDetalles(false)
        setMostrarModal(false)
    }

    return(
    <>
        <Modal size="lg" open={mostrarModal} onClose={ocultarModal} style={{"fontFamily": "inter"}} overflow={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                {Traducir("recetario.detallesReceta")}
                </Modal.Title>
            </Modal.Header>
            {recetaModal &&
                <form onSubmit={handleSubmit}>
                    <Modal.Body ref={modalRef} >
                        <Container>
                        <Row>
                            <Col md={12} lg={8}>
                                <h6 className='text-uppercase label-input'>{Traducir("recetario.formNombre")}</h6>
                                <input type='text' placeholder={intl.formatMessage({id: 'recetario.modal.form.placeholder.nombre'})} className='modal-input-text without-borders input-receta-nombre fw-bold' value={recetaModal.Nombre} readOnly/>                                
                                
                                <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formDescripcion")}</h6>
                                <textarea placeholder={intl.formatMessage({id: 'recetario.modal.form.placeholder.descripcion'})} className='modal-input-text without-borders' rows={4} value={recetaModal.Descripcion} readOnly/>

                                <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formPrecio")}</h6>
                                <InputGroup inside className='without-borders box-shadow-none'>
                                    <InputGroup.Addon>$</InputGroup.Addon>
                                    <InputNumber placeholder={intl.formatMessage({id: 'recetario.modal.form.placeholder.precio'})} className='without-borders modal-input-money box-shadow-none' value={recetaModal.Precio} readOnly/>
                                </InputGroup>

                                <h6 className='text-uppercase label-input mt-4'>{Traducir("planificador.unidades")}</h6>
                                <InputGroup className='without-borders box-shadow-none modal-input-number'>
                                    <InputNumber 
                                        postfix={intl.formatMessage({id: 'planificador.modal.detalles.porciones'})} 
                                        value={unidades} 
                                        onChange={cambioSelectUnidades}/>
                                </InputGroup>
                                {!validadores.Unidades &&
                                    <p className='error-message'>{Traducir('planificador.modal.detalles.error.unidades')}</p>
                                }

                                <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formIngredientes")}</h6>
                                <DataTable
                                    columns={tableIngredientsColumns}
                                    data={ingredientesModal}
                                    responsive={true}
                                    dense={true}
                                />

                                <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formAlergenos")}</h6>
                                <div className="d-flex flex-wrap">
                                    {alergenosModal.map(item => (
                                        <span className="badge rounded-pill bg-primary pill-btn mt-2 me-2" key={item.IdAlergeno}>
                                            {item.Nombre}
                                        </span>
                                    ))}
                                </div>
                            </Col>
                            <Col md={12} lg={4}>
                                <Row>
                                    <Col>
                                        <h6 className='text-uppercase label-input'>{Traducir("recetario.formFoto")}</h6>
                                        <img className='rounded img-fluid cursor-pointer' src={img} alt="recipe"></img>

                                        <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formCarbon")}</h6>
                                        <div className='text-center' ref={medidorRef}>
                                            <Medidor id="medidorPlanificador" co2={ planificador.EmisionCarbono } />
                                        </div>

                                        <input className='me-2' type="checkbox" checked={recetaModal.Vegano} readOnly/>
                                        <span>{Traducir('recetario.modal.form.placeholder.vegan')}</span>                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className='mt-2'>
                        <Row>
                            <Col align="left">
                                <ButtonToolbar >
                                    <Button type='button' color="red" appearance="primary" onClick={eliminarPlanificador}>
                                            <BsTrash /> {Traducir('recetario.modal.btnEliminar')}
                                        </Button>
                                    <Button type='button' color="cyan" appearance="primary" onClick={imprimirReceta}>
                                        <BsPrinter /> {Traducir('planificador.modal.detalles.boton.imprimirReceta')}
                                    </Button>
                                    <Button type='button' color="cyan" appearance="primary" onClick={imprimirMedidor}>
                                        <BsPrinter /> {Traducir('planificador.modal.detalles.boton.imprimirMedidor')}
                                    </Button>
                                    <Button type="submit" appearance='primary' className='btn-primary-rs' loading={cargando}>
                                        <BiSave /> {Traducir('recetario.modal.btnGuardar')}
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </form>
            }
        </Modal>
    </>
    )
}

export default ModalDetallesRecetaPlanificador;