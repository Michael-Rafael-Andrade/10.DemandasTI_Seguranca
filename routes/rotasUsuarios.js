var express = require('express');
var router = express.Router();
var controllerUsuarios = require('../controller/controllerUsuarios');

// Rota pública: cadastro de novo usuário
router.post('/cadastro', controllerUsuarios.cadastro);

module.exports = router;