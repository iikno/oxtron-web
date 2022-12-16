import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { SubirArchivo } from "@iikno/clases/S3";
import { ValidarImg } from "@iikno/clases/Utils";
import { Alerta_Error, Alterta_Exito } from "@oxtron/componentes/alerts/alertas";
import { Peticion } from "@oxtron/configs/Peticion";
import { ClientesInterface } from "@oxtron/Interfaces/ClientesInterface";
import Swal from "sweetalert2";

export const valoresIniciales:ClientesInterface = {
    idCliente: "",
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
    empresa: "",
    sucursal: "",
    tamañoCompañia: ""
}

export const LimpiarCampos = () => {
    valoresIniciales.idCliente= "";
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
    valoresIniciales.empresa= "";
    valoresIniciales.sucursal= "";
    valoresIniciales.tamañoCompañia= "";
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

export const FormularioCliente = async (valores:ClientesInterface, edit:boolean, imagen:any, clientes:any) => {    
    const sesion = ObtenerSesion();

    const config = {
        headers: {
            Authorization: 'Bearer '+sesion.token
        }
    }

    if(!edit){
        if((valores.foto !== null || valores.foto !== "" || valores.foto !== undefined)){
            SubirArchivo(imagen, valores.idCliente+"/"+valores.foto);
        }

        const Data = {
            USUARIO:sesion.Correo,
            CLIENTE:{
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: (valores.foto !== null || valores.foto !== "" || valores.foto !== undefined)?valores.idCliente+"/"+valores.foto:"",
                Empresa: valores.empresa,
                Sucursal: valores.sucursal,
                TamanioCompania: valores.tamañoCompañia
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
        return await Peticion.post('/Clientes/AltaCliente',
        Data,
        config
        ).then((resultado:any) => {
            Alterta_Exito();
            clientes = ObtenerClientes(false);
            return clientes;
        }).catch((error) => {
            Alerta_Error();
            Error(error);
            return clientes;
        })
    }else{
        const direccion = valores.idCliente+"/Fotos/"+valores.foto;
        if( (valores.foto !== null || valores.foto !== "" || valores.foto !== undefined)){
            SubirArchivo(imagen, direccion, true);
        }      
        
        const Data = {
            USUARIO:sesion.Correo,
            CLIENTE:{
                IdCliente: valores.idCliente,
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: direccion,
                Empresa: valores.empresa,
                Sucursal: valores.sucursal,
                TamanioCompania: valores.tamañoCompañia
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
        await Peticion.put('/Clientes/ModificarCliente',
        Data,
        config
        ).then((resultado:any) => {
            Alterta_Exito();
        }).catch((error) => {
            Alerta_Error();
            Error(error);
        })
    }
    
}

export const ObtenerDetallesCliente = ((IdCliente:string) =>{ 
    const sesion = ObtenerSesion();
    return Peticion.get('/Clientes/ObtenerDetallesCliente',
    {
        headers: {
            Authorization: 'Bearer '+sesion.token
        },
        params:{
            USUARIO: sesion.Correo,
            ID_CLIENTE: IdCliente,
            REFRESH: false
        }
    }
    ).then((resultado:any) => {
        const row = resultado.data;
        valoresIniciales.idCliente = row.IdCliente;
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
        valoresIniciales.empresa = row.Empresa;
        valoresIniciales.sucursal = row.Sucursal;
        valoresIniciales.tamañoCompañia = row.TamanioCompania;
    }).catch((error) => {
        Alerta_Error()
        Error(error)
    })          
})

export const SuspenderCliente = (IdCliente:string) => {
    const sesion = ObtenerSesion();
    
    return Swal.fire({
        title: '¿Quiere continuar?',
        text: "Esta por cambiar el status del cliente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
            return Peticion.put('/Clientes/SuspenderCliente',
            {
                USUARIO: sesion.Correo,
                ID_CLIENTE: IdCliente
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

export const EliminarCliente = async(IdCliente:string) =>{
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
            return Peticion.delete('/Clientes/EliminarCliente',
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                },
                params:{
                    USUARIO: sesion.Correo,
                    ID_CLIENTE: IdCliente
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

export const buscarEnClientes = (texto, clientes) => {
    texto = texto.toLocaleLowerCase().trim()
    
    clientes = clientes.filter((cliente) => {
        return cliente.NombreCompleto.toLocaleLowerCase().includes(texto) || 
               cliente.Correo.toLocaleLowerCase().includes(texto) || 
               cliente.Status.toLocaleLowerCase().includes(texto) 
    })

    return clientes
}

