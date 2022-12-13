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