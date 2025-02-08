import { IsString, IsEmail, IsUrl } from 'class-validator';

class CreateUserDTO
{
  @IsString()
    sub!: string;

  @IsString()
    name!: string;

  @IsEmail()
    email!: string;

  @IsUrl()
    picture!: string;
}

export default CreateUserDTO;
