import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly nationality: string;

  @IsNotEmpty()
  @IsString()
  readonly dob: string;

  @IsNotEmpty()
  @IsString()
  readonly education: string;

  @IsNotEmpty()
  @IsString()
  readonly modeOfContact: string;
}
