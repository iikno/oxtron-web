import { ObtenerSesion } from "@iikno/clases/LocalSession";
import { classNames } from "@iikno/clases/Utils"
import { $baseS3 } from "@oxtron/configs/Env";
import { SideBarMenuCardViewProps } from "@oxtron/Interfaces/SideBar/SideBarMenuCardViewProps.d"

import './SideBarMenuCardView.scss';

export const SideBarMenuCardView = ({ isOpen }:SideBarMenuCardViewProps) => {
    const sesion = ObtenerSesion();

    return <div className="SideBarMenuCardView mb-2">
        <img className="profile" src={$baseS3 + sesion.Foto} width="100%" alt=""/>
        <div className={classNames('profileInfo', isOpen ? '' : 'collapsed')}>
            <div className="name">{sesion.NombreCompletoRol}</div>
            <div className="title">{sesion.Sucursal}</div>
        </div>
    </div>
}