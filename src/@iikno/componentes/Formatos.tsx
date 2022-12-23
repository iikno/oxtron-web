import moment from "moment";

moment.locale("es")

export const FormatoMinutosAHoras = (minutos : number) => {
    var duration = moment.duration(minutos, 'minutes');

    var hh = (duration.years() * (365 * 24)) + (duration.months() * (30 * 24)) + (duration.days() * 24) + (duration.hours());

    var mm = duration.minutes();

    return hh + ':' + mm + ' hrs';
}

export const FormatoFechaHora = (fecha : Date) => {
    return moment(fecha).format("DD/MM/YYYY hh:mm a")
}

export const FormatoFecha = (fecha : Date) => {
    return moment(fecha).format("DD/MM/YYYY")
}

export const FormatoFechaServidor = (fecha : Date) => {
    return moment(fecha).format("YYYY/MM/DD")
}

export const FormatoMoneda = (cantidad : any) => {
    let num = Number.parseFloat(cantidad)

    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}