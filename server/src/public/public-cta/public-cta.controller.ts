import { Controller, Get } from '@nestjs/common';
import { CtaService } from '../../modules/cta/cta.service';

@Controller('home/cta')
export class PublicCtaController {
  constructor(private readonly ctaService: CtaService) {}

  @Get()
  findAll() {
    return this.ctaService.findOne();
  }
}
