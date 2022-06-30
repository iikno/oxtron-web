import React from 'react'
import { useTranslation } from 'react-i18next'

const ModalPut = ({modalPut, setModalPut, setPutUser}) =>{

    const [t] = useTranslation("global")

    return(
        <div className={`modal fade ${ (modalPut) ? 'show d-block' : '' }`} tabIndex="-1" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{t("Users.edit-title")}</h5>
                    <button type="button" onClick={()=>{setModalPut(false)}} className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>{t("Users.edit-text")}</p>
                </div>
                <div className="modal-footer">
                    <button 
                        onClick={()=>setModalPut(false)} 
                        type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal"
                    >
                        {t("Users.cancel-button")}
                    </button>
                    <button 
                        onClick={()=>{setPutUser(true); setModalPut(false)}} 
                        type="button" 
                        className="btn btn-primary"
                        style={{backgroundColor:'aqua', border:'none'}}
                    >
                        {t("Users.edit-button")}
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPut