import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactSectionDto {
  @IsString()
  @IsNotEmpty()
  eyebrow_text!: string;

  @IsString()
  @IsNotEmpty()
  heading!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
