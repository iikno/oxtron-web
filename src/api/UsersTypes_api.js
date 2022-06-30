import axios from "axios";
import {api} from './env';



export async function getUsersTypes( ) {

    const data =  {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
    };

    return await axios({
        method: 'get',
        url: `${api}/Usuarios/TiposUsuario`,
        params: data,
    });
}


export async function postUsersTypes( name ) {

    const data = {
        USUARIO: 'root@root.com',
        TIPO: {
            Nombre: name,
        },
    }

    return await axios({
        method: 'post',
        headers: { 'content-Type': 'application/json' },
        url: `${api}/Usuarios/TiposUsuario`,
        data: data,
    });
}

export async function putUsersTypes( id, name ) {

    const data = {
        USUARIO: 'root@root.com',
        TIPO: {
            IdTipoUsuario: id,
            Nombre: name,
        },
    }

    console.log(data);

    return await axios({
        method: 'put',
        headers: { 'content-Type': 'application/json' },
        url: `${api}/Usuarios/TiposUsuario`,
        data: JSON.stringify(data),
    });
}

export async function deleteUsersTypes( id ) {


    const data = {
        USUARIO: 'root@root.com',
        ID_TIPO_USUARIO: id,
    }

    return await axios({
        method: 'delete',
        url: `${api}/Usuarios/TiposUsuario`,
        params: data,
    });
}