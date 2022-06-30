
import React from 'react'
import Exit from '../../styles/icons/exit.svg'
import '../../styles/MenuLateral/MenuSize.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";


const Languajes = ({ size}) =>{
    let navigate = useNavigate();
    const [t] = useTranslation("global")

    return(
        size 
        ?
            <div 
            className='menu-size d-flex mb-2' 
            onClick={()=>{
                localStorage.clear();
                navigate("/login")
            }}
            >
                <img src={Exit} alt='left' className='normal-icon'/> 
                <p className='m-0'>{t("Menu.exit")}</p>
            </div>
        :
            <div 
            onClick={()=>localStorage.clear()}
            className='menu-size d-flex mb-2' 
            >
                <img src={Exit} alt='left' className='icon-small mb-2'/> 
            </div>        
    )
}
export default Languajes