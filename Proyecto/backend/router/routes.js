const {Router} = require('express');
const router = Router();


const sessionController = require('../controller/session.js');

router.post('/registrarUsuario', sessionController.registrarUsuario);
router.post('/loginUsuario', sessionController.loginUsuario);

module.exports = { router }; 