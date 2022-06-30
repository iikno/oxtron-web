import React from 'react'
import { useTranslation } from 'react-i18next'
import FormPut from './FormPut'
import UsersForm from './UsersForm'

const ModalAdd = ({modal, setModal, edit, setEdit, setDetonador, detonador}) =>{

    const [t] = useTranslation("global")

    return(
        <div className={`modal fade ${ (modal) ? 'show d-block' : '' }`} tabIndex="-1" role="dialog">
            <div style={{marginTop:'10%'}} className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{t("Users.form-title")}</h5>
                    <button type="button" onClick={()=>{setModal(false); setEdit(false)}} className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {
                        edit
                        ?
                            <FormPut 
                                setModal={setModal} 
                                edit={edit} 
                                setEdit={setEdit} 
                                setDetonador={setDetonador}
                                detonador={detonador}
                            />
                        :
                            <UsersForm 
                                setModal={setModal}
                                setDetonador={setDetonador}
                                detonador={detonador}
                            />
                    }
                </div>

                </div>
            </div>
        </div>
    )
}

export default ModalAdd