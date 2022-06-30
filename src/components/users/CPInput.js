import React from 'react'
import { useField } from 'formik'
import { useEffect } from 'react'

const CPInput = ({label, setCp, ...props}) =>{
    const [field, meta] = useField(props)
    
    useEffect(()=>{
        setCp(field.value)
    },[field.value])

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

export default CPInput