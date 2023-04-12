import { Error } from "@iikno/clases/Alertas";
import { Peticion } from "@oxtron/configs/Peticion";
import { PasswordInterface } from "@oxtron/Interfaces/PasswordInterface.d";
import moment from "moment";

export const valoresIniciales:PasswordInterface = {
    password1: "",
    password2: ""
}

export const codificar = (cadena:string) => {
    return window.btoa(cadena);
}

export const decodificar = (cadena:string) => {
    return window.atob(cadena);
}

export const convertirTimestampToDate = (timestamp:string) => {
    const f = moment(Number.parseInt(timestamp) * 1000).toDate();
    return new Date(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate(), f.getUTCHours(), f.getUTCMinutes(), f.getUTCSeconds(), f.getUTCMilliseconds())
}

export const validadores = (values:PasswordInterface) => {
    const errores:Partial<PasswordInterface> = {};

    if(!values.password1){
        errores.password1 = "Requerido";
    }
    if(!values.password2){
        errores.password2 = "Requerido";
    }

    if(values.password1 && values.password2 && values.password1 !== values.password2){
        errores.password2 = "Las contraseñas no coinciden";
    }

    return errores;
}

export const RedireccionarLogin = () => {
    setTimeout(() => {
        window.location.assign('/')
    }, 500);
}

export const ActivarUsuarioCliente = async (valores:PasswordInterface, USUARIO:string, ID:string, ES_USUARIO:boolean) => {
    const URI = (ES_USUARIO) ? 'Usuarios/ActivarUsuario' : 'Clientes/ActivarCliente';
    await Peticion.get(URI,{
        params:{
            U:codificar(USUARIO),
            ID:codificar(ID),
            P:codificar(valores.password1)
        }
    }).then((resultado:any) => {
        setTimeout(() => {
            window.location.assign('/activar/activado')
        }, 500);
    }).catch((error) => {
        Error(error)
    })
}