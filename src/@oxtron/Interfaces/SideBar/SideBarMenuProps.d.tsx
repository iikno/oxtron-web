import { SideBarMenuCard } from "./SideBarMenuCard.d";
import { SideBarMenuItem } from "./SideBarMenuItem.d";

export interface SideBarMenuProps{
    items:SideBarMenuItem[];
    card: SideBarMenuCard;
}