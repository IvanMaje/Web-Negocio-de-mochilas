const express = require('express');
const router = express.Router();
const productos_controller = require('../controllers/productos_controller.js');
const controller = new productos_controller;

router.get('/productos/:idSeccion?', async (req, res) => { controller.verProductos(req, res); });
   

module.exports = router;