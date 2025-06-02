import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log('Redis Connected');
  } catch (error) {
    console.error(`Redis Error: ${(error as Error).message}`);
  }
};

export { redisClient, connectRedis };