import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLogoSectionDto {
  @IsString()
  @IsNotEmpty()
  eyebrow_text!: string;
}
