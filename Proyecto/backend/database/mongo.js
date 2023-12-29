const {MongoClient} = require('mongodb');



async function connectToMongoDB() {
  const client = new MongoClient("mongodb://localhost:27017");
  try {
      await client.connect();
      console.log("Connected to MongoDB");
      const mongoDataBase = client.db("BD2Proyecto1");
      return mongoDataBase;
  } catch (err) {
      console.error("Failed to connect to MongoDB", err);
      throw err; // rethrow the error for further handling
  }
}

module.exports = connectToMongoDB;