import React, { useEffect, useState } from "react"
import InputLogin from "../components/Login/InputLogin"
import Title from "../components/Login/Title"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import '../styles/login/Login.scss'
import { getSesion } from '../api/Login_api'
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const [data, setData] = useState([])    
    const [status, setStatus] = useState([])
    const [error, setError] = useState(false)
    const [botonText, setBotonText] = useState("Entrar")
    const [disabled, setDisabled] = useState(false)
    let navigate = useNavigate();

    useEffect(()=>{
        console.log(data)
        if (status === 200) {
            localStorage.setItem("logged", data[0].IdUsuario)
            navigate("/home")
        }
        // else if(typeof status === 'string' || status instanceof String)
        //     setError(true)
    },[data])

    const handleSubmit = (values, {resetForm}) =>{
        setDisabled(true)
        setBotonText("Iniciando")
        setError(false)
        getSesion(values.email, values.password).then( res => {
            setData(res.data)
            setStatus(res.status)
            
        }).catch(error => {
            setStatus(error)
            setError(true)
            console.log(error)
            setBotonText("Entrar")
            setDisabled(false)
        })
        resetForm(values = "")
    }

    return(
        <div style={{maxWidth:'500px',marginLeft:'auto',marginRight:'auto', marginTop:'10%'}}>
            <Title title="Bienvenido"/>
            <div className="bg-light p-3 rounded" style={{border:'1px solid #aaa'}}>
            <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().required("Ingrese correo").email("Ingrese un correo valido"),
                        password: Yup.string().required("Ingrese contraseña")
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        {error ? <span style={{color:'red'}}>Usuario y/o contraseña incorrectos</span> : null}
                        <InputLogin label="Ingrese su correo" tipe="email" name="email"/>
                        <InputLogin label="Ingrese su contraseña" type="password" name="password"/>
                        <button disabled={disabled} className="btn btn-outline-secondary w-100" style={{ backgroundColor:'white', color:'#000066'}} type="submit">{botonText}</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
export default Login