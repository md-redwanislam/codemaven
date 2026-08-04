import { IsInt, IsString } from 'class-validator';

export class CreateStatCounterDto {
  @IsString()
  label!: string;

  @IsInt()
  label_value!: number;
}
