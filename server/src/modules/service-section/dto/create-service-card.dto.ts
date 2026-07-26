import { IsString } from 'class-validator';

export class CreateServiceCardDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
