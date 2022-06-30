import React, { useState, useEffect } from "react"
import Principal from "../components/General/Principal"
import { useTranslation } from 'react-i18next'
import plus from '../styles/icons/plus-lg.svg'
import ModalAdd from "../components/users/ModalAdd"
import { getUsers } from '../api/Users_api'
import { swalError } from "../components/Alertas/Alertas";
import CardUser from "../components/users/CardUser"

const Users = () =>{

    const [t] = useTranslation("global")
    const [modal, setModal] = useState(false)
    const [users, setUsers] = useState(null)
    const [edit, setEdit] = useState(null)
    const [detonador, setDetonador] = useState(false)

    useEffect(() => {
        getUsers().then( res => {
            console.log(res.data)
            setUsers(res.data)
        }).catch(res => {
            swalError(t("General.message-error"));
        });
    }, [detonador]);

    return(
        <Principal title={t("Users.title")}>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-end mb-3">
                    <button 
                        onClick={()=>setModal(true)}
                        className="btn btn-plus d-flex justify-content-center align-items-center"
                    >
                        <img src={plus} alt="Add User" />
                    </button>
                </div>
                <div className="d-flex flex-wrap justify-content-around contenedor-cards">
                    {users 
                    ? 
                    users.map((user)=>(
                        <CardUser 
                            key={user.IdUsuario} 
                            user={user} 
                            setModal={setModal} 
                            setEdit={setEdit} 
                            detonador={detonador}
                            setDetonador={setDetonador}
                        /> 
                    ))
                    : null}
                </div>
                <ModalAdd 
                    modal={modal} 
                    setModal={setModal} 
                    edit={edit} 
                    setEdit={setEdit}
                    setDetonador={setDetonador}
                    detonador={detonador}
                />
            </div>
        </Principal>
    )
}

export default Users