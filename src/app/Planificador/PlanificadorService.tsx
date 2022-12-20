import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { SesionAtom } from "@oxtron/atomos/SesionAtom";
import { Peticion } from "@oxtron/configs/Peticion"
import Traducir from "@oxtron/i18n/Traducir";
import moment from "moment";
import { getRecoil } from "recoil-nexus";
import { DateRange } from 'rsuite/DateRangePicker';
import { RecetarioInterface } from "@oxtron/Interfaces/RecetarioInterface.d";
import { AlertaExito, AlertaError } from '../../@oxtron/componentes/alerts/alertas';
import { IntlShape } from "react-intl";

export const ObtenerFechasSemanaActual = ():DateRange => {
    const today = new Date()
    const day = today.getDay()
    const monday = new Date(today.setDate(today.getDate() - day + (day === 0 ? -6 : 1)));
    const sunday = new Date(today.setDate(today.getDate() + 6))    
    return [monday, sunday]
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

export const ObtenerPlanificador = async (CLIENTE:string, FECHAS:Date[], REFRESH = true) => {
    const sesion = ObtenerSesion();

    if(CLIENTE !== "TODOS"){
        return await Peticion.get("/Planificador/ObtenerPlanificadorUsuarioCliente",{
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
        return await Peticion.get("/Planificador/ObtenerPlanificador",{
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

export const AltaPlanificador = (intl: IntlShape, receta:RecetarioInterface, fecha: string, unidades: number) => {
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    const body = {
        USUARIO: sesion.Correo,
        PLANIFICADOR:{
            IdUsuarioCliente: sesion.IdUsuario,
            IdReceta: receta.IdReceta,
            Unidades: unidades,
            EmisionCarbono: receta.EmisionCarbono * unidades,
            Fecha: fecha
        }
    }        
    return Peticion.post('/Planificador/AltaPlanificador',
        body,
        config
        ).then(async (resultado:any) => {
            await AlertaExito(intl)
            return true;
        }).catch(async (error) => {
            // Error(error)
            await AlertaError(intl);
            return false
        })
}

export const ObtenerRecetas = async(CLIENTE:string = "TODOS", REFRESH = true) => {
    const sesion = ObtenerSesion();

    if(CLIENTE === "TODOS"){
        return await Peticion.get("/Recetario/ObtenerRecetas", {
            params: {
                USUARIO: sesion.Correo,
                REFRESH: REFRESH
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            return respuesta.data;
        })
    }
    else{
        return await Peticion.get("/Recetario/ObtenerRecetasUsuarioCliente", {
            params: {
                USUARIO: sesion.Correo,
                ID_USUARIO_CLIENTE: CLIENTE,
                REFRESH: REFRESH
            },
            headers: {Authorization: 'Bearer '+sesion.token}
        }).then((respuesta:any) => {
            return respuesta.data;
        })
    }

}

export const FormatearColumnasPorSemana = (planificador:any[], fechaInicio: Date) => {
    const columnas = []
    for (let i = 0; i < 7; i++) {
        const fecha = moment(fechaInicio).add(i, 'day');
        columnas.push({
            Nombre: Traducir(`planificador.dia.${i}`),
            Fecha: fecha.format("DD/MM"),            
            FechaCompletaMostrar: fecha.format("DD/MM/YYYY"),            
            FechaCompleta: fecha.format("YYYY/MM/DD"),            
            Elementos: planificador.filter(item => {
                return moment(item.Fecha).day() === fecha.day();
            }),
        })
        
    }
    return columnas;
}