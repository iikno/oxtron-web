import { IntlShape } from "react-intl";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";




const _alerta = withReactContent(Swal);


export const Error = (error:any) => {
    console.clear();
    _alerta.fire({
        title: "Error",
        text: error.response.status + ' - ' + error.response.data,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

export const Alerta_Error = (intl:any) =>{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: intl.formatMessage({id: 'alerta.error.texto'})
      })
    }
    
export const Alerta_Exito = (intl:any) =>{
    Swal.fire({
        icon: 'success',
        title: intl.formatMessage({id: 'alerta.exito.titulo'}),
        text: intl.formatMessage({id: 'alerta.exito.texto'}),
        showConfirmButton: false,
        timer: 1500
    })
}

export const ConfirmarEliminar = (intl: IntlShape) =>{
    return Swal.fire({
      title: intl.formatMessage({id:'alertas.confirmacion.title'}),
      text: intl.formatMessage({id:'alertas.confirmacion.body'}),
      icon: 'warning',
      iconColor: '#d33',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: intl.formatMessage({id: 'alertas.confirmacion.boton.aceptar'}),
      cancelButtonText: intl.formatMessage({id: 'alertas.confirmacion.boton.cancelar'})
    })
  }
  
export const AlertaExito = (intl: IntlShape) =>{
    return Swal.fire({
      icon: 'success',
      title: intl.formatMessage({id:'alertas.exito.title'}),
      text: intl.formatMessage({id:'alertas.exito.body'})
    })
}
  
export const AlertaError = (intl: IntlShape) =>{
    return Swal.fire({
      icon: 'error',
      title: intl.formatMessage({id:'alertas.error.title'}),
      text: intl.formatMessage({id:'alertas.error.body'})
    })
}