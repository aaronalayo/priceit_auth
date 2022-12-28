import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisUrl = `redis://localhost:6380`;
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected...');
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;