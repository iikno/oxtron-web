export const GuardarSesion = (valores:any) => {
    try{
        ObtenerSesion();
    }catch{}
        
    localStorage.setItem("oxt:iik", JSON.stringify(valores));
};

export const ObtenerSesion = ():any => {
    let sesion = localStorage.getItem("oxt:iik");

    if(sesion !== null)
        sesion = JSON.parse(sesion);
    else
        throw new Error("Sin sesión")

    return sesion;
}

export const EliminarSesion = () => {
    localStorage.clear();
}

export const ValidarSesion = () => {
    try{
        ObtenerSesion();
    }catch{
        window.location.assign('/')
    } 
}

export const CerrarSesion = () => {
    EliminarSesion();
    window.location.assign('/')
}