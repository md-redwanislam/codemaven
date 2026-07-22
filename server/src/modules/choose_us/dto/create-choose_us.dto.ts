import { IsString } from 'class-validator';

export class CreateChooseUsDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  heading!: string;

  @IsString()
  subtext!: string;

  @IsString()
  button_text!: string;

  @IsString()
  button_url!: string;
}
