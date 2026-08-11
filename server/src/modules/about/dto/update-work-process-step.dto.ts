import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkProcessStepDto } from './create-work-process-step.dto';

export class UpdateWorkProcessStepDto extends PartialType(
  CreateWorkProcessStepDto,
) {}
