import React from 'react'
import '../../styles/MenuLateral/boton.scss'
import '../../styles/MenuLateral/MenuSize.scss'
import Right from '../../styles/icons/right.svg'

const Boton = ({ size, icono, pagina, setPagina, titulo }) =>{
    
    return(
        
        titulo === pagina 
        ?
            <div 
                onClick={() => setPagina(titulo)} 
                className='boton container'
                style={{fontWeight: "bold", fontSize:'14px'}}
            >
                {size 
                ? 
                    <>
                        <div className="barra"></div>
                        <div className='menu-size d-flex mb-1'> 
                            <img src={icono} alt='right' className='normal-icon'/> 
                            {titulo}
                        </div>
                        <img src={Right} alt='right' style={{width:'10%'}}/>  
                    </>
                :
                    <>
                        <div className="barra"></div>
                        <div className='menu-size d-flex mb-1'> 
                            <img src={icono} alt='right' className='side-icon-two'/> 
                        </div>
                    </>
                }
       
            </div>
        :
            <div 
                onClick={() => setPagina(titulo)} 
                className='boton container'
                style={{fontWeight: "normal", fontSize:'14px'}}
            >
                {size
                    ?
                        <>
                            <div className="barraDos"></div>
                            <div className='menu-size d-flex mb-1'> 
                                <img src={icono} alt='right' className='normal-icon'/> 
                                {titulo}
                            </div>
                            <div className="oculto"><p></p></div>
                        </>
                    :
                        <>
                            <div className="barraDos"></div>
                        <div className='menu-size d-flex mb-1'> 
                                <img src={icono} alt='right' className='side-icon-two' /> 
                            </div>               
                        </>
                }
            </div>
    )
}

export default Boton