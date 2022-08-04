const elementosEditar = document.querySelectorAll(".confirmar_edicion");
const elementosBorrar = document.querySelectorAll(".confirmar_borrado");

function editar(i){
    elemento_a_mostrar = elementosEditar[i]
    elemento_a_mostrar.classList.toggle("mostrar");
}

function ocultarEdicion(i){
    elemento_a_ocultar = elementosEditar[i]
    elemento_a_ocultar.classList.toggle("mostrar");
}

function borrar(i){
    
    elemento_a_mostrar = elementosBorrar[i]
    elemento_a_mostrar.classList.toggle("mostrar");

}

function ocultarBorrado(i){
        
    elemento_a_ocultar = elementosBorrar[i]
    elemento_a_ocultar.classList.toggle("mostrar");
    
}