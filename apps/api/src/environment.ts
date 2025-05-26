import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const environment = {
  mode: <'local' | 'stage' | 'prod'>process.env.mode,
  http: {
    port: process.env.port,
  },
  db_config: () =>
    ({
      host: process.env.db_host,
      port: Number(process.env.db_port),
      username: process.env.db_login,
      password: process.env.db_pass,
      database: process.env.db_name,
      type: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }) as TypeOrmModuleOptions,
  env_config: {
    isGlobal: true,
  },
};

export {environment};
