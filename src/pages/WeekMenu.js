import React, { useState, useEffect } from 'react';
import Principal from '../components/General/Principal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { getWeekMenus, postWeekMenu, putWeekMenu, deleteWeekMenu, getCategories, getAllergens, getIngredients } from "../api/WeekMenu_api";
import { swalError, swalSuccess } from "../components/Alertas/Alertas";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import DataTable from 'react-data-table-component';




// ICONOS
import imgPlatillo from '../styles/icons/default_image.png';
import plus from '../styles/icons/plus-circle.svg';
import printer from '../styles/icons/printer.svg';
import trash from '../styles/icons/trash.svg';
import pdf from '../styles/icons/file-earmark-pdf.svg';
import files from '../styles/icons/files.svg';


const lunes = [
    {id: uuid(), title: 'First task of the content', price: '0.00', co2: 4.2},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 3.8},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 2.3},
]

const martes = [
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 5},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 2.7},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 0},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 1.2},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 4.5},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 4.9},
    {id: uuid(), title: 'Tarea de ejemplo con 2 lineas', price: '0.00', co2: 3.0},
]


const onDragEnd = ( result, columns, setColumns ) =>{
    if( !result.destination ) return;
    const { source, destination } = result;

    if( source.droppableId !== destination.droppableId ){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId] : {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId] : {
                ...destColumn,
                items:  destItems
            }
        })

        
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
    
        copiedItems.splice(destination.index, 0, removed);
    
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })

    }
}

