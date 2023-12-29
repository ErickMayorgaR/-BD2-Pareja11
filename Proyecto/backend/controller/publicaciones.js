const neo4jSession = require('../database/neo4j'); // Importa la sesión de Neo4j
async function crearPublicacion(req, res) {
    const { autor, contenido } = req.body;
    const fecha = new Date().toISOString(); // Obtén la fecha actual en el formato ISO
  
    const session = neo4jSession.getSession(); // Obtiene una nueva sesión
    const transaction = session.beginTransaction(); // Inicia una transacción
  
    try {
      const result = await transaction.run(
        'CREATE (p:Publicacion {autor: $autor, fecha: $fecha, contenido: $contenido}) RETURN p',
        { autor, fecha, contenido }
      );
  
      await transaction.commit(); // Confirma la transacción
      console.log('Publicación creada en Neo4j:', result.records[0].get('p'));
      res.status(200).json({ message: 'Publicación creada exitosamente' });
    } catch (error) {
      console.error('Error al crear la publicación en Neo4j:', error);
      await transaction.rollback(); // Revierte la transacción en caso de error
      res.status(500).json({ error: 'Error al crear la publicación en Neo4j' });
    } finally {
      await session.close(); // Cierra la sesión al finalizar
    }
  }
  

  async function obtenerPublicaciones(req, res) {
    const session = neo4jSession.getSession(); // Obtiene una nueva sesión
    const transaction = session.beginTransaction(); // Inicia una transacción
  
    try {
      const result = await transaction.run('MATCH (p:Publicacion) RETURN p LIMIT 25');
  
      await transaction.commit(); // Confirma la transacción
      const publicaciones = result.records.map(record => record.get('p').properties);
      res.status(200).json(publicaciones);
    } catch (error) {
      console.error('Error al obtener las publicaciones de Neo4j:', error);
      await transaction.rollback(); // Revierte la transacción en caso de error
      res.status(500).json({ error: 'Error al obtener las publicaciones de Neo4j' });
    } finally {
      await session.close(); // Cierra la sesión al finalizar
    }
  }

module.exports = {
  crearPublicacion,
  obtenerPublicaciones
};
