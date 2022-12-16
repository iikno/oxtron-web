import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { SubirArchivo } from "@iikno/clases/S3";
import { ValidarImg } from "@iikno/clases/Utils";
import { Alerta_Error, Alterta_Exito } from "@oxtron/componentes/alerts/alertas";
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



export const handleEdit = ((IdUsuario:string) =>{ 
    const sesion = ObtenerSesion();
    return Peticion.get('/Usuarios/ObtenerDetallesUsuario',
    {
        headers: {
            Authorization: 'Bearer '+sesion.token
        },
        params:{
            USUARIO: sesion.Correo,
            ID_USUARIO: IdUsuario,
            REFRESH: false
        }
    }
    ).then((resultado:any) => {
        const row = resultado.data;
        valoresIniciales.idUsuario = row.IdUsuario;
        valoresIniciales.nombre = row.Nombre;
        valoresIniciales.apellidoPaterno = row.ApellidoPaterno;
        valoresIniciales.apellidoMaterno = row.ApellidoMaterno;
        valoresIniciales.correo = row.Correo;
        valoresIniciales.telefono = row.Telefono;
        valoresIniciales.foto = row.Foto;
        valoresIniciales.calle = row.Calle;
        valoresIniciales.noExterior = row.NoExterior;
        valoresIniciales.noInterior = row.NoInterior;
        valoresIniciales.colonia = row.Colonia;
        valoresIniciales.codigoPostal = row.CodigoPostal;
        valoresIniciales.municipio = row.Municipio;
        valoresIniciales.estado = row.Estado;
        valoresIniciales.pais = row.Pais;
    }).catch((error) => {
        Alerta_Error()
        Error(error)
    })          
})

export const SuspenderUsuario = (IdUsuario:string) => {
    const sesion = ObtenerSesion();
    
    return Swal.fire({
        title: '¿Quiere continuar?',
        text: "Esta por cambiar el status del usuario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
            return Peticion.put('/Usuarios/SuspenderUsuario',
            {
                USUARIO: sesion.Correo,
                ID_USUARIO: IdUsuario
            },
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                }
            }
            ).then(() => {
                Alterta_Exito();
            }).catch((error) => {
                Error(error)
                Alerta_Error();
            })         
        }
      })    
}

export const EliminarUsuario = async(IdUsuario:string) =>{
    const sesion = ObtenerSesion();

    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            return Peticion.delete('/Usuarios/EliminarUsuario',
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                },
                params:{
                    USUARIO: sesion.Correo,
                    ID_USUARIO: IdUsuario
                }
            }
            ).then(() => {
                Alterta_Exito()
            }).catch((error) => {
                Alerta_Error()
                Error(error)

            })         
        }
    })
}

export const buscarEnUsuarios = (texto, usuarios) => {
    texto = texto.toLocaleLowerCase().trim()
    
    usuarios = usuarios.filter((usuario) => {
        return usuario.NombreCompleto.toLocaleLowerCase().includes(texto) || 
               usuario.Correo.toLocaleLowerCase().includes(texto) || 
               usuario.Status.toLocaleLowerCase().includes(texto) 
    })

    return usuarios
}

