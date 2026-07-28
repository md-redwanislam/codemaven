import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [DatabaseModule],

  controllers: [StatisticController],

  providers: [StatisticService],

  exports: [StatisticService],
})
export class StatisticModule {}
