import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { StudentEntity } from './student/student.entity';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entity/user.entity';

@Module({
  //imports: [TypeOrmModule.forRoot(), StudentModule],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'Testdb',
      entities: [StudentEntity, UserEntity],
      synchronize: true,
    }),
    StudentModule,
    UserModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
