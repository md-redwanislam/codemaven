import { IsString } from 'class-validator';

export class CreateHighlightCardDto {
  @IsString()
  title!: string;

  @IsString()
  subtitle!: string;
}
