import { IntlShape } from "react-intl";
import Swal from "sweetalert2";

export const Alerta_Error = () =>{
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Algo salio mal, inténtalo mas tarde'
  })
}

export const Alterta_Exito = () =>{
  Swal.fire({
    icon: 'success',
    title: 'Operación completada',
    text: 'Su acción se ha completado exitosamente',
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