import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';
import { ServiceCardController } from './service-card.controller';
import { ServiceCardService } from './service-card.service';
import { ServiceSectionController } from './service-section.controller';
import { ServiceSectionService } from './service-section.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [ServiceSectionController, ServiceCardController],

  providers: [ServiceSectionService, ServiceCardService],

  exports: [ServiceSectionService, ServiceCardService],
})
export class ServiceSectionModule {}
