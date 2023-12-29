const neo4jSession = require('../database/neo4j.js');
const connectToMongoDB = require('../database/mongo.js');

const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión


async function agregarAmigo(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const name = req.body.name;
        const acceptedFriendName = req.body.acceptedFriendName;

        const result = await transaction.run(`
        MATCH (n:Doctor), (m:Doctor)
        WHERE n.name = $name AND m.name = $acceptedFriendName
        MERGE (n)-[:amigo]->(m)
    `, {
        name,
        acceptedFriendName
    });

        await transaction.commit();
        res.status(200).json({ message: "AmigoAgregadoExitosamente" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }finally	{
        await sessionN.close(); // Cierra la sesión al finalizar
      }
}



async function verMisAmigos(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const name = req.body.name;

        const result = await transaction.run(`
        MATCH (d:Doctor {name: $name})-[:amigo]->(amigo)
        RETURN amigo
    `, {
        name,
    });

        await transaction.commit();
          // Excluir el campo password de cada nodo amigo
          const amigos = result.records.map(record => {
            const amigo = record.get('amigo').properties;
            delete amigo.password; // Elimina el campo password
            return amigo;
        });


        res.status(200).json({ amigos });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }finally	{
        await sessionN.close(); // Cierra la sesión al finalizar
      }
}



async function enviarMensaje(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const name = req.body.name;
        const acceptedFriendName = req.body.acceptedFriendName;

        const result = await transaction.run(`
        MATCH (n:Doctor), (m:Doctor)
        WHERE n.name = $name AND m.name = $acceptedFriendName
        MERGE (n)-[:amigo]->(m)
        MERGE (m)-[:amigo]->(n)
    `, {
        name,
        acceptedFriendName
    });

        await transaction.commit();
        res.status(200).json({ message: "AmigoAgregadoExitosamente" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    }finally	{
        await sessionN.close(); // Cierra la sesión al finalizar
      }
}




module.exports = {
    agregarAmigo,
    verMisAmigos,
    enviarMensaje
}