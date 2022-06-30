import React from 'react'
import { useTranslation } from 'react-i18next'

const ModalToggled = ({toggled, modalToggled, setModalToggled, setToggledUser}) =>{

    const [t] = useTranslation("global")

    return(
        <div className={`modal fade ${ (modalToggled) ? 'show d-block' : '' }`} tabIndex="-1" role="dialog">
            <div style={{marginTop:'15%'}} className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{toggled ? t("Users.active-title") : t("Users.deactivate-title")}</h5>
                    <button type="button" onClick={()=>{setModalToggled(false)}} className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>{toggled ? t("Users.active-text") : t("Users.deactivate-text")}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={()=>{setModalToggled(false); setModalToggled(false)}} type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Users.cancel-button")}</button>
                    <button onClick={()=>{setToggledUser(true); setModalToggled(false)}} type="button" className="btn btn-primary">{t("Users.delete-button")}</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalToggled