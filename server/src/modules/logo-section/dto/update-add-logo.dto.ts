import { PartialType } from '@nestjs/mapped-types';
import { CreateAddLogoDto } from './create-add-logo.dto';

export class UpdateAddLogoDto extends PartialType(CreateAddLogoDto) {}
