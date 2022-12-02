import { SideBarMenuItem } from "@oxtron/Interfaces/SideBar/SideBarMenuItem.d";
import { CiCalendar, CiForkAndKnife, CiGrid32, CiUser, CiViewList, CiWavePulse1 } from "react-icons/ci";

export const SideBarMenuItems:SideBarMenuItem[] = [
    {
        id: "1",
        label: "general.menu.dashboard",
        icon: CiGrid32,
        url: "/dashboard"
    },{
        id: "2",
        label: "general.menu.activities",
        icon: CiWavePulse1,
        url: "/actividades"
    },{
        id: "3",
        label: "general.menu.weekMenu",
        icon: CiCalendar,
        url: "/planificador"
    },{
        id: "4",
        label: "general.menu.recipeBook",
        icon: CiForkAndKnife,
        url: "/recetario"
    },{
        id: "5",
        label: "general.menu.users",
        icon: CiUser,
        url: "/usuarios"
    },{
        id: "6",
        label: "general.menu.reports",
        icon: CiViewList,
        url: "/reportes"
    },
]