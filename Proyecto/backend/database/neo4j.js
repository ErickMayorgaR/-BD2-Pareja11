const neo4j = require('neo4j-driver');

function getSession() {
  const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));
  const session = driver.session({ database: 'bd2proyecto1' });

  session.run("MATCH (n) RETURN n LIMIT 25")
    .then(results => {
      console.log("encontró datos en bd de Neo4j");
    })
    .catch(err => {
      console.error(`Error al realizar la consulta: ${err.stack}`);
    });

  return session;
}

module.exports = {
  getSession
};
