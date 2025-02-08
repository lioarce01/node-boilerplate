import { IsString, IsEmail, IsDate } from 'class-validator';
import UserDTO from './UserDTO';

class ValidatableUserDto extends UserDTO
{
  @IsString()
  declare id: string;

  @IsString()
  declare sub: string;

  @IsString()
  declare name: string;

  @IsEmail()
  declare email: string;

  @IsString()
  declare picture: string;

  @IsDate()
  declare createdAt: Date;

  @IsDate()
  declare updatedAt: Date;
}

export default ValidatableUserDto;
