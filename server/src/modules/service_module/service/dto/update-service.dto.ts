import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceModuleSectionDto } from './create-service.dto';

export class UpdateServiceModuleSectionDto extends PartialType(
  CreateServiceModuleSectionDto,
) {}
