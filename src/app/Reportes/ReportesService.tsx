import { IntlShape } from "react-intl";
import { DateRange } from 'rsuite/DateRangePicker';
import moment from "moment";

import { Peticion } from "@oxtron/configs/Peticion"
import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { RecetarioInterface } from "@oxtron/Interfaces/RecetarioInterface.d";
import { AlertaExito, AlertaError } from '../../@iikno/clases/Alertas';
import { PlanificadorInterface } from '../../@oxtron/Interfaces/PlanificadorInterface.d';
import Traducir from "@oxtron/i18n/Traducir";

export const ObtenerFechasMesActual = ():DateRange => {
    const today = new Date()
    const primerDia = new Date(today.getFullYear(), today.getMonth(), 1);
    const ultimoDia = new Date(today.getFullYear(), today.getMonth(), new Date(today.getFullYear(), today.getMonth()+1, 0).getDate());    
    return [primerDia, ultimoDia]
}

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

export const ObtenerReporte = async (CLIENTE:string, FECHAS:Date[], REFRESH = true) => {
    const sesion = ObtenerSesion();

    if(CLIENTE !== "TODOS"){
        return await Peticion.get("/Reportes/ObtenerReporteUsuarioCliente",{
            params:{
                USUARIO: sesion.Correo,
                REFRESH: REFRESH,
                ID_USUARIO_CLIENTE: CLIENTE,
                FECHA_INICIO: moment(FECHAS[0]).format('MM/DD/YYYY'),
                FECHA_FIN: moment(FECHAS[1]).format('MM/DD/YYYY'),
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            return respuesta.data;
        })
    }else{
        return await Peticion.get("/Reportes/ObtenerReporte",{
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