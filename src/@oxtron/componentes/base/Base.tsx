import React, { useRef } from 'react';
import './Base.scss'

import { Navigate } from 'react-router-dom';
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { Container, Content, Grid, Header, FlexboxGrid, Dropdown, Divider, Avatar, Whisper, Tooltip, Button  } from 'rsuite';

import { useRecoilState, useRecoilValue } from 'recoil';
import { SideBarMenu } from '../sidebar/SideBarMenu';
import { classNames } from '@iikno/clases/Utils';
import { MenuAtom } from '@oxtron/atomos/MenuAtom';
import { LOCALES } from '../../i18n/Locales';
import { enUS } from 'rsuite/esm/locales';
import { esES } from 'rsuite/esm/locales';
import Footer from '@iikno/componentes/Footer';

import { CiCalendarDate, CiForkAndKnife } from "react-icons/ci";
import { Col, Row } from 'react-bootstrap';
import Traducir from '@oxtron/i18n/Traducir';
import { useEffect } from 'react';
import { LocaleAtom } from '@oxtron/atomos/LocaleAtom';

const Base = ({children, titulo}:{children:any; titulo:JSX.Element;}) => {
    const sesion = ObtenerSesion();
    const isOpen = useRecoilValue(MenuAtom);
    const [locale, setLocale] = useRecoilState(LocaleAtom);

    useEffect(() => {
        if(locale.localeIntl === "es-MX"){
            setLocale({
                localeIntl: LOCALES.ESPAÑOL,
                localeRSuite: esES
            })
        }else{
            setLocale({
                localeIntl: LOCALES.ENGLISH,
                localeRSuite: enUS
            })
        }
    },[])

    const renderIconButton = (props:any, ref:any) => {
        return (
            <FlexboxGrid justify="center" align='middle'>
                <span className='me-2'>{sesion.Nombre} {sesion.ApellidoPaterno}</span>
                <Avatar circle alt="fotoPerfil" {...props} ref={ref}></Avatar>
            </FlexboxGrid>
        );
    };

    if (sesion.IdUsuario !== "IdUsuario") 
        return (<>
                <Container>
                    <SideBarMenu/>
                    <Container className={classNames('bodyContainer', isOpen ? 'expanded' : 'collapsed')}>
                        <Header className='p-2 px-md-5 pt-md-5'>
                            <Row>
                                <Col xs={12} sm={6} lg={4} className="order-sm-first">
                                    <h3 className='fs-3 text-muted'>{titulo}</h3>
                                </Col>
                                <Col xs={12} sm={6} lg={4} className='toolbox offset-lg-4 order-first text-end mb-3 mb-sm-0'>
                                    <Whisper trigger={"hover"} 
                                            speaker={
                                        <Tooltip placement='bottom' arrow={false}>
                                            {Traducir('general.menuSuperior.planificador')}
                                        </Tooltip>
                                    }>
                                        <Button appearance='subtle'>
                                            <CiCalendarDate size={"2em"}/>
                                        </Button>
                                    </Whisper>
                                    <Whisper trigger={"hover"} 
                                            speaker={
                                        <Tooltip placement='bottom' arrow={false}>
                                            {Traducir('general.menuSuperior.recetario')}
                                        </Tooltip>
                                    }>
                                        <Button appearance='subtle'>
                                            <CiForkAndKnife size={"2em"}/>
                                        </Button>
                                    </Whisper>
                                    <Divider vertical/>
                                    <Dropdown renderToggle={renderIconButton} trigger={"hover"} placement="bottomEnd">
                                        <Dropdown.Item>{Traducir("general.menuSuperior.perfil")}</Dropdown.Item>
                                        <Dropdown.Item divider/>
                                        <Dropdown.Item>{Traducir("general.menuSuperior.salir")}</Dropdown.Item>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Header>
                        <Content className='p-2 p-md-5'>
                            <Grid fluid>
                                {children}
                            </Grid>
                        </Content>
                        <Footer/>
                    </Container>
                </Container>
        </>);
     else 
        return (<Navigate to={"/"}/>)
    
};

export default Base;
