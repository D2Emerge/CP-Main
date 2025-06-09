import {Module, Global} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {environment} from '@src/environment';
import {redisStore} from 'cache-manager-ioredis-yet';
import {RedisService} from './redis.service';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ...environment.redis_config(),
      ttl: 1000 * 60 * 5, // 5 minutes
      connectTimeout: 10000, // 10 sec
      commandTimeout: 5000, // 5 sec
      tls: true,
      lazyConnect: true,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      retryDelayOnClusterDown: 300,
      enableReadyCheck: true,
      family: 4,
      keepAlive: true,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true,
      enableOfflineQueue: false,
      reconnectOnError: (err: {message: string}) => {
        const targetError = 'READONLY';
        return err.message.includes(targetError);
      },
      enableAutoPipelining: false,
    }),
  ],
  providers: [RedisService],
  exports: [CacheModule, RedisService],
})
export class RedisModule {}
