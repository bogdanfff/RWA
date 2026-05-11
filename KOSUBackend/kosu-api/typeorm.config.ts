import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
  type: 'mssql',
  // host: 'localhost',
  host: process.env.DB_HOST ?? 'db',
  port: 1433,
  username: 'sa',
  password: 'Mojasifra1@',
  database: 'master',
  // database: 'nestDB',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}