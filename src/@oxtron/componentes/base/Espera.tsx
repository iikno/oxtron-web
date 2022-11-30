import { Col, Row, Spinner } from "react-bootstrap";

export const Espera = () => (
    <Row>
        <Col className='text-center m-5'>
            <Spinner animation='grow'/>
        </Col>
    </Row>
)