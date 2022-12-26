import { IntlShape } from "react-intl";
import { DateRange } from 'rsuite/DateRangePicker';
import moment from "moment";

import { Peticion } from "@oxtron/configs/Peticion"
import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { RecetarioInterface } from "@oxtron/Interfaces/RecetarioInterface.d";
import { AlertaExito, AlertaError } from '../../@iikno/clases/Alertas';
import { PlanificadorInterface } from '../../@oxtron/Interfaces/PlanificadorInterface.d';
import Traducir from "@oxtron/i18n/Traducir";

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

export const ModificarPlanificador = (intl: IntlShape, planificador:PlanificadorInterface, emisionCarbono: number, unidades: number) => {
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    const body = {
        USUARIO: sesion.Correo,
        PLANIFICADOR:{
            IdPlanificador: planificador.IdPlanificador,
            IdReceta: planificador.IdReceta,
            Unidades: unidades,
            EmisionCarbono: emisionCarbono * unidades,
            Fecha: planificador.Fecha
        }
    }        
    return Peticion.put('/Planificador/ModificarPlanificador',
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

export const ModificarFechaPlanificador = (idPlanificador:string, fecha: string) => {
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    const body = {
        USUARIO: sesion.Correo,
        ID_PLANIFICADOR: idPlanificador,
        FECHA: fecha,
    }        
    return Peticion.put('/Planificador/ModificarFecha',
        body,
        config
        ).then(async (resultado:any) => {
            return true;
        }).catch(async (error) => {
            return false
        })
}

export const EliminarPlanificador = (intl: IntlShape, idPlanificador:string) => {
    const sesion = ObtenerSesion();

    return Peticion.delete("/Planificador/EliminarPlanificador", {
        params: {
            USUARIO: sesion.Correo,
            ID_PLANIFICADOR: idPlanificador
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then(async (respuesta:any) => {
        await AlertaExito(intl);
    }).catch(async () => {
        await AlertaError(intl);
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
            Fecha: fecha,            
            Elementos: planificador.filter(item => {
                return moment(item.Fecha).day() === fecha.day();
            }),
        })
        
    }
    return columnas;
}