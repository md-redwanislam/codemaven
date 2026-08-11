import { IsString } from 'class-validator';

export class CreateIndustryCardDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
