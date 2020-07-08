import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async findAll(): Promise<StudentEntity[]> {
    return await this.studentRepository.find();
  }

  async create(contact: StudentEntity): Promise<StudentEntity> {
    return await this.studentRepository.save(contact);
  }

  async update(contact: StudentEntity): Promise<UpdateResult> {
    return await this.studentRepository.update(contact.id, contact);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.studentRepository.delete(id);
  }
}
