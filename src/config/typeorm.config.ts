import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'Testdb',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
//'/../**/*.entity.ts' current directory, one step back,to any folder, to any file ,entity
