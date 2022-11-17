import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SesionAtom } from '../app/atomos/SesionAtom';
import Actividades from '../app/modulos/Actividades/Actividades';
import Dashboard from '../app/modulos/Dashboard/Dashboard';
import Login from '../app/modulos/Login/Login';

const Rutas = () => {
    const sesion = useRecoilValue(SesionAtom);

    return (
        <Routes>
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
                            <Route index path='dashboard' element={<Dashboard/>}/>
                            <Route path='actividades' element={<Actividades/>}/>

                            <Route path='*' element={<>404</>}/>
                        </Routes>
                    }/>
                </>
            }
        </Routes>
    );
};

export default Rutas;