import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: 'localhost',
  //     port: 3306,
  //     username: 'postgres',
  //     password: 'admin',
  //     database: 'Testdb',
  //     entities: [],
  //     synchronize: true,
  //   }),
  // ],

  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
