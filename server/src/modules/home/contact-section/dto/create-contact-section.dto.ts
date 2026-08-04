import { IsString } from 'class-validator';

export class CreateContactSectionDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  heading!: string;

  @IsString()
  description!: string;
}
