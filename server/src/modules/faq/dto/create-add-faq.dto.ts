import { IsString } from 'class-validator';

export class CreateAddFAQDto {
  @IsString()
  question!: string;

  @IsString()
  answer!: string;
}
