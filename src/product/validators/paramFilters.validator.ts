import { IsNumberString } from 'class-validator';

export class ParamFilterValidator {
  @IsNumberString()
  limit: number;

  @IsNumberString()
  page: number;
}
