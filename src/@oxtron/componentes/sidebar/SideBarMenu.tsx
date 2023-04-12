import { classNames } from "@iikno/clases/Utils";
import { VscMenu } from 'react-icons/vsc'
import { SideBarMenuCardView } from "./SideBarMenuCardView";
import { SideBarMenuItemView } from "./SideBarMenuItemView";

import './SideBarMenu.scss';
import { SideBarMenuItems } from "./SideBarMenuItems";
import { SideBarMenuItemsClient } from "./SideBarMenuItemsClient";
import { ObtenerSesion } from '@iikno/clases/LocalSession';
import { useRecoilState } from "recoil";
import { MenuAtom } from "@oxtron/atomos/MenuAtom";
import { SideBarMenuItemDropDownView } from "./SideBarMenuItemDropDownView";

export const SideBarMenu = () => {
    const sesion = ObtenerSesion();
    const [isOpen, setIsOpen] = useRecoilState(MenuAtom);
    
    return <div className={classNames('SideBarMenu', isOpen ? 'expanded' : 'collapsed')}>
        <div className="menuButton">
            <button className="hamburgerIcon" onClick={() => setIsOpen(!isOpen)}>
                <VscMenu/>
            </button>
        </div>
        <SideBarMenuCardView isOpen={isOpen}/>
        {
            (sesion.EsUsuario) ?
            SideBarMenuItems.map((item) => (
                <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen}/>
            ))
            :
            SideBarMenuItemsClient.map((item) => (
                <SideBarMenuItemView key={item.id} item={item} isOpen={isOpen}/>
            ))
        }
        <SideBarMenuItemDropDownView/>
    </div>
}