const WeekMenu = () =>{

    // TRADUCCIONES
    const [t] = useTranslation("global")

    // COLUMNS
    let columnsFromBackend = {
        [uuid()]: {
            name: t("WeekMenu.column-monday"),
            date: '11/04',
            items: lunes,
        },
        [uuid()]: {
            name: t("WeekMenu.column-tuesday"),
            date: '12/04',
            items: martes,
        },
        [uuid()]: {
            name: t("WeekMenu.column-wednesday"),
            date: '13/04',
            items: [],
        },
        [uuid()]: {
            name: t("WeekMenu.column-thursday"),
            date: '14/04',
            items: [],
        },
        [uuid()]: {
            name: t("WeekMenu.column-friday"),
            date: '15/04',
            items: [],
        },
    };

    // KANBAN: Mover items de filas y columnas
    const [columns, setColumns] = useState(columnsFromBackend);

    // USO DE MODAL
    const [modal, setModal] = React.useState(false);
    const [type, setType] = React.useState('');
    const [categories, setCategories] = React.useState([]);
    const [allergens, setAllergens] = React.useState([]);


    const animatedComponents = makeAnimated();

    const resetModal = () =>{
        setModal(false)
        document.getElementById("form-modal").reset();
    }

    useEffect(() => {
        getCategories().then( res => {
            console.log(res);

            let options = [];

            res.data.map( (value) => {
                options.push({ value: value.IdCategoria, label: value.Nombre })
            });

            setCategories(options)

            console.log(options);

        }).catch(res => console.log(res));

        getAllergens().then( res => {
            console.log(res);

            let options = [];

            res.data.map( (value) => {
                options.push({ value: value.IdAlergeno, label: value.Nombre })
            });

            setAllergens(options)

        }).catch(res => console.log(res));

        getIngredients().then( res => {
            console.log(res);

        }).catch(res => console.log(res));
    
    }, []);


    const handleSubmit = ( evt ) =>{
        evt.preventDefault();
        const btn = document.getElementById("btn-save");

        btn.innerText = t("General.button-loading");
        btn.disabled = true;

        
        const { target } = evt;
        const { name } = target;
        
    
        if(type === 'add'){
            // postWeekMenu(name.value).then(res => {
            //     setActualizar(name.value);
            //     resetModal();
            //     swalSuccess(t("General.message-success"));

            // }).catch(err => {
            //     swalError(t("General.message-error"));

            // }).finally( data => {
            //     btn.disabled = false;
            //     btn.innerText = t("General.button-save");
            // });

        } else {
            // putUsersTypes(edit,name.value).then(res => {
            //     setActualizar(name.value);
            //     resetModal();
            //     swalSuccess(t("General.message-success"));
            // }).catch(err => {
            //     swalError(t("General.message-error"));
            // }).finally( data => {
            //     btn.disabled = false;
            //     btn.innerText = t("General.button-save");
            // });

        }
    }


    const add = () =>{
        setModal(true)
        setType('add')
    }

    // CO2
    const [color, setColor] = useState('#C6C6C6');
    const [co2, setCo2] = useState(0);

    const colorTextCo2 = ( num ) => {
        if( ( isNaN(num) ) ) { setCo2(0); return setColor('#C6C6C6');}
        if( num >= 0.7 && num < 1.4 ) setColor('#6CB666');
        if( num >= 1.4 && num < 2.1 ) setColor('#B4CD55');
        if( num >= 2.1 && num < 2.8 ) setColor('#F6E148');
        if( num >= 2.8 && num < 3.5 ) setColor('#F0A548');
        if( num >= 3.5 && num < 4.2 ) setColor('#E5544A');
        if( num >= 4.2 && num < 4.9 ) setColor('#C8504B');
        if( num > 4.9 ) setColor('#A54848');
        if( num < 0.7 ) setColor('#C6C6C6');
        setCo2(num);
    }


    // INGREDIENTES TABLA
    const tableColumns = [
        {
            name: 'Ingrediente',
            selector: row => row.Nombre,
            sortable: true,
            grow: 6,

        },
        {
            name: 'KG',
            selector: row => row.kg,
            sortable: true,
            grow: 1,

        },
        {
            name: 'KG/CO2',
            selector: row => row.kg,
            sortable: true,
            grow: 1,

        },
        {
            grow: 1,
            sortable: false,
            cell: (row, index, column, id) => {
                return <div className="d-flex py-2">
                    <button className="btn btn-item d-flex justify-content-center align-items-center me-2" data-id={row.id}><img src={trash} alt="Delete" /></button>
                </div>
            }
        },
    ];

    const optionType = [
        { value: 'KG', label: 'KG' },
        { value: 'L', label: 'L' },
        { value: 'TBSP', label: 'TBSP' }
    ]

    const tableData = [
        {
            id: 1,
            Nombre: 'Beetlejuice',
            kg: '1.6 KG',
            co2: '8.5 kg CO2'
        },
        {
            id: 2,
            Nombre: 'Ghostbusters',
            kg: '2 tbsp',
            co2: '8.5 kg CO2'
        },
    ]

    return(
        <Principal title={ t("WeekMenu.title") } icon={printer}>
            <div className='d-flex w-100 h-100v' style={{ overflowX: 'scroll' }}>
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return(
                            <div className='me-4' key={id}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h4 className='fw-bold'>{column.name} <span style={{ fontSize: '12px' }}>{column.date}</span></h4>
                                    <div>
                                        <img src={printer} className='me-2' alt='Imprimir' title='Imprimir' />
                                        <img src={plus} alt='Agregar' title='Agregar' onClick={ () => add() } className='cursor-pointer' />
                                    </div>
                                </div>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return(
                                            <div {...provided.droppableProps} ref={provided.innerRef} 
                                                style={{ 
                                                    background: snapshot.isDraggingOver ? '#F2F2F2' : '#F9FAFA',  
                                                    // padding: 4,
                                                    width: 250,
                                                    minHeight: 550,
                                            }}>
                                                
                                                {column.items.map((item, index) => {
                                                    return(
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return(
                                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='shadow-sm' onClick={ () => setModal(true) }
                                                                        style={{
                                                                            userSelect: 'none',
                                                                            padding: 16,
                                                                            margin: '0 0 8px 0',
                                                                            minHeight: '50px',
                                                                            borderRadius: '5px',
                                                                            backgroundColor: snapshot.isDragging ? '#F9FAFA' : 'white',
                                                                            // color: 'white',
                                                                            ...provided.draggableProps.style
                                                                    }}>
                                                                        <div className='row'>
                                                                            <div className='col-8'>{ item.title }</div>
                                                                            <div className='col-4'><span className='fw-bold'>$</span>{ item.price }</div>
                                                                        </div>
                                                                        <div className='mt-2'>
                                                                            <img src={pdf} className='me-2' alt='Allergents' />
                                                                            <img src={files} className='me-2' alt='Allergents' />
                                                                            <img src={pdf} className='me-2' alt='Allergents' />
                                                                        </div>

                                                                        <Co2 co2={ item.co2 } />

                                                                        
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>



            {/* MODAL */}
            <div className={`modal fade ${ (modal) ? 'show d-block' : '' }`} id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <form onSubmit={handleSubmit} className="modal-content" id="form-modal">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => resetModal()}></button>
                        </div>
                        <div className="modal-body">
                            <div className="px-4 pb-4">
                                <div className='row'>
                                    <div className='col-lg-8 order-1 order-lg-0 mt-5 mt-lg-0'>
                                        <h6 className='text-uppercase text-gris'>Name</h6>
                                        <h2 className='principal-title fw-bold'><input type='text' placeholder='Nombre del platillo' className='without-borders' id='name' /></h2>

                                        <h6 className='text-uppercase text-gris mt-4'>Description</h6>
                                        <textarea placeholder='Descripción del platillo' className='w-100 without-borders' rows={4} id='description'></textarea>

                                        <h6 className='text-uppercase text-gris mt-4'>Price</h6>
                                        <p>$ <input type='number' placeholder='0.00' className='without-borders' id='price'/></p>

                                        <h6 className='text-uppercase text-gris mt-4'>Units</h6>
                                        <p><input type='number' placeholder='0' className='without-borders' id='units' /></p>

                                        <h6 className='text-uppercase text-gris mt-4'>Ingredients</h6>
                                        <DataTable 
                                            columns={tableColumns}
                                            data={tableData}
                                        />
                                        <div className='row mt-3'>
                                            <div className='col-md-4'>
                                                <Select options={allergens} closeMenuOnSelect={false} components={animatedComponents} classNamePrefix="react-select" />
                                            </div>
                                            <div className='col-md-2'>
                                                <input type='number'  placeholder='0' className='form-control' style={{ borderTop: 0, borderRight: 0, borderLeft: 0, }} />
                                            </div>
                                            <div className='col-md-3'>
                                                <Select options={optionType} defaultValue={optionType[0]} closeMenuOnSelect={false} components={animatedComponents} classNamePrefix="react-select" />
                                            </div>
                                            <div className='col-md-2'>
                                                <button className='btn btn-principal'>Add</button>
                                            </div>
                                        </div>

                                        <h6 className='text-uppercase text-gris mt-4'>Allergens</h6>
                                        <Select options={allergens} closeMenuOnSelect={false} components={animatedComponents} isMulti />

                                        <h6 className='text-uppercase text-gris mt-4'>Complete</h6>
                                        <div className='week-modal-buttons'>
                                            <button type='submit' className='me-3 px-4 btn btn-discard text-white'><img alt='Discard' src={trash} style={{filter: 'invert(100%)'}} className='me-1' /> Discard</button>
                                            <button type='submit' className='me-3 px-4 btn btn-print text-white'><img alt='Print' src={printer} style={{filter: 'invert(100%)'}} className='me-1' /> Print</button>
                                            <button type='submit' className='me-3 px-4 btn btn-save text-white'><img alt='Save' src={pdf} style={{filter: 'invert(100%)'}} className='me-1' /> Save</button>
                                        </div>

                                    </div>
                                    <div className='col-lg-4 order-0 order-lg-1'>
                                        <h6 className='text-uppercase text-gris'>Image</h6>
                                        <img 
                                            src={imgPlatillo}
                                            alt="user"
                                            className='img-fluid rounded'
                                            style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                                        />

                                        <h6 className='text-uppercase text-gris mt-4'>Carbon emission</h6>
                                        <h2 className='fw-bold w-100 d-flex' style={{ color: color }}><span id='carbon-emision' className='me-2'>0</span> KG/CO2</h2>
                                        <Co2 co2={ co2 } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Principal>
    )
}

const Co2 = ({ co2 }) => {
    return(
        <div className='items-co2 mt-3'>
            <div className='item-co2' style={{ backgroundColor : (co2 < 0.7) ? '#C6C6C6' : '#6CB666'}}></div>
            <div className='item-co2' style={{ backgroundColor : (co2 < 1.4) ? '#C6C6C6' : '#B4CD55'}}></div>
            <div className='item-co2' style={{ backgroundColor : (co2 < 2.1) ? '#C6C6C6' : '#F6E148'}}></div>
            <div className='item-co2' style={{ backgroundColor : (co2 < 2.8) ? '#C6C6C6' : '#F0A548'}}></div>
            <div className='item-co2' style={{ backgroundColor : (co2 < 3.5) ? '#C6C6C6' : '#E5544A'}}></div>
            <div className='item-co2' style={{ backgroundColor : (co2 < 4.2) ? '#C6C6C6' : '#C8504B'}}></div>
            <div className='item-co2' style={{ backgroundColor : (co2 < 4.9) ? '#C6C6C6' : '#A54848'}}></div>
        </div>
    );
}


export default WeekMenu