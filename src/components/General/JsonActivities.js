import React, { useEffect } from 'react';
import { getActivitiesDetails } from "../../api/Activities_api";
import { swalError } from "../Alertas/Alertas";
import { useTranslation } from 'react-i18next'

const JsonActivities = ( props ) =>{

    const [t] = useTranslation("global")

    const [json, setJson] = React.useState('');


    useEffect(() => {
        getActivitiesDetails(props.id).then(res => {
            // document.getElementById("data-json").innerHTML = JSON.stringify(res.data[0], null, 2);
            // setModal(true);
            // loader('none');
            
    
            setJson(res.data[0]);
    
        }).catch(err => {
            swalError('Error trying to get data');
        });
    }, [props.id]);    


    return(
        <pre>
            {( json.length === 0 ) ? t("General.button-loading") : JSON.stringify(json, null, 2)}
        </pre>
    );

}

export default JsonActivities;