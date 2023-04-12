import { AlertaError, AlertaExito } from "@iikno/clases/Alertas";
import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { EliminarArchivo, SubirArchivo } from "@iikno/clases/S3";
import { PerfilInterface } from "@oxtron/Interfaces/PerfilInterface";
import { SesionInterface } from "@oxtron/Interfaces/SesionInterface.d";
import { Peticion } from "@oxtron/configs/Peticion"
import { IntlShape } from "react-intl";
import { SetterOrUpdater } from "recoil";
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.3/moment.min.js"></script>

export const valoresInicialesUsuario : PerfilInterface = {
    IdUsuario: "",
    IdCliente: "",
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Correo: "",
    Telefono: "",
    Foto: "",
    Calle: "",
    NoExterior: "",
    NoInterior: "",
    Colonia: "",
    CodigoPostal: "",
    Municipio: "",
    Estado: "",
    Pais: "",
    Empresa: "",
    Sucursal: "",
    TamanioCompania: "",
}

export const ObtenerPerfil = async(REFRESH = true) => {
    const sesion = ObtenerSesion();

    const URI = (sesion.EsUsuario) ? "/Usuarios/ObtenerDetallesUsuario" : "/Clientes/ObtenerDetallesCliente";

    return await Peticion.get(URI, {
        params: {
            USUARIO: sesion.Correo,
            ID_USUARIO: sesion.IdUsuario,
            ID_CLIENTE: sesion.IdUsuario,
            REFRESH: REFRESH
        },
        headers: {Authorization: 'Bearer '+sesion.token}
    }).then((respuesta:any) => {
        return respuesta.data;
    })
}

export const ModificarPerfil = (perfil:PerfilInterface, imagen:Buffer, imgOriginal:string, setSesion:SetterOrUpdater<SesionInterface>, intl:IntlShape) => {
    const sesion = ObtenerSesion();
    const URI = (sesion.EsUsuario) ? "/Usuarios/ModificarUsuario" : "/Clientes/ModificarCliente";

    let direccion = (imagen) ? ((sesion.EsUsuario) ? perfil.IdUsuario : perfil.IdCliente) + "/Fotos/" +perfil.Foto : imgOriginal;

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    const PERFIL = {
        IdUsuario : perfil.IdUsuario,
        IdCliente : perfil.IdCliente,
        Nombre : perfil.Nombre,
        ApellidoPaterno : perfil.ApellidoPaterno,
        ApellidoMaterno : perfil.ApellidoMaterno,
        Correo : perfil.Correo,
        Telefono : perfil.Telefono,
        Foto: direccion,
        Empresa: perfil.Empresa,
        Sucursal: perfil.Sucursal,
        TamanioCompania: perfil.TamanioCompania,
    }

    const body = {
        USUARIO:sesion.Correo,        
        DIRECCION: {
            Calle : perfil.Calle,
            NoExterior : perfil.NoExterior,
            NoInterior : perfil.NoInterior,
            Colonia : perfil.Colonia,
            CodigoPostal : perfil.CodigoPostal,
            Municipio : perfil.Municipio,
            Estado : perfil.Estado,
            Pais : perfil.Pais,
        },
        USUARIO_MODIFICADO : (sesion.EsUsuario) ? PERFIL : null,
        CLIENTE : (!sesion.EsUsuario) ? PERFIL : null
    }
    console.log(body)
    return Peticion.put(URI,
        body,
        config
        ).then(async (resultado:any) => {
            
            if(imagen){
                if(direccion !== imgOriginal){
                    EliminarArchivo(imgOriginal)
                }
                SubirArchivo(imagen, direccion, true);
            }

            setTimeout(() => {
                setSesion({...sesion, Nombre: perfil.Nombre, ApellidoPaterno: perfil.ApellidoPaterno, ApellidoMaterno: perfil.ApellidoMaterno, Foto: direccion});
            }, 1000);
            
            await AlertaExito(intl)
            return true;
        }).catch(async (error) => {
            // Error(error)
            await AlertaError(intl);
            return false
        })
}