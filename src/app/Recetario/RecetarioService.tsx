import { ObtenerSesion } from "@iikno/clases/LocalSession";
import { Peticion } from "@oxtron/configs/Peticion";
import { IngredienteInterface } from "@oxtron/Interfaces/IngredienteInterface.d";
import { AlergenoInterface } from "@oxtron/Interfaces/AlergenoInterface.d";
import { RecetarioInterface } from "@oxtron/Interfaces/RecetarioInterface.d";
import { FormatoFechaServidor } from "@iikno/componentes/Formatos";
import { AlertaExito, AlertaError } from '../../@iikno/clases/Alertas';
import { SubirArchivo } from "@iikno/clases/S3";
import { IntlShape } from 'react-intl';
import { EliminarArchivo } from '../../@iikno/clases/S3';

export const valoresIniciales:RecetarioInterface = {
    IdReceta: "",
    IdUsuarioCliente: "",
    Nombre: "",
    Foto: "",
    Precio: 0,
    EmisionCarbono: 0,
    Descripcion: "",
    FechaRegistro: "",
    Vegano: false
}

export const valoresReceta = {
    IdReceta: "", IdUsuarioCliente: "", Nombre: "", Descripcion: "", Precio: 0.00, EmisionCarbono: 0, Vegano: true, Foto: "", FechaRegistro: ""
}

export const optionType = [
    { value: 'GR', label: 'gr' },
    { value: 'KG', label: 'Kg' },
    { value: 'ML', label: 'ml' },
    { value: 'L', label: 'L' },
    { value: 'TBSP', label: 'TBSP' }
];

export const ObtenerClientes = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Clientes/ObtenerClientes", {
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        // console.log(respuesta);
        return respuesta.data;
    })
}


export const ObtenerIngredientes = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Recetario/ObtenerIngredientes", {
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        // console.log(respuesta);
        return respuesta.data;
    })
}

export const ObtenerAlergenos = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Recetario/ObtenerAlergenos", {
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        // console.log(respuesta);
        return respuesta.data;
    })
}

// export const ObtenerRecetas = async(REFRESH = true) => {
//     const sesion = ObtenerSesion();

//     return await Peticion.get("/Recetario/ObtenerRecetas", {
//         params: {
//             USUARIO: sesion.Correo,
//             REFRESH: REFRESH
//         },
//         headers: {Authorization: 'Bearer '+sesion.token}
//     }).then((respuesta:any) => {
//         // console.log(respuesta);
//         return respuesta.data;
//     })
// }

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

export const ObtenerDetallesReceta = async(idReceta:string, REFRESH = true) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Recetario/ObtenerDetallesReceta", {
        params: {
            USUARIO: sesion.Correo,
            ID_RECETA: idReceta,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        // console.log(respuesta);
        return respuesta.data;
    })
}

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

export const AltaReceta = (intl: IntlShape, receta:RecetarioInterface, ingredientes:IngredienteInterface[], alergenos:AlergenoInterface[], imagen:Buffer) => {
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    const fecha = new Date(Date.now());
    const hoy = FormatoFechaServidor(fecha)

    const body = {
        USUARIO: sesion.Correo,
        RECETA:{
            Nombre: receta.Nombre,
            Foto: (receta.Foto !== "") ? sesion.IdUsuario+"/Recetario/"+receta.Foto : "",
            Precio: receta.Precio,
            EmisionCarbono: receta.EmisionCarbono,
            Descripcion: receta.Descripcion,
            FechaRegistro: hoy,
            Vegano: receta.Vegano
        },
        ALERGENOS: alergenos,
        INGREDIENTES: ingredientes,
    }        
    return Peticion.post('/Recetario/AltaReceta',
        body,
        config
        ).then(async (resultado:any) => {
            if(receta.Foto && receta.Foto !== "" && imagen){
                SubirArchivo(imagen, sesion.IdUsuario+"/Recetario/"+receta.Foto, true);
            }
            await AlertaExito(intl)
            return true;
        }).catch(async (error) => {
            // Error(error)
            await AlertaError(intl);
            return false
        })
}

export const ModificarReceta = (intl:IntlShape, receta:RecetarioInterface, ingredientes:IngredienteInterface[], alergenos:AlergenoInterface[], imagen:Buffer, imgOriginal:string) => {
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    const body = {
        USUARIO:sesion.Correo,
        RECETA:{
            IdReceta: receta.IdReceta,
            Nombre: receta.Nombre,
            Foto: (imagen) ? receta.IdUsuarioCliente+"/Recetario/"+receta.Foto : receta.Foto,
            Precio: receta.Precio,
            EmisionCarbono: receta.EmisionCarbono,
            Descripcion: receta.Descripcion,
            Vegano: receta.Vegano
        },
        ALERGENOS: alergenos,
        INGREDIENTES: ingredientes,
    }

    return Peticion.put('/Recetario/ModificarReceta',
        body,
        config
        ).then(async (resultado:any) => {            
            if(receta.Foto && receta.Foto !== "" && imagen){
                SubirArchivo(imagen, receta.IdUsuarioCliente+"/Recetario/"+receta.Foto, true);
                if(receta.IdUsuarioCliente+"/Recetario/"+receta.Foto !== imgOriginal){
                    EliminarArchivo(imgOriginal)
                }
            }
            await AlertaExito(intl)
            return true;
        }).catch(async (error) => {
            // Error(error)
            await AlertaError(intl);
            return false
        })
}

export const EliminarReceta = (intl: IntlShape, idReceta:string) => {
    const sesion = ObtenerSesion();

    return Peticion.delete("/Recetario/EliminarReceta", {
        params: {
            USUARIO: sesion.Correo,
            ID_RECETA: idReceta
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then(async (respuesta:any) => {
        await AlertaExito(intl);
    }).catch(async () => {
        await AlertaError(intl);
    })
}


