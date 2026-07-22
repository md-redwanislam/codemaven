import { IsString } from 'class-validator';

export class CreateSolutionsSectionDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  heading!: string;
}
