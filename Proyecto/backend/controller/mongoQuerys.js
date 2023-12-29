const connectToMongoDB = require('../database/mongo.js');

async function ensureIndex() {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('pacientes');
        await collection.createIndex({ edad: 1 }); // Crear un índice en el campo 'edad'

        console.log("Index created successfully!");
        return;
    } catch (error) {
        throw error;
    }
}

async function totalPacientesPorEdad(req, res) {
    try {
        const db = await connectToMongoDB();
        
        const result = await db.collection('pacientes').aggregate([
            {
                $group: {
                    _id: {
                        $cond: { if: { $lt: ["$edad", 18] }, then: "Pediátrico", else: { $cond: { if: { $lte: ["$edad", 64] }, then: "Mediana edad", else: "Geriátrico" } } }
                    },
                    total: { $sum: 1 }
                }
            }
        ]).toArray();

        res.json(result); // Enviar la respuesta JSON con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
}


async function pacientesPorHabitacion(req, res) {
    try {
        const db = await connectToMongoDB();
        
        const result = await db.collection('LogActividades').aggregate([
            {
                $group: {
                    _id: '$idHabitacion',
                    totalPacientes: { $addToSet: '$idPaciente' }
                }
            },
            {
                $project: {
                    _id: 0,
                    habitacion: '$_id',
                    totalPacientes: { $size: '$totalPacientes' }
                }
            }
        ]).toArray();

        res.json(result); // Enviar la respuesta JSON con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
}




// pacientesPorGenero
async function pacientesPorGenero(req, res) {
    try {
        const db = await connectToMongoDB();
        
        const result = await db.collection('pacientes').aggregate([
            {
                $group: {
                    _id: "$genero",
                    total: { $sum: 1 }
                }
            }
        ]).toArray();

        res.json(result); // Enviar la respuesta JSON con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
}

async function top5EdadesMasAtendidas(req, res) {
    try {
        const db = await connectToMongoDB();
        
        const result = await db.collection('pacientes').aggregate([
            {
                $group: {
                    _id: "$edad",
                    total: { $sum: 1 }
                }
            },
            { $sort: { total: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: 0,
                    edad: '$_id',
                    totalPacientes: '$total'
                }
            }
        ]).toArray();

        res.json(result); // Enviar la respuesta JSON con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
}


async function top5EdadesMenosAtendidas(req, res) {
    try {
        const db = await connectToMongoDB();
        
        const result = await db.collection('pacientes').aggregate([
            {
                $group: {
                    _id: "$edad",
                    total: { $sum: 1 }
                }
            },
            { $sort: { total: 1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: 0,
                    edad: '$_id',
                    totalPacientes: '$total'
                }
            }
        ]).toArray();

        res.json(result); // Enviar la respuesta JSON con los datos obtenidos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
}


module.exports = {
    totalPacientesPorEdad,
    pacientesPorHabitacion,
    pacientesPorGenero,
    top5EdadesMasAtendidas,
    top5EdadesMenosAtendidas
};
