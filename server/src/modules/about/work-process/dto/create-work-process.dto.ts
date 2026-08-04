import { IsString } from 'class-validator';

export class CreateWorkProcessDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  heading!: string;

  @IsString()
  description!: string;
}
