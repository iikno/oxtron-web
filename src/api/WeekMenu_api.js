import axios from "axios";
import {api, carbon} from './env';



export async function getWeekMenus( ) {

    const data =  {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
        ID_USUARIO: 'root',
    };

    return await axios({
        method: 'get',
        url: `${api}/Platillos`,
        params: data,
    });
}


export async function getCategories(){

    const data =  {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
    };


    return await axios({
        method: 'get',
        url: `${api}/Platillos/Categorias`,
        params: data,
    });

}

export async function getAllergens(){

    const data =  {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
    };


    return await axios({
        method: 'get',
        url: `${api}/Platillos/Alergenos`,
        params: data,
    });

}

export async function getIngredients(){

    const data =  {
        USUARIO: 'root@root.com',
        REFRESH: 'false',
    };


    return await axios({
        method: 'get',
        url: `${api}/Platillos/Ingredientes`,
        params: data,
    });

}


export async function postWeekMenu( idUsuario, nombre, foto, precio, unidades, emision, descripcion, fecha ) {


    const data = {
        USUARIO: 'root@root.com',
        PLATILLO: {
            IdUsuario: idUsuario,
            Nombre: nombre, 
            Foto: foto,
            Precio: precio,
            Unidades: unidades,
            EmisionCarbono: emision, 
            Descripcion: descripcion,
            Fecha: fecha
        },
        ID_CATEGORIAS: ['id1', 'id2'],
        ID_ALERGENOS: ['id1', 'id2'],
        ID_INGREDIENTES: ['id1', 'id2'],
    }

    return await axios({
        method: 'post',
        headers: { 'content-Type': 'application/json' },
        url: `${api}/Platillos`,
        data: data,
    });
}

export async function putWeekMenu( id, name ) {

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
        url: `${api}/Platillos`,
        data: JSON.stringify(data),
    });
}

export async function deleteWeekMenu( id ) {


    const data = {
        USUARIO: 'root@root.com',
        ID_PLATILLO: id,
    }

    return await axios({
        method: 'delete',
        url: `${api}/Platillos`,
        params: data,
    });
}