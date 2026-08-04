import { IsString } from 'class-validator';

export class CreateWorkProcessStepDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
