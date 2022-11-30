import { Indicador2Interface } from "@oxtron/Interfaces/Indicador2Interface.d"

import "./Indicador2.scss";

export const Indicador2 = ({title, subtitle, data} : Indicador2Interface) => {
    return <div className="indicador2 p-4">
        <div className="cuerpo">
            <span className="fs-6 d-block">{subtitle}</span>
            <span className="fs-4 fw-bold d-block w-75">{title}</span>
        </div>
        <div className="datos">
            <span className="fs-3 fw-bold d-block">
                {data.toFixed(2).toString()}
            </span>
            <span className="fs-6 d-block">Kg CO<sup>2</sup>e</span>
        </div>
    </div>
}