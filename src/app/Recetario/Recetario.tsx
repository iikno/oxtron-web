import React, { useEffect, useRef, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Col, Row, Card, Container, Table } from 'react-bootstrap';
import { SelectPicker, Button, IconButton, ButtonToolbar } from 'rsuite';
import { CiGrid41, CiViewList, CiWheat, CiTrash, CiEdit} from "react-icons/ci";

import ModalNuevaReceta from './componentes/ModalNuevaReceta';
import { ObtenerRecetas, valoresIniciales, buscarEnRecetas, ObtenerDetallesReceta, ObtenerClientes, EliminarReceta } from './RecetarioService';
import { Espera } from '@oxtron/componentes/base/Espera';
import { ConfirmarEliminar } from '../../@oxtron/componentes/alerts/alertas';
import { $baseS3, $noFoto } from '@oxtron/configs/Env';

const Recetario = () => {
    const [editarReceta, setEditarReceta] = useState("");
    const [show, setShow] = useState(false);
    const [viewTable, setViewTable] = useState(true);
    const [actualizar, setActualizar] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [selectCliente, setSelectCliente] = useState("");
    const [recetas, setRecetas] = useState([]);
    const [recetasShow, setRecetasShow] = useState([]);
    const [ingredientesModal, setIngredientesModal] = React.useState([]);
    const [alergenosModal, setAlergenosModal] = React.useState([]);
    const [recetaModal, setRecetaModal] = React.useState({
        IdReceta: "", IdUsuarioCliente: "", Nombre: "", Descripcion: "", Precio: 0.00, EmisionCarbono: 0, Vegano: false, Foto: "", FechaRegistro: ""
    });

    useEffect(() => {
        ObtenerRecetas(false).then((respuesta:any) => {
            setRecetas(respuesta);
            setRecetasShow(respuesta);
        })
        ObtenerClientes(false).then((respuesta:any) => {
            setClientes(respuesta);
        })
    }, [])

    useEffect(() => {
        if(!actualizar)
            return
        ObtenerRecetas(false).then((respuesta:any) => {
            setRecetas(respuesta);
            setRecetasShow(respuesta);
        })
        setActualizar(false)
    }, [actualizar])

    useEffect(() => {
        if(editarReceta === "")
            return
        ObtenerDetallesReceta(editarReceta ,false).then((respuesta:any) => {
            setAlergenosModal(respuesta.ALERGENOS)
            setIngredientesModal(respuesta.INGREDIENTES)
            setRecetaModal(respuesta.RECETA)
            setShow(true)
        })
    }, [editarReceta])

    useEffect(() => {
        if(show)
            return
        setTimeout(() => {
            setIngredientesModal([])
            setAlergenosModal([])
            setRecetaModal({
                IdReceta: "", IdUsuarioCliente: "", Nombre: "", Descripcion: "", Precio: 0.00, EmisionCarbono: 0, Vegano: false, Foto: "", FechaRegistro: ""
            })
            setEditarReceta("")
        }, 500)
    }, [show])

    const data = [{label:"Todos", value: ""}].concat(clientes.map(
        item => ({ label: item.NombreCompleto, value: item.IdCliente })
    ));

    const buscar = (e: any) => {
        setRecetasShow(buscarEnRecetas(e.target.value, recetas))
    }    

    const cambioEnSelectClientes = (value) => {
        let recetasMostrar = []
        if(!value || value === ""){
            recetasMostrar = recetas;
            value = "";
        }
        else{
            recetasMostrar = recetas.filter(receta => receta.IdUsuarioCliente === value)
        }
        setSelectCliente(value)
        setRecetasShow(recetasMostrar)        
    }

    const eliminarReceta = (idReceta: string, ocultar:boolean = false) => {
        ConfirmarEliminar().then((result) => {
            if(result.isConfirmed){
                EliminarReceta(idReceta).then(() => {
                    ObtenerRecetas(false).then((respuesta:any) => {
                        setRecetas(respuesta);
                        setRecetasShow(respuesta);
                    })
                    if(ocultar)
                        setShow(false);
                })
            }
        })
    }


    return (
        <Base titulo={Traducir("recetario.titulo")}>
            <Container>
            {
                (recetas === null || recetas.length === 0) &&
                <Espera/>
            }
            {
                (recetas !== null && recetas.length > 0) &&
                <>
                    <Row className='mb-3'>
                        <Col>
                            <SelectPicker
                                key={selectCliente}
                                data={data}                                
                                defaultValue={selectCliente}
                                onChange={cambioEnSelectClientes}
                                block
                                size="md"
                            />
                        </Col>
                        <Col align="center">
                            <input type="text" 
                                className="form-control" 
                                onChange={buscar}
                                placeholder="Buscar"
                            />                            
                        </Col>
                        <Col align="right">
                            <ButtonToolbar>
                                <IconButton icon={<CiViewList size="24px"/>} onClick={() => setViewTable(true)} active={viewTable}/>
                                <IconButton icon={<CiGrid41 size="24px"/>} onClick={() => setViewTable(false)} active={!viewTable}/>
                                <Button className='ms-3 btn-primary-rs' appearance="primary" onClick={() => setShow(true)}>
                                    {Traducir("recetario.nuevaReceta")}
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <Card>
                                <Card.Body>
                                    {viewTable &&
                                    <Table size="sm" responsive hover>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>{Traducir("recetario.titulo.Nombre")}</th>
                                                <th className='text-center'>{Traducir("recetario.titulo.Tipo")}</th>
                                                <th className='text-center'><span>Kg/CO<sup>2</sup>e</span> </th>
                                                <th className='text-center' style={{width: "200px"}}>{Traducir("recetario.opciones")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                recetasShow.map((item) => (
                                                    <tr key={item.IdReceta} className="align-middle">
                                                        <td>{item.Nombre}</td>
                                                        <td className='text-center'>{(item.Vegano) ? "Vegano" : "No Vegano"}</td>
                                                        <td className='text-center'>{Number.parseFloat(item.EmisionCarbono.toString()).toFixed(2)}</td>
                                                        <td className='text-center'>
                                                            <ButtonToolbar>
                                                                <IconButton icon={<CiEdit size="24px"/>} color="blue" appearance="subtle" onClick={() => { setEditarReceta(item.IdReceta) }}/>
                                                                <IconButton icon={<CiTrash size="24px"/>} color="red" appearance="subtle" onClick={() => eliminarReceta(item.IdReceta)}/>
                                                            </ButtonToolbar>                                                                                            
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    }
                                    {!viewTable &&
                                    <Row xs={1} sm={2} md={4}>
                                        {recetasShow.map((item) => (
                                        <Col key={item.IdReceta} className="mb-3">
                                            <Card style={{height: "100%"}} className="cursor-pointer" onClick={() => { setEditarReceta(item.IdReceta) }}>
                                                <Card.Img variant="top" src={(!item.Foto || item.Foto === "no-image.png") ? $noFoto : ($baseS3+item.Foto)} />
                                                <Card.Body>
                                                    <Card.Title>{item.Nombre}</Card.Title>
                                                    <Card.Text>
                                                    </Card.Text>
                                                    {item.Vegano &&
                                                        <Row>
                                                            <Col align="right"><CiWheat size="24px" /></Col>
                                                        </Row>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        ))}
                                    </Row>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <ModalNuevaReceta 
                        recetaModal={recetaModal}
                        setRecetaModal={setRecetaModal}
                        ingredientesModal={ingredientesModal}
                        setIngredientesModal={setIngredientesModal}
                        alergenosModal={alergenosModal}
                        setAlergenosModal={setAlergenosModal}
                        editarReceta={editarReceta}
                        show={show}
                        setShow={setShow}
                        setActualizar={setActualizar}
                    />
                </>
            }
            </Container>
        </Base>
    );
};

export default Recetario;