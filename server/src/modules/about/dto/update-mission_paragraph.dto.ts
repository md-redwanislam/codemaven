import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionParagraphDto } from './create-mission_paragraph.dto';

export class UpdateMissionParagraphDto extends PartialType(
  CreateMissionParagraphDto,
) {}
