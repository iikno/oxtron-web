import React from 'react';
import { Modal } from 'react-bootstrap';

const Espera = (props:any) => {
    return (
        <Modal show={props.show}
        backdrop="static"
        keyboard={false}>
            <Modal.Header>
                <Modal.Title>Espera un momento</Modal.Title>
            </Modal.Header>
            <Modal.Body>Por favor espera mientras se procesa tu solicitud</Modal.Body>
        </Modal>
    );
};

export default Espera;