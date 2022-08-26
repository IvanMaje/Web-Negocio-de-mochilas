const express = require('express');
const connection = require('../database');
const router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const {encryptPassword } = require('../helpers/encrypt');

const admin_controller = require('../controllers/admin_controller.js');
const controller = new admin_controller;


router.get('/admin', isAuthenticated,  (req, res) => {controller.mostrarAdmin(req, res)});

router.get('/admin/signin', (req, res) => {controller.iniciarSesion(req, res)});

router.get('/admin/logout', (req, res) => {controller.cerrarSesion(req, res)});

router.post('/admin/signin', (req, res) => {controller.autentificar(req, res)});

router.get('/admin/nueva_seccion', isAuthenticated, (req, res) => {controller.formularioNuevaSeccion(req, res)});

router.post('/admin/nueva_seccion', isAuthenticated, (req, res) => {controller.crearSeccion(req, res)});

router.get('/admin/nuevo_producto', isAuthenticated, (req, res) => {controller.formularioNuevoProducto(req, res)});

router.post('/admin/nuevo_producto', isAuthenticated, (req, res) => {controller.crearProducto(req, res)});

router.post('/admin/editar_producto/:id', isAuthenticated, (req, res) => {controller.editarProducto(req, res)});

router.get('/admin/eliminar_producto/:id', isAuthenticated, (req, res) => {controller.eliminarProducto(req, res)});

router.get('/admin/eliminar_seccion/:id', isAuthenticated, (req, res) => {controller.eliminarSeccion(req, res)});


module.exports = router;