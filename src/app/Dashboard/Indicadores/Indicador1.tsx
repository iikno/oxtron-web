import { Indicador1Interface } from "@oxtron/Interfaces/Indicador1Interface.d"

import "./Indicador1.scss";

export const Indicador1 = ({Title, Subtitle, data, Icon} : Indicador1Interface) => {
    return <div className="indicador1">
        <div className="cuerpo">
            {<Icon size={42} className="mt-2 mb-3"/>}
            <span className="title">{Title}</span>
            <span className="subtitle">{Subtitle}</span>
        </div>
        <div className="datos">
            {data.toFixed(2).toString()}
        </div>
    </div>
}