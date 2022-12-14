import { ObtenerSesion} from "@iikno/clases/LocalSession";
import { Alerta_Error, Alterta_Exito } from "@oxtron/componentes/alerts/alertas";
import { Peticion } from "@oxtron/configs/Peticion";
import { ClientesInterface } from "@oxtron/Interfaces/ClientesInterface";
import { resolve } from "path";
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



export const ObtenerClientes = async(REFRESH = true) => {
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

export const FormularioCliente = async (valores:ClientesInterface, edit:boolean) => {
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
            CLIENTE:{
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: valores.foto,
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
        await Peticion.post('/Clientes/AltaCliente',
        Data,
        config
        ).then((resultado:any) => {
            window.location.assign('/clientes')
        }).catch((error) => {
            Error(error)
        })
    }else{
        const Data = {
            USUARIO:sesion.Correo,
            CLIENTE:{
                IdCliente: valores.idCliente,
                Nombre: valores.nombre,
                ApellidoPaterno: valores.apellidoPaterno,
                ApellidoMaterno: valores.apellidoMaterno,
                Correo: valores.correo,
                Telefono: valores.telefono,
                Foto: valores.foto,
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
            Alterta_Exito()
            window.location.assign('/clientes')
        }).catch((error) => {
            Alerta_Error()
            Error(error)
        })
    }
    
}

export const handleEdit = (async (IdCliente:string) =>{ 
    const sesion = ObtenerSesion();
    new Promise(async (resolve, reject) =>{
        await Peticion.get('/Clientes/ObtenerDetallesCliente',
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

            resolve(resultado);
            const row = resultado.data;
            valoresIniciales.idCliente = row.IdCliente;
            valoresIniciales.nombre = row.Nombre;
            valoresIniciales.apellidoPaterno = row.ApellidoPaterno;
            valoresIniciales.apellidoMaterno = row.ApellidoMaterno;
            valoresIniciales.correo = row.Correo;
            valoresIniciales.empresa = row.Empresa;
            valoresIniciales.sucursal = row.Sucursal;
            valoresIniciales.tamañoCompañia = row.TamanioCompania;
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
    
})

export const SuspenderCliente = async(IdCliente:string) => {
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
            await Peticion.put('/Clientes/SuspenderCliente',
            {
                USUARIO: sesion.Correo,
                ID_CLIENTE: IdCliente
            },
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                }
            }
            ).then((resultado:any) => {
                Alterta_Exito()

                window.location.assign('/clientes')
            }).catch((error) => {
                Alerta_Error()
                Error(error)

            })         
        }
      })    
}

export const EliminarCliente = async(IdCliente:string) =>{
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
            await Peticion.delete('/Clientes/EliminarCliente',
            {
                headers: {
                    Authorization: 'Bearer '+sesion.token
                },
                params:{
                    USUARIO: sesion.Correo,
                    ID_CLIENTE: IdCliente
                }
            }
            ).then((resultado:any) => {
                Alterta_Exito()

                window.location.assign('/clientes')
            }).catch((error) => {
                Alerta_Error()
                Error(error)

            })         
        }
    })
}