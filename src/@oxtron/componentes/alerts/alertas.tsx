import Traducir from "@oxtron/i18n/Traducir";
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

export const AlertaError = (intl:any) =>{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: intl({id: 'alerta.exito.texto'})
      })
    }
    
export const AlertaExito = (intl:any) =>{
    Swal.fire({
        icon: 'success',
        title: intl({id: 'alerta.exito.titulo'}),
        text: intl({id: 'alerta.exito.texto'}),
        showConfirmButton: false,
        timer: 1500
    })
}

export const ConfirmarEliminar = (intl:any) =>{
    return Swal.fire({
        title: intl.formatMessage({id: 'alerta.continuar'}),
        text: intl.formatMessage({id: 'alerta.eliminar.texto'}),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: intl.formatMessage({id: "boton.eliminar.confirmar"}),
        cancelButtonText: intl.formatMessage({id: 'boton.cancelar'})
      }) 
}