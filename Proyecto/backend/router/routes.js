const { Router } = require('express');
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 


const sessionController = require('../controller/session.js');
const amigosController = require('../controller/amigos.js');

const mongoQueryController = require('../controller/mongoQuerys.js');
const neo4jController = require('../controller/publicaciones.js');

//LOGIN Y REGISTRO
router.post('/registrarUsuario',upload.single(),sessionController.registrarUsuario);
router.post('/loginUsuario', sessionController.loginUsuario);

//Amistades
router.post('/agregarAmigo', amigosController.agregarAmigo);
router.post('/verMisAmigos', amigosController.verMisAmigos);


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