import { PlanificadorNombreInterface } from '@oxtron/Interfaces/PlanificadorNombreInterface.d';
import { ReporteMesInterface } from './ReporteMesInterface.d';
export interface ReporteInterface{
    EmisionesCarbono: {
        VEGANO: Array<ReporteMesInterface>,
        NO_VEGANO: Array<ReporteMesInterface>,
        GENERAL: Array<ReporteMesInterface>
    },
    PorcionPromedio: {
        Historico: number,
        MesPasado: number 
    },
    Platillos: {
        MayorEmision: PlanificadorNombreInterface,
        MenorEmision: PlanificadorNombreInterface
    },
    Ganancias: Array<ReporteMesInterface>,
    Generales: {
        Platillos: number,
        Amigables: number,
        EmisionTotal: number,
        ViajesAuto: number
    }
}