import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceSectionDto } from './create-service-section.dto';

export class UpdateServiceSectionDto extends PartialType(
  CreateServiceSectionDto,
) {}
