import React, { useEffect, useState } from 'react';
import Traducir from '@oxtron/i18n/Traducir';
import Base from '@oxtron/componentes/base/Base';
import { Col, Container, Row } from 'react-bootstrap';

import { ModificarPerfil, ObtenerPerfil, valoresInicialesUsuario } from './PerfilService';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Espera } from '@oxtron/componentes/base/Espera';
import {useIntl} from 'react-intl';
import { $noFoto } from '@oxtron/configs/Env';
import { useFormik } from 'formik';
import { PerfilInterface } from '@oxtron/Interfaces/PerfilInterface';

import { Button } from 'rsuite';
import { BiSave } from "react-icons/bi";
import { ValidarImg } from '@iikno/clases/Utils';

const Perfil = () => {
    const sesion = ObtenerSesion();
    const intl = useIntl();
    const [perfil, setPerfil] = useState<PerfilInterface>(valoresInicialesUsuario);

    const [img, setImg] = useState($noFoto);
    const [imgBuff, setImgBuff] = useState(null);
    const [imagenOriginal, setImagenOriginal] = useState(null);
    const [cargando, setCargando] = useState(false);

    const formik = useFormik({
        initialValues: perfil,
        enableReinitialize: true,
        validate: values => {
            const errors = {};
            if(!values.Nombre){
                errors["Nombre"] = "Campo requerido";
            }
            if(!values.ApellidoPaterno){
                errors["ApellidoPaterno"] = "Campo requerido";
            }
            if(!values.ApellidoMaterno){
                errors["ApellidoMaterno"] = "Campo requerido";
            }
            if(!values.Correo){
                errors["Correo"] = "Campo requerido";
            }
            if(!values.Telefono){
                errors["Telefono"] = "Campo requerido";
            }            
            return errors;
        },
        onSubmit: values => {
            setCargando(true);
            ModificarPerfil(values, imgBuff, imagenOriginal, intl).then((respuesta) => {
                if(respuesta){
                    ObtenerPerfil(true).then((respuesta:any) => {
                        setPerfil(respuesta);
                        setImagenOriginal(respuesta.Foto);
                        setImg(ValidarImg(respuesta.Foto));
                        setCargando(false)
                    });
                }
                else{
                    setCargando(false)
                }
            });
        },
    });

    useEffect(() => {        
        ObtenerPerfil().then((respuesta:any) => {
            setPerfil(respuesta);
            setImagenOriginal(respuesta.Foto);
            setImg(ValidarImg(respuesta.Foto));
        });
    }, [])

    const actualizarImagen = (e) => {
        try{
            setImg(URL.createObjectURL(e.target.files[0]) ?? $noFoto);
            setImgBuff(e.target.files[0]);
            formik.setFieldValue("Foto", e.target.files[0].name);
        }catch(e){
        }
    }

    return (
        <Base titulo={Traducir("perfil.titulo")}>
            {
                perfil === null && perfil === valoresInicialesUsuario &&
                <Espera/>
            }
            {
                perfil !== null && perfil !== valoresInicialesUsuario &&
                <form onSubmit={formik.handleSubmit}>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <h6 className='text-uppercase label-input'>{Traducir("perfil.foto")}</h6>
                                <label htmlFor='fotoReceta' className='pb-2'>
                                    <input id='fotoReceta' style={{display: "none"}} type="file" onChange={actualizarImagen} accept="image/*"/>
                                    <img className='rounded img-fluid cursor-pointer' src={img} alt="recipe"></img>
                                </label>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col xs={12} lg={6}>
                                        <label htmlFor="nombre" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.nombre")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.nombre'})} 
                                                className='form-control'
                                                name='nombre' 
                                                id='nombre' 
                                                value={formik.values.Nombre} 
                                                onChange={(v) => formik.setFieldValue("Nombre", v.currentTarget.value)}
                                            />
                                            {
                                                (formik.touched.Nombre && formik.errors.Nombre) &&
                                                <span className='text-danger'>{formik.errors.Nombre}</span>
                                            }
                                        </label>
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <label htmlFor="apellidoPaterno" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.apellidoPaterno")}</h6>
                                            <input 
                                                type='text'
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.apellidoPaterno'})} 
                                                className='form-control'
                                                name='apellidoPaterno' 
                                                id='apellidoPaterno' 
                                                value={formik.values.ApellidoPaterno} 
                                                onChange={(v) => formik.setFieldValue("ApellidoPaterno", v.currentTarget.value)}
                                            />
                                            {
                                                (formik.touched.ApellidoPaterno && formik.errors.ApellidoPaterno) &&
                                                <span className='text-danger'>{formik.errors.ApellidoPaterno}</span>
                                            }
                                        </label>
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <label htmlFor="apellidoMaterno" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.apellidoMaterno")}</h6>
                                            <input 
                                                type='text'
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.apellidoMaterno'})} 
                                                className='form-control'
                                                name='apellidoMaterno' 
                                                id='apellidoMaterno' 
                                                value={formik.values.ApellidoMaterno} 
                                                onChange={(v) => formik.setFieldValue("ApellidoMaterno", v.currentTarget.value)}
                                            />
                                            {
                                                (formik.touched.ApellidoMaterno && formik.errors.ApellidoMaterno) &&
                                                <span className='text-danger'>{formik.errors.ApellidoMaterno}</span>
                                            }
                                        </label>
                                    </Col>                                    
                                </Row>

                                <Row className='mt-2'>
                                    <Col xs={12} lg={6}>
                                        <label htmlFor="correo" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.correo")}</h6>
                                            <input 
                                                type='text'
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.correo'})} 
                                                className='form-control'
                                                name='correo' 
                                                id='correo' 
                                                value={formik.values.Correo} 
                                                onChange={(v) => formik.setFieldValue("Correo", v.currentTarget.value)}
                                            />
                                            {
                                                (formik.touched.Correo && formik.errors.Correo) &&
                                                <span className='text-danger'>{formik.errors.Correo}</span>
                                            }
                                        </label>
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <label htmlFor="telefono" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.telefono")}</h6>
                                            <input 
                                                type='text'
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.telefono'})} 
                                                className='form-control'
                                                name='telefono' 
                                                id='telefono' 
                                                value={formik.values.Telefono} 
                                                onChange={(v) => formik.setFieldValue("Telefono", v.currentTarget.value)}
                                            />
                                            {
                                                (formik.touched.Telefono && formik.errors.Telefono) &&
                                                <span className='text-danger'>{formik.errors.Telefono}</span>
                                            }
                                        </label>
                                    </Col>
                                </Row>
                            </Col>
                            {
                                !sesion.EsUsuario && 
                                <Col xs={12}>
                                    <Row className='mt-4'>                                    
                                        <Col xs={12} lg={5}>
                                            <label htmlFor="empresa" className='modal-input-text mb-2'>
                                                <h6 className='text-uppercase label-input'>{Traducir("perfil.empresa")}</h6>
                                                <input 
                                                    type='text' 
                                                    placeholder={intl.formatMessage({id: 'perfil.placeholder.empresa'})} 
                                                    className='form-control'
                                                    name='empresa' 
                                                    id='empresa' 
                                                    value={formik.values.Empresa} 
                                                    onChange={(v) => formik.setFieldValue("Empresa", v.currentTarget.value)}
                                                />
                                            </label>
                                        </Col>

                                        <Col xs={12} lg={5}>
                                            <label htmlFor="sucursal" className='modal-input-text mb-2'>
                                                <h6 className='text-uppercase label-input'>{Traducir("perfil.sucursal")}</h6>
                                                <input 
                                                    type='text' 
                                                    placeholder={intl.formatMessage({id: 'perfil.placeholder.sucursal'})} 
                                                    className='form-control'
                                                    name='sucursal' 
                                                    id='sucursal' 
                                                    value={formik.values.Sucursal} 
                                                    onChange={(v) => formik.setFieldValue("Sucursal", v.currentTarget.value)}
                                                />
                                            </label>
                                        </Col>

                                        <Col xs={12} lg={2}>
                                            <label htmlFor="tamanioCompania" className='modal-input-text mb-2'>
                                                <h6 className='text-uppercase label-input'>{Traducir("perfil.tamanioCompania")}</h6>
                                                <input 
                                                    type='text' 
                                                    placeholder={intl.formatMessage({id: 'perfil.placeholder.tamanioCompania'})} 
                                                    className='form-control'
                                                    name='tamanioCompania' 
                                                    id='tamanioCompania' 
                                                    value={formik.values.TamanioCompania} 
                                                    onChange={(v) => formik.setFieldValue("TamanioCompania", v.currentTarget.value)}
                                                />
                                            </label>
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            <Col xs={12}>
                                <Row className='mt-4'>
                                    <Col xs={12} lg={6}>
                                        <label htmlFor="calle" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.calle")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.calle'})} 
                                                className='form-control'
                                                name='calle' 
                                                id='calle' 
                                                value={formik.values.Calle} 
                                                onChange={(v) => formik.setFieldValue("Calle", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={6} lg={3}>
                                        <label htmlFor="noExterior" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.noExterior")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.noExterior'})} 
                                                className='form-control'
                                                name='noExterior' 
                                                id='noExterior' 
                                                value={formik.values.NoExterior} 
                                                onChange={(v) => formik.setFieldValue("NoExterior", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={6} lg={3}>
                                        <label htmlFor="noInterior" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.noInterior")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.noInterior'})} 
                                                className='form-control'
                                                name='noInterior' 
                                                id='noInterior' 
                                                value={formik.values.NoInterior} 
                                                onChange={(v) => formik.setFieldValue("NoInterior", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={12} lg={6}>
                                        <label htmlFor="colonia" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.colonia")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.colonia'})} 
                                                className='form-control'
                                                name='colonia' 
                                                id='colonia' 
                                                value={formik.values.Colonia} 
                                                onChange={(v) => formik.setFieldValue("Colonia", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={12} lg={6}>
                                        <label htmlFor="codigoPostal" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.codigoPostal")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.codigoPostal'})} 
                                                className='form-control'
                                                name='codigoPostal' 
                                                id='codigoPostal' 
                                                value={formik.values.CodigoPostal} 
                                                onChange={(v) => formik.setFieldValue("CodigoPostal", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={12} lg={6}>
                                        <label htmlFor="municipio" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.municipio")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.municipio'})} 
                                                className='form-control'
                                                name='municipio' 
                                                id='municipio' 
                                                value={formik.values.Municipio} 
                                                onChange={(v) => formik.setFieldValue("Municipio", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={12} lg={6}>
                                        <label htmlFor="estado" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.estado")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.estado'})} 
                                                className='form-control'
                                                name='estado' 
                                                id='estado' 
                                                value={formik.values.Estado} 
                                                onChange={(v) => formik.setFieldValue("Estado", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>

                                    <Col xs={12} lg={6}>
                                        <label htmlFor="pais" className='modal-input-text mb-2'>
                                            <h6 className='text-uppercase label-input'>{Traducir("perfil.pais")}</h6>
                                            <input 
                                                type='text' 
                                                placeholder={intl.formatMessage({id: 'perfil.placeholder.pais'})} 
                                                className='form-control'
                                                name='pais' 
                                                id='pais' 
                                                value={formik.values.Pais} 
                                                onChange={(v) => formik.setFieldValue("Pais", v.currentTarget.value)}
                                            />
                                        </label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {
                            (formik.dirty && formik.isValid) &&
                            <Row>
                                <Col align="right">
                                    <Button type="submit" appearance='primary' className='btn-primary-rs' loading={cargando}>
                                        <BiSave /> {Traducir('perfil.boton.guardar')}
                                    </Button>
                                </Col>
                            </Row>
                        }
                    </Container>
                </form>
            }
        </Base>
    );
};

export default Perfil;