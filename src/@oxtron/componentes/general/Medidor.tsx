import React from 'react';
import "./Medidor.scss";

interface ComponentProps {
    id: string;
    co2: number;
}

const Medidor = React.forwardRef<SVGSVGElement, ComponentProps>((props, ref) => {
    let valor = 0
    let color = "#2266e5";
    switch(true){
        case (props.co2 <= .3):
            valor = 0
            color = "#2266e5";
            break;
        case (props.co2 <= .9):
            valor = 25
            color = "#1a4db5";
            break;
        case (props.co2 <= 2):
            valor = 50
            color = "#123385";
            break;
        case (props.co2 <= 5):
            valor = 75
            color = "#0a1a55";
            break;
        default:
            valor = 100
            color = "#020024";
            break;
    }
    return (
        <svg ref={ref} height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={props.id}>
                    <rect width="100%" height={valor + "%"} transform="scale(1,-1) translate(0,-100)"/>
                </clipPath>
            </defs>
            <circle cx="50" cy="50" r="45" fill={color}/>
            <circle cx="50" cy="50" r="38" fill='white'/>
            <circle cx="50" cy="50" r="39" fill={color} clipPath={'url(#' + props.id +')'}/>
            <text className='etiqueta te1' x="50%" y="42%" dominantBaseline="middle" textAnchor="middle">{parseFloat(props.co2.toString()).toFixed(1)} KG</text>
            <text className='etiqueta te2' x="50%" y="60%" dominantBaseline="middle" textAnchor="middle">CO2</text>
        </svg>
    );
});

export default Medidor;