import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { SesionAtom, SesionInterface } from "../../app/atomos/SesionAtom";

export const ObtenerSesion = ():SesionInterface => {
    let sesion = useRecoilValue(SesionAtom)

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