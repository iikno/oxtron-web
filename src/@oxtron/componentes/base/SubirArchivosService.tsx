import { AlertaError, AlertaExito } from "@iikno/clases/Alertas";
import { ObtenerSesion } from "@iikno/clases/LocalSession";
import { SubirArchivoAS3Secundario } from "@iikno/clases/S3";
import { Peticion } from "@oxtron/configs/Peticion";
import moment from "moment";
import { IntlShape } from "react-intl";
import { FileType } from 'rsuite/esm/Uploader';

const NombrarArchivo = (archivo:FileType, fechaSubida:Date) => {
    const nombre = archivo.name.split('.').slice(0, -1).join('.');
    const extension = archivo.name.split('.').pop();
    return `${nombre}-${moment(fechaSubida).format("YYYYMMDD")}.${extension}`;
}


export const SubirArchivos = async(archivos:FileType[], fechaSubida:Date, intl:IntlShape) => {
    const sesion = ObtenerSesion();
    
    return await Promise.all(archivos.map(async (archivo) => {
        return await SubirArchivoAS3Secundario(archivo.blobFile, "temporal/" + NombrarArchivo(archivo, fechaSubida));
    })).then(async () => {
        Peticion.post("/Archivos/ProcesarArchivos", {
            USUARIO: sesion.Correo,
            ARCHIVOS: archivos.map(archivo => ({
                Nombre: NombrarArchivo(archivo, fechaSubida),
                Path: "temporal/" + NombrarArchivo(archivo, fechaSubida),
                Fecha: moment(fechaSubida).format("YYYY-MM-DD HH:mm:ss")
            }))
        })
        await AlertaExito(intl);
        return true;
    })
    .catch(async () => {
        await AlertaError(intl);
        return false;
    })
}