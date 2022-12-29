import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { SesionAtom } from "@oxtron/atomos/SesionAtom";
import { Peticion } from "@oxtron/configs/Peticion"
import moment from "moment";
import { getRecoil } from "recoil-nexus";
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.3/moment.min.js"></script>


export const ObtenerClientes = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Clientes/ObtenerClientes", {
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        return respuesta.data;
    })
}

export const ObtenerDashboard = async(CLIENTE:string, FECHAS:Date[], REFRESH = true) => {
    const sesion = ObtenerSesion();
    
    if(CLIENTE !== "TODOS"){
        return await Peticion.get("/Dashboard/ObtenerDashboardUsuarioCliente",{
            params:{
                USUARIO: sesion.Correo,
                REFRESH: REFRESH,
                ID_USUARIO_CLIENTE: CLIENTE,
                FECHA_INICIO: moment(FECHAS[0]).format('MM/DD/YYYY'),
                FECHA_FIN: moment(FECHAS[1]).format('MM/DD/YYYY'),
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            console.log(respuesta.data);
            return respuesta.data;
        })
    }else{
        return await Peticion.get("/Dashboard/ObtenerDashboard",{
            params:{
                USUARIO: sesion.Correo,
                REFRESH: REFRESH,
                FECHA_INICIO: moment(FECHAS[0]).format('MM/DD/YYYY'),
                FECHA_FIN: moment(FECHAS[1]).format('MM/DD/YYYY'),
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            return respuesta.data;
        })
    }    
}

export const ValidarPlatillo = (platillo:any) =>{
    if(platillo !== undefined || platillo !== null){
        return platillo;
    }else{
        platillo.EmisionCarbono = 0;
        platillo.Nombre = "Sin platillo";
        return platillo;
    }
}