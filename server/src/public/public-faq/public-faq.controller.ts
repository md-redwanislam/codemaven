import { Controller, Get } from '@nestjs/common';
import { AddFaqService } from '../../modules/faq/add-faq.service';
import { FaqService } from '../../modules/faq/faq.service';

@Controller('home/faq')
export class PublicFaqController {
  constructor(
    private readonly faqService: FaqService,
    private readonly addFaqService: AddFaqService,
  ) {}

  @Get()
  findAllFaq() {
    return this.faqService.findAll();
  }

  @Get('items')
  findAllItems() {
    return this.addFaqService.findAll();
  }
}
