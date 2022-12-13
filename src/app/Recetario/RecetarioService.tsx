import { ObtenerSesion } from "@iikno/clases/LocalSession";
import Footer from "@iikno/componentes/Footer";
import { Peticion } from "@oxtron/configs/Peticion";
import { RecetarioInterface } from "@oxtron/Interfaces/RecetarioInterface.d";

export const valoresIniciales:RecetarioInterface = {
    Nombre: "",
    Foto: "",
    Precio: 0,
    EmisionCarbono: 0,
    Descripcion: "",
    FechaRegistro: "",
    Vegano: false
}

export const ObtenerRecetas = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Recetario/ObtenerRecetas", {
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

// export const AltaUsuario = async (valores:UsuariosInterface) => {
//     const sesion = ObtenerSesion();

//     await Peticion.post('Usuarios/AltaUsuario',{
//         params:{
//             USUARIO:sesion.Correo,
//             USUARIO_NUEVO:{
//                 Nombre: valores.nombre,
//                 ApellidoPaterno: valores.apellidoPaterno,
//                 ApellidoMaterno: valores.apellidoMaterno,
//                 Correo: valores.correo,
//                 Telefono: valores.telefono,
//                 Foto: valores.foto
//             },
//             DIRECCION: {
//                 Calle: valores.calle,
//                 NoExterior: valores.noExterior,
//                 NoInterior: valores.noInterior,
//                 Colonia: valores.colonia,
//                 CodigiPostal: valores.codigoPostal,
//                 Municipio: valores.municipio,
//                 Estado: valores.estado,
//                 Pais: valores.pais
//             }
//         }
//     }).then((resultado:any) => {
//         window.location.assign('/usuarios')
//     }).catch((error) => {
//         Error(error)
//     })
// }

export const buscarEnRecetas = (texto, recipes) => {
    texto = texto.toLocaleLowerCase().trim()
    
    recipes = recipes.filter((recipe) => {
        return recipe.Nombre.toLocaleLowerCase().includes(texto) || 
            recipe.Descripcion.toLocaleLowerCase().includes(texto) || 
            recipe.FechaRegistro.toLocaleLowerCase().includes(texto) || 
            recipe.EmisionCarbono.toString().includes(texto)
    })

    return recipes
}

