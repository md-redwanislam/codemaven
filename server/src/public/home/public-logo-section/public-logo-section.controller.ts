import { Controller, Get } from '@nestjs/common';
import { AddLogoService } from '../../../modules/home/logo-section/add-logo.service';
import { LogoSectionService } from '../../../modules/home/logo-section/logo-section.service';

@Controller('home/logo-section')
export class PublicLogoSectionController {
  constructor(
    private readonly logoSectionService: LogoSectionService,
    private readonly addLogoService: AddLogoService,
  ) {}

  @Get()
  findAllLogoSection() {
    return this.logoSectionService.findAll();
  }

  @Get('logos')
  findAllLogos() {
    return this.addLogoService.findAll();
  }
}
