import { classNames } from "@iikno/clases/Utils"
import Traducir from "@oxtron/i18n/Traducir"
import { SideBarMenuItemViewProps } from "@oxtron/Interfaces/SideBar/SideBarMenuItemViewProps.d"

import './SideBarMenuItemView.scss'

export const SideBarMenuItemView = ({ item, isOpen }:SideBarMenuItemViewProps) => {
    return <div className="SideBarMenuItemView mb-2">
        <a href={item.url}>
            <div className={classNames('ItemContent', isOpen ? '' : 'collapsed')}>
                <div className="icon">
                    <item.icon size={28}/>
                </div>
                <span className="label">{Traducir(item.label)}</span>
            </div>
        </a>
        {
            !isOpen ? <div className="tooltip">{Traducir(item.label)}</div> : ''
        }
    </div>
}