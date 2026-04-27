import { DataSourceOptions } from "typeorm";

export const typeOrmConfig:DataSourceOptions={
      type: 'mssql',
      host: 'localhost',
      // host: process.env.DB_HOST ?? 'host.docker.internal',
      port: 1433,                // default port MSSQL
      username: 'sa',
      password: 'Mojasifra1@',
      // database: 'master',
      database: 'nestDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,         // samo za razvoj
      options: {
        encrypt: false,          // true ako koristiš Azure ili TLS
      },
    
}