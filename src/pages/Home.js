import '../styles/home/home.scss';
import React, { useState, useEffect } from 'react';
import MenuLateral from '../components/MenuLateral/MenuLateral';
import Dashboard from './Dashboard';
import WeekMenu from './WeekMenu';
import RecipeBook from './RecipeBook';
import Account from './Account';
import Billing from './Billing';
import Activities from './Activities';
import UsersTypes from './UsersTypes';
import Users from './Users';
import { useNavigate } from "react-router-dom";

const Home = () =>{
    let navigate = useNavigate();
    const [pagina, setPagina] = useState("Dashboard")
    const [size, setSize] = useState(true)
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
      
    useEffect(() => {
        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));

        if (!localStorage.getItem("logged"))
            navigate("/login")
    }, []);

    if (pagina === "Dashboard" || pagina === "Panel Principal") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <Dashboard/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <Dashboard/>
            </div>
        )        
    }
    if (pagina === "Activities" || pagina === "Actividades") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <Activities/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <Activities/>
            </div>
        )    
    }

    if (pagina === "User Types" || pagina === "Tipos de Usuario") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <UsersTypes/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <UsersTypes/>
            </div>
        )    
    }

    if (pagina === "Week Menu" || pagina === "Menu de la Semana") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <WeekMenu/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <WeekMenu/>
            </div>
        )    
    }
    if (pagina === "Recipe Book" || pagina === "Libro de Recetas") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <RecipeBook/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <RecipeBook/>
            </div>
        )    
    }
    if (pagina === "Users" || pagina === "Usuarios") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <Users/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <Users/>
            </div>
        )    
    }
    if (pagina === "Account" || pagina === "Cuenta") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <Account/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <Account/>
            </div>
        )    
    }
    if (pagina === "Billing" || pagina === "Facturación") {
        if (matches === false && size === false) {
            return(
                <div className='home-column container-fluid'>
                    <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                    <Billing/>
                </div>
            )
        }
        return(
            <div className='home-row container-fluid'>
                <MenuLateral size={size} setSize={setSize} pagina={pagina} setPagina={setPagina}/>
                <Billing/>
            </div>
        )    
    }
}

export default Home