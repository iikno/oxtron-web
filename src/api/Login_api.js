import axios from "axios";
import {api} from './env';

export async function getSesion(usuario, password) {

    const data =  {
        USUARIO: usuario,
        PASSWORD: password,
        REFRESH: 'false',
    };
    console.log(data)
    return await axios({
        method: 'get',
        url: `${api}/Sesion/IniciarSesion`,
        params: data,
    });
}