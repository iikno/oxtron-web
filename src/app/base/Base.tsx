import React from 'react';
import './Base.scss'

import {$noFoto} from '../../configs/Env'
import { Navigate, useLocation } from 'react-router-dom';
import { ObtenerSesion } from '../../@iikno/clases/LocalSession';
import { Button, Col, Container, Content, Grid, Header, Nav, Navbar, Row, Sidebar, Sidenav } from 'rsuite';

import DashboardIcon from '@rsuite/icons/Dashboard';
import ScatterIcon from '@rsuite/icons/Scatter';
import CalendarIcon from '@rsuite/icons/Calendar';
import TextImageIcon from '@rsuite/icons/TextImage';
import PeoplesIcon from '@rsuite/icons/Peoples';
import ParagraphIcon from '@rsuite/icons/Paragraph';

import Logo from '../assets/Isotipo W.png'
import Traducir from '../../i18n/Traducir';
import { useSetRecoilState } from 'recoil';
import { LocaleAtom } from '../atomos/LocaleAtom';
import { LOCALES } from '../../i18n/Locales';
import { enUS } from 'rsuite/esm/locales';
import { esES } from 'rsuite/esm/locales';

const Base = ({children, titulo}:{children:any; titulo:JSX.Element;}) => {
    const sesion = ObtenerSesion();
    const setLenguaje = useSetRecoilState(LocaleAtom);
    const path = useLocation().pathname;

    if (sesion.IdUsuario !== "IdUsuario") 
        return (<>
            <div className="show-fake-browser sidebar-page">
                <Container>
                    <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={260}
                    collapsible
                    className='vh-100 bg-primary'
                    >
                        <Sidenav.Header className='p-4 text-center'>
                            <img src={Logo} height="70px" alt='logo'/>
                        </Sidenav.Header>
                        <Sidenav className='vh-100 pt-4' expanded={true} defaultOpenKeys={['3']} appearance="subtle">
                            <Sidenav.Body>
                            <Nav>
                                <Nav.Item active={(path === "/dashboard") ? true : false} href='/dashboard'>
                                    <div className='text-center'>
                                        <DashboardIcon style={{
                                            fontSize:"1.5em"
                                        }}/>
                                        <span className='d-block titulo'>
                                            {Traducir("general.menu.dashboard")}
                                        </span>
                                    </div>
                                </Nav.Item>
                                <Nav.Item active={(path === "/actividades") ? true : false} href='/actividades'>
                                    <div className='text-center'>
                                        <ScatterIcon style={{
                                            fontSize:"1.5em"
                                        }}/>
                                        <span className='d-block titulo'>
                                            {Traducir("general.menu.activities")}
                                        </span>
                                    </div>
                                </Nav.Item>
                                <Nav.Item active={(path === "/planificador") ? true : false} href='/planificador'>
                                    <div className='text-center'>
                                        <CalendarIcon style={{
                                            fontSize:"1.5em"
                                        }}/>
                                        <span className='d-block titulo'>
                                            {Traducir("general.menu.weekMenu")}
                                        </span>
                                    </div>
                                </Nav.Item>
                                <Nav.Item active={(path === "/recetario") ? true : false} href='/recetario'>
                                    <div className='text-center'>
                                        <TextImageIcon style={{
                                            fontSize:"1.5em"
                                        }}/>
                                        <span className='d-block titulo'>
                                            {Traducir("general.menu.recipeBook")}
                                        </span>
                                    </div>
                                </Nav.Item>
                                <Nav.Item active={(path === "/usuarios") ? true : false} href='/usuarios'>
                                    <div className='text-center'>
                                        <PeoplesIcon style={{
                                            fontSize:"1.5em"
                                        }}/>
                                        <span className='d-block titulo'>
                                            {Traducir("general.menu.users")}
                                        </span>
                                    </div>
                                </Nav.Item>
                                <Nav.Item active={(path === "/reportes") ? true : false} href='/reportes'>
                                    <div className='text-center'>
                                        <ParagraphIcon style={{
                                            fontSize:"1.5em"
                                        }}/>
                                        <span className='d-block titulo'>
                                            {Traducir("general.menu.reports")}
                                        </span>
                                    </div>
                                </Nav.Item>
                            </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                    </Sidebar>

                    <Container>
                    <Header className='p-3'>
                        <Navbar appearance="subtle">
                            <Navbar.Brand>
                                <h3>{titulo}</h3>
                            </Navbar.Brand>
                            <Nav pullRight>
                            <Nav.Menu placement={"bottomEnd"} title={
                                <img src={$noFoto} height={50} className="rounded-circle"/>
                            }>
                                <Nav.Item panel className='p-3'>
                                    <span className='fs-6'>Nombre Apellidos</span>
                                </Nav.Item>
                                <Nav.Item divider/>
                                <Nav.Item>Team</Nav.Item>
                                <Nav.Item>Contact</Nav.Item>
                                <Nav.Item divider/>
                                <Nav.Item panel className='p-1'>
                                    <Row>
                                        <Col className="text-center">
                                            <Button type='button' onClick={() => {
                                                setLenguaje({
                                                    localeIntl: LOCALES.ENGLISH,
                                                    localeRSuite: enUS
                                                })
                                            }}>english</Button>
                                        </Col>
                                        <Col className='text-center'>
                                            <Button type='button' onClick={() => {
                                                setLenguaje({
                                                    localeIntl: LOCALES.ESPAÑOL,
                                                    localeRSuite: esES
                                                })
                                            }}>español</Button>
                                        </Col>
                                    </Row>
                                </Nav.Item>
                            </Nav.Menu>
                            </Nav>
                        </Navbar>
                    </Header>
                    <Content className='p-5'>
                        <Grid fluid>
                            {children}
                        </Grid>
                    </Content>
                    </Container>
                </Container>
            </div>
        </>);
     else 
        return (<Navigate to={"/"}/>)
    
};

export default Base;
