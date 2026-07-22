import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../database/database.module';

import { ChooseUsController } from './choose_us.controller';
import { ChooseUsService } from './choose_us.service';
import { ChooseUsReasonController } from './choose_us_reason.controller';
import { ChooseUsReasonService } from './choose_us_reason.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [ChooseUsController, ChooseUsReasonController],

  providers: [ChooseUsService, ChooseUsReasonService],
})
export class ChooseUsModule {}
