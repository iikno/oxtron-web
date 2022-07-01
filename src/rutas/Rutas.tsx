import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Actividades from '../app/modulos/Actividades/Actividades';
import Dashboard from '../app/modulos/Dashboard/Dashboard';
import Login from '../app/modulos/Login/Login';

const Rutas = () => {
    return (
        <Routes>            
            <Route index element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/actividades" element={<Actividades/>}/>
        </Routes>
    );
};

export default Rutas;