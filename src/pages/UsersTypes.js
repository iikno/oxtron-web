import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Principal from "../components/General/Principal";
import { getUsersTypes, postUsersTypes, putUsersTypes, deleteUsersTypes } from "../api/UsersTypes_api";
import Swal from 'sweetalert2';
import { swalError, swalSuccess } from "../components/Alertas/Alertas";
import { loader } from '../components/General/Loader';


// CSS
import '../styles/home/activities.scss';

// IMAGES
import plus from '../styles/icons/plus-lg.svg'
import pen from '../styles/icons/pen.svg'
import eliminate from '../styles/icons/x.svg'
import { useTranslation } from 'react-i18next'

const UsersTypes = () => {
    const [t] = useTranslation("global")

    // RECOLECCION DE DATOS
    const [data, setData] = React.useState([]);
    const [pending, setPending] = React.useState(true);
    const [edit, setEdit] = React.useState('');
    const [actualizar, setActualizar] = React.useState('');


    useEffect(() => {
        getUsersTypes().then( res => {
            setData(res.data);
            setPending(false);
        }).catch(res => {
            swalError(t("General.message-error"));
        });
    }, [actualizar]);

    
    const columns = [
        {
            name: t("UserTypes.column-user-type"),
            selector: row => row.Nombre,
            sortable: true,
            grow: 6,

        },
        {
            name: t("UserTypes.column-actions"),
            grow: 1,
            sortable: false,
            cell: (row, index, column, id) => {
                return <div className="d-flex py-2">
                    <button className="btn btn-item d-flex justify-content-center align-items-center me-2" data-id={row.IdTipoUsuario} onClick={ () => editItem(row.Nombre, row.IdTipoUsuario)}><img src={pen} alt="Add User Type" /></button>
                    <button className="btn btn-item d-flex justify-content-center align-items-center" data-id={row.IdTipoUsuario} onClick={ () => deleteItem(row.IdTipoUsuario)}><img src={eliminate} alt="Add User Type" /></button>
                </div>
            }
        },
    ];

    // FILTROS GENERALES
    const [filterText, setFilterText] = React.useState('');

    const filteredItems = data.filter( function(item){
        return item.Nombre.toLowerCase().includes(filterText.toLowerCase());
    });

	const subHeaderComponentMemo = React.useMemo(() => {
		return (
			<input onChange={e => setFilterText(e.target.value)} placeholder={t("General.input-search")} className="form-control table_search mt-3" />
		);
	});


    // USO DE MODAL
    const [modal, setModal] = React.useState(false);
    const [type, setType] = React.useState('');


    const addUserType = () =>{
        setModal(true)
        setType('add')
    }

    const resetModal = () =>{
        setModal(false)
        document.getElementById("form-modal").reset();

        // BOTON
        const btn = document.getElementById("btn-save");
        btn.disabled = false;
        btn.innerText = t("General.button-save");
    }

    // AGREGAR
    const handleSubmit = ( evt ) =>{
        evt.preventDefault();
        const btn = document.getElementById("btn-save");

        btn.innerText = t("General.button-loading");
        btn.disabled = true;

        
        const { target } = evt;
        const { name } = target;
        
    
        if(type === 'add'){
            postUsersTypes(name.value).then(res => {
                setActualizar(name.value);
                resetModal();
                swalSuccess(t("General.message-success"));

            }).catch(err => {
                swalError(t("General.message-error"));

            }).finally( data => {
                btn.disabled = false;
                btn.innerText = t("General.button-save");
            });

        } else {
            putUsersTypes(edit,name.value).then(res => {
                setActualizar(name.value);
                resetModal();
                swalSuccess(t("General.message-success"));
            }).catch(err => {
                swalError(t("General.message-error"));
            }).finally( data => {
                btn.disabled = false;
                btn.innerText = t("General.button-save");
            });

        }


    }

    // ELIMINAR
    const deleteItem = ( id ) =>{
        Swal.fire({
            title: t("General.message-ask-title"),
            text: t("General.message-ask-text"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1a1e21',
            cancelButtonColor: '#d33',
            confirmButtonText: t("General.message-ask-confirm"),
            cancelButtonText:  t("General.message-ask-cancel")
        }).then((result) => {
            if (result.isConfirmed) {
                loader('block');
                deleteUsersTypes(id).then(res => {
                    setActualizar(id);
                    swalSuccess(t("General.message-success"));
                    loader('none');
                }).catch(err => {
                    swalError(t("General.message-error"));
                });
            }
        })
        
    }

    // EDITAR
    const editItem = (name, id) =>{
        setEdit(id);
        setType('edit');
        setModal(true);
        document.getElementById("name").value = name;
    }
    

    // DISENO PRINCIIPAL
    return ( 
        <Principal title={t("UserTypes.title")}>
            <div id="userstypes">
                <div className="d-flex justify-content-end mb-4">
                    <button className="btn btn-plus d-flex justify-content-center align-items-center" onClick={ () => addUserType() }><img src={plus} alt="Add User Type" /></button>
                </div>
                <DataTable 
                    columns={columns}
                    data={filteredItems}
			        subHeaderComponent={subHeaderComponentMemo}
                    progressPending={pending}
                    pagination
                    subHeader
                />
            </div>

            <div className={`modal fade ${ (modal) ? 'show d-block' : '' }`} id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={handleSubmit} className="modal-content" id="form-modal">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="modalLabel">{t("UserTypes.column-user-type")}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => resetModal()}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">{t("UserTypes.modal-name")}</label>
                                <input type="text" className="form-control" id="name" aria-describedby="name" />
                                <div id="nameHelp" className="form-text">{t("UserTypes.modal-description")}</div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="submit" className="btn btn-dark" id='btn-save'>{t("General.button-save")}</button>
                        </div>
                    </form>
                </div>
            </div>


        </Principal>
    );
}
 
export default UsersTypes;