import '../../styles/MenuLateral/MenuLateral.scss';
import React, { useEffect, useState, useMemo } from 'react';
import UserBar from './UserBar';
import Boton from './Boton';
import LogOut from './LogOut'
import Languajes from './Languajes';
import Bar from '../../styles/icons/bar.svg'
import Calendar from '../../styles/icons/calendar.svg'
import Calendar3 from '../../styles/icons/calendar3.svg'
import Files from '../../styles/icons/files.svg'
import Menu from '../../styles/icons/menu.svg'
import Book from '../../styles/icons/book.svg'
import User from '../../styles/icons/user.svg'
import Bill from '../../styles/icons/bill.svg'
import MenuSize from './MenuSize';
import { useTranslation } from 'react-i18next'

const MenuLateral = ({size, setSize,pagina, setPagina}) =>{

    const [t] = useTranslation("global")

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 450px)").matches
    )
      
    useEffect(() => {
        window
        .matchMedia("(min-width: 450px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);
    //Pantalla pequeña, menu encogido
    if(matches === false && size===false){
        return(
            <div className="menulateral-screen-small d-flex flex-row justify-content-between align-items-center" >
                <div>
                    <MenuSize setSize={setSize} size={size}/>
                </div>        
                <div>
                    {/* <Languajes size={size}/>  */}
                    <UserBar size={size}/>
                </div>
            </div>
        )
    }
    //Pantalla pequeña, menu grande
    if(matches === false && size === true){
        return(
            <div className="menulateral-big d-flex flex-column justify-content-between" >
                <div>
                    <UserBar size={size}/>
                    <Boton size={size} icono={Bar} pagina={pagina} setPagina={setPagina} titulo={t("Menu.buttonDashboard")} />
                    <Boton size={size} icono={Calendar3} pagina={pagina} setPagina={setPagina} titulo={t("Menu.activities")}/>
                    <Boton size={size} icono={Files} pagina={pagina} setPagina={setPagina} titulo={t("Menu.userTypes")}/>
                    <Boton size={size} icono={Calendar} pagina={pagina} setPagina={setPagina} titulo={t("Menu.weekMenu")}/>
                    <Boton size={size} icono={Book} pagina={pagina} setPagina={setPagina} titulo={t("Menu.recipeBook")}/>
                    <Boton size={size} icono={User} pagina={pagina} setPagina={setPagina} titulo={t("Menu.users")}/>
                    {/* <Boton size={size} icono={User} pagina={pagina} setPagina={setPagina} titulo={t("Menu.account")}/> */}
                    <Boton size={size} icono={Bill} pagina={pagina} setPagina={setPagina} titulo={t("Menu.billing")}/>    
                </div>        
                <div  className='mt-4'>
                    <Languajes pagina={pagina} setPagina={setPagina} size={size}/> 
                    <LogOut size={size}/>
                    <MenuSize setSize={setSize} size={size}/>
                </div>
            </div>
        )
    }
    //Pantalla grande y menu grande
    if(matches && size === true){
        return(
            <div className="menulateral-big d-flex flex-column justify-content-between" >
                <div>
                    <UserBar size={size}/>
                    <Boton size={size} icono={Bar} pagina={pagina} setPagina={setPagina} titulo={t("Menu.buttonDashboard")} />
                    <Boton size={size} icono={Calendar3} pagina={pagina} setPagina={setPagina} titulo={t("Menu.activities")}/>
                    <Boton size={size} icono={Files} pagina={pagina} setPagina={setPagina} titulo={t("Menu.userTypes")}/>
                    <Boton size={size} icono={Calendar} pagina={pagina} setPagina={setPagina} titulo={t("Menu.weekMenu")}/>
                    <Boton size={size} icono={Book} pagina={pagina} setPagina={setPagina} titulo={t("Menu.recipeBook")}/>
                    <Boton size={size} icono={User} pagina={pagina} setPagina={setPagina} titulo={t("Menu.users")}/>
                    {/* <Boton size={size} icono={User} pagina={pagina} setPagina={setPagina} titulo={t("Menu.account")}/> */}
                    <Boton size={size} icono={Bill} pagina={pagina} setPagina={setPagina} titulo={t("Menu.billing")}/>    
                </div>        
                <div>
                    <Languajes pagina={pagina} setPagina={setPagina} size={size}/>     
                    <LogOut size={size}/>
                    <MenuSize setSize={setSize} size={size}/>
                </div>
            </div>
        )
    }
    //Pantalla grande y menu chico
    if(matches && size === false){
        return(
            <div className="menulateral-small d-flex flex-column justify-content-between align-items-center" >
                <div>
                    <UserBar size={size}/>
                    <Boton size={size} icono={Bar} pagina={pagina} setPagina={setPagina} titulo={t("Menu.buttonDashboard")} />
                    <Boton size={size} icono={Calendar3} pagina={pagina} setPagina={setPagina} titulo={t("Menu.activities")}/>
                    <Boton size={size} icono={Files} pagina={pagina} setPagina={setPagina} titulo={t("Menu.userTypes")}/>
                    <Boton size={size} icono={Calendar} pagina={pagina} setPagina={setPagina} titulo={t("Menu.weekMenu")}/>
                    <Boton size={size} icono={Book} pagina={pagina} setPagina={setPagina} titulo={t("Menu.recipeBook")}/>
                    <Boton size={size} icono={User} pagina={pagina} setPagina={setPagina} titulo={t("Menu.users")}/>
                    {/* <Boton size={size} icono={User} pagina={pagina} setPagina={setPagina} titulo={t("Menu.account")}/> */}
                    <Boton size={size} icono={Bill} pagina={pagina} setPagina={setPagina} titulo={t("Menu.billing")}/>    
                </div>        
                <div>
                    <Languajes pagina={pagina} setPagina={setPagina} size={size}/>     
                    <LogOut size={size}/>
                    <MenuSize setSize={setSize} size={size}/>
                </div>
            </div>
        )
    }
}

export default MenuLateral