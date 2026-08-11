import { IsString } from 'class-validator';

export class CreateStatCounterDto {
  @IsString()
  label!: string;

  @IsString()
  label_value!: string;
}
