export interface DashboardInterface{
    PlatillosSemanales: [{
        IdPlatillo: string,
        IdUsuario: null,
        Nombre: string,
        Foto: null,
        Precio: number,
        Unidades: string,
        EmisionCarbono: number,
        Descripcion: null,
        Fecha: Date,
        Vegano: Boolean,
        Status: null,
        IdUltimaActividad: string
    }],
    CO2Diario: [{
        sumaCO2: number,
        Fecha: Date,
        EmisionVegana: number,
        EmisionNoVegana: number
    }],
    MayorMenorCO2: [{
        PlatilloMenorCO2: {
            IdPlatillo: string,
            IdUsuario: string,
            Nombre: string,
            Foto: string,
            Precio: number,
            Unidades: string,
            EmisionCarbono: number,
            Descripcion: string,
            Fecha: Date,
            Vegano: Boolean,
            Status: string,
            IdUltimaActividad: string
        },
        PlatilloMayorCO2: {
            IdPlatillo: string,
            IdUsuario: string,
            Nombre: string,
            Foto: string,
            Precio: number,
            Unidades: string,
            EmisionCarbono: number,
            Descripcion: string,
            Fecha: Date,
            Vegano: Boolean,
            Status: string,
            IdUltimaActividad: string
        }
    }],
    MayorMenorCO2General: [{
        PlatilloMenorCO2: {
            IdPlatillo: string,
            IdUsuario: string,
            Nombre: string,
            Foto: Date,
            Precio: number,
            Unidades: string,
            EmisionCarbono: number,
            Descripcion: string,
            Fecha: string,
            Vegano: Boolean,
            Status: string,
            IdUltimaActividad: string
        },
        PlatilloMayorCO2: {
            IdPlatillo: string,
            IdUsuario: string,
            Nombre: string,
            Foto: Date,
            Precio: number,
            Unidades: string,
            EmisionCarbono: number,
            Descripcion: string,
            Fecha: string,
            Vegano: Boolean,
            Status: string,
            IdUltimaActividad: string
        }
    }]
}