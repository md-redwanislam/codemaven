import { Module } from '@nestjs/common';

import { ServiceSectionModule } from '../../../modules/home/service-section/service-section.module';
import { PublicServiceSectionController } from './public-service-section.controller';

@Module({
  imports: [ServiceSectionModule],
  controllers: [PublicServiceSectionController],
})
export class PublicServiceSectionModule {}
