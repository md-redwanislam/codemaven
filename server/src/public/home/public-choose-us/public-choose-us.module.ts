import { Module } from '@nestjs/common';

import { ChooseUsModule } from '../../../modules/home/choose_us/choose_us.module';
import { PublicChooseUsController } from './public-choose-us.controller';

@Module({
  imports: [ChooseUsModule],
  controllers: [PublicChooseUsController],
})
export class PublicChooseUsModule {}
