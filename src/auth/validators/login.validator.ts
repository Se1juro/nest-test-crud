import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginValidator {
  @IsString()
  @ApiProperty()
  userName: string;

  @IsString()
  @ApiProperty()
  password: string;
}
