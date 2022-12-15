import { $baseS3, $noFoto, $noFotoPNG } from "@oxtron/configs/Env";

export const classNames = (...args:any[]):string => {
    return args.filter(Boolean).join(' ');
}

export const ValidarImg = (image:string) => {
    if(image === undefined || image === $noFotoPNG || image === ""){
        return $noFoto;
    }else{
        return $baseS3+image;
    }   
}

export const ValidarStatus =  (Status:any) =>{
    switch(Status){
        case "ACTIVO":
            return "text-success";
        case "INACTIVO":
            return "text-muted";
        case "SUSPENDIDO":
            return "text-secondary";
    }
}