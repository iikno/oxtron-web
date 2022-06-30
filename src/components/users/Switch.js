import React from 'react'
import '../../styles/users/Switch.scss'

const Switch = ({toggled, onChange}) =>{
    return(
        <label className="switch mt-2">
            <input checked={toggled} onChange={onChange} type="checkbox"/>
            <span className="slider round"></span>
        </label>
    )
}

export default Switch