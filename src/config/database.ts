import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'node:path';
import {
  DB_HOST,
  // DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../utils/constants';

export const DatabaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 4406,
  username: 'tap',
  password: 'password',
  // database: DB_NAME,
  synchronize: false,
  database: 'tap2shop',
  entities: [path.join(__dirname, '..', 'app', '**', '*.entity{.ts,.js}')],
  migrations: [
    path.join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}'),
  ],
  logging: true,
  logger: 'file',
};

export default new DataSource(DatabaseConfig);
