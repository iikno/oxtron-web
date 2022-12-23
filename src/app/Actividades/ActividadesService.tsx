import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { Alerta_Error, Alerta_Exito } from "@iikno/clases/Alertas";
import { Peticion } from "@oxtron/configs/Peticion";
import { UsuariosInterface } from "@oxtron/Interfaces/UsuariosInterface";
import Swal from "sweetalert2";

export const valoresIniciales:UsuariosInterface = {
    idUsuario: "",
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

export const LimpiarCampos = () => {
    valoresIniciales.idUsuario= "";
    valoresIniciales.nombre= "";
    valoresIniciales.apellidoPaterno= "";
    valoresIniciales.apellidoMaterno= "";
    valoresIniciales.correo= "";
    valoresIniciales.telefono= "";
    valoresIniciales.foto= "";
    valoresIniciales.calle= "";
    valoresIniciales.noExterior= "";
    valoresIniciales.noInterior= "";
    valoresIniciales.colonia= "";
    valoresIniciales.codigoPostal= "";
    valoresIniciales.municipio= "";
    valoresIniciales.estado= "";
    valoresIniciales.pais= "";

}


export const ObtenerClientes = async(REFRESH:boolean) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Clientes/ObtenerClientes", {
        headers: {Authorization: 'Bearer '+sesion.token},
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        }
    }).then((respuesta:any) => {
        return respuesta.data;
    })
}

export const ObtenerActividadesCliente = async(IdCliente:string, pagina:number, tamaño:number, accion:string, FechaInicio:Date, FechaFin:Date, REFRESH:boolean) => {
    const sesion = ObtenerSesion();

    return await Peticion.get("/Actividades/ObtenerActividadesUsuarioClientePaginadas", {
        headers: {Authorization: 'Bearer '+sesion.token},
        params: {
            USUARIO: sesion.Correo,
            ID_USUARIO_CLIENTE: IdCliente,
            PAGINA: pagina,
            TAMANIO: tamaño,
            ACCION: accion,
            FECHA_INICIO: FechaInicio,
            FECHA_FIN: FechaFin,    
            REFRESH: REFRESH
        }
    }).then((respuesta:any) => {
        return respuesta.data;
    })
}

