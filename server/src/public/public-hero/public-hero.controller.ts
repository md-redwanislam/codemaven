import { Controller, Get } from '@nestjs/common';
import { HeroService } from '../../modules/hero/hero.service';

@Controller('home/hero')
export class PublicHeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  findAllHero() {
    return this.heroService.findOne();
  }
}
