import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { toUserDto } from 'src/shared/mapper';
import { LoginUserDto } from './loginuser.dto';
import { CreateUserDto } from './createuser.dto';
import { comparePasswords } from 'src/shared/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }
  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }
  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }
  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // const user: UserEntity = await this.userRepo.create({
    //   username,
    //   password,
    //   email,
    // });
    const user = new UserEntity();
    user.username = username;
    user.password = password;
    user.email = email;

    await this.userRepo.save(user);
    return toUserDto(user);
  }
}
