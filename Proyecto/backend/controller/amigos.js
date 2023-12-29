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
    } finally {
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
            message: 'Error en el servidor',
        });
    } finally {
        await sessionN.close(); // Cierra la sesión al finalizar
    }
}


async function amigosPorEspecialidad(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const especialidad = req.body.especialidad;

        const result = await transaction.run(`
        MATCH (d:Doctor)
        WHERE d.especialidad = $especialidad
        RETURN d
    `, {
            especialidad,
        });
        await transaction.commit();

        const amigos = result.records.map(record => {
            const amigo = record.get('d').properties;
            delete amigo.password; // Elimina el campo password
            return amigo;
        });
        res.status(200).json({ amigos });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    } finally {
        await sessionN.close(); // Cierra la sesión al finalizar
    }
}


async function amigosPorAmigosEnComun(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const name = req.body.name;

        const result = await transaction.run(`
        MATCH (d1:Doctor)-[:amigo]->(commonFriend:Doctor)-[:amigo]->(d2:Doctor)
        WHERE d1.name = $name AND d1 <> d2
        RETURN d2
    `, {
            name,
        });
        await transaction.commit();

        const amigos = result.records.map(record => {
            const amigo = record.get('d2').properties;
            delete amigo.password; // Elimina el campo password
            return amigo;
        });
        res.status(200).json({ amigos });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    } finally {
        await sessionN.close(); // Cierra la sesión al finalizar
    }
}


async function amigosPorNombre(req, res) {

    try {
        const sessionN = neo4jSession.getSession(); // Obtiene una nueva sesión
        const transaction = sessionN.beginTransaction(); // Inicia una transacción
        const name = req.body.name;

        const result = await transaction.run(`
        MATCH (d:Doctor)
        WHERE toLower(d.name) CONTAINS toLower($name)
        RETURN d
        `, 
        {
            name,
        });
        await transaction.commit();

        const amigos = result.records.map(record => {
            const amigo = record.get('d').properties;
            delete amigo.password; // Elimina el campo password
            return amigo;
        });
        res.status(200).json({ amigos });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error en el servidor"
        })
    } finally {
        await sessionN.close(); // Cierra la sesión al finalizar
    }
}



async function enviarMensaje(req, res) {
    try {
        const sessionN = neo4jSession.getSession(); 
        const transaction = sessionN.beginTransaction(); 
        const { nombreEmisor, nombreReceptor, mensaje } = req.body;
        const idMensaje = nombreEmisor + nombreReceptor;
        const fecha = new Date().toISOString();

        // Buscar si ya existe una discusión entre los dos doctores
        let result = await transaction.run(`
            MATCH (d1:Doctor {name: $nombreEmisor})-[:DISCUTE]-(m:Mensaje)-[:DISCUTE]-(d2:Doctor {name: $nombreReceptor})
            RETURN m
        `, {
            nombreEmisor,
            nombreReceptor
        });

        let mensajeNodo;
        if (result.records.length === 0) {
            // No existe, así que crea un nuevo nodo de Mensaje y relaciona a ambos doctores
            result = await transaction.run(`
                MATCH (d1:Doctor {name: $nombreEmisor}), (d2:Doctor {name: $nombreReceptor})
                CREATE (d1)-[:DISCUTE]->(m:Mensaje 
                    {
                        id: $nombreEmisor + $nombreReceptor,
                        messages: [$nombreEmisor + ":" + $mensaje]
                    })<-[:DISCUTE]-(d2)
                RETURN m
            `, {
                nombreEmisor,
                nombreReceptor,
                mensaje
            });
            mensajeNodo = result.records[0].get('m').properties;
        } else {
            // Ya existe, así que actualiza el nodo de Mensaje con el nuevo mensaje
            mensajeNodo = result.records[0].get('m');
            await session.run(`
                MATCH (m:Mensaje {id: $idMensaje})
                SET m.messages = "," + m.messages + $nombreEmisor + ":" $mensaje
            `, {
                idMensaje: mensajeNodo.identity.low, // O usa el identificador adecuado
                mensaje
            });
        }
        await transaction.commit();


        res.status(200).json({ mensaje: "Mensaje enviado correctamente", data: mensajeNodo });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ mensaje: 'Error al enviar mensaje' });
    } finally {
        await sessionN.close();
    }
}

// Resto de la configuración del servidor, middleware, etc.




module.exports = {
    agregarAmigo,
    verMisAmigos,
    enviarMensaje,
    amigosPorEspecialidad,
    amigosPorAmigosEnComun,
    amigosPorNombre,
    enviarMensaje

}