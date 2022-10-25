import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const SesionAtom = atom<SesionInterface>({
    key: "Sesion",
    default: {
        IdUsuario:"IdUsuario",
        Nombre:"Nombre",
        ApellidoPaterno:"ApellidoPaterno",
        ApellidoMaterno:"ApellidoMaterno",
        Correo:"Correo",
        Password:"Password",
        Telefono:"Telefono",
        Foto:"root/fotos/2022-10-07T17:04:23.384Z.png",
        TipoPersona:"TipoPersona",
        Calle:"Calle",
        NoExterior:"NoExterior",
        NoInterior:"NoInterior",
        Colonia:"Colonia",
        Ciudad:"Ciudad",
        Estado:"Estado",
        Pais:"Pais",
        CodigoPostal:0,
        Empresa:"Oxtron",
        Sucursal:"Matriz",
        TamañoCompañia:0,
        IdUltimaActividad:"IdUltimaActividad",
        Status:"ACTIVO",
        NombreCompletoRol:"NombreCompletoRol"
    },
    effects_UNSTABLE: [persistAtom],
})

export interface SesionInterface {
    IdUsuario:string,
    Nombre:string
    ApellidoPaterno:string
    ApellidoMaterno:string
    Correo:string
    Password:string
    Telefono:string
    Foto:string
    TipoPersona:string
    Calle:string
    NoExterior:string
    NoInterior:string
    Colonia:string
    Ciudad:string
    Estado:string
    Pais:string
    CodigoPostal:Number,
    Empresa:string
    Sucursal:string
    TamañoCompañia:Number,
    IdUltimaActividad:string
    Status:string
    NombreCompletoRol:string
}