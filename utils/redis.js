import { createClient } from "redis";
import { promisify } from 'util'

class RedisClient {

    constructor() {
        this.client = createClient()
        this.client.on('error', (err) => console.log('Redis client not connected to the server:', err));
        this.get_async = promisify(this.client.get).bind(this.client)
        this.set_async = promisify(this.client.set).bind(this.client)
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const GET = await this.get_async(key);
        return GET;
    }

    async set(key, val, duration) {
        await this.set_async(key, val);
        await this.client.expire(key, duration);
    }

    async del(key) {
        await this.client.del(key);
    }
}


const redisClient = new RedisClient();
module.exports = redisClient;
