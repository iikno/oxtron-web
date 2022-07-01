import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IniciarSesion } from './LoginService';
import './Login.css'
import { ObtenerSesion } from '../../clases/LocalSession';

const Login = () => {    
    const navegador = useNavigate();

    useEffect(() => {
        const sesion = ObtenerSesion();

        if(sesion !== null && sesion !== undefined && sesion != "")
            window.location.assign("/dashboard")
    })

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                {/*<div className="hidden col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">*/}
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form onSubmit={IniciarSesion}>
                    <div>
                        <p className="lead fw-normal mb-0 fs-2 text-center">Bienvenido a Oxtron</p>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Inicia sesión</p>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="email" id="correo" name='correo' className="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                        <label className="form-label" htmlFor="correo">Correo</label>
                    </div>

                    <div className="form-outline mb-3">
                        <input type="password" id="pass" name='pass' className="form-control form-control-lg"
                        placeholder="Enter password" />
                        <label className="form-label" htmlFor="pass">Password</label>
                    </div>

                    <div className="text-end">
                        <a href="#!" className="text-body">¿Olvidaste tu contraseña?</a>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button className="btn btn-primary btn-lg"
                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Iniciar sesión</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">¿No tienes una cuenta? <a href="#!"
                            className="link-danger">Registrate</a></p>
                    </div>

                    </form>
                </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div className="text-white mb-3 mb-md-0">
                Oxtron 2022 ® Todos los derechos reservados
                </div>

                <div>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#!" className="text-white">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                </div>
            </div>
        </section>
    );
};

export default Login;
