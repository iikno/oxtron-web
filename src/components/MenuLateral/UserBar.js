import React, { useEffect, useState } from 'react';
import Prueba from '../../styles/icons/prueba.jpg'
import '../../styles/MenuLateral/MenuLateral.scss';

const UserBar = ({size}) =>{

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 450px)").matches
    )
      
    useEffect(() => {
        window
        .matchMedia("(min-width: 450px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    if(matches === false && size===false){
        return(
            <div className='user-bar-small d-flex align-items-center mt-1 mb-1 p-2'>           
                <img 
                    src={Prueba}   
                    alt="user" 
                        className="user-small-image"
                />
            </div>
        )
    }

    if(matches === false && size===true){
        return(
            <div className='user-bar container'>  
                <img 
                    src={Prueba} 
                    alt="user" 
                    className="user-image"
                />
                <div className='data-user'>
                    <p style={{fontWeight: "bold"}}>Bistro Carbon</p>
                    <p>10,023,451</p>
                </div>    
            </div>
        )     
    }
    if(matches === true && size===true){
        return(
            <div className='user-bar container'>  
                <img 
                    src={Prueba} 
                    alt="user" 
                    className="user-image"
                />
                <div className='data-user'>
                    <p style={{fontWeight: "bold"}}>Bistro Carbon</p>
                    <p>10,023,451</p>
                </div>    
            </div>
        )     
    }
    if(matches === true && size===false){
        return(
            <div className='user-bar'>  
                <img 
                    src={Prueba} 
                    alt="user" 
                    className="user-small-image"
                />
            </div>
        )     
    }
}
export default UserBar