import React from 'react'
import { useField } from 'formik'

const Input = ({label, ...props}) =>{
    const [field, meta] = useField(props)
    return(
        <div className='form-group'>
            <label className="form-label">{label}</label>
            <input className="form-control" {...field} {...props}/>
            {meta.error && meta.touched 
            ? <span style={{color:'red'}}>{meta.error}</span>
            : null}
        </div>
    )
}

export default Input