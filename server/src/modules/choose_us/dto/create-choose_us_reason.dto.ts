import { IsString } from 'class-validator';

export class CreateChooseUsReasonDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
