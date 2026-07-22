import { IsString } from 'class-validator';

export class CreateServiceSectionDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  heading!: string;
}
