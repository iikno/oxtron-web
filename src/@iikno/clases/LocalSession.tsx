import { SesionInterface } from "@oxtron/Interfaces/SesionInterface.d";
import { useResetRecoilState } from "recoil";
import { getRecoil } from "recoil-nexus";
import { SesionAtom } from "../../@oxtron/atomos/SesionAtom";

export const ObtenerSesion = ():SesionInterface => {
    let sesion = getRecoil(SesionAtom)

    return sesion;
}

export const EliminarSesion = () => {
    useResetRecoilState(SesionAtom);
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