import { IsString, MaxLength } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @MaxLength(255)
  headline_1!: string;

  @IsString()
  @MaxLength(255)
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

  @IsString()
  @MaxLength(6)
  ratings!: string;

  @IsString()
  rating_text!: string;

  @IsString()
  trust_text!: string;
}
