import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { Alerta_Error, Alterta_Exito } from "@oxtron/componentes/alerts/alertas";
import { Peticion } from "@oxtron/configs/Peticion";
import { UsuariosInterface } from "@oxtron/Interfaces/UsuariosInterface.d";
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



export const ObtenerUsuarios = async(REFRESH = true) => {
    const sesion = ObtenerSesion();
    

    return await Peticion.get("/Usuarios/ObtenerUsuarios", {
        headers: {Authorization: 'Bearer '+sesion.token},
        params: {
            USUARIO: sesion.Correo,
            REFRESH: REFRESH
        }
    }).then((respuesta:any) => {
        return respuesta.data;
    })
}

export const FormularioUsuario = async (valores:UsuariosInterface, edit:boolean) => {
    console.log(valores);
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    if(!edit){
        const Data = {
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
                CodigoPostal: valores.codigoPostal,
                Municipio: valores.municipio,
                Estado: valores.estado,
                Pais: valores.pais
            }}        
        await Peticion.post('/Usuarios/AltaUsuario',
        Data,
        config
        ).then((resultado:any) => {
            window.location.assign('/usuarios')
        }).catch((error) => {
            Error(error)
        })
    }else{
        const Data = {
            USUARIO:sesion.Correo,
            USUARIO_MODIFICADO:{
                IdUsuario: valores.idUsuario,
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
                CodigoPostal: valores.codigoPostal,
                Municipio: valores.municipio,
                Estado: valores.estado,
                Pais: valores.pais
            }}
        await Peticion.put('/Usuarios/ModificarUsuario',
        Data,
        config
        ).then((resultado:any) => {
            Alterta_Exito()
            window.location.assign('/usuarios')
        }).catch((error) => {
            Alerta_Error()
            Error(error)
        })
    }
    
}

export const handleEdit = (async (IdUsuario:string) =>{
    const sesion = ObtenerSesion();
    await Peticion.get('/Usuarios/ObtenerDetallesUsuario',
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

export const SuspenderUsuario = async(IdUsuario:string) => {
    const sesion = ObtenerSesion();
    
    Swal.fire({
        title: '¿Quiere continuar?',
        text: "Esta por cambiar el status del usuario",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar'
      }).then(async (result) => {
        if (result.isConfirmed) {
            await Peticion.put('/Usuarios/SuspenderUsuario',
            {
                USUARIO: sesion.Correo,
                ID_USUARIO: IdUsuario
            },
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                }
            }
            ).then((resultado:any) => {
                Alterta_Exito()

                window.location.assign('/usuarios')
            }).catch((error) => {
                Alerta_Error()
                Error(error)

            })         
        }
      })    
}

export const EliminarUsuario = async(IdUsuario:string) =>{
    const sesion = ObtenerSesion();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
            await Peticion.delete('/Usuarios/EliminarUsuario',
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                },
                params:{
                    USUARIO: sesion.Correo,
                    ID_USUARIO: IdUsuario
                }
            }
            ).then((resultado:any) => {
                Alterta_Exito()

                window.location.assign('/usuarios')
            }).catch((error) => {
                Alerta_Error()
                Error(error)

            })         
        }
    })
}