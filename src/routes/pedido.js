const express = require('express');
const router = express.Router();

const pedido_controller = require('../controllers/pedido_controller.js');
const controller = new pedido_controller;

router.get('/pedido', (req, res) => { controller.verPedido(req,res) });

router.post('/pedido/agregar_producto/:idProducto/:ruta', async(req, res) => { controller.agregarProducto(req, res) });

router.post('/pedido/restar_producto/:idProducto', async(req, res) => { controller.restarProducto(req,res) });

module.exports = router;