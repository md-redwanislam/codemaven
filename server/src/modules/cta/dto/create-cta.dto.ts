import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCtaDto {
  @IsString()
  @IsNotEmpty()
  heading!: string;

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
}
