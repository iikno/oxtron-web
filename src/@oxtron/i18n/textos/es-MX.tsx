/* eslint-disable import/no-anonymous-default-export */
import { LOCALES } from "../Locales";

export default{
    [LOCALES.ESPAÑOL]: {
        'general.menu.dashboard': "Panel central",
        'general.menu.activities': "Actividades",
        'general.menu.weekMenu': "Planificador",
        'general.menu.recipeBook': "Recetario",
        'general.menu.users': "Usuarios",
        'general.menu.customers': "Clientes",
        'general.menu.reports': "Reportes",

        'general.menuSuperior.planificador': "Agregar a planificador",
        'general.menuSuperior.recetario': "Nueva receta",
        'general.menuSuperior.perfil': "Perfil",
        'general.menuSuperior.salir': "Cerrar sesión",

        'alerta.continuar': "¿Quieres continuar?",
        'alerta.eliminar.texto': "No podrás revertir esto",
        'alerta.suspender.texto': "Está a punto de cambiar el estado del usuario",
        'alerta.error.texto': "Algo salió mal, inténtalo de nuevo más tarde",
        'alerta.error.campos': "Algo salió mal, faltan campos por llenar",
        'alerta.exito.titulo': "Operación completada",
        'alerta.exito.texto': "Su acción se ha completado con éxito",
        
        'opciones.titulo': "Opciones",
        'opciones.titulo.editar': "Editar",
        'opciones.titulo.suspender': "Suspender",
        'opciones.titulo.eliminar': "Eliminar",

        'boton.cancelar': "Cancelar",
        'boton.guardar': "Guardar",
        'boton.continuar': "Continuar",
        'boton.eliminar.confirmar': "Si, eliminalo",
        'boton.obtener': "Obtener",
        'boton.alta': "Alta",
        'boton.modificar': "Modificar",
        'boton.eliminar': "Eliminar",

        'buscar.titulo': "Buscar",
        'buscar.periodoTiempo': "Periodo de tiempo",

        'dashboard.titulo': "Panel central",
        'dashboard.periodoTiempo': "Periodo de tiempo",
        'dashboard.cliente': "Cliente",
        'dashboard.CF': "Promedio de Huella de Carbono",
        'dashboard.CF.subtitle': 'Promedio de platillos medidos en',
        'dashboard.MS': "Platillos Servidos",
        'dashboard.MS.subtitle': 'Durante el periodo seleccionado',
        'dashboard.TCO': "Total de Emisiones Producidas",
        'dashboard.TCO.subtitle': 'Total calculado en',
        'dashboard.meal.highImpact': 'Platillo con mayor impacto',
        'dashboard.meal.lowImpact': 'Platillo con menor impacto',
        'dashboard.meal.name': 'Sin platillo',
        'dashboard.grafica': 'Gráfica',
        

        'actividades.titulo': "Actividades",
        'actividades.periodoTiempo': "Periodo de tiempo",
        'actividades.cliente': "Cliente",

        'modal.titulo.foto': "Foto",
        'modal.titulo.nombre': "Nombre",
        'modal.titulo.apellidoPaterno': "Apellido paterno",
        'modal.titulo.apellidoMaterno': "Apellido materno",
        'modal.titulo.correo': "Correo electrónico",
        'modal.titulo.telefono': "Teléfono",
        'modal.titulo.calle': "Calle",
        'modal.titulo.noExterior': "No. Exterior",
        'modal.titulo.noInterior': "No. Interior",
        'modal.titulo.colonia': "Colonia",
        'modal.titulo.codigoPostal': "Código postal",
        'modal.titulo.municipio': "Municipio",
        'modal.titulo.estado': "Estado",
        'modal.titulo.pais': "País",
        'modal.titulo.empresa': "Empresa",
        'modal.titulo.sucursal': "Sucursal",
        'modal.titulo.tamañoCompañia': "Tamaño de compañia",
        'modal.titulo.tab.datosPersonales': "Información personal",
        'modal.titulo.tab.direccion': "Dirección",
        'modal.titulo.detallesActividad': "Detalles de actividad",
        'modal.titulo.accion': "Acción",
        'modal.titulo.usuario': "Usuario",
        'modal.titulo.fecha': "Fecha",
        'modal.titulo.idObjeto': "Id de objeto",
        'modal.titulo.modulo': "Módulo",
        'modal.titulo.tabla': "Tabla",   
        'modal.titulo.idActividad': "Id de actividad", 


        'usuarios.titulo': "Usuarios",
        'usuarios.titulo.Foto': "Foto",
        'usuarios.titulo.Nombre': "Nombre",
        'usuarios.titulo.Correo': "Correo",
        'usuarios.titulo.Status': "Status",
        'usuarios.boton.nuevoUsuario': "Nuevo usuario",
        'usuarios.modal.titulo': "Usuario",

        'clientes.titulo': "Clientes",
        'clientes.titulo.Foto': "Foto",
        'clientes.titulo.Nombre': "Nombre",
        'clientes.titulo.Correo': "Correo",
        'clientes.titulo.Status': "Status",
        'clientes.boton.nuevoCliente': "Nuevo cliente",
        'clientes.modal.titulo': "Cliente",
        
        


        'recetario.titulo': "Recetario",
        'recetario.vegan': "Vegano",
        'recetario.titulo.Nombre': "Nombre",
        'recetario.titulo.Descripcion': "Descripción",
        'recetario.titulo.Tipo': "Tipo",
        'recetario.titulo.Emision': "Emisión",
        'recetario.barraBusqueda': "Buscar",
        'recetario.nuevaReceta': "Nueva Receta",
        'recetario.detallesReceta': "Detalles de Receta",
        'recetario.opciones': "Opciones",
        'recetario.formFoto': "Imagen",
        'recetario.formCarbon': "Emisión de Carbono",
        'recetario.formNombre': "Nombre",
        'recetario.formPrecio': "Precio",
        'recetario.formDescripcion': "Descripción",
        'recetario.formIngredientes': "Ingredientes",
        'recetario.formAlergenos': "Alérgenos",
        'recetario.formAgregar': "Añadir",

        'recetario.modal.btnGuardar': "Guardar",
        'recetario.modal.btnImprimir': "Imprimir",
        'recetario.modal.btnEliminar': "Eliminar",
        'recetario.modal.form.placeholder.vegan': "Es vegano",
        'recetario.modal.form.placeholder.descripcion': "Descripción del Platillo",
        'recetario.modal.form.placeholder.nombre': "Nombre del Platillo",
        'recetario.modal.form.placeholder.precio': "Precio del Platillo",
        'recetario.modal.form.tabla.ingrediente': "Ingrediente",
        'recetario.modal.form.tabla.medida': "Medida",
        'recetario.modal.form.error.nombre': "El nombre es obligatorio",
        'recetario.modal.form.error.precio': "El precio es obligatorio",
        'recetario.modal.form.error.ingredientes': "Se debe de incluir al menos un ingrediente",


        'planificador.titulo': "Planificador",
        'planificador.periodoTiempo': "Periodo de Tiempo",
        'planificador.select.todos': "TODOS",
        'planificador.tooltip.boton.nuevo': "Agregar receta",
        'planificador.tooltip.boton.imprimir': "Imprimir día",
        'planificador.cliente': "Cliente",
        'planificador.dia.0': "Lunes",
        'planificador.dia.1': "Martes",
        'planificador.dia.2': "Miércoles",
        'planificador.dia.3': "Jueves",
        'planificador.dia.4': "Viernes",
        'planificador.dia.5': "Sábado",
        'planificador.dia.6': "Domingo",
        'planificador.unidades': "Unidades",
        'planificador.modal.titulo': "Asignar Receta", 
        'planificador.modal.label.Descripcion': "Fecha Seleccionada", 
        'planificador.modal.label.Receta': "Receta", 
        'planificador.modal.label.Unidades': "Unidades",
        'planificador.modal.detalles.porciones': "Porciones",
        'planificador.modal.detalles.error.unidades': "Por favor, ingrese un valor",
        'planificador.modal.detalles.boton.imprimirReceta': "Imprimir Receta",
        'planificador.modal.detalles.boton.imprimirMedidor': "Imprimir EC",

        'alertas.error.title': "Error",
        'alertas.error.body': "Algo salió mal, intenta más tarde",
        'alertas.exito.title': "Éxito",
        'alertas.exito.body': "La acción fue completada satisfactoriamente",
        'alertas.confirmacion.title': "Se eliminará el registro",
        'alertas.confirmacion.body': "¿Estás seguro?",
        'alertas.confirmacion.boton.aceptar': "Eliminar",
        'alertas.confirmacion.boton.cancelar': "Cancelar",

        'reportes.titulos': 'Reportes',
        'reportes.tituloReporte': 'Reporte Climático',
        'reportes.mes': 'Periodo de Tiempo',
        'reportes.cliente': "Cliente",
        'reportes.tooltip.imprimir': "Imprimir Reporte",
        'reportes.graficaEmision': "Gráfica de Emisión Climática",
        'reportes.graficaEmision.noVegano': "Platillos No Veganos",
        'reportes.graficaEmision.vegano': "Platillos Veganos",
        'reportes.graficaEmision.general': "Todos los Platillos",
        'reportes.porcionPromedio': "Porción Promedio",
        'reportes.porcionPromedio.historico': "Histórico",
        'reportes.platilloMenorImpacto': "Platillo de Menor Impacto",
        'reportes.platilloMayorImpacto': "Platillo de Mayor Impacto",
        'reportes.ganancia': "Ganancia",
        'reportes.total': "Total",
        'reportes.total.platillos': "Platillos servidos",
        'reportes.total.amigables': "Platillos amigables",
        'reportes.total.amigables.descripcion': "Platillo < 1 kg",
        'reportes.total.emision': "Kg de",
        'reportes.total.viajes': "Viajes en auto al trabajo",
        'reportes.mes.1': "Enero",
        'reportes.mes.2': "Febrero",
        'reportes.mes.3': "Marzo",
        'reportes.mes.4': "Abril",
        'reportes.mes.5': "Mayo",
        'reportes.mes.6': "Junio",
        'reportes.mes.7': "Julio",
        'reportes.mes.8': "Agosto",
        'reportes.mes.9': "Septiembre",
        'reportes.mes.10': "Octubre",
        'reportes.mes.11': "Noviembre",
        'reportes.mes.12': "Diciembre",
        'reportes.error.noHayPlatillos': "No hay platillos para mostrar",

        'perfil.titulo': 'Perfil',
        'perfil.foto': "Foto",
        'perfil.nombre': "Nombre(s)",
        'perfil.apellidoPaterno': "Apellido Paterno",
        'perfil.apellidoMaterno': "Apellido Materno",
        'perfil.correo': "Correo",
        'perfil.telefono': "Teléfono",
        'perfil.empresa': "Empresa",
        'perfil.sucursal': "Sucursal",
        'perfil.tamanioCompania': "Tamaño de la Compañía",
        'perfil.calle': "Calle",
        'perfil.noExterior': "Número Exterior",
        'perfil.noInterior': "Número Interior",
        'perfil.colonia': "Colonia",
        'perfil.codigoPostal': "Código Postal",
        'perfil.municipio': "Municipio",
        'perfil.estado': "Estado",
        'perfil.pais': "País",
        'perfil.placeholder.nombre': "Escribe tu Nombre(s)",
        'perfil.placeholder.apellidoPaterno': "Escribe tu Apellido Paterno",
        'perfil.placeholder.apellidoMaterno': "Escribe tu Apellido Materno",
        'perfil.placeholder.correo': "Escribe tu Correo",
        'perfil.placeholder.telefono': "Escribe tu Teléfono",
        'perfil.placeholder.empresa': "Escribe tu Empresa",
        'perfil.placeholder.sucursal': "Escribe tu Sucursal",
        'perfil.placeholder.tamanioCompania': "Escribe el Tamaño de la Compañía",
        'perfil.placeholder.calle': "Escribe tu Calle",
        'perfil.placeholder.noExterior': "Escribe tu Número Exterior",
        'perfil.placeholder.noInterior': "Escribe tu Número Interior",
        'perfil.placeholder.colonia': "Escribe tu Colonia",
        'perfil.placeholder.codigoPostal': "Escribe tu Código Postal",
        'perfil.placeholder.municipio': "Escribe tu Municipio",
        'perfil.placeholder.estado': "Escribe tu Estado",
        'perfil.placeholder.pais': "Escribe tu País",
        'perfil.boton.guardar': "Guardar",
    }    
}