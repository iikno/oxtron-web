import { Peticion } from "../../../configs/Peticion";
import { Error } from "../../clases/Alertas";
import { GuardarSesion } from "../../clases/LocalSession";

export const IniciarSesion = async (event:any) => {
    event.preventDefault();
    await Peticion.get('Sesion/IniciarSesion',{
        params:{
            USUARIO:event.target.correo.value,
            PASSWORD:event.target.pass.value
        }
    }).then((resultado:any) => {
        let res:JSON;
        res = resultado.data[0];
        console.log(res)
        GuardarSesion(res)
        window.location.assign('/dashboard')
    }).catch((error) => {
        Error(error)
    })
}