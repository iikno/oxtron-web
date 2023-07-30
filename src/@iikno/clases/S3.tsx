import { S3 } from '@aws-sdk/client-s3';
import { $AWS_REGION, $S3_BUCKET_PRIV, $S3_KEY, $S3_SECRET } from '../../@oxtron/configs/Env';

const cliente = new S3({
    region: $AWS_REGION,
    credentials: {
        accessKeyId: $S3_KEY,
        secretAccessKey: $S3_SECRET
    }
})

export const SubirArchivo = (archivo:Buffer, nombre:string, publico = false) => {
    return cliente.putObject({
        Body: archivo,
        Key: nombre,
        Bucket: $S3_BUCKET_PRIV,
        ACL: (publico) ? "public-read" : "private"
    })
}

export const EliminarArchivo = (ruta:string) => {
    return cliente.deleteObject({
        Key: ruta,
        Bucket: $S3_BUCKET_PRIV
    })
}

export const ModificarArchivo = (archivo:Buffer, nombre:string, publico = false) => {
    return SubirArchivo(archivo, nombre, publico)
}

export const SubirArchivoAS3Secundario = (archivo:any, nombre:string, publico = false) => {
    return cliente.putObject({
        Body: archivo,
        Key: nombre,
        Bucket: $S3_BUCKET_PRIV,
        ACL: (publico) ? "public-read" : "private"
    })
}