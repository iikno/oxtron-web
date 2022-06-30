import React from 'react'
import Flag from '../../styles/icons/flag.svg'
import '../../styles/MenuLateral/MenuSize.scss'
import { useTranslation } from 'react-i18next'

const Languajes = ({ pagina, setPagina, size}) =>{
    const [t, i18n] = useTranslation("global")

    const changeLanguageHandler = (e) =>{

        if(e.target.value === "en"){
            i18n.changeLanguage("en")
            if (pagina ==="Panel Principal") setPagina("Dashboard")
            if (pagina ==="Actividades") setPagina("Activities")
            if (pagina ==="Tipos de Usuario") setPagina("User Types")
            if (pagina ==="Menu de la Semana") setPagina("Week Menu")
            if (pagina ==="Imprimir Menu") setPagina("Print Menu")
            if (pagina ==="Libro de Recetas") setPagina("Recipe Book")
            if (pagina ==="Cuenta") setPagina("Account")
            if (pagina ==="Facturación") setPagina("Billing")
        }
        else if(e.target.value === "es"){
            i18n.changeLanguage("es")
            if (pagina ==="Dashboard") setPagina("Panel Principal")
            if (pagina ==="Activities") setPagina("Actividades")
            if (pagina ==="User Types") setPagina("Tipos de Usuario")
            if (pagina ==="Week Menu") setPagina("Menu de la Semana")
            if (pagina ==="Print Menu") setPagina("Imprimir Menu")
            if (pagina ==="Recipe Book") setPagina("Libro de Recetas")
            if (pagina ==="Account") setPagina("Cuenta")
            if (pagina ==="Billing") setPagina("Facturación")
        }
    }

    return(
        size 
        ?
            <div 
            className='menu-languaje d-flex mb-2' 
            >
                <img src={Flag} alt='left' className='normal-icon'/> 
                <select onChange={changeLanguageHandler} className='m-0 rounded selector-languaje'>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </div>
        :
            <div 
            className='menu-languaje d-flex mb-2' 
            >
                <img src={Flag} alt='left' className='icon-small mb-2'/> 
            </div>        
    )
}
export default Languajes