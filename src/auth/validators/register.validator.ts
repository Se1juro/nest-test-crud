import { IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterValidator {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  userName: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
