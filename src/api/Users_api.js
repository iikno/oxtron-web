import axios from "axios";
import {api} from './env';

export async function getUsers( ) {

    const data =  {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
    };

    return await axios({
        method: 'get',
        url: `${api}/Usuarios/Usuarios`,
        params: data,
    });
}

export async function getPostalCode(cp) {

    const data =  {
        USUARIO: 'root@root.com',
        CP: cp,
    };

    return await axios({
        method: 'get',
        url: `${api}/Usuarios/ObtenerDatosCP`,
        params: data,
    });
}

export async function postUsers( values ) {
    const data = {
        USUARIO: 'root@root.com',
        NUEVO_USUARIO: values,
    }
    console.log(data)

    return await axios({
        method: 'post',
        headers: { 'content-Type': 'application/json' },
        url: `${api}/Usuarios/Usuarios`,
        data: data,
    });
}

export async function putUsers( values ) {
    const data = {
        USUARIO: 'root@root.com',
        USUARIO_MODIFICADO: values,
    }
    console.log(data)

    return await axios({
        method: 'put',
        headers: { 'content-Type': 'application/json' },
        url: `${api}/Usuarios/Usuarios`,
        data: data,
    });
}

export async function deleteUsers( id ) {

    const data = {
        USUARIO: 'root@root.com',
        ID_USUARIO: id,
    }

    return await axios({
        method: 'delete',
        url: `${api}/Usuarios/Usuarios`,
        params: data,
    });
}

export async function suspenderUsuario( id ) {
    const data = {
        "USUARIO": 'root@root.com',
        "ID_USUARIO": id,
    }
    console.log(data)

    return await axios({
        method: 'put',
        headers: { 'content-Type': 'application/json' },
        url: `${api}/Usuarios/Usuarios/Suspender`,
        data: data,
    });
}

// export async function restablecerUsuario( id ) {
//     const data = {
//         USUARIO: 'root@root.com',
//         ID_USUARIO: id,
//     }
//     return await axios({
//         method: 'put',
//         headers: { 'content-Type': 'application/json' },
//         url: `${api}/Usuarios/Restablecer`,
//         data: data,
//     });
// }