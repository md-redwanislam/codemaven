import { IsString } from 'class-validator';

export class CreateMissionParagraphDto {
  @IsString()
  paragraph!: string;
}
