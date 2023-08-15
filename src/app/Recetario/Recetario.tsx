import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Col, Row, Card, Container, Table } from 'react-bootstrap';
import { SelectPicker, Button, IconButton, ButtonToolbar } from 'rsuite';
import { CiGrid41, CiViewList, CiTrash, CiEdit} from "react-icons/ci";
import { TbLeaf } from "react-icons/tb";
import { useIntl } from 'react-intl';

import ModalNuevaReceta from './componentes/ModalNuevaReceta';
import { ObtenerRecetas, buscarEnRecetas, ObtenerDetallesReceta, ObtenerClientes, EliminarReceta, valoresReceta } from './RecetarioService';
import { Espera } from '@oxtron/componentes/base/Espera';
import { ConfirmarEliminar } from '@iikno/clases/Alertas';
import { $baseS3, $noFoto } from '@oxtron/configs/Env';
import { ObtenerSesion } from '../../@iikno/clases/LocalSession';

const Recetario = () => {
    const sesion = ObtenerSesion();
    const intl = useIntl()
    const [editarReceta, setEditarReceta] = useState("");
    const [show, setShow] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [viewTable, setViewTable] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState(sesion.EsUsuario ? "TODOS" : sesion.IdUsuario);
    const [recetas, setRecetas] = useState([]);
    const [recetasShow, setRecetasShow] = useState([]);
    const [ingredientesModal, setIngredientesModal] = React.useState([]);
    const [alergenosModal, setAlergenosModal] = React.useState([]);
    const [recetaModal, setRecetaModal] = React.useState(valoresReceta);

    useEffect(() => {
        if(sesion.EsUsuario){
            ObtenerClientes(false).then((respuesta:any) => {
                respuesta.unshift({NombreCompleto: intl.formatMessage({id: 'planificador.select.todos'}), IdCliente:"TODOS"});
                setClientes(respuesta.map(
                    (item:any) => ({ label: item.NombreCompleto, value: item.IdCliente })
                ));
            });
        }
    }, [intl, sesion.EsUsuario])

    useEffect(() => {
        setCargando(true)
        ObtenerRecetas(cliente, false).then((respuesta:any) => {
            setRecetas(respuesta);
            setRecetasShow(respuesta);
            setCargando(false)
        })
    }, [cliente])

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
            setRecetaModal(valoresReceta)
            setEditarReceta("")
        }, 500)
    }, [show])

    const buscar = (e: any) => {
        setRecetasShow(buscarEnRecetas(e.target.value, recetas))
    }    

    const eliminarReceta = (idReceta: string, ocultar:boolean = false) => {        
        ConfirmarEliminar(intl).then((result) => {
            if(result.isConfirmed){
                EliminarReceta(intl, idReceta).then(() => {
                    actualizar();
                    if(ocultar)
                        setShow(false);
                })
            }
        })        
    }

    const actualizar = () => {
        setCargando(true)
        ObtenerRecetas(cliente, false).then((respuesta:any) => {
            setRecetas(respuesta);
            setRecetasShow(respuesta);
            setCargando(false)
        })
    }

    return (
        <Base titulo={Traducir("recetario.titulo")}>
            <Container>
            <Row className='mb-3'>
                {
                    sesion.EsUsuario &&
                    <Col>
                        <SelectPicker
                            key={cliente}
                            data={clientes}                                
                            defaultValue={cliente}
                            onChange={setCliente}
                            cleanable={false}
                            block
                            size="md"
                        />
                    </Col>
                }
                <Col align="center">
                    <input type="text" 
                        className="form-control" 
                        onChange={buscar}
                        placeholder={intl.formatMessage({id:'recetario.barraBusqueda'})}
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
            {
                (recetas === null || cargando) &&
                <Espera/>
            }
            {
                (recetas !== null && recetas.length > 0 && !cargando) &&
                <>                    
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
                                            <Card style={{height: "100%"}} className="cursor-pointer card-recetario" onClick={() => { setEditarReceta(item.IdReceta) }}>
                                                <Card.Body>
                                                    <img className='rounded img-fluid' src={(!item.Foto || item.Foto === "no-image.png") ? $noFoto : ($baseS3+item.Foto)} alt="recipe" />
                                                    <Card.Title className='mt-3'>{item.Nombre}</Card.Title>
                                                    <Card.Text>
                                                    </Card.Text>
                                                    {item.Vegano &&
                                                        <Row>
                                                            <Col align="right"><TbLeaf size="24px" /> <span>{Traducir('recetario.vegan')}</span></Col>
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

                </>
            }
            {
                !cargando &&
                <ModalNuevaReceta 
                    show={show}
                    setShow={setShow}
                    recetaDetalles={recetaModal}
                    ingredientesDetalles={ingredientesModal}
                    alergenosDetalles={alergenosModal}
                    editarReceta={editarReceta}
                    setActualizar={actualizar}
                />
            }
            </Container>
        </Base>
    );
};

export default Recetario;