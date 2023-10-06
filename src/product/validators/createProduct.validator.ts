import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductValidator {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;
}
