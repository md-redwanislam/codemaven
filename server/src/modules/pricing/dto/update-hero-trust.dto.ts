import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingTrustDto } from './create-hero-trust.dto';

export class UpdatePricingTrustDto extends PartialType(CreatePricingTrustDto) {}
