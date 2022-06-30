import React from 'react'
import { useTranslation } from 'react-i18next'

const ModalDelete = ({modalDelete, setModalDelete, setDeleteUser}) =>{

    const [t] = useTranslation("global")

    return(
        <div className={`modal fade ${ (modalDelete) ? 'show d-block' : '' }`} tabIndex="-1" role="dialog">
            <div style={{marginTop:'15%'}} className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{t("Users.delete-title")}</h5>
                    <button type="button" onClick={()=>{setModalDelete(false)}} className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>{t("Users.delete-text")}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={()=>setModalDelete(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Users.cancel-button")}</button>
                    <button onClick={()=>{setDeleteUser(true); setModalDelete(false)}} type="button" className="btn btn-primary" style={{backgroundColor:'aqua', border:'none'}}>{t("Users.delete-button")}</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete