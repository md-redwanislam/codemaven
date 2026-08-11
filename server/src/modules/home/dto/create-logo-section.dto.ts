import { IsString } from 'class-validator';

export class CreateLogoSectionDto {
  @IsString()
  eyebrow_text!: string;
}
