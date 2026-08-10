import { IsString } from 'class-validator';

export class CreatePortfolioCategoryDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsString()
  display_order!: string;
}
