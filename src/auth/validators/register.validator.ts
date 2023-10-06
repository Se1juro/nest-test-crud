import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterValidator {
  @IsString()
  name: string;

  @IsString()
  userName: string;

  @IsStrongPassword()
  password: string;
}
