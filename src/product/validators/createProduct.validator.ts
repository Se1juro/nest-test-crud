import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductValidator {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
