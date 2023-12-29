const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));

const session = driver.session({ database: 'bd2proyecto1' });

session.run("MATCH (n) RETURN n LIMIT 25")
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(`Error al realizar la consulta: ${err.stack}`);
  })
  .finally(() => {
    session.close();
  });

module.exports = session