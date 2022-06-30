import axios from "axios";
import {api} from './env';



export async function getActivities( fi, ff ) {

    const data = {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
        FECHA_INICIO: fi,
        FECHA_FIN: ff,
    };

    return await axios({
        method: 'get',
        url: `${api}/Actividades/ObtenerActividades`,
        params: data,
    });
}

export async function getActivitiesDetails( id ) {

    const data = {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
        ID_ACTIVIDAD: id,
    };

    return await axios({
        method: 'get',
        url: `${api}/Actividades/ObtenerDetallesActividad`,
        params: data,
    });
}