import { IsString } from 'class-validator';

export class CreateCtaDto {
  @IsString()
  heading!: string;

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
