import { Controller, Get } from '@nestjs/common';
import { ContactSectionService } from '../../modules/contact-section/contact-section.service';

@Controller('home/contact-section')
export class PublicContactSectionController {
  constructor(private readonly contactSectionService: ContactSectionService) {}

  @Get()
  findAllContactSection() {
    return this.contactSectionService.findAll();
  }
}
