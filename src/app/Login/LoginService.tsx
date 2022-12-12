import { SetterOrUpdater } from "recoil";
import { Error } from "@iikno/clases/Alertas";
import { Peticion } from "@oxtron/configs/Peticion";
import { SesionInterface } from "@oxtron/Interfaces/SesionInterface.d";
import { LogInInterface } from "@oxtron/Interfaces/LogInInterface.d";
import { getRecoil } from "recoil-nexus";
import { SesionAtom } from "@oxtron/atomos/SesionAtom";
import { ObtenerSesion } from "@iikno/clases/LocalSession";

export const valoresIniciales:LogInInterface = {
    usuario: "",
    password: ""
}

export const validadores = (values:any) => {
    const errores:Partial<LogInInterface> = {};

    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.usuario)){
        errores.usuario = "Requerido";
    }
    if(!values.password){
        errores.password = "Requerido";
    }

    return errores;
}

export const IniciarSesion = async (valores:LogInInterface, setSesion:SetterOrUpdater<SesionInterface>) => {
    await Peticion.get('Sesion/IniciarSesion',{
        params:{
            USUARIO:valores.usuario,
            PASSWORD:valores.password
        }
    }).then((resultado:any) => {
        setSesion(resultado.data);
        var aux = getRecoil(SesionAtom);
        var aux2 = ObtenerSesion();

        window.location.assign('/dashboard')
    }).catch((error) => {
        Error(error)
    })
}