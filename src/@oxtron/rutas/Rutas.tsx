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
                            <Route index path='actividades' element={<Actividades/>}/>
                            <Route index path='usuarios' element={<Usuarios/>}/>
                            <Route index path='clientes' element={<Clientes/>}/>
                            <Route index path='recetario' element={<Recetario/>}/>
                            <Route path='*' element={<>404</>}/>
                        </Routes>
                    }/>
                </>
            }
        </Routes>
    );
};

export default Rutas;