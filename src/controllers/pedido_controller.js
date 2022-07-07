const connection = require('../database');

class Pedido_controller{

    verPedido(req, res){
        
        Pedido_controller.verificarPedidoCreado(req);
        const pedido = req.session.pedido;
    
        const url_whatsapp = Pedido_controller.armarMensaje(pedido);
        
    
        console.log(url_whatsapp)
        res.render('pedido', {pedido, titulo: 'Pedido', archivo_css:'pedido', url_whatsapp});
    }
    
    static armarMensaje(pedido){
        if(pedido.length > 0){
            var mensaje = "https://api.whatsapp.com/send?phone=+5491131243530&text=Hola,%20me%20gustaria%20hacer%20el%20siguiente%20pedido:%0A"
            pedido.forEach(p => {
                var aux = p.cantidad + "%20" + p.producto.Nombre + "%0A";
                mensaje+= aux;
            });
        }
        return mensaje;
    }

    //
    //    AGREGAR PRODUCTO AL PEDIDO
    //

    async agregarProducto(req, res){

        Pedido_controller.verificarPedidoCreado(req);
        const pedido = req.session.pedido;
    
        const producto = await connection.query('SELECT * FROM productos WHERE Id = ?', [req.params.idProducto]);
    
        Pedido_controller.existeProducto(producto); // Chequeo que me enviaron un producto valido
    
        
        const pos = Pedido_controller.verificarSiEsta(pedido, producto);

        const {cantidad} = req.body;
    
        if(pos == -1){
            pedido.push({
                producto: producto[0],
                cantidad: parseInt(cantidad)
            });
        }else{
            pedido[pos].cantidad+= parseInt(cantidad);
        }
    
        req.session.pedido= pedido;
    
        const ruta = req.params.ruta;
        res.redirect('/' + ruta);
    }





    //
    //    RESTAR PRODUCTO
    //

    async restarProducto(req, res){
        
        Pedido_controller.verificarPedidoCreado(req);
        const pedido = req.session.pedido;
    
        const producto = await connection.query('SELECT * FROM productos WHERE Id = ?', [req.params.idProducto]);
    
        Pedido_controller.existeProducto(producto); // Chequeo que me enviaron un producto valido
    
        const pos = Pedido_controller.verificarSiEsta(pedido, producto);
    

        if(pos == -1){
            req.flash('error_msg', 'Error con el producto');
            console.log('El producto no estaba en el pedido');
            return res.redirect('/');
        }else{
            const {cantidad} = req.body;
            if(pedido[pos].cantidad <= cantidad){
                pedido.splice(pos,1)
                console.log('Borrado');
            }else{
                pedido[pos].cantidad-= cantidad;
            }
        }
    
        req.session.pedido= pedido;
    
        res.redirect('/pedido');
    }

    static verificarPedidoCreado(req){
        if(!req.session.pedido){
            req.session.pedido = [];//Controlo que el carrito este creado
                                    //En caso de que no, lo inicializo.
        }
    }

    static existeProducto(producto){
        if(producto[0] == undefined){  //En caso de no estar el producto con el id recibido devuelvo error
            req.flash('error_msg', 'Error con el producto');
            return res.redirect('/pedido');
        }
    }

    static verificarSiEsta(pedido, producto){     // Verifica si el producto ya estaba en el pedido.
                                                  // Si esta devuelve la posicion
        var pos = -1;                             // En caso contrario devuelve -1
        for(var i = 0; i < pedido.length; i++){
            if(pedido[i].producto.Id == producto[0].Id){
                pos= i;
                break;
            }
        }
        return pos
    }


}

module.exports = Pedido_controller;