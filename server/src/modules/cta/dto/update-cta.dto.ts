import { PartialType } from '@nestjs/mapped-types';
import { CreateCtaDto } from './create-cta.dto';

export class UpdateCtaDto extends PartialType(CreateCtaDto) {}
