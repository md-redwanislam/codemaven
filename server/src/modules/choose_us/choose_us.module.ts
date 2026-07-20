import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { ChooseUsController } from './choose_us.controller';
import { ChooseUsService } from './choose_us.service';

@Module({
  imports: [DatabaseModule],

  controllers: [ChooseUsController],

  providers: [ChooseUsService],
})
export class ChooseUsModule {}
