import { ObtenerSesion } from "@iikno/clases/LocalSession";
import Footer from "@iikno/componentes/Footer";
import { Peticion } from "@oxtron/configs/Peticion";
import { UsuariosInterface } from "@oxtron/Interfaces/UsuariosInterface.d";

export const valoresIniciales:UsuariosInterface = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    telefono: "",
    foto: "",
    calle: "",
    noExterior: "",
    noInterior: "",
    colonia: "",
    codigoPostal: "",
    municipio: "",
    estado: "",
    pais: "",
}

export const ObtenerUsuarios = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Usuarios/ObtenerUsuarios", {
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

export const AltaUsuario = async (valores:UsuariosInterface) => {
    const sesion = ObtenerSesion();

    await Peticion.post('Usuarios/AltaUsuario',{
        params:{
            USUARIO:sesion.Correo,
            USUARIO_NUEVO:{
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: valores.foto
            },
            DIRECCION: {
                Calle: valores.calle,
                NoExterior: valores.noExterior,
                NoInterior: valores.noInterior,
                Colonia: valores.colonia,
                CodigiPostal: valores.codigoPostal,
                Municipio: valores.municipio,
                Estado: valores.estado,
                Pais: valores.pais
            }
        }
    }).then((resultado:any) => {
        window.location.assign('/usuarios')
    }).catch((error) => {
        Error(error)
    })
}

