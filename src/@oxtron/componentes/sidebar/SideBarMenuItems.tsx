import { SideBarMenuItem } from "@oxtron/Interfaces/SideBar/SideBarMenuItem.d";

import { FcHome, FcBriefcase, FcCalendar, FcConferenceCall, FcElectricalSensor, FcSurvey } from "react-icons/fc";

export const SideBarMenuItems:SideBarMenuItem[] = [
    {
        id: "1",
        label: "general.menu.dashboard",
        icon: FcHome,
        url: "/dashboard"
    },{
        id: "2",
        label: "general.menu.activities",
        icon: FcElectricalSensor,
        url: "/actividades"
    },{
        id: "3",
        label: "general.menu.weekMenu",
        icon: FcCalendar,
        url: "/planificador"
    },{
        id: "4",
        label: "general.menu.recipeBook",
        icon: FcSurvey,
        url: "/recetario"
    },{
        id: "5",
        label: "general.menu.users",
        icon: FcConferenceCall,
        url: "/usuarios"
    },{
        id: "6",
        label: "general.menu.reports",
        icon: FcBriefcase,
        url: "/reportes"
    },
]