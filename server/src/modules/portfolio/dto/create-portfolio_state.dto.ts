import { IsString } from 'class-validator';

export class CreatePortfolioStateDto {
  @IsString()
  label!: string;

  @IsString()
  label_value!: string;
}
