import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: ' Email should be string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
  @IsString({ message: ' Password should be string' })
  @Length(4, 16, {
    message: 'No less than 4 characters and not more than 16 characters',
  })
  readonly password: string;
}
