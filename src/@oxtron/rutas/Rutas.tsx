import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SesionAtom } from '../atomos/SesionAtom';
import Dashboard from '../../app/Dashboard/Dashboard';
import Login from '../../app/Login/Login';
import Usuarios from 'app/Usuarios/Usuarios';
import Clientes from 'app/Clientes/Clientes';
import Actividades from 'app/Actividades/Actividades';
import Recetario from 'app/Recetario/Recetario';
import Planificador from '../../app/Planificador/Planificador';
import Reportes from '../../app/Reportes/Reportes';
import Perfil from '../../app/Perfil/Perfil';
import Activar from 'app/Activar/Activar';
import ActivarActivado from 'app/Activar/ActivarActivado';

const Rutas = () => {
    const sesion = useRecoilValue(SesionAtom);

    return (
        <Routes>
            <Route index element={<></>}/>
            <Route path="*" element={<></>}/>
        </Routes>
    );

    /*return (
        <Routes>
            <Route path='/activar/:usuario/:id/:esUsuario/:fecha' element={<Activar />}/>
            <Route path='/activar/activado' element={<ActivarActivado/>}/>

            {
                sesion.IdUsuario === "IdUsuario" &&
                <Route index element={<Login/>}/>
            }
            {
                sesion.IdUsuario !== "IdIsuario" &&
                <>
                    <Route index element={<Navigate to={"/dashboard"}/>}/>
                    
                    <Route path='/*' element={
                        <Routes>
                            <Route path='perfil' element={<Perfil/>}/>
                            <Route path='dashboard' element={<Dashboard/>}/>
                            <Route path='recetario' element={<Recetario/>}/>
                            <Route path='planificador' element={<Planificador/>}/>
                            <Route path='reportes' element={<Reportes/>}/>
                            <Route path='actividades' element={(sesion.EsUsuario) ? <Actividades/> : <Navigate to={"/dashboard"} />}/>
                            <Route path='clientes' element={(sesion.EsUsuario) ? <Clientes/> : <Navigate to={"/dashboard"} />}/>
                            <Route path='usuarios' element={(sesion.EsUsuario) ? <Usuarios/> : <Navigate to={"/dashboard"} />}/>
                            <Route path='*' element={<>404</>}/>
                        </Routes>
                    }/>
                </>
            }
        </Routes>
    );*/
};

export default Rutas;