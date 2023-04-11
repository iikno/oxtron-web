import { SideBarMenuItem } from "@oxtron/Interfaces/SideBar/SideBarMenuItem.d";
import { CiCalendar, CiForkAndKnife, CiGrid32, CiViewList } from "react-icons/ci";

export const SideBarMenuItemsClient:SideBarMenuItem[] = [
    {
        id: "1",
        label: "general.menu.dashboard",
        icon: CiGrid32,
        url: "/dashboard"
    },{        
        id: "2",
        label: "general.menu.weekMenu",
        icon: CiCalendar,
        url: "/planificador"
    },{
        id: "3",
        label: "general.menu.recipeBook",
        icon: CiForkAndKnife,
        url: "/recetario"
    },{
        id: "4",
        label: "general.menu.reports",
        icon: CiViewList,
        url: "/reportes"
    },
]