import { Controller, Get } from '@nestjs/common';
import { ChooseUsService } from '../../../modules/home/choose_us/choose_us.service';
import { ChooseUsReasonService } from '../../../modules/home/choose_us/choose_us_reason.service';

@Controller('home/choose-us')
export class PublicChooseUsController {
  constructor(
    private readonly chooseUsService: ChooseUsService,
    private readonly chooseUsReasonService: ChooseUsReasonService,
  ) {}

  @Get()
  findAllChooseUs() {
    return this.chooseUsService.findAll();
  }

  @Get('reasons')
  findAllReasons() {
    return this.chooseUsReasonService.findAll();
  }
}
