import { PartialType } from '@nestjs/mapped-types';
import { CreateSolutionsSectionDto } from './create-solutions-section.dto';

export class UpdateSolutionsSectionDto extends PartialType(
  CreateSolutionsSectionDto,
) {}
