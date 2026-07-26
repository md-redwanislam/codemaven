import { PartialType } from '@nestjs/mapped-types';
import { CreateIndustryCardDto } from './create-industry-card.dto';

export class UpdateIndustryCardDto extends PartialType(CreateIndustryCardDto) {}
