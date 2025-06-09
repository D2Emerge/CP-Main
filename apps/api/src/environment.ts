import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = {
  mode: <'local' | 'stage' | 'prod'>process.env.mode,
  http: {
    port: process.env.port,
  },
  is_development: process.env.MODE === 'local',
  is_production: process.env.MODE === 'prod',
  is_staging: process.env.MODE === 'stage',
  db_config: () =>
    ({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_LOGIN,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      type: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }) as TypeOrmModuleOptions,
  env_config: {
    isGlobal: true,
  },
  redis_config: () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6381,
    password: process.env.REDIS_PASS || 'redispass',
    db: Number(process.env.REDIS_DB) || 0,
    keyPrefix: process.env.REDIS_PREFIX_KEY,
  }),
};

console.log(environment.db_config());

export {environment};
