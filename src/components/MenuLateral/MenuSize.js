import React from 'react'
import Left from '../../styles/icons/left.svg'
import Right from '../../styles/icons/right.svg'
import '../../styles/MenuLateral/MenuSize.scss'
import { useTranslation } from 'react-i18next'

const MenuSize = ({setSize, size}) =>{
    const [t] = useTranslation("global")

    return(
        size 
        ?
        <div 
        className='menu-size d-flex mb-4' 
        onClick={()=>setSize(!size)}
        >
            <img src={Left} alt='left' className='normal-icon'/> 
            <p className='m-0'>{t("Menu.size")}</p>
        </div>
        :
        <div 
        className='menu-size d-flex mb-2' 
        onClick={()=>setSize(!size)}
        >
            <img src={Right} alt='left' className='icon-small'/> 
        </div>        
    )
}
export default MenuSize