const neo4jsession = require('../database/neo4j.js');
const connectToMongoDB = require('../database/mongo.js');



async function registrarUsuario(req, res) {
    try{
       
        const nombre = req.body.nombre;
        const username = req.body.username;
        const correo_electronico = req.body.correo_electronico;
        const edad = req.body.edad;
        const especialidad = req.body.especialidad;
        const contraseña = req.body.contraseña;
        const fotoBase64 = req.body.foto;


        return res.status(200).json({
            data: enteroAprobados,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

async function loginUsuario(req, res) {
    try{
       

        return res.status(200).json({
            data: enteroAprobados,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

module.exports ={
    registrarUsuario,
    loginUsuario
}