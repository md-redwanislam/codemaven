import { PartialType } from '@nestjs/mapped-types';
import { CreateLogoSectionDto } from './create-logo-section.dto';

export class UpdateLogoSectionDto extends PartialType(CreateLogoSectionDto) {}
