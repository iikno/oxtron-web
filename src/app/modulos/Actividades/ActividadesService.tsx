import moment from "moment";
import { Peticion } from "../../../configs/Peticion";
import { ObtenerSesion } from "../../clases/LocalSession";

export const BuscarActividades = (texto:string, pedidos:any) => {
    texto = texto.toLocaleLowerCase().trim()
    
    pedidos = pedidos.filter((pedido:any) => {
        return pedido.invoice.toLocaleLowerCase().includes(texto) || 
                moment(pedido.date).format('DD/MM/YYYY hh:mm a').includes(texto) || 
                pedido.sellerName.toLocaleLowerCase().includes(texto) || 
                pedido.nameClient.toLocaleLowerCase().includes(texto) || 
                pedido.nameBranchOffice.toLocaleLowerCase().includes(texto) || 
                pedido.totalAmount.toString().includes(texto) || 
                pedido.currency.toLocaleLowerCase().includes(texto);
    })

    return pedidos
}

export const ObtenerActividades = async(fechas:Array<Date>) => {
    const sesion = ObtenerSesion()
    const fechaInicio = moment(fechas[0]).format("MM/DD/YYYY");
    const fechaFin = moment(fechas[1]).format("MM/DD/YYYY");

    return await Peticion.get('/Actividades/ObtenerActividades',{
        params:{
            USUARIO: sesion.Usuario,
            ID_USUARIO: sesion.IdUsuario,
            FECHA_INICIO: fechaInicio,
            FECHA_FIN: fechaFin
        }
    }).then((respuesta)=>{
        return respuesta.data
    })
}