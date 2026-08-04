import { Module } from '@nestjs/common';

import { StatisticModule } from '../../../modules/home/statistic/statistic.module';
import { PublicStatisticController } from './public-statistic.controller';

@Module({
  imports: [StatisticModule],
  controllers: [PublicStatisticController],
})
export class PublicStatisticModule {}
