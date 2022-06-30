import React from 'react'
import { useField } from 'formik'

const InputLogin = ({label, ...props}) =>{
    const [field, meta] = useField(props)
    return(
        <div className='form-group'>
            <label className="form-label">{label}</label>
            <input className="form-control" {...field} {...props}/>
            {meta.error && meta.touched 
            ? <span style={{color:'red', margin:'0'}}>{meta.error}</span>
            : null}
            <br/>
        </div>
    )
}

export default InputLogin