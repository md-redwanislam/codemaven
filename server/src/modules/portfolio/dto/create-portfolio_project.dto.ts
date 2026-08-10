import { IsString } from 'class-validator';

export class CreatePortfolioProjectDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  category!: string;

  @IsString()
  card_shape!: string;

  @IsString()
  description!: string;

  @IsString()
  tags!: string[];

  @IsString()
  services!: string;

  @IsString()
  display_order!: string;
}
