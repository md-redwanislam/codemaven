import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { ServiceSectionController } from './service-section.controller';
import { ServiceSectionService } from './service-section.service';

@Module({
  imports: [DatabaseModule],

  controllers: [ServiceSectionController],

  providers: [ServiceSectionService],
})
export class ServiceSectionModule {}
