import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChooseUsDto {
  @IsString()
  @IsNotEmpty()
  eyebrow_text!: string;

  @IsString()
  @IsNotEmpty()
  heading!: string;

  @IsString()
  @IsNotEmpty()
  subtext!: string;

  @IsString()
  @IsNotEmpty()
  button_text!: string;

  @IsString()
  @IsNotEmpty()
  button_url!: string;
}
