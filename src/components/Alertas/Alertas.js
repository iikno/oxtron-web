import Swal from 'sweetalert2';

export function swalError( error ){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
    });
}

export function swalSuccess( message ){
    Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}
