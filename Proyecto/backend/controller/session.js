const neo4jSession = require('../database/neo4j.js');
const connectToMongoDB = require('../database/mongo.js');



async function registrarUsuario(req, res) {
    try {

        const name = req.body.nombre;
        const usermame = req.body.usermame;
        const email = req.body.email;
        const age = req.body.age;
        const especialidad = req.body.especialidad;
        const password = req.body.password;
        const foto = req.body.foto;

        const node = neo4jSession.run(`CREATE (n:Doctor 
            {name: $name,
            username: $username, 
            email: $email,
            age: $age,
            especialidad: $especialidad, 
            password: $password, 
             })`, {
            name,
            username,
            email,
            age,
            especialidad,
            password,

        });

        const db = await connectToMongoDB();
        const collection = db.collection("fotos");

        const newUser = { name, foto }
        await collection.insertOne(newUser);


        return res.status(200)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

async function loginUsuario(req, res) {
    try {


        return res.status(200).json({
            data: enteroAprobados,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
}