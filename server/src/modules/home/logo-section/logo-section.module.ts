import { Module } from '@nestjs/common';

import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';
import { DatabaseModule } from '../../../database/database.module';
import { AddLogoController } from './add-logo.controller';
import { AddLogoService } from './add-logo.service';
import { LogoSectionController } from './logo-section.controller';
import { LogoSectionService } from './logo-section.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],

  controllers: [LogoSectionController, AddLogoController],

  providers: [LogoSectionService, AddLogoService],

  exports: [LogoSectionService, AddLogoService],
})
export class LogoSectionModule {}
