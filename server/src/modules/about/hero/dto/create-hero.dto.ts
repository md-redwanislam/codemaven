import { IsString } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  headline_1!: string;

  @IsString()
  headline_2!: string;

  @IsString()
  description!: string;

  @IsString()
  primary_button_text!: string;

  @IsString()
  primary_button_url!: string;

  @IsString()
  secondary_button_text!: string;

  @IsString()
  secondary_button_url!: string;
}
