import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
    constructor() {
      this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
      this.client.connect().then(() => {
        this.db = this.client.db(`${DATABASE}`);
      }).catch((err) => {
        console.log(err);
      });
    }
  
    isAlive() {
      return this.client.isConnected();
    }
  
    async nbUsers() {
      const users = this.db.collection('users');
      const NumOfUsers = await users.countDocuments();
      return NumOfUsers;
    }
  
    async nbFiles() {
      const files = this.db.collection('files');
      const NumOfFiles = await files.countDocuments();
      return NumOfFiles;
    }
  }
  
  const dbClient = new DBClient();
  module.exports = dbClient;