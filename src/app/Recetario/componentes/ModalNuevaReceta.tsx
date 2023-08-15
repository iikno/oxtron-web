import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import DataTable from 'react-data-table-component';
import html2canvas from 'html2canvas';
import { Col, Row, Container } from 'react-bootstrap';
import { Button, ButtonToolbar, InputNumber, InputGroup, SelectPicker, Modal } from 'rsuite';
import { CiTrash} from "react-icons/ci";
import { BsPrinter, BsTrash } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import Traducir from '@oxtron/i18n/Traducir';
import Medidor from '@oxtron/componentes/general/Medidor';
import { ConfirmarEliminar } from '@iikno/clases/Alertas';
import { ObtenerIngredientes, ObtenerAlergenos, EliminarReceta, AltaReceta, ModificarReceta, optionType, valoresReceta } from '../RecetarioService';
import { $baseS3, $noFoto } from '@oxtron/configs/Env';

const ModalNuevaReceta = (
    {recetaDetalles, ingredientesDetalles, alergenosDetalles, editarReceta, show, setShow, setActualizar}:
    {show: boolean, setShow: any, recetaDetalles?: any, ingredientesDetalles?: any[], alergenosDetalles?: any[], editarReceta?: string, setActualizar?: any}
) => {
    const intl = useIntl();
    const [ingredientesModal, setIngredientesModal] = React.useState(ingredientesDetalles ?? []);
    const [alergenosModal, setAlergenosModal] = React.useState(alergenosDetalles ?? []);
    const [recetaModal, setRecetaModal] = React.useState(recetaDetalles ?? valoresReceta);
    const [validadores, setValidadores] = useState({Nombre: true, Precio: true, Ingredientes: true})
    const [cargando, setCargando] = useState(false);
    const [imgOriginal, setImgOriginal] = useState("");
    const [img, setImg] = useState($noFoto);
    const [imgBuff, setImgBuff] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);
    const [alergenos, setAlergenos] = useState([]);

    const [ingredienteSeleccionado, setIngredienteSeleccionado] = React.useState("");
    const [alergenoSeleccionado, setAlergenoSeleccionado] = React.useState("");
    const [unidadSeleccionada, setUnidadSeleccionada] = React.useState("");
    const [medidaIngrediente, setMedidaIngrediente] = React.useState(0);

    const modalRef = useRef(null)

    useEffect(() => {
        setRecetaModal(recetaDetalles ?? valoresReceta);
        setIngredientesModal(ingredientesDetalles ?? []);
        setAlergenosModal(alergenosDetalles ?? [])
    }, [recetaDetalles, ingredientesDetalles, alergenosDetalles])

    useEffect(() => {
        const URL_IMAGEN = (recetaModal.Foto && recetaModal.Foto !== "no-image.png") ? ($baseS3 + recetaModal.Foto) : $noFoto;
        setImg(URL_IMAGEN)
        setImgOriginal((recetaModal.Foto && recetaModal.Foto !== "no-image.png") ? (recetaModal.Foto) : "")
    }, [recetaModal])

    useEffect(() => {
        ObtenerIngredientes(false).then((respuesta:any) => {
            setIngredientes(respuesta);
        })
        ObtenerAlergenos(false).then((respuesta:any) => {
            setAlergenos(respuesta);
        })
    }, [])

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
        },
        {
            sortable: false,
            width: "80px",
            cell: (row, index, column, id) => {
                return <div className="d-flex py-2">
                    <button type='button' onClick={() => {
                        const nuevosIngredientes = (ingredientesModal.filter(ing => ing.IdIngrediente !==  row.IdIngrediente));
                        setIngredientesModal(nuevosIngredientes)
                        setRecetaModal({...recetaModal, EmisionCarbono: recetaModal.EmisionCarbono - row.HuellaCarbono})
                        setValidadores({...validadores, Ingredientes: (nuevosIngredientes.length > 0)})
                    }} className="btn btn-item d-flex justify-content-center align-items-center me-2">
                        <CiTrash />
                    </button>
                </div>
            }
        },
    ];


    const agregarNuevoAlergeno = (e) => {
        if(alergenoSeleccionado === "")
            return;

        const alergeno = alergenos.find(aler => aler.IdAlergeno === alergenoSeleccionado)
        const alergenoDT = alergenosModal.find(aler => aler.IdAlergeno === alergenoSeleccionado)

        if(alergenoDT)
            return;

        setAlergenosModal([...alergenosModal, {
            IdAlergeno: alergenoSeleccionado,
            Nombre: alergeno.Nombre,
        }])

        setAlergenoSeleccionado("");
    }
    const agregarNuevoIngrediente = (e) => {
        if(medidaIngrediente === 0 || ingredienteSeleccionado === "" || unidadSeleccionada === "")
            return;

        const ingrediente = ingredientes.find(ing => ing.IdIngrediente === ingredienteSeleccionado)
        const ingredienteDT = ingredientesModal.find(ing => ing.IdIngrediente === ingredienteSeleccionado)
        
        if(ingredienteDT)
        return;
    
        const CO2PorKilo = ingrediente.HuellaCarbono;
        let CO2 = 0;
        if(unidadSeleccionada === "KG" || unidadSeleccionada === "L"){
            CO2 = CO2PorKilo * medidaIngrediente;
        }
        else if(unidadSeleccionada === "GR" || unidadSeleccionada === "ML"){
            CO2 = CO2PorKilo / 1000 * medidaIngrediente;
        }
        else{
            CO2 = CO2PorKilo / 1000 * 15 * medidaIngrediente;
        }

        const vegano:boolean = recetaModal.Vegano && ingrediente.Vegano;
        const nuevoIngrediente = {
            IdIngrediente: ingredienteSeleccionado,
            Nombre: ingrediente.Nombre,
            Medida: medidaIngrediente,
            UnidadMedida: unidadSeleccionada,
            HuellaCarbono: CO2,
        }

        setValidadores({...validadores, Ingredientes: true})
        setIngredienteSeleccionado("");
        setIngredientesModal([...ingredientesModal, nuevoIngrediente])
        setRecetaModal({...recetaModal, Vegano: vegano, EmisionCarbono: recetaModal.EmisionCarbono + nuevoIngrediente.HuellaCarbono})
    }

    const cambioCampoNombre = (e) => {
        setValidadores({...validadores, Nombre: (e.target.value !== "")})
        setRecetaModal({
            ...recetaModal,
            Nombre: e.target.value
        })
    }
    const cambioCampoDescripcion = (e) => {
        setRecetaModal({
            ...recetaModal,
            Descripcion: e.target.value
        })
    }
    const cambioCampoPrecio = (value) => {
        if(Number.isNaN(value))
            return;
        if(value < 0)
            value = 0;
        setValidadores({...validadores, Precio: (value > 0)})
        setRecetaModal({
            ...recetaModal,
            Precio: value
        })
    }
    const cambioSelectMedidaIngrediente = (value) => {
        if(Number.isNaN(value))
            return;
        if(value < 0)
            value = 0;
        setMedidaIngrediente(value)
    }


    const actualizarImagen = (e) => {
        try{
            setImg(URL.createObjectURL(e.target.files[0]) ?? $noFoto);
            setImgBuff(e.target.files[0]);
            recetaModal.Foto = e.target.files[0].name;
        }catch(e){
        }
    }
    const imprimirReceta = async () => {
        const element = modalRef.current;
        console.log(element)
        const canvas = await html2canvas(element, {useCORS: true, onclone(document, element) {
            const textarea = element.querySelector("#descripcion") as HTMLElement
            const div = document.createElement('div')
            div.innerText = (textarea as HTMLInputElement).value
            textarea.style.display = 'none'
            textarea.parentElement.append(div)
        },});
    
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

    const validarCampos = () => {
        const val = {
            Nombre: (recetaModal.Nombre !== ""),
            Precio: (recetaModal.Precio !== "" && recetaModal.Precio > 0),
            Ingredientes: (ingredientesModal.length > 0),
        }
        setValidadores(val)
        return val.Nombre && val.Ingredientes && val.Precio;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validarCampos())
            return

        setCargando(true);
        let exito = false;
        if(!editarReceta || editarReceta===""){
            await AltaReceta(intl, recetaModal, ingredientesModal, alergenosModal, imgBuff).then((resultado) => {
                exito = resultado;
            })
        }
        else{
            await ModificarReceta(intl, recetaModal, ingredientesModal, alergenosModal, imgBuff, imgOriginal).then((resultado) => {
                exito = resultado;
            })
        }
        setCargando(false)
        if(!exito)
            return
        if(setActualizar)
            setActualizar()
        ocultarModal();
    }
    const eliminarReceta = (idReceta: string) => {
        ConfirmarEliminar(intl).then((result) => {
            if(result.isConfirmed){
                EliminarReceta(intl, idReceta).then(() => {
                    if(setActualizar)
                        setActualizar()
                    ocultarModal();
                })
            }
        })
    }

    const ocultarModal = () => {
        setTimeout(() => {
            setMedidaIngrediente(0);
            setUnidadSeleccionada("");
            setIngredienteSeleccionado("");
            setAlergenoSeleccionado("");
            setValidadores({Nombre: true, Precio: true, Ingredientes: true})
        }, 500);
        setShow(false)
    }

    return(
    <>
        <Modal size="lg" open={show} onClose={ocultarModal} style={{"fontFamily": "inter"}} overflow={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                {Traducir("recetario.detallesReceta")}
                </Modal.Title>
            </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body ref={modalRef} >
                        <Container>
                        <Row>
                            <Col md={12} lg={8}>
                                <label htmlFor="nombre" className='modal-input-text'>
                                    <h6 className='text-uppercase label-input'>{Traducir("recetario.formNombre")}</h6>
                                    <input type='text' placeholder={intl.formatMessage({id: 'recetario.modal.form.placeholder.nombre'})} className='modal-input-text without-borders input-receta-nombre fw-bold' name='nombre' id='nombre' value={recetaModal.Nombre} onChange={cambioCampoNombre}/>
                                    {!validadores.Nombre &&
                                        <p className='error-message'>{Traducir('recetario.modal.form.error.nombre')}</p>
                                    }
                                </label>

                                <label htmlFor="descripcion" className='modal-input-text'>
                                    <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formDescripcion")}</h6>
                                    <textarea placeholder={intl.formatMessage({id: 'recetario.modal.form.placeholder.descripcion'})} className='modal-input-text without-borders' name="descripcion" id='descripcion' rows={4} value={recetaModal.Descripcion} onChange={cambioCampoDescripcion}/>
                                </label>

                                <label htmlFor="precio" className='modal-input-text'>
                                    <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formPrecio")}</h6>
                                    <InputGroup inside className='without-borders box-shadow-none'>
                                        <InputGroup.Addon>$</InputGroup.Addon>
                                        <InputNumber placeholder={intl.formatMessage({id: 'recetario.modal.form.placeholder.precio'})} className='without-borders modal-input-money box-shadow-none' id='precio' value={recetaModal.Precio} onChange={cambioCampoPrecio}/>
                                    </InputGroup>
                                    {!validadores.Precio &&
                                        <p className='error-message'>{Traducir('recetario.modal.form.error.precio')}</p>
                                    }
                                </label>

                                <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formIngredientes")}</h6>
                                <DataTable
                                    columns={tableIngredientsColumns}
                                    data={ingredientesModal}
                                    responsive={true}
                                    dense={true}
                                />
                                <Row className='mt-4'>
                                    <Col xs="5">
                                        <SelectPicker
                                            key={ingredienteSeleccionado}
                                            data={ingredientes.map(item => ({ label: item.Nombre, value: item.IdIngrediente }))}
                                            defaultValue={ingredienteSeleccionado}
                                            onChange={(value) => setIngredienteSeleccionado(value ?? "")}
                                            disabledItemValues={ingredientesModal.map(item => item.IdIngrediente)}
                                            block
                                            size="md"
                                        />
                                    </Col>
                                    <Col xs="2">
                                        <InputNumber className='modal-input-select without-borders' value={medidaIngrediente} onChange={cambioSelectMedidaIngrediente}/>
                                    </Col>
                                    <Col xs="3">
                                        <SelectPicker
                                            key={unidadSeleccionada}
                                            data={optionType}
                                            defaultValue={unidadSeleccionada}
                                            onChange={(value) => setUnidadSeleccionada(value ?? "")}
                                            block
                                            size="md"
                                        />
                                    </Col>
                                    <Col xs="2" align="right">
                                        <Button appearance="primary" onClick={agregarNuevoIngrediente} className="modal-form-btn btn-primary-rs">
                                            {Traducir("recetario.formAgregar")}
                                        </Button>
                                    </Col>
                                </Row>
                                {!validadores.Ingredientes &&
                                    <p className='error-message mt-2'>{Traducir('recetario.modal.form.error.ingredientes')}</p>
                                }

                                <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formAlergenos")}</h6>

                                <div className="d-flex flex-wrap">
                                    {alergenosModal.map(item => (
                                        <span className="badge rounded-pill bg-primary pill-btn mt-2 me-2" key={item.IdAlergeno}>
                                            {item.Nombre}
                                            <MdClose size="18px" color='white' className='ms-1 cursor-pointer' onClick={() => {
                                                setAlergenosModal((alergenosModal.filter(alergeno => alergeno.IdAlergeno !==  item.IdAlergeno)))
                                            }}/>
                                        </span>
                                    ))}
                                </div>
                                <Row className='mt-4'>
                                    <Col>
                                        <SelectPicker
                                            key={alergenoSeleccionado}
                                            data={alergenos.map(item => ({label: item.Nombre, value: item.IdAlergeno}))}
                                            defaultValue={alergenoSeleccionado}
                                            onChange={(value) => setAlergenoSeleccionado(value ?? "")}
                                            disabledItemValues={alergenosModal.map(item => item.IdAlergeno)}
                                            block
                                            size="md"
                                        />
                                    </Col>
                                    <Col xs="3">
                                        <Button appearance="primary" onClick={agregarNuevoAlergeno} className="modal-form-btn btn-primary-rs" >
                                            {Traducir("recetario.formAgregar")}
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} lg={4}>
                                <Row>
                                    <Col>
                                        <h6 className='text-uppercase label-input'>{Traducir("recetario.formFoto")}</h6>
                                        <label htmlFor='fotoReceta'>
                                            <input id='fotoReceta' style={{display: "none"}} type="file" onChange={actualizarImagen} accept="image/*"/>
                                            <img className='rounded img-fluid cursor-pointer' src={img} alt="recipe"></img>
                                        </label>

                                        <h6 className='text-uppercase label-input mt-4'>{Traducir("recetario.formCarbon")}</h6>

                                        <div className='text-center'>
                                            <Medidor id="recetaMedidor" co2={ recetaModal.EmisionCarbono } />
                                        </div>

                                        <label className='mt-3' htmlFor='vegano'>
                                            <input className='me-2' type="checkbox" name="vegano" id="vegano" checked={recetaModal.Vegano} onChange={() => setRecetaModal({...recetaModal, Vegano: !recetaModal.Vegano})}/>
                                            <span>{Traducir('recetario.modal.form.placeholder.vegan')}</span>
                                        </label>
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
                                    {editarReceta && editarReceta !== "" &&
                                        <Button type='button' color="red" appearance="primary" onClick={() => eliminarReceta(editarReceta)}>
                                            <BsTrash /> {Traducir('recetario.modal.btnEliminar')}
                                        </Button>}
                                    {editarReceta && editarReceta !== "" &&
                                        <Button type='button' color="cyan" appearance="primary" onClick={imprimirReceta}>
                                            <BsPrinter /> {Traducir('recetario.modal.btnImprimir')}
                                        </Button>}
                                    <Button type="submit" appearance='primary' className='btn-primary-rs' loading={cargando}>
                                        <BiSave /> {Traducir('recetario.modal.btnGuardar')}
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </form>
        </Modal>
    </>
    )
}

export default ModalNuevaReceta;