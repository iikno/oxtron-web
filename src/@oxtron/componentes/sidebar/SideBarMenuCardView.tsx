import { ObtenerSesion } from "@iikno/clases/LocalSession";
import { classNames } from "@iikno/clases/Utils"
import { $baseS3, $noFoto } from '@oxtron/configs/Env';
import { SideBarMenuCardViewProps } from "@oxtron/Interfaces/SideBar/SideBarMenuCardViewProps.d"

import './SideBarMenuCardView.scss';

export const SideBarMenuCardView = ({ isOpen }:SideBarMenuCardViewProps) => {
    const sesion = ObtenerSesion();

    return <div className="SideBarMenuCardView mb-2">
        <img className="profile" src={(sesion.Foto!=="no-image.png") ? $baseS3 + sesion.Foto : $noFoto} width="100%" alt=""/>
        <div className={classNames('profileInfo', isOpen ? '' : 'collapsed')}>
            <div className="name">{sesion.NombreCompleto}</div>
            {
                !sesion.EsUsuario &&
                <div className="title">{sesion.Sucursal}</div>
            }
        </div>
    </div>
}