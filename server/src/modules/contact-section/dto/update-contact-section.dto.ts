import { PartialType } from '@nestjs/mapped-types';
import { CreateContactSectionDto } from './create-contact-section.dto';

export class UpdateContactSectionDto extends PartialType(
  CreateContactSectionDto,
) {}
