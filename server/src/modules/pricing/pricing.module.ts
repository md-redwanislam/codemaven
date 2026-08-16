import { Module } from '@nestjs/common';
import { PricingCtaService } from './cta.service';
import { HeroService } from './hero.service';
import { PricingController } from './pricing.controller';

@Module({
  controllers: [PricingController],
  providers: [HeroService, PricingCtaService],
  exports: [HeroService, PricingCtaService],
})
export class PricingModule {}
