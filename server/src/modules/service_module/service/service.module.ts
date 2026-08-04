import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../../database/database.module';
import { ServiceModuleSectionController } from './service.controller';
import { ServiceModuleSectionService } from './service.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [ServiceModuleSectionController],
  providers: [ServiceModuleSectionService],
  exports: [ServiceModuleSectionService],
})
export class ServiceModule {}
