const { Router } = require('express');
const router = Router();


const sessionController = require('../controller/session.js');
const mongoQueryController = require('../controller/mongoQuerys.js');

router.post('/registrarUsuario', sessionController.registrarUsuario);
//router.post('/loginUsuario', sessionController.loginUsuario);
router.get('/totalPacientesEdad', mongoQueryController.totalPacientesPorEdad);
router.get('/pacientesHabitacion', mongoQueryController.pacientesPorHabitacion);
router.get('/pacientesGenero', mongoQueryController.pacientesPorGenero);
router.get('/topMasAtendido', mongoQueryController.top5EdadesMasAtendidas);
router.get('/topMenosAtendido', mongoQueryController.top5EdadesMenosAtendidas);

module.exports = { router }; 