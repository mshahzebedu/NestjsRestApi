import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StudentEntity } from './student.entity';
import { StudentService } from './student.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(private studentsService: StudentService) {}
  //get all
  @Get()
  index(): Promise<StudentEntity[]> {
    return this.studentsService.findAll();
  }
  //new record
  @Post('create')
  //@UseGuards(AuthGuard())
  async create(@Body() studentData: StudentEntity): Promise<any> {
    return this.studentsService.create(studentData);
  }
  //update student record

  @Put('update/:id')
  //@UseGuards(AuthGuard())
  async update(
    @Param('id') id,
    @Body() studentData: StudentEntity,
  ): Promise<any> {
    studentData.id = Number(id);
    console.log('Update #' + studentData.id);
    return this.studentsService.update(studentData);
  }
  //delete student record
  @Delete('delete/:id')
  //@UseGuards(AuthGuard())
  async delete(@Param('id') id): Promise<any> {
    return this.studentsService.delete(id);
  }
}
