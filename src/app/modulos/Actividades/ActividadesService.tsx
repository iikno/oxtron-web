import moment from "moment";
import { useRecoilValue } from "recoil";
import { Error } from "../../../@iikno/clases/Alertas";
import { Peticion } from "../../../configs/Peticion";
import { SesionAtom } from "../../atomos/SesionAtom";

export const ObtenerActividades = (FECHA_INICIAL:Date, FECHA_FINAL:Date) => {
    const sesion = useRecoilValue(SesionAtom);

    return Peticion.get("/Actividades/ObtenerActividades", {
        params:{
            USUARIO: sesion.Correo,
            REFRESH: 'false',
            FECHA_INICIO: moment(FECHA_INICIAL).format("MM/DD/YYYY"),
            FECHA_FIN: moment(FECHA_FINAL).format("MM/DD/YYYY"),
        }
    })
}