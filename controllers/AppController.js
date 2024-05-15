import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(request, response) {
    const NumberOfUsers = await dbClient.nbUsers();
    const NumberOfFiles = await dbClient.nbFiles();
    response.status(200).json({ users: NumberOfUsers, files: NumberOfFiles });
  }
}

module.exports = AppController;