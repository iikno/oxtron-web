import React from 'react'
const Loader = () =>{
    return(
        <div id="background-loader" className="d-none">
            <div className="waterfall">
                <div></div><div></div><div></div><div></div><div></div></div>
            </div>
    );
}

export default Loader;


export function loader(status) {
    const loader = document.getElementById('background-loader');

    const agregar = ( status === 'block' ) ? 'd-block': 'd-none';
    const remover = ( status === 'block' ) ? 'd-none': 'd-block';
    loader.classList.add(agregar);
    loader.classList.remove(remover);
}