import { IsString, IsEmail, IsUrl } from 'class-validator';

class UpdateUserDTO
{
    @IsString()
    name?: string;

    @IsEmail()
    email?: string;

    @IsUrl()
    picture?: string;
}

export default UpdateUserDTO;
