const neo4jSession = require('../database/neo4j.js');
const connectToMongoDB = require('../database/mongo.js');
const bcrypt = require('bcrypt');
const fs = require('fs');


const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión


async function registrarUsuario(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción

        const { name } = req.body;
        const username = req.body.username;
        const email = req.body.email;
        const age = req.body.age;
        const especialidad = req.body.especialidad;
        const password = req.body.password;
        const foto = req.body.foto;


        const salt = await bcrypt.genSalt(10); // Generar sal
        const passwordHash = await bcrypt.hash(password, salt);

        const result = await transaction.run(`CREATE (n:Doctor 
            {name: $name,
            username: $username, 
            email: $email,
            age: $age,
            especialidad: $especialidad, 
            password: $passwordHash
             })`, {
            name,
            username,
            email,
            age,
            especialidad,
            passwordHash,

        });
        await transaction.commit();
        console.log('Usuario creado en Neo4j:', result);

        const db = await connectToMongoDB();
        const collection = db.collection("fotos");

        const newUser = { username, foto }
        await collection.insertOne(newUser);


        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    } finally {
        await sessionN.close(); // Cierra la sesión al finalizar
    }
}


async function loginUsuario(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const username = req.body.username;
        const password = req.body.password;


        const result = await transaction.run(`MATCH (n:Doctor
            {username: $username})
            RETURN n`, {
            username
        });
        await transaction.commit();
        const userNode = result.records[0]?.get('n').properties;

        if (!userNode) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        // Suponiendo que usas bcrypt para el hash de contraseñas:
        const isMatch = await bcrypt.compare(password, userNode.password);
        /*if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }*/
    
        const foto = await encontrarFoto(username)

        const userWithoutPassword = { ...userNode, foto};
        delete userWithoutPassword.password;


        res.status(200).json({ message: "Inicio de sesión exitoso.", user: userWithoutPassword });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    } finally {
        await sessionN.close(); // Cierra la sesión al finalizar
    }
}



async function encontrarFoto(nombre) {
    //Consultar para encontrar foto de perfil
    const db = await connectToMongoDB();
    const collection = await db.collection('fotos');

    // Realizar la consulta para obtener el documento con el campo 'name' especificado
    const resultadoMongo = await collection.findOne({ username: nombre }, { projection: { foto: 1 } });

    if (resultadoMongo) {
        console.log("Foto obtenida con éxito.");
        return resultadoMongo.foto; // Retorna el campo 'fotos' del documento encontrado
    } else {
        console.log("No se encontró una foto con ese nombre.");
        return null; // Retorna null si no se encuentra el documento
    }

}


async function subirPDF(req, res) {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('pdf');
        const name  = req.body.name;
        if (!req.file) {
            return res.status(400).send('No se envió ningún archivo.');
          }
        
          const pdfData = fs.readFileSync(req.file.path);
          await collection.insertOne({name, pdf: new Buffer.from(pdfData) });

        res.status(200).send({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario,
    subirPDF
}