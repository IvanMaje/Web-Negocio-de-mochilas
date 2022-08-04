const connection = require('../database');
const {matchPassword} = require('../helpers/encrypt');

class Admin_Controller{


    async mostrarAdmin(req,res){

        var secciones = await connection.query('SELECT * FROM secciones');
        var productos = await connection.query('SELECT * FROM productos');

        req.session.secciones = secciones;
        req.session.productos = productos;

        res.render('admin/admin.ejs', {titulo:'Admin', archivo_css:'admin/admin', secciones, productos})
    }

    iniciarSesion(req, res){
        res.render('admin/inicio_sesion.ejs', {titulo:'Admin', archivo_css:'admin/inicio_sesion'})
    }

    cerrarSesion(req, res){
        req.session.admin = false;
        res.redirect('/productos')
    }

    async autentificar(req, res){

        const contraseñaRecibida = req.body.contraseña; 
        const contraseña = await connection.query('SELECT * FROM contraseña WHERE Id = ?', [1]);
        const match = await matchPassword(contraseñaRecibida, contraseña[0].Contraseña);

        if(match){
            req.session.admin = true;
            return res.redirect('/admin')
        }else{
            req.session.admin = false;
            req.flash('error_msg', 'Contraseña incorrecta');
            return res.redirect('/admin/signin');
        }

        
    }


    formularioNuevaSeccion(req, res){
        res.render('admin/nueva_seccion.ejs', {titulo: 'Admin', archivo_css: 'admin/formulario_seccion'});
    }

    async crearSeccion(req, res){

       const {Nombre} = req.body;

       const nuevaSeccion = { Nombre }

       await connection.query('INSERT INTO secciones set ?', [nuevaSeccion]);

       res.redirect('/admin')

    }

    async formularioNuevoProducto(req, res){
        var secciones = await connection.query('SELECT * FROM secciones');
        res.render('admin/nuevo_producto.ejs', {titulo: 'Admin', archivo_css: 'admin/formulario_producto', secciones});
    }

    async crearProducto(req, res){

        const {Nombre, Descripcion, Precio, Link_Imagen, SeccionId} = req.body;
 
        const nuevoProducto = { Nombre, Descripcion, Precio, Link_Imagen, SeccionId}

        console.log(nuevoProducto);
 
        await connection.query('INSERT INTO productos set ?', [nuevoProducto]);

        req.flash('succes_msg', 'Producto creado');
 
        res.redirect('/admin')
 
     }

    async editarProducto(req,res){
        const Id = req.params.id;
        const {Nombre, Descripcion, Precio, Link_Imagen} = req.body;

        const productoEditado = {
            Nombre,
            Descripcion,
            Precio,
            Link_Imagen
        }

        await connection.query('UPDATE productos set ? WHERE Id = ?', [productoEditado, Id]);
        req.flash('succes_msg', 'Producto editado');

        res.redirect('/admin')
    }

    async eliminarProducto(req, res){
        const Id = req.params.id;
        
        const consulta = await connection.query('DELETE FROM productos WHERE Id = ?', [Id]);

        req.flash('succes_msg', 'Producto eliminado');

        res.redirect('/admin')
    }

}

module.exports = Admin_Controller;