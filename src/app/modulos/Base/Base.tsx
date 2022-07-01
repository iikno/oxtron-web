import React, {useEffect, useState} from 'react';
import './Base.css'

import {$noFoto} from '../../../configs/Env'
import {ObtenerSesion} from '../../clases/LocalSession';
import './BaseService'
import { Link } from 'react-router-dom';

const Base = (props:any) => {
    const [sesion, setSesion] = useState(Object);

    useEffect(() => {
        setSesion(ObtenerSesion())
        console.log(sesion)
    }, [])

    if (sesion) 
        return (<>
            <header className="header" id="header">
                <div className="header_toggle"> <i className='d-md-none bx bx-menu header-toggle'></i> </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <span className='me-2'>{sesion.Nombre} ({sesion.TipoPersona})</span>
                    <div className="header_img"> 
                        <img src={(sesion.Foto !== null && sesion.Foto !== "") ? sesion.Foto : $noFoto} alt=""/> 
                    </div>
                </div>
            </header>
            <div className="l-navbar" id="nav-bar">
                <nav className="nav">
                    <div>
                        <a href="#" className="nav_logo">
                            <i className='bx bx-circle nav_logo-icon'></i>
                            <span className="nav_logo-name">OXTRON</span>
                        </a>
                        <div className="nav_list">
                            <Link to={"/dashboard"}  className="nav_link">
                                <i className='bx bx-grid-alt nav_icon'></i>
                                <span className="nav_name">Dashboard</span>
                            </Link>
                            <Link to={"/actividades"}  className="nav_link ">
                                <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
                                <span className="nav_name">Actividades</span>
                            </Link>
                            <Link to={"/usuarios/tiposUsuario"}  className="nav_link ">
                                <i className='bx bxs-user-detail nav_icon'></i>
                                <span className="nav_name">Tipos de usuario</span>
                            </Link>
                            <Link to={"/usuarios"}  className="nav_link ">
                                <i className='bx bx-user nav_icon'></i>
                                <span className="nav_name">Usuarios</span>
                            </Link>
                            <Link to={"/menuSemanal"}  className="nav_link ">
                                <i className='bx bx-calendar nav_icon'></i>
                                <span className="nav_name">Menú semanal</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <a href="#" className="nav_link">
                            <i className='bx bx-log-out nav_icon'></i>
                            <span className="nav_name">Salir</span>
                        </a>
                        <a href="#" className="d-none d-md-grid nav_link">
                            <i id='menuColapseGrande' className='bx bx-expand nav_icon header-toggle'></i>
                        </a>
                    </div>
                </nav>
            </div>
            <main>
                {props.children}
            </main>
        </>);
     else 
        return (<></>)
    
};

export default Base;
