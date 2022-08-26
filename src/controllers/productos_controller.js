const connection = require('../database');

class Productos_controller{

    async verProductos(req, res){

        Productos_controller.verificarPedidoCreado(req);

        productos = await connection.query('SELECT * FROM productos');
        secciones = await connection.query('SELECT * FROM secciones');
     

        var productosFiltrados = [];
        var seccion_seleccionada = 0;

        if(req.params.idSeccion == undefined){  //Si no se envio una seccion en especifico se envian todos los productos
            productosFiltrados = productos
        }else{
            seccion_seleccionada = Productos_controller.filtrarProductosPorSeccion(req, productos, productosFiltrados);
        }

        console.log(productos);
        res.render('productos.ejs', {secciones, seccion_seleccionada, productos: productosFiltrados, titulo: 'Inicio', archivo_css:'productos'});
    }


    static verificarPedidoCreado(req){
        if(!req.session.pedido){
            req.session.pedido = [];//Controlo que el carrito este creado
                                    //En caso de que no, lo inicializo.
        }
    }


    static filtrarProductosPorSeccion(req, productos, productosFiltrados){
        var seccion_seleccionada= req.params.idSeccion;
        productos.forEach(function(p){ 
            if(p.SeccionId == seccion_seleccionada){
                productosFiltrados.push(p);
            }
        });

        if(productosFiltrados.length == 0){     // Si no hay productos en la seccion recibida se devuelve un 0
                                                // para que se muestren todos los productos
            req.flash('error_msg', 'No hay productos en esa seccion');
            console.log('entre');
        }
       
            
        return seccion_seleccionada;
    }
}

module.exports = Productos_controller;