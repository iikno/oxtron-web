import { SesionInterface } from '@oxtron/Interfaces/SesionInterface.d';
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