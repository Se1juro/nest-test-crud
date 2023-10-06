import { IsString } from 'class-validator';

export class LoginValidator {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
