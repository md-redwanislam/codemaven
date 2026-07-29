import { Controller, Get } from '@nestjs/common';
import { CtaService } from '../../modules/cta/cta.service';

@Controller('home/cta')
export class PublicCtaController {
  constructor(private readonly ctaService: CtaService) {}

  @Get()
  findAllCta() {
    return this.ctaService.findOne();
  }
}
