import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

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