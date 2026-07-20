import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSolutionsSectionDto {
  @IsString()
  @IsNotEmpty()
  eyebrow_text!: string;

  @IsString()
  @IsNotEmpty()
  heading!: string;
}
