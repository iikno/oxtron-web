import React, { useState, useEffect } from 'react'
import '../../styles/users/Cards.scss'
import Switch from './Switch'
import ModalDelete from './ModalDelete'
import { deleteUsers, suspenderUsuario, restablecerUsuario } from '../../api/Users_api'
import { noFoto } from '../../api/env'
import ModalToggled from './ModalToggled'

const styles = {
    exit: (display) =>({
        visibility: display
    })
}

const CardUser = ({user, setModal, setEdit, detonador, setDetonador}) =>{

    const [display, setDisplay] = useState("hidden")
    const [toggled, setToggled] = useState(user.Status === "ACTIVO" ? true : false)
    const [modalDelete, setModalDelete] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [disparador, setDisparador] = useState(false)
    const [modificar, setModificar] = useState(false)
    // const [modalToggled, setModalToggled] = useState(false)
    // const [toggledUser, setToggledUser] = useState(false)

    // console.log(toggled, user.Nombre, user.Status)
    // console.log(disparador)
    useEffect(()=>{
        if(deleteUser){
            deleteUsers(user.IdUsuario).then(res => {
                console.log(res)
                setModal(false)
                setDetonador(!detonador)
            })
        }
    },[deleteUser])

    useEffect(()=>{
        if(modificar){
            suspenderUsuario(user.IdUsuario).then(res => {
                console.log(res)
            })
        }
        setModificar(false)
        setDetonador(!detonador)
    },[disparador])

    const handleLeave = () =>{
        setDisplay("hidden")
    }
    
    const handleHover = () =>{
        setDisplay("visible")
    }
    
    return(
        <div
            className="rounded p-0 card-user m-3 d-flex flex-column"
            onMouseOver={handleHover} 
            onMouseLeave={handleLeave} 
            style={{height:'375px'}}
        >
            <div className='d-flex justify-content-end p-1'>
                <button onClick={()=>setModalDelete(true)} style={styles.exit(display)} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div 
                className='d-flex flex-column justify-content-center'
                onClick={()=>
                    {
                        setModal(true); 
                        setEdit(user)
                    }}
            >
                <img 
                    onClick={()=>(setModal(true))} 
                    src={noFoto} 
                    className="rounded-circle mt-3 mb-3 bg-danger" 
                    style={{width: "100px",marginLeft:"auto",marginRight:"auto"}} 
                    alt="card"
                />
            </div>
            <div className="d-flex flex-column card-body" >
                <p onClick={()=>{setModal(true);setEdit(user)}} style={{width:"100%",fontFamily: 'Century Gothic Std Regular'}} className="mb-1">{user.Nombre} {user.ApellidoPaterno} {user.ApellidoMaterno}</p>
                <a style={{color:"#222", textDecoration:'none', fontFamily: 'Century Gothic Std Regular'}} className="mb-1" href={`mailto:${user.Correo}`}>{user.Correo}</a>
                <p style={{fontFamily: 'Century Gothic Std Regular'}} className="mb-1">{user.Telefono}</p>
            </div>
            <div 
                className="d-flex flex-row justify-content-around align-items-center card-body m-0" 
                style={toggled ? { backgroundColor: "#cecece"} : { backgroundColor: "#cecece"}}
            >
                <p className='m-0' style={{fontFamily: 'Century Gothic Std Regular'}}>{toggled ? "Activo" : "Inactivo"}</p>
                <Switch toggled={toggled} onChange={(e)=>{setToggled(e.target.checked);setDisparador(!disparador); setModificar(true)}}/>
            </div>
            <ModalDelete modalDelete={modalDelete} setModalDelete={setModalDelete} setDeleteUser={setDeleteUser}/>
            {/* <ModalToggled toggled={toggled} modalToggled={modalToggled} setModalToggled={setModalToggled} setToggledUser={setToggledUser}/> */}
        </div>
    )
}
export default CardUser