function mostrarOpcionesResta(i){
        
    var elementos = document.querySelectorAll(".producto_restar_cantidad");
    elemento_a_mostrar = elementos[i]
    console.log(elemento_a_mostrar);
    elemento_a_mostrar.style.bottom= "0";
}

function ocultarOpcionesResta(i){
        
    var elementos = document.querySelectorAll(".producto_restar_cantidad");
    elemento_a_mostrar = elementos[i]
    console.log(elemento_a_mostrar);
    elemento_a_mostrar.style.bottom= "-20%";
}

