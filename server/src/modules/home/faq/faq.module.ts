import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';
import { AddFaqController } from './add-faq.controller';
import { AddFaqService } from './add-faq.service';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  imports: [DatabaseModule],

  controllers: [FaqController, AddFaqController],

  providers: [FaqService, AddFaqService],

  exports: [FaqService, AddFaqService],
})
export class FaqModule {}
