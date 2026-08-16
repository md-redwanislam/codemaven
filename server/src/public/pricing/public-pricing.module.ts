import { Module } from '@nestjs/common';
import { PricingModule } from '../../modules/pricing/pricing.module';
import { PublicPricingController } from './public-pricing.controller';

@Module({
  imports: [PricingModule],
  controllers: [PublicPricingController],
})
export class PublicPricingModule {}
