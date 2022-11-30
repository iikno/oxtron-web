export interface DashboardInterface{
    PlatillosSemanales: [{
        IdPlatillo: string,
        IdUsuario: null,
        Nombre: string,
        Foto: null,
        Precio: Number,
        Unidades: string,
        EmisionCarbono: Number,
        Descripcion: null,
        Fecha: Date,
        Vegano: Boolean,
        Status: null,
        IdUltimaActividad: string
    }],
    CO2Diario: [{
        sumaCO2: Number,
        Fecha: Date,
        EmisionVegana: Number,
        EmisionNoVegana: Number
    }],
    MayorMenorCO2: [{
        PlatilloMenorCO2: {
            IdPlatillo: string,
            IdUsuario: string,
            Nombre: string,
            Foto: string,
            Precio: Number,
            Unidades: string,
            EmisionCarbono: Number,
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
            Precio: Number,
            Unidades: string,
            EmisionCarbono: Number,
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
            Precio: Number,
            Unidades: string,
            EmisionCarbono: Number,
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
            Precio: Number,
            Unidades: string,
            EmisionCarbono: Number,
            Descripcion: string,
            Fecha: string,
            Vegano: Boolean,
            Status: string,
            IdUltimaActividad: string
        }
    }]
}