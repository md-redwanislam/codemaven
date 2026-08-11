import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionSectionDto } from './create-mission.dto';

export class UpdateMissionSectionDto extends PartialType(
  CreateMissionSectionDto,
) {}
