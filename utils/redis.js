import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Display any error of the redis client in the console
    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error}`);
    });
  }

  // Check if the connection to Redis is successful
  isAlive() {
    return this.client.connected;
  }

  // Get the value stored in Redis for the given key
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    return await redisGet(key);
  }

  // Store a value in Redis for the given key with an expiration
  async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value, 'EX', duration);
  }

  // Remove the value in Redis for the given key
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

// Create and export an instance of RedisClient called redisClient
const redisClient = new RedisClient();
module.exports = redisClient;