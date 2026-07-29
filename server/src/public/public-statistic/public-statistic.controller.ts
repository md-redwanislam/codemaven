import { Controller, Get } from '@nestjs/common';
import { StatisticService } from '../../modules/statistic/statistic.service';

@Controller('home/statistic')
export class PublicStatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  findAllStatistic() {
    return this.statisticService.findAll();
  }
}
