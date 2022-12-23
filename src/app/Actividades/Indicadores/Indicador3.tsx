import { Indicador3Interface } from "@oxtron/Interfaces/Indicador3Interface.d"

import "./Indicador3.scss";

export const Indicador3 = ({title} : Indicador3Interface) => {
    return <div className="indicador3">
        <div className="cuerpo">
            <span className="title">{title}</span>
        </div>
    </div>
}