import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Col, Row, Container } from 'react-bootstrap';
import { Button, ButtonToolbar, Modal, Uploader } from 'rsuite';
import { BiUpload } from "react-icons/bi";

import Traducir from '@oxtron/i18n/Traducir';
import { FileType } from 'rsuite/esm/Uploader';
import moment from 'moment';
import { SubirArchivos } from './SubirArchivosService';

const ModalSubirArchivos = (
    {show, setShow}:
    {show: boolean, setShow: any}
) => {
    const intl = useIntl();
    const [date] = useState(new Date());
    const [archivos, setArchivos] = useState<FileType[]>([]);    
    const [cargando, setCargando] = useState(false);
    const [validos, setValidos] = useState(false);

    const modalRef = useRef(null)

    const subirArchivos = async (e) => {
        e.preventDefault();
        if(!validos) return;        

        setCargando(true);
        const response = await SubirArchivos(archivos, date, intl);
        if(response){
            ocultarModal();
        }        
        
        setCargando(false)
    }    

    const ocultarModal = () => {
        setTimeout(() => {
            setArchivos([]);
            setCargando(false);
            setValidos(false);
        }, 500);
        setShow(false)
    }

    const verificarExtensionArchivos = (archivos:FileType[]) => {
        let validos = true;
        archivos.forEach((archivo) => {
            if(archivo.name.split('.').pop() !== "xlsx" && archivo.name.split('.').pop() !== "xls"){
                validos = false;                
            }
        })
        return validos;
    }

    const cambioArchivos = (archivos:FileType[]) => {
        setArchivos(archivos);
        setValidos(archivos.length > 0 && verificarExtensionArchivos(archivos));
    }

    

    return(
    <>
        <Modal size="sm" open={show} onClose={ocultarModal} style={{"fontFamily": "inter"}} overflow={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                {Traducir("general.modal.title")}
                </Modal.Title>
            </Modal.Header>
                <Modal.Body ref={modalRef} >
                    <Container>
                        <label htmlFor="nombre" className='modal-input-text mb-3'>
                            <span className='label-modal'>{Traducir("general.modal.date")}</span>
                            <h6>{moment(date).format('DD/MM/YYYY')}</h6>
                            {/* <DatePicker 
                                className='modal-input-text without-borders input-receta-nombre fw-bold'
                                format="dd-MM-yyyy"
                                cleanable={false}
                                value={date}
                                readOnly                                    
                            /> */}
                        </label>
                        <Uploader 
                            action="//jsonplaceholder.typicode.com/posts/" 
                            autoUpload={false}
                            accept='.xlsx, .xls'
                            draggable
                            multiple
                            fileList={archivos}
                            onChange={cambioArchivos}
                            removable={!cargando}
                        >
                            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className='label-modal'>{intl.formatMessage({id:'general.modal.uploadDescription'})}</span>
                            </div>
                        </Uploader>
                        {
                            !validos && archivos.length > 0 &&
                            <span className='label-modal text-danger'>{intl.formatMessage({id:'general.modal.uploadDescriptionError'})}</span>
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer className='mt-2'>
                    <Row>
                        <Col align="center">
                            {
                                archivos.length > 0 && validos && 
                                <ButtonToolbar >
                                    <Button 
                                        type="submit" 
                                        appearance='primary' 
                                        className='btn-primary-rs' 
                                        loading={cargando} 
                                        onClick={subirArchivos}
                                    >
                                        <BiUpload /> {Traducir('general.modal.upload')}
                                    </Button>
                                </ButtonToolbar>
                            }
                        </Col>
                    </Row>
                </Modal.Footer>
        </Modal>
    </>
    )
}

export default ModalSubirArchivos;