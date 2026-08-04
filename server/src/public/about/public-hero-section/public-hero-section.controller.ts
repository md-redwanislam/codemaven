import { Controller, Get } from '@nestjs/common';
import { HeroService } from '../../../modules/about/hero/hero.service';
import { HighlightCardService } from '../../../modules/about/hero/highlight-card.service';
import { StatCounterService } from '../../../modules/about/hero/stat-counter.service';

@Controller('about')
export class PublicHeroSectionController {
  constructor(
    private readonly heroService: HeroService,
    private readonly highlightCardService: HighlightCardService,
    private readonly statCounterService: StatCounterService,
  ) {}

  @Get('hero-section')
  findAllHeroSection() {
    return this.heroService.findAll();
  }

  @Get('highlight-card')
  findAllHighlightCard() {
    return this.highlightCardService.findAll();
  }
  @Get('stat-counter')
  findAllStatCounter() {
    return this.statCounterService.findAll();
  }
}
