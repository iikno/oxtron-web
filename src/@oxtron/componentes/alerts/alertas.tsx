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

export const ConfirmarEliminar = () =>{
  return Swal.fire({
    title: "Se eliminará el registro",
    text: "¿Estas seguro de borrar el registro seleccionado?",
    icon: 'warning',
    iconColor: '#d33',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  })
}

export const AlertaExito = () =>{
  return Swal.fire({
    icon: 'success',
    title: 'Operación completada',
    text: 'La acción se ha completado exitosamente',
  })
}

export const AlertaError = () =>{
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Algo salio mal, inténtalo mas tarde'
  })
}