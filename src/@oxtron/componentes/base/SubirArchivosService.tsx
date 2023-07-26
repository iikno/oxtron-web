import { AlertaError, AlertaExito } from "@iikno/clases/Alertas";
import { SubirArchivoAS3Secundario } from "@iikno/clases/S3";
import moment from "moment";
import { IntlShape } from "react-intl";
import { FileType } from 'rsuite/esm/Uploader';

const NombrarArchivo = (archivo:FileType, fechaSubida:Date) => {
    const nombre = archivo.name.split('.').slice(0, -1).join('.');
    const extension = archivo.name.split('.').pop();
    return `${nombre}-${moment(fechaSubida).format("YYYYMMDD")}.${extension}`;
}


export const SubirArchivos = async(archivos:FileType[], fechaSubida:Date, intl:IntlShape) => {
    return await Promise.all(archivos.map(async (archivo) => {
        return await SubirArchivoAS3Secundario(archivo.blobFile, NombrarArchivo(archivo, fechaSubida));
    })).then(async () => {
        await AlertaExito(intl);
        return true;
    })
    .catch(async () => {
        await AlertaError(intl);
        return false;
    })
}