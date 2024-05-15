import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  // Check if the connection to Redis is successful
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // Get the value stored in Redis for the given key
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // Store a value in Redis for the given key with an expiration
  async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, duration);
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
