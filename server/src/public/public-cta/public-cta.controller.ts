import { Controller, Get } from '@nestjs/common';
import { PublicCtaService } from './public-cta.service';

@Controller('home/cta')
export class PublicCtaController {
  constructor(private readonly publicCtaService: PublicCtaService) {}

  @Get()
  findAll() {
    return this.publicCtaService.findAll();
  }
}
