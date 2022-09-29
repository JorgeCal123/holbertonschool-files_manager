import { createClient } from "redis";
import { promisify } from 'util'
class RedisClient {

    constructor() {
        this.client = createClient()
        this.client.on('connect', () => console.log('entra a esta mierda'))
        this.client.on('error', (err) => console.log('Redis client not connected to the server:', err));
        
    }

    isAlive() {
        console.log(this.client.connected)
        return true
    }

    async get(key) {
        const getval = await promisify(this.client.get).bind(this.client);
        const val = await getval(key);
        return val;
    }

    async set(key, val, duration) {
        await this.client.set(key, val);
        await this.client.expire(key, duration);
    }

    async del(key) {
        await this.client.del(key);
    }
}


const redisClient = new RedisClient();
module.exports = redisClient;
