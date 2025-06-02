import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../config/redis';

export const cacheMiddleware = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;

    try {
      const cachedResponse = await redisClient.get(key);

      if (cachedResponse) {
        const data = JSON.parse(cachedResponse);
        res.json(data);
        return;
      }

      // Store the original res.json method
      const originalJson = res.json;

      // Override res.json method to cache the response
      res.json = function (body) {
        // Cache the response
        redisClient.setEx(key, duration, JSON.stringify(body));
        
        // Call the original json method
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      console.error('Redis cache error:', error);
      next();
    }
  };
};

// Clear cache for specific patterns
export const clearCache = async (pattern: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(pattern);
    
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Cache cleared for pattern: ${pattern}`);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};