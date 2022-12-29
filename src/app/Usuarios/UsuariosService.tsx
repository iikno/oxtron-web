import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { SubirArchivo, EliminarArchivo } from "@iikno/clases/S3";
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


export const ObtenerUsuarios = async(REFRESH:boolean) => {
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

export const validarCampos = (valores, intl:any) => {
    let valor = false;
    if(valores.nombre === "")
        valor = true;
    if(valores.apellidoPaterno === "")
        valor = true;
    if(valores.apellidoMaterno === "")
        valor = true;
    if(valores.correo === "")
        valor = true;
    
    if(valor){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: intl.formatMessage({id: "alerta.error.campos"})
          })
    }
    return valor;
}

export const FormularioUsuario = async (valores:UsuariosInterface, edit:boolean, imagen:any, usuarios:any, intl:any) => {
    let valido = true;
    if(validarCampos(valores, intl)){
        return valido = false;
    }
    
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    if(!edit){
        let direccion = "";
        try{
            direccion = imagen.name;
        }catch{}  

        const Data = {
            USUARIO:sesion.Correo,
            USUARIO_NUEVO:{
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: (direccion !== "")?direccion:""
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
        return await Peticion.post('/Usuarios/AltaUsuario',
        Data,
        config
        ).then((resultado:any) => {
            if(direccion !== ""){
                SubirArchivo(imagen, resultado.data.Objeto.IdUsuario+"/"+valores.foto, true);
            }
            
            Alerta_Exito(intl);
            return valido;
        }).catch((error) => {
            Alerta_Error(intl);
            Error(error);
            return valido = false;
        })
    }else{
        let direccion = "";
        try{
            direccion = valores.idUsuario+"/Fotos/"+imagen.name;
            if(direccion !== imagen.name || (valores.foto !== null || valores.foto !== "" || valores.foto !== undefined)){
                EliminarArchivo(valores.foto);
                SubirArchivo(imagen, direccion, true);
            }
        }catch(e){
            direccion = valores.foto;
        }           
        
        const Data = {
            USUARIO:sesion.Correo,
            USUARIO_MODIFICADO:{
                IdUsuario: valores.idUsuario,
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: direccion
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
            Alerta_Exito(intl);
        }).catch((error) => {
            Alerta_Error(intl);
            Error(error);
        })
    }
    
}

export const handleEdit = ((IdUsuario:string, intl:any) =>{ 
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
        Alerta_Error(intl)
        Error(error)
    })          
})

export const SuspenderUsuario = (IdUsuario:string, intl:any) => {
    const sesion = ObtenerSesion();
    
    return Swal.fire({
        title: intl.formatMessage({id: 'alerta.continuar'}),
        text: intl.formatMessage({id: 'alerta.suspender.texto'}),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: intl.formatMessage({id: 'boton.continuar'}),
        cancelButtonText: intl.formatMessage({id: 'boton.cancelar'})
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
                Alerta_Exito(intl);
            }).catch((error) => {
                Error(error)
                Alerta_Error(intl);
            })         
        }
      })    
}

export const EliminarUsuario = async(IdUsuario:string, intl:any) =>{
    const sesion = ObtenerSesion();

    return Swal.fire({
        title: intl.formatMessage({id: 'alerta.continuar'}),
        text: intl.formatMessage({id: 'alerta.eliminar.texto'}),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: intl.formatMessage({id: "boton.eliminar.confirmar"}),
        cancelButtonText: intl.formatMessage({id: 'boton.cancelar'})
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
                Alerta_Exito(intl)
            }).catch((error) => {
                Alerta_Error(intl)
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

