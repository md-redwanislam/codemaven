import { IsString } from 'class-validator';

export class CreatePortfolioShowcaseDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  headline_1!: string;

  @IsString()
  headline_2!: string;

  @IsString()
  description!: string;
}
