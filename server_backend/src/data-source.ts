import { DataSource } from 'typeorm';
import databaseConfig from '../database.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.DB_HOST,
  port: databaseConfig.DB_PORT,
  username: databaseConfig.DB_USERNAME,
  password: databaseConfig.DB_PASSWORD,
  database: databaseConfig.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/**/*entity.ts'],
  subscribers: [],
  migrations: ['src/migration/*.ts'],
});
