import { Controller, Get } from '@nestjs/common';
import { PublicHeroService } from './public-hero.service';

@Controller('home/hero')
export class PublicHeroController {
  constructor(private readonly publicHeroService: PublicHeroService) {}

  @Get()
  findAll() {
    return this.publicHeroService.findAll();
  }
}
