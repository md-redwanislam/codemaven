import { Controller, Get } from '@nestjs/common';
import { ContactSectionService } from '../../../modules/home/contact-section/contact-section.service';

@Controller('home/contact-section')
export class PublicContactSectionController {
  constructor(private readonly contactSectionService: ContactSectionService) {}

  @Get()
  findAllContactSection() {
    return this.contactSectionService.findAll();
  }
}
