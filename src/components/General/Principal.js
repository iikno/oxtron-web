import React from 'react'
import Loader from "./Loader"

const Principal = ( props ) =>{

    return(
        <div className="p-5 general-dashboard">
            <Loader />
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold principal-title">{props.title}</h1> 
                <div>
                    <img src={props.icon} alt='icono' className={ (props.icon) ? 'd-block' : 'd-none' } style={{width: '30px'}} />
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default Principal