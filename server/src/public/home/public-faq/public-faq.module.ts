import { Module } from '@nestjs/common';

import { FaqModule } from '../../../modules/home/faq/faq.module';
import { PublicFaqController } from './public-faq.controller';

@Module({
  imports: [FaqModule],
  controllers: [PublicFaqController],
})
export class PublicFaqModule {}
