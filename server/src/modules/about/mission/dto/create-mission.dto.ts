import { IsString } from 'class-validator';

export class CreateMissionSectionDto {
  @IsString()
  eyebrow_text!: string;

  @IsString()
  heading!: string;

  @IsString()
  stat_value!: string;

  @IsString()
  stat_label!: string;
}
