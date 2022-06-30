import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import InputSelect from './InputSelect'
import { useTranslation } from 'react-i18next'
import { getUsersTypes } from '../../api/UsersTypes_api'
import { putUsers } from '../../api/Users_api'
import ModalPut from './ModalPut'

const FormPut = ({setModal, edit, setEdit, setDetonador, detonador}) =>{
    const [t] = useTranslation("global")
    const [userTypes, setUserTypes] = useState([])
    const [page, setPage] = useState(1)
    const [modalPut, setModalPut] = useState(false)
    const [putUser, setPutUser] = useState(false)
    const [data, setData] = useState([])

    useEffect(()=>{
        getUsersTypes().then( res => {
            setUserTypes(res.data);
        })
    },[])

    useEffect(()=>{
        if(putUser){
            putUsers(data).then(res => {
                setModal(false)
                setEdit(false)
                setDetonador(!detonador)
            })
        }
    },[putUser])

    const handleSubmit = (values) =>{
        setData(values)
    }

    return(
        <div className="form-group">
            <Formik
                initialValues={{
                    IdUsuario: edit.IdUsuario,
                    Nombre: edit.Nombre,
                    ApellidoPaterno: edit.ApellidoPaterno,
                    ApellidoMaterno: edit.ApellidoMaterno,
                    Correo: edit.Correo,
                    Password: edit.Password,
                    Telefono: edit.Telefono,
                    Foto: edit.Foto,
                    TipoPersona: edit.TipoPersona,
                    Calle: edit.Calle,
                    NoExterior: edit.NoExterior,
                    NoInterior: edit.NoInterior,
                    Colonia: edit.Colonia,
                    Ciudad: edit.Ciudad,
                    Estado: edit.Estado,
                    Pais: edit.Pais,
                    CodigoPostal: edit.CodigoPostal,
                    Empresa: edit.Empresa,
                    Sucursal: edit.Sucursal,
                    TamañoCompañia: edit.TamañoCompañia,
                    IdUltimaActividad: edit.IdUltimaActividad,
                    Status: edit.Status,
                }}
                validationSchema={Yup.object({
                    Nombre: Yup.string().required(t("Users.add-user-name")),
                    ApellidoPaterno: Yup.string().required(t("Users.add-lastname1")),
                    ApellidoMaterno: Yup.string().required(t("Users.add-lastname2")),
                    Correo: Yup.string().required(t("Users.add-email")).email(t("Users.add-valid-email")),
                    Telefono: Yup.string().required(t("Users.add-phone")),
                    TipoPersona: Yup.string().required(t("Users.add-user-type")),
                    Calle: Yup.string().required(t("Users.add-street")),
                    NoExterior: Yup.string().required(t("Users.add-apartment-number")),
                    NoInterior: Yup.string().required(t("Users.add-location-number")),
                    Colonia: Yup.string().required(t("Users.add-suburb")),
                    Ciudad: Yup.string().required(t("Users.add-city")),
                    Estado: Yup.string().required(t("Users.add-state")),
                    Pais: Yup.string().required(t("Users.add-country")),
                    CodigoPostal: Yup.number().required(t("Users.add-postal-code")).typeError(t("Users.add-number")),
                    Empresa: Yup.string().required(t("Users.add-company")),
                    Sucursal: Yup.string().required(t("Users.add-branch-office")),
                    TamañoCompañia: Yup.string().required(t("Users.add-company-size")),
                })}
                onSubmit={handleSubmit}
            >
                <Form>
                    {page === 1
                        ?
                            <>
                                <Input label={t("Users.name")} type="text" name="Nombre"/>

                                <div className='d-flex flex-row justify-content-between'>
                                    <Input label={t("Users.surname")} type="text" name="ApellidoPaterno"/>
                                    <Input label={t("Users.lastname")} type="text" name="ApellidoMaterno"/>
                                </div>
                                <div className="modal-footer d-flex justify-content-end mt-3">
                                    <button 
                                        type='button' 
                                        onClick={()=>setPage(page+1)} 
                                        className="btn btn-primary"
                                        style={{backgroundColor:'aqua', border:'none'}}
                                    >
                                        {t("Users.button-next")}
                                    </button>
                                </div>     
                            </>                        
                        :
                        null
                    }

                    {page === 2
                        ?
                            <>
                                <Input label={t("Users.email")} type="email" name="Correo"/>

                                <Input label={t("Users.phone")} type="text" name="Telefono"/>  

                                <InputSelect label={t("Users.kind-person")} name="TipoPersona">
                                    <option value="">Open this select menu</option>
                                    {
                                        userTypes.map((user, index) => (
                                            <option key={index} value={user.Nombre}>
                                                {user.Nombre}
                                            </option>
                                        ))
                                    }
                                </InputSelect>  
                                <div className="modal-footer d-flex justify-content-between mt-3">
                                    <button 
                                        type='button' 
                                        onClick={()=>setPage(page-1)} 
                                        className="btn btn-primary"
                                        style={{backgroundColor:'aqua', border:'none'}}
                                    >
                                        {t("Users.button-prev")}
                                    </button>
                                    <button 
                                        type='button' 
                                        onClick={()=>setPage(page+1)} 
                                        className="btn btn-primary"
                                        style={{backgroundColor:'aqua', border:'none'}}
                                    >
                                        {t("Users.button-next")}
                                    </button>
                                </div>                              
                            </>
                        :
                        null
                    }
                    {page === 3
                        ?
                            <>
                                <div className='d-flex flex-row justify-content-between'>
                                    <Input label={t("Users.postal-code")} type="text" name="CodigoPostal"/>  
                                    <Input label={t("Users.suburb")} type="text" name="Colonia"/>  
                                </div>

                                <div className='d-flex flex-row justify-content-between'>
                                    <Input label={t("Users.city")} type="text" name="Ciudad"/>  
                                    <Input label={t("Users.state")} type="text" name="Estado"/>  
                                </div>

                                <div className='d-flex flex-row justify-content-between'>
                                    <Input label={t("Users.country")} type="text" name="Pais"/>  
                                    <Input label={t("Users.street")} type="text" name="Calle"/>  
                                </div>

                                <div className='d-flex flex-row justify-content-between'>
                                    <Input label={t("Users.apartment-number")} type="text" name="NoInterior"/>  
                                    <Input label={t("Users.street-number")} type="text" name="NoExterior"/>  
                                </div>
                                <div className="modal-footer d-flex justify-content-between mt-3">
                                    <button 
                                        type='button' 
                                        onClick={()=>setPage(page-1)} 
                                        className="btn btn-primary"
                                        style={{backgroundColor:'aqua', border:'none'}}
                                    >
                                        {t("Users.button-prev")}
                                    </button>
                                    <button 
                                        type='button' 
                                        onClick={()=>setPage(page+1)} 
                                        className="btn btn-primary"
                                        style={{backgroundColor:'aqua', border:'none'}}
                                    >
                                        {t("Users.button-next")}
                                    </button>
                                </div>                              

                            </>
                        :
                        null
                    }
                    {page === 4
                        ?
                            <>
                                <Input label={t("Users.company")} type="text" name="Empresa"/>  
                                <Input label={t("Users.branch-office")} type="text" name="Sucursal"/>  
                                <InputSelect label={t("Users.company-size")} name="TamañoCompañia">
                                    <option value="">Open this select menu</option>
                                    <option value="1">1 empleado</option>
                                    <option value="2">2 - 10 empleados</option>
                                    <option value="3">11 - 50 empleados</option>
                                    <option value="4">+51 empleados</option>
                                </InputSelect>          
                                <div className="modal-footer d-flex justify-content-between mt-3">
                                    <button style={{backgroundColor:'aqua', border:'none'}} type='button' onClick={()=>setPage(page-1)} className="btn btn-primary">{t("Users.button-prev")}</button>
                                    <button style={{backgroundColor:'aqua', border:'none'}} type="submit" onClick={()=>setModalPut(true)} className="btn btn-primary">{t("Users.form-save")}</button>
                                </div>                        
                            </>
                        :
                            null
                    }            
                </Form>
            </Formik>
            <ModalPut modalPut={modalPut} setModalPut={setModalPut} setPutUser={setPutUser}/>
        </div>
    )
}

export default FormPut