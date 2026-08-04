import { IsBoolean, IsString } from 'class-validator';

export class CreateAddLogoDto {
  @IsString()
  name!: string;

  @IsBoolean()
  status!: boolean;
}
