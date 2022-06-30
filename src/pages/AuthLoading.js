import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";


const AuthLoading = () =>{
    let navigate = useNavigate();

    useEffect(()=>{
        if (!localStorage.getItem("logged"))
            navigate("/login")
        else
            navigate("/home")
    },[])

    return(
        <div>Loading</div>
    )
}

export default AuthLoading