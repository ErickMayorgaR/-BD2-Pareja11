const { Router } = require('express');
const router = Router();


const sessionController = require('../controller/session.js');
const mongoQueryController = require('../controller/mongoQuerys.js');
const neo4jController = require('../controller/publicaciones.js');

//LOGIN Y REGISTRO
router.post('/registrarUsuario', sessionController.registrarUsuario);
router.post('/loginUsuario', sessionController.loginUsuario);
//CONSULTAS DE PACIENTES
router.get('/totalPacientesEdad', mongoQueryController.totalPacientesPorEdad);
router.get('/pacientesHabitacion', mongoQueryController.pacientesPorHabitacion);
router.get('/pacientesGenero', mongoQueryController.pacientesPorGenero);
router.get('/topMasAtendido', mongoQueryController.top5EdadesMasAtendidas);
router.get('/topMenosAtendido', mongoQueryController.top5EdadesMenosAtendidas);
//PUBLICACIONES
router.post('/crearPublicacion', neo4jController.crearPublicacion);
router.get('/obtenerPublicaciones', neo4jController.obtenerPublicaciones);

module.exports = { router }; 