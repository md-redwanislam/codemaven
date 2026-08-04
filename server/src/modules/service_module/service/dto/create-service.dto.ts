import { IsString } from 'class-validator';

export class CreateServiceModuleSectionDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  display_number!: string;

  @IsString()
  icon_label!: string;

  @IsString()
  summary!: string;

  @IsString()
  description!: string;

  @IsString()
  display_order!: string;
}
