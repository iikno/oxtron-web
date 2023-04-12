import { SesionInterface } from "@oxtron/Interfaces/SesionInterface.d";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { getRecoil, resetRecoil } from "recoil-nexus";
import { SesionAtom } from "../../@oxtron/atomos/SesionAtom";

export const ObtenerSesion = ():SesionInterface => {
    let sesion = getRecoil(SesionAtom)
   // let sesion = useRecoilValue(SesionAtom);
    return sesion;
}

export const EliminarSesion = () => {
    resetRecoil(SesionAtom);
}

export const ValidarSesion = () => {
    if(ObtenerSesion().IdUsuario === "IdUsuario"){
        window.location.assign('/')
    } 
}

export const CerrarSesion = () => {
    EliminarSesion();
    window.location.assign('/')
}

export const VerPerfil = () => {
    window.location.assign('/perfil')
}