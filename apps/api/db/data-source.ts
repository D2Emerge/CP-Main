import {DataSource} from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.db_host,
  port: Number(process.env.db_port),
  username: process.env.db_login,
  password: process.env.db_pass,
  database: process.env.db_name,
  entities: [],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
  logging: false,
});
