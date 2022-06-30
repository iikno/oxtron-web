import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Principal from "../components/General/Principal";
import { getActivities } from "../api/Activities_api";
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import { swalError } from "../components/Alertas/Alertas";
import JsonActivities from '../components/General/JsonActivities';



// CSS
import '../styles/home/activities.scss';
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next'


const Activities = () => {
    const [t] = useTranslation("global")
    // RECOLECCION DE DATOS
    const [data, setData] = React.useState([]);
    const [pending, setPending] = React.useState(true);

    
    
    // FECHA
    const [startDate, setStartDate] = React.useState(new Date());
    const [finalDate, setFinalDate] = React.useState(new Date());


    let day     = startDate.getDate();
    let month   = startDate.getMonth();
    let year    = startDate.getFullYear();

    let fday     = finalDate.getDate();
    let fmonth   = finalDate.getMonth() + 1;
    let fyear    = finalDate.getFullYear();
    
    // Dates
    let fi      = month+ '/' + day + '/' + year;
    let ff      = fmonth+ '/' + fday + '/' + fyear;

    useEffect(() => {
        getActivities( fi, ff ).then( res => {
            setData(res.data);
            setPending(false);
        }).catch(res => {
            swalError('Error trying to get data');
        });
    },[fi, ff]);
 
    const columns = [
        {
            name: t("Activities.column-user"),
            selector: row => row.Usuario,
            sortable: true,

        }, 
        {
            name: t("Activities.column-module"),
            selector: row => row.Modulo,
            sortable: true,
        },
        {
            name: t("Activities.column-action"),
            selector: row => row.Accion,
            sortable: true,
        },
        {
            name: t("Activities.column-date"),
            selector: row => row.Fecha,
            format: row => { return <Moment format="DD/MM/YYYY hh:mm a">{row.Fecha}</Moment> },
            sortable: true,

        },
        
    ];


    // FILTROS GENERALES
    const [filterText, setFilterText] = React.useState('');
    const [filterAction, setFilterAction] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const filteredItems = data.filter( function(item){
        if( filterText.trim().length === 0 ){
            return item.Accion.toLowerCase().includes(filterAction.toLowerCase());
        }
        return (item.Accion.toLowerCase().includes(filterAction.toLowerCase()) && (item.Usuario.toLowerCase().includes(filterText.toLowerCase()) || item.Accion.toLowerCase().includes(filterText.toLowerCase()) ||  item.Modulo.toLowerCase().includes(filterText.toLowerCase())));
    });
    
    const handleClear = () => {
        if (filterText || filterAction) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterAction('');
        }
    };


    // HEADER TABLA
	const subHeaderComponentMemo = React.useMemo(() => {	
		return (
            <div className='d-flex justify-content-between align-items-center w-100'>
                <div className='d-flex'>
                    <DatePicker selected={Date.parse(fi)} onChange={date => { setPending(true); setStartDate(date); }} className="form-control mt-3"/>
                    <DatePicker selected={finalDate} onChange={date => { setPending(true); setFinalDate(date); }} className="form-control mt-3 ms-2"/>
                </div>
			    <input onChange={e => setFilterText(e.target.value)} placeholder={t("General.input-search")} className="form-control table_search mt-3" />
            </div>
		);
	});



    // VISTA DE SELECCION DE FILTRO
    const [active, setActive] = React.useState('');

    if( active.length === 0 ){
        setActive('activities_all');
    }

    const addActiveClass = (e) => {
        const clicked = e.target.id;
        if(active === clicked) { 
            setActive('');
        } else {
            setActive(clicked);
        }
    };

    // USO DE MODAL
    const [modal, setModal] = React.useState(false);

    const resetModal = () =>{
        setModal(false);
    }
    
    const ExpandedComponent = ({ data }) => <JsonActivities id={data.IdActividad}></JsonActivities>;


    // DISENO PRINCIPAL
    return ( 
        <Principal title={t("Activities.title")}>
            <div id="activities" className="row">
                <div className="col-md-2 activities_actions">
                    <div onClick={(e) => {handleClear(); addActiveClass(e)}} id="activities_all" className={`d-block mb-2 p-3 rounded text-white activities_action cursor-pointer ${active === "activities_all"? 'active': ''}`}>{t("Activities.button-all")}</div>
                    <div onClick={(e) => {setFilterAction('OBTENER'); addActiveClass(e)}} id="activities_consult" className={`d-block my-2 p-3 rounded text-white activities_action cursor-pointer ${active === "activities_consult"? 'active': ''}`}>{t("Activities.button-consult")}</div>
                    <div onClick={(e) => {setFilterAction('ALTA'); addActiveClass(e)}} id="activities_create" className={`d-block my-2 p-3 rounded text-white activities_action cursor-pointer ${active === "activities_create"? 'active': ''}`}>{t("Activities.button-create")}</div>
                    <div onClick={(e) => {setFilterAction('MODIFICAR'); addActiveClass(e)}} id="activities_edit" className={`d-block my-2 p-3 rounded text-white activities_action cursor-pointer ${active === "activities_edit"? 'active': ''}`}>{t("Activities.button-edit")}</div>
                    <div onClick={(e) => {setFilterAction('ELIMINAR'); addActiveClass(e)}} id="activities_eliminate" className={`d-block my-2 p-3 rounded text-white activities_action cursor-pointer ${active === "activities_eliminate"? 'active': ''}`}>{t("Activities.button-delete")}</div>
                </div>
                <div className="col-md-10" id="v-pills-tabContent">
                    <DataTable 
                        columns={columns}
                        data={filteredItems}
                        pagination
                        subHeader
			            subHeaderComponent={subHeaderComponentMemo}
                        progressPending={pending}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        // expandableRowsComponentProps={{"someTitleProp": 'hola'}}
                    />
                </div>
            </div>

            <div className={`modal fade ${ (modal) ? 'show d-block' : '' }`} id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" id="form-modal">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="modalLabel">{t("Activities.column-details")}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => resetModal()}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <pre id='data-json'></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Principal>
    );
}


 
export default Activities;
