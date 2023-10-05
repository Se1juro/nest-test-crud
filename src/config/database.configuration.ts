import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIGURATION: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [__dirname + '/../**/*.model{.ts,.js}'],
  synchronize: true, // False in production
};
