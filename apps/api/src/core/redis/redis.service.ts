import {Injectable, Logger} from '@nestjs/common';
import Redis from 'ioredis';
import {environment} from '@src/environment';

@Injectable()
export class RedisService {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    const redisConfig = environment.redis_config();
    this.redis = new Redis({
      ...redisConfig,
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
      connectTimeout: 10000,
      commandTimeout: 5000,
      lazyConnect: true,
      tls: !environment.is_development
        ? {
            servername: redisConfig.host,
            rejectUnauthorized: true,
          }
        : undefined,
      enableOfflineQueue: environment.is_development,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true,
      reconnectOnError: err => {
        const targetError = 'READONLY';
        return err.message.includes(targetError);
      },
    });

    this.redis.on('connect', () => {
      this.logger.log('Redis connected successfully');
    });

    this.redis.on('error', (err: Error) => {
      this.logger.error('Redis connection error:', err);
    });

    this.redis.on('close', () => {
      this.logger.warn('Redis connection closed');
    });

    this.redis.on('reconnecting', () => {
      this.logger.log('Redis reconnecting...');
    });
  }

  getClient(): Redis {
    return this.redis;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const start = Date.now();
      const data = await this.redis.get(key);
      const duration = Date.now() - start;

      if (duration > 1000) {
        this.logger.warn(`Slow Redis GET: ${key} took ${duration}ms`);
      }

      if (!data) {
        return null;
      }

      return JSON.parse(data) as T;
    } catch (error) {
      this.logger.error(`Redis GET failed for key ${key}:`, error);
      return null;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      this.logger.error(`Redis DEL failed for key ${key}:`, error);
      throw error;
    }
  }

  async set<T>(
    key: string,
    value: T,
    modeOrTtl?: string | number,
    duration?: number
  ): Promise<void> {
    try {
      const start = Date.now();

      if (typeof modeOrTtl === 'string' && modeOrTtl === 'EX' && duration) {
        await this.redis.setex(key, duration, JSON.stringify(value));
      } else if (typeof modeOrTtl === 'number') {
        await this.redis.setex(key, modeOrTtl, JSON.stringify(value));
      } else {
        await this.redis.setex(key, 60 * 5, JSON.stringify(value));
      }

      const operationDuration = Date.now() - start;

      if (operationDuration > 1000) {
        this.logger.warn(`Slow Redis SET: ${key} took ${operationDuration}ms`);
      }
    } catch (error) {
      this.logger.error(`Redis SET failed for key ${key}:`, error);
      throw error;
    }
  }

  async scan(pattern: string, count = 100): Promise<string[]> {
    try {
      const start = Date.now();
      const keys: string[] = [];
      let cursor = '0';

      do {
        const result = await this.redis.scan(
          cursor,
          'MATCH',
          pattern,
          'COUNT',
          count
        );
        cursor = result[0];
        keys.push(...result[1]);
      } while (cursor !== '0');

      const duration = Date.now() - start;
      if (duration > 2000) {
        this.logger.warn(
          `Slow Redis SCAN: pattern ${pattern} took ${duration}ms`
        );
      }

      return keys;
    } catch (error) {
      this.logger.error(`Redis SCAN failed for pattern ${pattern}:`, error);
      throw error;
    }
  }

  async findByPattern<T>(
    pattern: string
  ): Promise<Array<{key: string; value: T}>> {
    try {
      const start = Date.now();
      const keys = await this.scan(pattern);
      const results: Array<{key: string; value: T}> = [];

      for (const key of keys) {
        const keyWithoutPrefix = key.split(':').slice(2).join(':');
        const value = await this.get<T>(keyWithoutPrefix);
        if (value) {
          results.push({key, value});
        }
      }

      const duration = Date.now() - start;
      if (duration > 3000) {
        this.logger.warn(
          `Slow Redis findByPattern: pattern ${pattern} with ${keys.length} keys took ${duration}ms`
        );
      }

      return results;
    } catch (error) {
      this.logger.error(
        `Redis findByPattern failed for pattern ${pattern}:`,
        error
      );
      throw error;
    }
  }

  async increment(key: string, value = 1): Promise<number> {
    try {
      return await this.redis.incrby(key, value);
    } catch (error) {
      this.logger.error(`Redis INCREMENT failed for key ${key}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.error(`Redis EXISTS failed for key ${key}:`, error);
      throw error;
    }
  }

  async ttl(key: string): Promise<number> {
    try {
      return await this.redis.ttl(key);
    } catch (error) {
      this.logger.error(`Redis TTL failed for key ${key}:`, error);
      throw error;
    }
  }

  async keys(pattern: string): Promise<string[]> {
    try {
      const start = Date.now();
      const result = await this.redis.keys(pattern);
      const duration = Date.now() - start;

      if (duration > 1000) {
        this.logger.warn(
          `Slow Redis KEYS: pattern ${pattern} took ${duration}ms`
        );
      }

      return result;
    } catch (error) {
      this.logger.error(`Redis KEYS failed for pattern ${pattern}:`, error);
      throw error;
    }
  }

  // Hash operations
  async hset(key: string, field: string, value: string): Promise<void> {
    try {
      await this.redis.hset(key, field, value);
    } catch (error) {
      this.logger.error(
        `Redis HSET failed for key ${key}, field ${field}:`,
        error
      );
      throw error;
    }
  }

  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await this.redis.hget(key, field);
    } catch (error) {
      this.logger.error(
        `Redis HGET failed for key ${key}, field ${field}:`,
        error
      );
      throw error;
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return await this.redis.hgetall(key);
    } catch (error) {
      this.logger.error(`Redis HGETALL failed for key ${key}:`, error);
      throw error;
    }
  }

  async hdel(key: string, ...fields: string[]): Promise<void> {
    try {
      await this.redis.hdel(key, ...fields);
    } catch (error) {
      this.logger.error(
        `Redis HDEL failed for key ${key}, fields ${fields.join(', ')}:`,
        error
      );
      throw error;
    }
  }

  async sadd(key: string, ...members: string[]): Promise<void> {
    try {
      await this.redis.sadd(key, ...members);
    } catch (error) {
      this.logger.error(`Redis SADD failed for key ${key}:`, error);
      throw error;
    }
  }

  async smembers(key: string): Promise<string[]> {
    try {
      return await this.redis.smembers(key);
    } catch (error) {
      this.logger.error(`Redis SMEMBERS failed for key ${key}:`, error);
      throw error;
    }
  }

  async srem(key: string, ...members: string[]): Promise<void> {
    try {
      await this.redis.srem(key, ...members);
    } catch (error) {
      this.logger.error(`Redis SREM failed for key ${key}:`, error);
      throw error;
    }
  }

  async lpush(key: string, ...values: string[]): Promise<void> {
    try {
      await this.redis.lpush(key, ...values);
    } catch (error) {
      this.logger.error(`Redis LPUSH failed for key ${key}:`, error);
      throw error;
    }
  }

  async rpush(key: string, ...values: string[]): Promise<void> {
    try {
      await this.redis.rpush(key, ...values);
    } catch (error) {
      this.logger.error(`Redis RPUSH failed for key ${key}:`, error);
      throw error;
    }
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    try {
      return await this.redis.lrange(key, start, stop);
    } catch (error) {
      this.logger.error(`Redis LRANGE failed for key ${key}:`, error);
      throw error;
    }
  }

  async llen(key: string): Promise<number> {
    try {
      return await this.redis.llen(key);
    } catch (error) {
      this.logger.error(`Redis LLEN failed for key ${key}:`, error);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.redis.quit();
      this.logger.log('Redis connection closed gracefully');
    } catch (error) {
      this.logger.error('Error closing Redis connection:', error);
    }
  }
}
