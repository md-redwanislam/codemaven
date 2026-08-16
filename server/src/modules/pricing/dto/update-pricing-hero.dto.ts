import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingHeroDto } from './create-pricing-hero.dto';

export class UpdatePricingHeroDto extends PartialType(CreatePricingHeroDto) {}
