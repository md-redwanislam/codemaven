import { Controller, Get } from '@nestjs/common';
import { PricingCtaService } from '../../modules/pricing/cta.service';
import { HeroService } from '../../modules/pricing/hero.service';

@Controller('pricing')
export class PublicPricingController {
  constructor(
    private readonly pricingCtaService: PricingCtaService,
    private readonly heroService: HeroService,
  ) {}

  @Get('cta')
  findAllCTA() {
    return this.pricingCtaService.findCta();
  }
  @Get('hero')
  findAllHero() {
    return this.heroService.findHero();
  }
  @Get('trust')
  findAllStatCounter() {
    return this.heroService.findAllTrust();
  }
}
