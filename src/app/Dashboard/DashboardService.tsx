import { ObtenerSesion } from "@iikno/clases/LocalSession";
import { Peticion } from "@oxtron/configs/Peticion"
import moment from "moment";

export const ObtenerClientes = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Clientes/ObtenerClientes", {
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        console.log(respuesta);
        return respuesta.data;
    })
}

export const ObtenerDashboard = async(CLIENTE:string, FECHAS:Date[], REFRESH = true) => {
    const sesion = ObtenerSesion();

    if(CLIENTE !== "TODOS"){
        return await Peticion.get("/Platillos/DatosDashboardUsuario",{
            params:{
                USUARIO: sesion.Correo,
                REFRESH: REFRESH,
                ID_USUARIO: CLIENTE,
                FECHA_INICIO: moment(FECHAS[0]).format('MM/DD/YYYY'),
                FECHA_FIN: moment(FECHAS[1]).format('MM/DD/YYYY'),
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            return respuesta.data[0];
        })
    }else{
        return await Peticion.get("/Platillos/DatosDashboard",{
            params:{
                USUARIO: sesion.Correo,
                REFRESH: REFRESH,
                FECHA_INICIO: moment(FECHAS[0]).format('MM/DD/YYYY'),
                FECHA_FIN: moment(FECHAS[1]).format('MM/DD/YYYY'),
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            return respuesta.data[0];
        })
    }    
}