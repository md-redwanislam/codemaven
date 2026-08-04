import { Controller, Get } from '@nestjs/common';
import { ServiceCardService } from '../../../modules/home/service-section/service-card.service';
import { ServiceSectionService } from '../../../modules/home/service-section/service-section.service';

@Controller('home/service-section')
export class PublicServiceSectionController {
  constructor(
    private readonly serviceSectionService: ServiceSectionService,
    private readonly serviceCardService: ServiceCardService,
  ) {}

  @Get()
  findAllServiceSection() {
    return this.serviceSectionService.findAll();
  }

  @Get('cards')
  findAllCards() {
    return this.serviceCardService.findAll();
  }
}
