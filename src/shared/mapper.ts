import { UserDto } from 'src/user/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;
  const userDto: UserDto = { id, username, email };
  return userDto;
};
