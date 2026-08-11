import { IsInt, IsString } from 'class-validator';

export class CreateStatisticDto {
  @IsString()
  label!: string;

  @IsInt()
  label_value!: number;
}
