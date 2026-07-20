import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  headline_1!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  headline_2!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  primary_button_text!: string;

  @IsString()
  @IsNotEmpty()
  primary_button_url!: string;

  @IsString()
  @IsNotEmpty()
  secondary_button_text!: string;

  @IsString()
  @IsNotEmpty()
  secondary_button_url!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  ratings!: string;

  @IsString()
  @IsNotEmpty()
  rating_text!: string;

  @IsString()
  @IsNotEmpty()
  trust_text!: string;
}
